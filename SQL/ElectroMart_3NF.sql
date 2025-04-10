-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: 10. Apr, 2025 14:38 PM
-- Tjener-versjon: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ElectroMart_3NF`
--

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `Brands`
--

CREATE TABLE `Brands` (
  `BrandID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dataark for tabell `Brands`
--

INSERT INTO `Brands` (`BrandID`, `Name`, `Description`) VALUES
(1, 'Techify', 'Modern electronics brand'),
(2, 'Lenovo', 'Well-known laptop brand'),
(3, 'LG', 'Popular high-end TV and monitor brand'),
(4, 'MSI', 'Brand known for PC parts and gaming equipment'),
(5, 'Logitech', 'Popular brand for PC accessories and peripherals'),
(6, 'Apple', 'World-wide electronics brand known for high quality phones, tablets and computers'),
(7, 'Samsung', 'World-wide electronics brand known for high quality phones, tablets and computers'),
(8, 'ElectroMart', 'New electronics selling company');

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `Categories`
--

CREATE TABLE `Categories` (
  `CategoryID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dataark for tabell `Categories`
--

INSERT INTO `Categories` (`CategoryID`, `Name`, `Description`) VALUES
(1, 'Mobile devices', 'Phones and watches'),
(2, 'PC & tablets', 'Laptops, desktops and tablets'),
(3, 'Gaming', 'Gaming laptops, desktops and screens'),
(4, 'TV, sound & picture', 'TVs, speakers and soundbars'),
(5, 'Computer equipment', 'All kinds of general equipment and electronics');

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `OrderItems`
--

CREATE TABLE `OrderItems` (
  `OrderItemID` int(11) NOT NULL,
  `OrderID` int(11) NOT NULL,
  `ProductID` int(11) NOT NULL,
  `Quantity` int(11) NOT NULL,
  `Subtotal` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dataark for tabell `OrderItems`
--

INSERT INTO `OrderItems` (`OrderItemID`, `OrderID`, `ProductID`, `Quantity`, `Subtotal`) VALUES
(1, 1, 1, 1, 10000.00),
(2, 1, 2, 2, 380.00),
(3, 2, 3, 1, 14000.00);

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `Orders`
--

CREATE TABLE `Orders` (
  `OrderID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `OrderDate` datetime DEFAULT current_timestamp(),
  `Status` enum('Pending','Confirmed') DEFAULT 'Pending',
  `TotalAmount` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dataark for tabell `Orders`
--

INSERT INTO `Orders` (`OrderID`, `UserID`, `OrderDate`, `Status`, `TotalAmount`) VALUES
(1, 1, '2025-04-01 20:34:59', 'Confirmed', 10380.00),
(2, 2, '2025-04-01 20:34:59', 'Pending', 14000.00);

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `Payments`
--

CREATE TABLE `Payments` (
  `PaymentID` int(11) NOT NULL,
  `OrderID` int(11) NOT NULL,
  `PaymentMethod` enum('CreditCard','PayPal') NOT NULL,
  `Amount` decimal(10,2) NOT NULL,
  `PaymentDate` datetime DEFAULT current_timestamp(),
  `Status` enum('Pending','Completed','Failed') DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dataark for tabell `Payments`
--

INSERT INTO `Payments` (`PaymentID`, `OrderID`, `PaymentMethod`, `Amount`, `PaymentDate`, `Status`) VALUES
(1, 1, 'CreditCard', 10380.00, '2025-04-01 20:53:24', 'Completed'),
(2, 2, 'PayPal', 14000.00, '2025-04-01 20:53:24', 'Pending');

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `Products`
--

CREATE TABLE `Products` (
  `ProductID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Description` text DEFAULT NULL,
  `Price` decimal(10,2) NOT NULL,
  `StockQuantity` int(11) DEFAULT 0,
  `BrandID` int(11) DEFAULT NULL,
  `CategoryID` int(11) NOT NULL,
  `ImageID` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dataark for tabell `Products`
--

INSERT INTO `Products` (`ProductID`, `Name`, `Description`, `Price`, `StockQuantity`, `BrandID`, `CategoryID`, `ImageID`) VALUES
(1, 'LG 55\' QNED 85 4K TV (2024) 55QNED85T6C', 'High-end QNED TV with 4k resolution', 10000.00, 30, 3, 4, 8),
(2, 'USB-C Smartphone Charger', 'Fast-charging USB-C cable and power adapter', 190.00, 100, 1, 5, 15),
(3, 'Lenovo LOQ 15 FHD', 'A gaming laptop with GeForce RTX 4060, Ryzen 7 7435HS, 24 GB RAM, 512 GB SSD, Windows 11 Home', 14000.00, 50, 2, 3, 6),
(22, 'MSI 27\" Curved gaming screen MAG 27C6X', 'Lightning fast 1080p 250hz curved gaming screen', 1890.00, 50, 4, 3, 5),
(23, 'ElectroMart-PC Epic Gaming i210 RGB', 'Budget friendly gaming desktop with RTX 5070', 21000.00, 10, 8, 3, 7),
(24, 'Apple iPhone 16', 'The newest edition of the popular smartphones from Apple', 15000.00, 40, 6, 1, 10),
(25, 'Samsung Galaxy S25', 'The newest edition of the popular smartphones from Samsung', 11000.00, 45, 7, 1, 10),
(26, 'Apple iPad Pro 13', 'The newest and most powerful edition of the popular tablets from Apple', 27000.00, 20, 6, 2, 9),
(27, 'Samsung Galaxy Tab S9', 'The newest and most powerful edition of the popular tablets from Samsung', 14000.00, 15, 7, 2, 9),
(28, 'Apple Watch Series 9', 'The latest Apple smartwatch with health tracking', 6500.00, 35, 6, 1, 11),
(29, 'Samsung Galaxy Watch 6', 'Feature-rich smartwatch for Android users', 5000.00, 40, 7, 1, 11),
(30, 'Techify SmartBand Pro', 'Lightweight fitness tracker with OLED display', 1200.00, 70, 1, 1, 11),
(31, 'Apple AirPods Pro 2', 'Wireless earbuds with noise cancellation', 3500.00, 50, 6, 5, 2),
(32, 'Samsung Galaxy Buds 2 Pro', 'Premium earbuds with 360 audio', 2900.00, 45, 7, 5, 2),
(33, 'Lenovo Yoga 7i 14\"', 'Touchscreen 2-in-1 laptop with Intel i7', 17000.00, 20, 2, 2, 1),
(34, 'Apple MacBook Air M2', 'Lightweight, powerful laptop with M2 chip', 18500.00, 25, 6, 2, 1),
(35, 'LG UltraTab 10.3', 'Sleek Android tablet with stylus support', 7500.00, 30, 3, 2, 9),
(36, 'MSI Prestige 14 Evo', 'Portable ultrabook for professionals', 15500.00, 18, 4, 2, 1),
(37, 'Lenovo IdeaPad Slim 5', 'Budget-friendly student laptop', 9500.00, 40, 2, 2, 1),
(38, 'MSI Raider GE78 Gaming Laptop', 'Powerful gaming laptop with RTX 4080', 32000.00, 10, 4, 3, 6),
(39, 'ElectroMart Gaming Beast X', 'Desktop PC with i9 and RTX 4090', 50000.00, 5, 8, 3, 7),
(40, 'Logitech G Pro X Headset', 'Professional gaming headset with surround sound', 1800.00, 60, 5, 5, 4),
(41, 'Lenovo Legion T5 Desktop', 'Tower PC with Ryzen 7 and RTX 4070', 24000.00, 15, 2, 3, 7),
(42, 'LG UltraGear 32\" Gaming Monitor', 'High refresh rate monitor with 1ms response time', 5200.00, 25, 3, 3, 5),
(43, 'LG OLED Evo 65\"', 'Stunning 4K OLED display with Dolby Vision', 36000.00, 8, 3, 4, 8),
(44, 'Samsung QLED 8K 65\"', 'Ultra-high definition 8K TV with AI upscaling', 48000.00, 6, 7, 4, 8),
(45, 'Logitech Z407 Bluetooth Speakers', 'Desktop speaker set with deep bass', 1100.00, 70, 5, 4, 13),
(46, 'MSI SoundBar RGB Pro', 'Soundbar with RGB lighting and subwoofer', 1600.00, 35, 4, 4, 12),
(47, 'Apple HomePod 2nd Gen', 'Smart speaker with spatial audio', 3200.00, 20, 6, 4, 13),
(48, 'Logitech MX Master 3S Mouse', 'Ergonomic wireless mouse with precision scroll', 1200.00, 60, 5, 5, 3),
(49, 'Lenovo ThinkVision 24\" Monitor', 'Office-grade full HD monitor', 2200.00, 40, 2, 5, 14),
(50, 'Apple Magic Keyboard', 'Sleek and responsive keyboard for Apple devices', 1300.00, 25, 6, 5, 17),
(51, 'Techify DockStation Pro', 'Multi-port docking station with USB-C support', 900.00, 80, 1, 5, 16),
(52, 'MSI Wired Mechanical Keyboard', 'RGB mechanical keyboard with blue switches', 1100.00, 50, 4, 5, 17),
(53, 'Samsung Galaxy Buds 2 Pro', 'Premium earbuds with 360 audio', 2900.00, 45, 7, 5, 2);

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `Users`
--

CREATE TABLE `Users` (
  `UserID` int(11) NOT NULL,
  `Username` varchar(50) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `FirstName` varchar(50) DEFAULT NULL,
  `LastName` varchar(50) DEFAULT NULL,
  `Address` text DEFAULT NULL,
  `PhoneNumber` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dataark for tabell `Users`
--

INSERT INTO `Users` (`UserID`, `Username`, `Password`, `Email`, `FirstName`, `LastName`, `Address`, `PhoneNumber`) VALUES
(1, 'matsdev', 'hashedpass123', 'mats@example.com', 'Mats', 'Finsrud', '123 Main Street', '1234567890'),
(2, 'emiltech', 'hashedpass456', 'emil@example.com', 'Emil', 'Nilsen', '456 Code Avenue', '9876543210'),
(3, 'mikke', '$2b$10$F178/a1MsihOmji/KypuC.QJqdB7lmtKbkHzbBKVfgrKYOuBL4n7C', 'mikke@mus.com', 'mikke', 'mus', 'Javaveien48', '12345678'),
(5, '123', '$2b$10$8FGhkqcjckK.EOeNjKmChutFP/UT8q5YJeqjbztAEBF5HhNihO4t2', '123@123.no', '123', '123', '123', '123');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Brands`
--
ALTER TABLE `Brands`
  ADD PRIMARY KEY (`BrandID`);

--
-- Indexes for table `Categories`
--
ALTER TABLE `Categories`
  ADD PRIMARY KEY (`CategoryID`);

--
-- Indexes for table `OrderItems`
--
ALTER TABLE `OrderItems`
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
-- Indexes for table `Payments`
--
ALTER TABLE `Payments`
  ADD PRIMARY KEY (`PaymentID`),
  ADD UNIQUE KEY `OrderID` (`OrderID`);

--
-- Indexes for table `Products`
--
ALTER TABLE `Products`
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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Brands`
--
ALTER TABLE `Brands`
  MODIFY `BrandID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `Categories`
--
ALTER TABLE `Categories`
  MODIFY `CategoryID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `OrderItems`
--
ALTER TABLE `OrderItems`
  MODIFY `OrderItemID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Orders`
--
ALTER TABLE `Orders`
  MODIFY `OrderID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Payments`
--
ALTER TABLE `Payments`
  MODIFY `PaymentID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Products`
--
ALTER TABLE `Products`
  MODIFY `ProductID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Begrensninger for dumpede tabeller
--

--
-- Begrensninger for tabell `OrderItems`
--
ALTER TABLE `OrderItems`
  ADD CONSTRAINT `orderitems_ibfk_1` FOREIGN KEY (`OrderID`) REFERENCES `Orders` (`OrderID`),
  ADD CONSTRAINT `orderitems_ibfk_2` FOREIGN KEY (`ProductID`) REFERENCES `Products` (`ProductID`);

--
-- Begrensninger for tabell `Orders`
--
ALTER TABLE `Orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `Users` (`UserID`);

--
-- Begrensninger for tabell `Payments`
--
ALTER TABLE `Payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`OrderID`) REFERENCES `Orders` (`OrderID`);

--
-- Begrensninger for tabell `Products`
--
ALTER TABLE `Products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`BrandID`) REFERENCES `Brands` (`BrandID`),
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`CategoryID`) REFERENCES `Categories` (`CategoryID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
