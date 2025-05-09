// CategoryButton.jsx
import './CategoryButton.css';

function CategoryButton({ name, onClick, isActive }) {
  return (
    <button
      className={`category-button ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      {name}
    </button>
  );
}

export default CategoryButton;
