// import products from '../testdata/products';
import { useProduct } from '../context/ProductContext'
import ProductCard from '../components/ProductCard';
import './HomePage.css';

function HomePage() {
  const { products } = useProduct();
    return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default HomePage;