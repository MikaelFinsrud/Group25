import { createContext, useState, useEffect, useContext} from 'react';

const CartContext = createContext();

export function CartProvider({ children }){
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart(prev => {
          const id = product.ProductID;
          return {
            ...prev,
            [id]: {
              product,
              quantity: prev[id] ? prev[id].quantity + 1 : 1
            }
          };
        });
      };
      
    const removeFromCart = (productID) => {
        setCart(prev => {
            const updated = { ...prev };
            if (updated[productID].quantity > 1) {
            updated[productID].quantity -= 1;
            } else {
            delete updated[productID];
            }
            return updated;
        });
    };
    
    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
          setCart(JSON.parse(storedCart));
        }
      }, []);
      
      useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
      }, [cart]);
      

    return(
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    return useContext(CartContext);
}