const pool = require('./database.js');

function createError(message, statusCode = 500){
    const err = new Error(message);
    err.statusCode = statusCode;
    console.error(message);
    return err;
}

async function getShoppingCart(userID, next){
    let conn;

    try {
        conn = await pool.getConnection();

        const rows = await conn.query("SELECT oi.* FROM OrderItems oi JOIN Orders o ON oi.OrderID = o.OrderID WHERE o.UserID = ? AND o.Status='Pending'", [userID]);
        return rows;
    }
    catch(err) {
        console.error("Something went wrong with fetching shopping cart: ", err.message);
        err.statusCode = 500;
        return next(err);
    }
    finally {
        if (conn) conn.release();
    }
}

async function addItemToCart(product, quantity, userID, next){
    let conn;

    try {
        conn = await pool.getConnection();

        const rows = await conn.query("SELECT * FROM Orders WHERE UserID = ? AND Status='Pending'", [userID]);
        const order = rows[0];

        if (!order){ //If no shopping cart exists, create one
            await conn.query(
                `INSERT INTO Orders (UserID) VALUES (?)`,
                [userID]
              );
            const rows = await conn.query("SELECT * FROM Orders WHERE UserID = ? AND Status='Pending'", [userID]);
            order = rows[0];
        }

        await conn.query(
            `INSERT INTO OrderItems (OrderID, ProductID, Quantity, Subtotal) VALUES (?, ?, ?, ?)`,
            [order.OrderID, product.productID, quantity, product.Price * quantity]
          );
    }
    catch(err) {
        console.error("Something went wrong with adding item to shopping cart: ", err.message);
        err.statusCode = 500;
        return next(err);
    }
    finally {
        if (conn) conn.release();
    }
}

async function changeItemQuantity(product, quantity, userID, next){
    let conn;

    try {
        conn = await pool.getConnection();

        const rows = await conn.query("SELECT * FROM Orders WHERE UserID = ? AND Status='Pending'", [userID]);
        const order = rows[0];

        if (!order){ //If no shopping cart exists, return error
            return next(createError("No shopping cart found", 400));
        }

        await conn.query(`UPDATE OrderItems 
            SET Quantity = ?, Subtotal = ?
            WHERE OrderID = ? AND ProductID = ?`, 
            [quantity, quantity * product.Price, order.OrderID, product.productID]);
    }
    catch(err) {
        console.error("Something went wrong with changing item quantity in shopping cart: ", err.message);
        err.statusCode = 500;
        return next(err);
    }
    finally {
        if (conn) conn.release();
    }
}

async function removeItem(product, userID, next){
    let conn;

    try {
        conn = await pool.getConnection();

        const rows = await conn.query("SELECT * FROM Orders WHERE UserID = ? AND Status='Pending'", [userID]);
        const order = rows[0];

        if (!order){ //If no shopping cart exists, return error
            return next(createError("No shopping cart found", 400));
        }

        await conn.query(
            `DELETE FROM OrderItems WHERE OrderID = ? AND ProductID = ?`,
            [order.OrderID, product.productID]
          );
    }
    catch(err) {
        console.error("Something went wrong with removing item from shopping cart: ", err.message);
        err.statusCode = 500;
        return next(err);
    }
    finally {
        if (conn) conn.release();
    }
}

module.exports = {
    createError,
    getShoppingCart,
    addItemToCart,
    changeItemQuantity,
    removeItem
};