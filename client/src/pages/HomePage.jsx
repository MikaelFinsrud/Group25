import products from '../testdata/products';
import ProductCard from '../components/ProductCard';
import './HomePage.css';

function HomePage() {
    return (
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  }

  export default HomePage;