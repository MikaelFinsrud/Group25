-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 21, 2025 at 12:40 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ElectroMart_2NF`
--

-- --------------------------------------------------------

--
-- Table structure for table `OrderItem`
--

CREATE TABLE `OrderItem` (
  `OrderItemID` int(11) NOT NULL,
  `OrderID` int(11) NOT NULL,
  `ProductID` int(11) NOT NULL,
  `Quantity` int(11) NOT NULL,
  `Subtotal` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_danish_ci;

--
-- Dumping data for table `OrderItem`
--

INSERT INTO `OrderItem` (`OrderItemID`, `OrderID`, `ProductID`, `Quantity`, `Subtotal`) VALUES
(1, 1, 1, 1, 10000.00),
(2, 1, 2, 2, 380.00),
(3, 2, 3, 1, 14000.00);

-- --------------------------------------------------------

--
-- Table structure for table `Orders`
--

CREATE TABLE `Orders` (
  `OrderID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `OrderDate` datetime NOT NULL,
  `Status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_danish_ci;

--
-- Dumping data for table `Orders`
--

INSERT INTO `Orders` (`OrderID`, `UserID`, `OrderDate`, `Status`) VALUES
(1, 1, '2025-05-21 12:39:26', 'Confirmed'),
(2, 2, '2025-05-21 12:39:26', 'Pending');

-- --------------------------------------------------------

--
-- Table structure for table `Payment`
--

CREATE TABLE `Payment` (
  `PaymentID` int(11) NOT NULL,
  `OrderID` int(11) NOT NULL,
  `PaymentMethod` varchar(50) DEFAULT NULL,
  `Amount` decimal(10,2) NOT NULL,
  `Paymentdate` datetime NOT NULL,
  `Status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_danish_ci;

--
-- Dumping data for table `Payment`
--

INSERT INTO `Payment` (`PaymentID`, `OrderID`, `PaymentMethod`, `Amount`, `Paymentdate`, `Status`) VALUES
(1, 1, 'CreditCard', 10380.00, '2025-05-21 12:40:00', 'Completed'),
(2, 2, 'PayPal', 14000.00, '2025-05-21 12:40:00', 'Pending');

-- --------------------------------------------------------

--
-- Table structure for table `Product`
--

CREATE TABLE `Product` (
  `ProductID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Description` text DEFAULT NULL,
  `Price` decimal(10,2) NOT NULL,
  `StockQuantity` int(11) DEFAULT 0,
  `BrandID` int(11) NOT NULL,
  `BrandName` varchar(100) NOT NULL,
  `BrandDescription` text DEFAULT NULL,
  `CategoryID` int(11) NOT NULL,
  `CategoryName` varchar(100) NOT NULL,
  `CategoryDescription` text DEFAULT NULL,
  `ImageID` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_danish_ci;

--
-- Dumping data for table `Product`
--

INSERT INTO `Product` (`ProductID`, `Name`, `Description`, `Price`, `StockQuantity`, `BrandID`, `BrandName`, `BrandDescription`, `CategoryID`, `CategoryName`, `CategoryDescription`, `ImageID`) VALUES
(1, 'LG 55\" QNED 85 4K TV (2024) 55QNED85T6C', 'High-end QNED TV with 4K resolution', 10000.00, 30, 3, 'LG', 'Popular high-end TV and monitor brand', 4, 'TV, sound & picture', 'TVs, speakers and soundbars', '8'),
(2, 'USB-C Smartphone Charger', 'Fast-charging USB-C cable and power adapter', 190.00, 100, 1, 'Techify', 'Modern electronics brand', 5, 'Computer equipment', 'All kinds of general equipment and electronics', '15'),
(3, 'Lenovo LOQ 15 FHD', 'Gaming laptop – RTX 4060, Ryzen 7 7435HS, 24 GB RAM, 512 GB SSD', 14000.00, 50, 2, 'Lenovo', 'Well-known laptop brand', 3, 'Gaming', 'Gaming laptops, desktops and screens', '6'),
(24, 'Apple iPhone 16', 'The newest edition of Apple’s popular smartphone line', 15000.00, 40, 6, 'Apple', 'World-wide electronics brand known for high-quality phones, tablets and computers', 1, 'Mobile devices', 'Phones and watches', '10'),
(31, 'Apple AirPods Pro 2', 'Wireless earbuds with noise cancellation', 3500.00, 50, 6, 'Apple', 'World-wide electronics brand known for high-quality phones, tablets and computers', 5, 'Computer equipment', 'All kinds of general equipment and electronics', '2');

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `UserID` int(11) NOT NULL,
  `Username` varchar(50) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `FirstName` varchar(50) NOT NULL,
  `LastName` varchar(50) NOT NULL,
  `Address` text DEFAULT NULL,
  `PhoneNumber` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_danish_ci;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`UserID`, `Username`, `Password`, `Email`, `FirstName`, `LastName`, `Address`, `PhoneNumber`) VALUES
(1, 'matsdev', 'hashedpass123', 'mats@example.com', 'Mats', 'Finsrud', '123 Main Street', '1234567890'),
(2, 'emiltech', 'hashedpass456', 'emil@example.com', 'Emil', 'Nilsen', '456 Code Avenue', '9876543210'),
(3, 'mikke', 'hashedpass789', 'mikke@mus.com', 'Mikke', 'Mus', 'Javaveien 48', '12345678');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `OrderItem`
--
ALTER TABLE `OrderItem`
  ADD PRIMARY KEY (`OrderItemID`),
  ADD KEY `OrderID` (`OrderID`),
  ADD KEY `ProductID` (`ProductID`);

--
-- Indexes for table `Orders`
--
ALTER TABLE `Orders`
  ADD PRIMARY KEY (`OrderID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indexes for table `Payment`
--
ALTER TABLE `Payment`
  ADD PRIMARY KEY (`PaymentID`),
  ADD KEY `OrderID` (`OrderID`);

--
-- Indexes for table `Product`
--
ALTER TABLE `Product`
  ADD PRIMARY KEY (`ProductID`),
  ADD KEY `BrandID` (`BrandID`),
  ADD KEY `CategoryID` (`CategoryID`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`UserID`),
  ADD UNIQUE KEY `Username` (`Username`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `OrderItem`
--
ALTER TABLE `OrderItem`
  ADD CONSTRAINT `orderitem_ibfk_1` FOREIGN KEY (`OrderID`) REFERENCES `Orders` (`OrderID`),
  ADD CONSTRAINT `orderitem_ibfk_2` FOREIGN KEY (`ProductID`) REFERENCES `Product` (`ProductID`);

--
-- Constraints for table `Orders`
--
ALTER TABLE `Orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `Users` (`UserID`);

--
-- Constraints for table `Payment`
--
ALTER TABLE `Payment`
  ADD CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`OrderID`) REFERENCES `Orders` (`OrderID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
