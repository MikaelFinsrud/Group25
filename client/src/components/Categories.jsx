import './Categories.css'
import CategoryButton from './CategoryButton'
import { useProduct } from '../context/ProductContext'
// import categoryData from '../testdata/categories'

function Categories() {
    const { categories } = useProduct();
    return(
        <>
            <div className="categories">
                {categories.map((cat) => (
                    <CategoryButton
                        key={cat.CategoryID}
                        name={cat.Name}
                        // TODO - Make onClick function filter by selected category 
                        onClick={() => console.log("Clicked category: ", cat.CategoryID)}
                    />
                ))}
            </div>
        </>
    )
}

export default Categories;