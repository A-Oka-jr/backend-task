-- phpMyAdmin SQL Dump
-- version 4.6.6
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 03, 2022 at 02:48 AM
-- Server version: 5.7.17-log
-- PHP Version: 7.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `app`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` varchar(36) NOT NULL,
  `personal_image` text NOT NULL,
  `full_name` varchar(40) NOT NULL,
  `address` varchar(40) NOT NULL,
  `gender` int(1) NOT NULL,
  `mobile` int(15) NOT NULL,
  `email` varchar(20) NOT NULL,
  `jop` varchar(20) NOT NULL,
  `salary` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `personal_image`, `full_name`, `address`, `gender`, `mobile`, `email`, `jop`, `salary`) VALUES
('2c774504-fa78-11ec-81a3-8cc84b0e58cc', 'uploads\\personal_image-1656815450342-download.png', 'ahmed okasha', 'kh', 1, 2147483647, 'ahmed@gmail.com', 'softwere  eng', 3000),
('6c6beb49-fa78-11ec-81a3-8cc84b0e58cc', 'uploadspersonal_image-1656815743294-avatar.jpg', 'alaa alamin', 'umdorman', 2, 2147483647, 'alla@gmail.com', 'IT', 3000);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
