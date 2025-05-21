-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 21. Mai, 2025 13:06 PM
-- Tjener-versjon: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `electromart_1nf_new`
--

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `ordersorderitems`
--

CREATE TABLE `ordersorderitems` (
  `OrderID` int(11) NOT NULL,
  `OrderDate` datetime DEFAULT current_timestamp(),
  `Status` enum('Pending','Confirmed') DEFAULT 'Pending',
  `TotalAmount` decimal(10,2) DEFAULT NULL,
  `OrderItemID` int(11) NOT NULL,
  `ProductID` int(11) NOT NULL,
  `BrandID` int(11) NOT NULL,
  `CategoryID` int(11) NOT NULL,
  `Quantity` int(11) NOT NULL,
  `Subtotal` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dataark for tabell `ordersorderitems`
--

INSERT INTO `ordersorderitems` (`OrderID`, `OrderDate`, `Status`, `TotalAmount`, `OrderItemID`, `ProductID`, `BrandID`, `CategoryID`, `Quantity`, `Subtotal`) VALUES
(1, '2025-05-21 13:00:42', 'Confirmed', 11000.00, 1, 1, 1, 1, 2, 6000.00),
(1, '2025-05-21 13:00:42', 'Confirmed', 11000.00, 2, 2, 1, 1, 1, 5000.00);

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `productsbrandscategories`
--

CREATE TABLE `productsbrandscategories` (
  `ProductID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Description` text DEFAULT NULL,
  `Price` decimal(10,2) NOT NULL,
  `StockQuantity` int(11) DEFAULT 0,
  `ImageID` int(11) NOT NULL DEFAULT 0,
  `BrandID` int(11) NOT NULL,
  `BrandName` varchar(100) NOT NULL,
  `BrandDescription` text DEFAULT NULL,
  `CategoryID` int(11) NOT NULL,
  `CateogoryName` varchar(100) NOT NULL,
  `CategoryDescription` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dataark for tabell `productsbrandscategories`
--

INSERT INTO `productsbrandscategories` (`ProductID`, `Name`, `Description`, `Price`, `StockQuantity`, `ImageID`, `BrandID`, `BrandName`, `BrandDescription`, `CategoryID`, `CateogoryName`, `CategoryDescription`) VALUES
(1, 'iPhone 11', 'A cheap smartphone from Apple', 3000.00, 35, 1, 1, 'Apple', 'Tech giant mainly focused on laptops and smartphones', 1, 'Phones & tablets', 'Smartphones, tablets and smart watches'),
(2, 'iPhone 12', 'An older smartphone from Apple', 5000.00, 10, 1, 1, 'Apple', 'Tech giant mainly focused on laptops and smartphones', 1, 'Phones & tablets', 'Smartphones, tablets and smart watches');

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `userspayments`
--

CREATE TABLE `userspayments` (
  `UserID` int(11) NOT NULL,
  `Username` varchar(50) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `FirstName` varchar(50) DEFAULT NULL,
  `LastName` varchar(50) DEFAULT NULL,
  `Address` text DEFAULT NULL,
  `PhoneNumber` varchar(20) DEFAULT NULL,
  `PaymentID` int(11) NOT NULL,
  `OrderID` int(11) NOT NULL,
  `OrderItemID` int(11) NOT NULL,
  `PaymentMethod` enum('CreditCard','PayPal') NOT NULL,
  `Amount` decimal(10,2) NOT NULL,
  `PaymentDate` datetime DEFAULT current_timestamp(),
  `Status` enum('Pending','Completed','Failed') DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dataark for tabell `userspayments`
--

INSERT INTO `userspayments` (`UserID`, `Username`, `Password`, `Email`, `FirstName`, `LastName`, `Address`, `PhoneNumber`, `PaymentID`, `OrderID`, `OrderItemID`, `PaymentMethod`, `Amount`, `PaymentDate`, `Status`) VALUES
(1, 'MikkeMus123', 'X347NMLKDUFURBFYUR27', 'mikkemus@gmail.com', 'Mikke', 'Mus', 'Museveien 37', '44556677', 1, 1, 1, 'PayPal', 11000.00, '2025-05-21 13:05:13', 'Completed'),
(1, 'MikkeMus123', 'X347NMLKDUFURBFYUR27', 'mikkemus@gmail.com', 'Mikke', 'Mus', 'Museveien 37', '44556677', 1, 1, 2, 'PayPal', 11000.00, '2025-05-21 13:05:13', 'Completed');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ordersorderitems`
--
ALTER TABLE `ordersorderitems`
  ADD PRIMARY KEY (`OrderID`,`OrderItemID`),
  ADD KEY `ProductID` (`ProductID`,`BrandID`,`CategoryID`);

--
-- Indexes for table `productsbrandscategories`
--
ALTER TABLE `productsbrandscategories`
  ADD PRIMARY KEY (`ProductID`,`BrandID`,`CategoryID`);

--
-- Indexes for table `userspayments`
--
ALTER TABLE `userspayments`
  ADD PRIMARY KEY (`UserID`,`PaymentID`,`OrderID`,`OrderItemID`),
  ADD KEY `OrderID` (`OrderID`,`OrderItemID`);

--
-- Begrensninger for dumpede tabeller
--

--
-- Begrensninger for tabell `ordersorderitems`
--
ALTER TABLE `ordersorderitems`
  ADD CONSTRAINT `ordersorderitems_ibfk_1` FOREIGN KEY (`ProductID`,`BrandID`,`CategoryID`) REFERENCES `productsbrandscategories` (`ProductID`, `BrandID`, `CategoryID`);

--
-- Begrensninger for tabell `userspayments`
--
ALTER TABLE `userspayments`
  ADD CONSTRAINT `userspayments_ibfk_1` FOREIGN KEY (`OrderID`,`OrderItemID`) REFERENCES `ordersorderitems` (`OrderID`, `OrderItemID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
