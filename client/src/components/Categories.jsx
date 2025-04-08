import './Categories.css'
import CategoryButton from './CategoryButton'
import { useProduct } from '../context/ProductContext'
import { useNavigate } from 'react-router-dom';
// import categoryData from '../testdata/categories'

function Categories() {
    const { categories, setSelectedCategoryID } = useProduct();
    const navigate = useNavigate();
    return(
        <>
            <div className="categories">
                {categories.map((cat) => (
                    <CategoryButton
                        key={cat.CategoryID}
                        name={cat.Name}
                        onClick={() => {
                            setSelectedCategoryID(cat.CategoryID);
                            navigate('/');
                        }}
                    />
                ))}
            </div>
        </>
    )
}

export default Categories;