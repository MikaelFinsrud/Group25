import { useProduct } from '../context/ProductContext'
import ProductCard from '../components/ProductCard';
import { useEffect, useState } from 'react';
import './HomePage.css';

function HomePage() {
  const { products, selectedCategoryID, searchQuery } = useProduct();
  const [cart, setCart] = useState([]);

    
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch('/api/cart', { credentials: 'include' });
        const data = await res.json();
        if (res.ok && data.success) {
          setCart(data.cart);
        } else {
          console.error('Failed to load cart:', data.message);
        }
      } catch (err) {
        console.error('Error fetching cart:', err.message);
      }
    };

    fetchCart();
  }, []);

  const filteredProducts = products
  .filter(p => !selectedCategoryID || p.CategoryID === selectedCategoryID)
  .filter(p => p.Name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="product-grid">
      {filteredProducts.map((product) => (
        <ProductCard key={product.ProductID} product={product} cart={cart} />
      ))}
    </div>
  );
}

export default HomePage;
