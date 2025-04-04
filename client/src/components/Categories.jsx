import './Categories.css'
import CategoryButton from './CategoryButton'
import { useProduct } from '../context/ProductContext'
// import categoryData from '../testdata/categories'

function Categories() {
    const { categories, setSelectedCategoryID } = useProduct();
    return(
        <>
            <div className="categories">
                {categories.map((cat) => (
                    <CategoryButton
                        key={cat.CategoryID}
                        name={cat.Name}
                        // TODO - Make onClick function filter by selected category 
                        onClick={() => setSelectedCategoryID(cat.CategoryID)}
                    />
                ))}
            </div>
        </>
    )
}

export default Categories;