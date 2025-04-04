import './CategoryButton.css';

function CategoryButton({ name, onClick }){
    return(
        <button className="category-button" onClick={onClick}>
            {name}
        </button>
    );
}

export default CategoryButton;