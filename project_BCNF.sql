CREATE TABLE User (
    UserID INT PRIMARY KEY AUTO_INCREMENT,
    Username VARCHAR(50) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    Address TEXT,
    PhoneNumber VARCHAR(20)
);

CREATE TABLE Brand (
    BrandID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(100) NOT NULL,
    Description TEXT
);

CREATE TABLE Category (
    CategoryID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(100) NOT NULL,
    Description TEXT
);

CREATE TABLE Product (
    ProductID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(100) NOT NULL,
    Description TEXT,
    Price DECIMAL(10,2) NOT NULL,
    StockQuantity INT DEFAULT 0,
    BrandID INT,
    CategoryID INT,
    ImageID VARCHAR(255),
    FOREIGN KEY (BrandID) REFERENCES Brand(BrandID),
    FOREIGN KEY (CategoryID) REFERENCES Category(CategoryID)
);

CREATE TABLE `Order` (
    OrderID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    OrderDate DATETIME NOT NULL,
    TotalAmount DECIMAL(10,2) NOT NULL,
    Status VARCHAR(50),
    FOREIGN KEY (UserID) REFERENCES User(UserID)
);

CREATE TABLE OrderItem (
    OrderItemID INT PRIMARY KEY AUTO_INCREMENT,
    OrderID INT,
    ProductID INT,
    Quantity INT NOT NULL,
    Subtotal DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (OrderID) REFERENCES `Order`(OrderID),
    FOREIGN KEY (ProductID) REFERENCES Product(ProductID)
);

CREATE TABLE Payment (
    PaymentID INT PRIMARY KEY AUTO_INCREMENT,
    OrderID INT,
    PaymentMethod VARCHAR(50),
    Amount DECIMAL(10,2) NOT NULL,
    PaymentDate DATETIME NOT NULL,
    Status VARCHAR(50),
    FOREIGN KEY (OrderID) REFERENCES `Order`(OrderID)
);
