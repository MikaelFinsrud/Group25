import products from './products';
import ProductCard from './components/ProductCard';
import './App.css';

function App() {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default App;
