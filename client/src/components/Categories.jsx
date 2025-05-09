import './Categories.css';
import CategoryButton from './CategoryButton';
import { useProduct } from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';

function Categories() {
  const { categories, selectedCategoryID, setSelectedCategoryID } = useProduct();
  const navigate = useNavigate();

  const handleCategoryClick = (catID) => {
    setSelectedCategoryID(prev =>
      prev === catID ? null : catID
    );
    navigate('/');
  };

  return (
    <div className="categories">
      {categories.map(cat => (
        <CategoryButton
          key={cat.CategoryID}
          name={cat.Name}
          onClick={() => handleCategoryClick(cat.CategoryID)}
          isActive={selectedCategoryID === cat.CategoryID}
        />
      ))}
    </div>
  );
}

export default Categories;