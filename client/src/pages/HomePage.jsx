// import products from '../testdata/products';
import { useProduct } from '../context/ProductContext'
import ProductCard from '../components/ProductCard';
import './HomePage.css';

function HomePage() {
  const { products, selectedCategoryID } = useProduct();

  const filteredProducts = selectedCategoryID ? products.filter(p => p.CategoryID === selectedCategoryID) : products;

  console.log("Filtered products:", filteredProducts);
  console.log("Selected category:", selectedCategoryID);

    return (
    <div className="product-grid">
      {filteredProducts.map((product) => (
        <ProductCard key={product.ProductID} product={product} />
      ))}
    </div>
  );
  
}

export default HomePage;