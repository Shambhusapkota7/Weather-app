<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET,POST');
header("Access-Control-Allow-Headers: X-Requested-with");
$serverName = "localhost";
$userName = "root";
$password = "";
$conn = mysqli_connect($serverName, $userName, $password);
if (!$conn) {
    echo json_encode(["error" => "Failed to connect to database: " . mysqli_connect_error()]);
    exit;
}
$createDatabase = "CREATE DATABASE IF NOT EXISTS weather";
if (!mysqli_query($conn, $createDatabase)) {
    echo json_encode(["error" => "Failed to create database: " . mysqli_error($conn)]);
    exit;
}
mysqli_select_db($conn, 'weather');
$createTable = "
    CREATE TABLE IF NOT EXISTS weather (
        id INT AUTO_INCREMENT PRIMARY KEY,
        city VARCHAR(100) NOT NULL,
        country VARCHAR(100),
        lat FLOAT NOT NULL,
        lon FLOAT NOT NULL,
        temperature FLOAT NOT NULL,
        feels_like FLOAT NOT NULL,
        humidity FLOAT NOT NULL,
        wind FLOAT NOT NULL,
        clouds INT NOT NULL,
        pressure FLOAT NOT NULL,
        sunrise INT NOT NULL,
        sunset INT NOT NULL,
        timestamp DATETIME NOT NULL
    )";
if (!mysqli_query($conn, $createTable)) {
    echo json_encode(["error" => "Failed to create table: " . mysqli_error($conn)]);
    exit;
}
$apiKey = "7472e3a4181db6b058c134c8e767aaa7"; 
// $location = isset($_GET['location']) ? $_GET['location'] : null;
$location = isset($_GET['location']) ? $_GET['location'] : "Kathmandu";

if (!$location) {
    echo json_encode(["error" => "Location is required"]);
    exit;
}
$query = "SELECT * FROM weather WHERE city = ? AND timestamp > DATE_SUB(NOW(), INTERVAL 2 HOUR)";
$stmt = $conn->prepare($query);
$stmt->bind_param("s", $location);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $rows = $result->fetch_assoc();
    echo json_encode($rows);
} else {
    $geoUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" . urlencode($location) . "&limit=1&appid=$apiKey";
    $geoResponse = file_get_contents($geoUrl);
    $geoData = json_decode($geoResponse, true);

    if (!isset($geoData[0])) {
        echo json_encode(["error" => "Location not found"]);
        exit;
    }

    $lat = $geoData[0]['lat'];
    $lon = $geoData[0]['lon'];
    $city = $geoData[0]['name'];
    $country = $geoData[0]['country'];
    $weatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=$lat&lon=$lon&units=metric&appid=$apiKey";
    $weatherResponse = file_get_contents($weatherUrl);
    $weatherData = json_decode($weatherResponse, true);

    if (!isset($weatherData['main'])) {
        echo json_encode(["error" => "Weather data not available"]);
        exit;
    }

    $temperature = $weatherData['main']['temp'];
    $feelsLike = $weatherData['main']['feels_like'];
    $humidity = $weatherData['main']['humidity'];
    $wind = $weatherData['wind']['speed'];
    $clouds = $weatherData['clouds']['all'];
    $pressure = $weatherData['main']['pressure'];
    $sunrise = $weatherData['sys']['sunrise'];
    $sunset = $weatherData['sys']['sunset'];
    $insertQuery = "
        INSERT INTO weather (city, country, lat, lon, temperature, feels_like, humidity, wind, clouds, pressure, sunrise, sunset, timestamp) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())";
    $insertStmt = $conn->prepare($insertQuery);
    $insertStmt->bind_param(
        "ssdddddiddii",
        $city,
        $country,
        $lat,
        $lon,
        $temperature,
        $feelsLike,
        $humidity,
        $wind,
        $clouds,
        $pressure,
        $sunrise,
        $sunset
    );

    if ($insertStmt->execute()) {
        $weatherData['city'] = $city;
        $weatherData['country'] = $country;
        echo json_encode($weatherData);
    } else {
        echo json_encode(["error" => "Failed to insert data: " . $conn->error]);
    }
}
mysqli_close($conn);

?>
