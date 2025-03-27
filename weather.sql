-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 24, 2025 at 05:48 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `weather`
--

-- --------------------------------------------------------

--
-- Table structure for table `weather`
--

CREATE TABLE `weather` (
  `id` int(11) NOT NULL,
  `city` varchar(100) NOT NULL,
  `country` varchar(100) DEFAULT NULL,
  `lat` float NOT NULL,
  `lon` float NOT NULL,
  `temperature` float NOT NULL,
  `feels_like` float NOT NULL,
  `humidity` float NOT NULL,
  `wind` float NOT NULL,
  `clouds` int(11) NOT NULL,
  `pressure` float NOT NULL,
  `sunrise` int(11) NOT NULL,
  `sunset` int(11) NOT NULL,
  `timestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `weather`
--

INSERT INTO `weather` (`id`, `city`, `country`, `lat`, `lon`, `temperature`, `feels_like`, `humidity`, `wind`, `clouds`, `pressure`, `sunrise`, `sunset`, `timestamp`) VALUES
(1, 'Kathmandu', 'NP', 27.7083, 85.3206, 20.16, 19.01, 30, 5, 20, 1009, 1737680927, 1737719547, '2025-01-24 13:33:23'),
(2, 'Пеньково', 'RU', 54.3878, 43.8207, -7.69, -13.37, 92, 3, 99, 1027, 1737695165, 1737725232, '2025-01-24 14:35:02'),
(3, 'Biratnagar', 'NP', 26.4623, 87.2816, 24.56, 23.93, 33, 5, 0, 1009, 1737680325, 1737719207, '2025-01-24 15:40:04'),
(4, 'London', 'GB', 51.5073, -0.127647, 10.65, 9.39, 62, 9, 100, 997, 1737704992, 1737736504, '2025-01-24 18:25:25'),
(5, 'Biratnagar', 'NP', 26.4623, 87.2816, 18.78, 17.91, 46, 0, 0, 1010, 1737680325, 1737719207, '2025-01-24 18:28:06'),
(6, 'Kathmandu', 'NP', 27.7083, 85.3206, 15.16, 13.88, 44, 3, 20, 1012, 1737680927, 1737719547, '2025-01-24 18:29:09'),
(7, 'Japan', 'US', 40.9922, -75.9079, -12.11, -12.11, 55, 0, 69, 1023, 1737721252, 1737756625, '2025-01-24 19:03:39'),
(8, 'Biratnagar', 'NP', 26.4623, 87.2816, 15.71, 14.88, 59, 1, 0, 1013, 1737680325, 1737719207, '2025-01-24 22:06:37'),
(9, 'London', 'GB', 51.5073, -0.127647, 9.63, 6.41, 59, 7, 97, 999, 1737704992, 1737736504, '2025-01-24 22:18:34'),
(10, 'Kathmandu', 'NP', 27.7083, 85.3206, 12.19, 10.77, 50, 0, 20, 1015, 1737680926, 1737719547, '2025-01-24 22:18:52');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `weather`
--
ALTER TABLE `weather`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `weather`
--
ALTER TABLE `weather`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
