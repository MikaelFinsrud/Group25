import { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();

export function ProductProvider({ children }){
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCategoryID, setSelectedCategoryID] = useState([null]);

    useEffect(() => {
        async function fetchData(){
            try{
                const res = fetch('/api/products');
                const data = (await res).json();
                if (res.ok && data.success){
                    setCategories(data.categories);
                    setProducts(data.products);
                }
                else{
                    console.error("Fetch failed:", data.message);
                }
            } catch(err){
                console.error("Error fetching product data:", err);
            }
        }
        fetchData();
    }, []);

    return(
        <ProductContext.Provider value={{ categories, products, selectedCategoryID, setSelectedCategoryID }}>
            {children}
        </ProductContext.Provider>
    );
}

export function useProduct(){
    return useContext(ProductContext);
}