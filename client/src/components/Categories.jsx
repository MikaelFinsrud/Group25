import './Categories.css'
import { useState, useEffect } from 'react'
import CategoryButton from './CategoryButton'
// import categoryData from '../testdata/categories'

function Categories() {
    const [categories, setCategories] = useState([]);
    
    // Fetch categories on first render
    useEffect(() => {
        // setCategories(categoryData);     Test-data

        async function fetchCategories(){  
            try {
                const response = await fetch('/api/categories/categories');
                const data = await response.json();
                if (response.ok) {
                    setCategories[data];
                }
                else{
                    console.error("Failed to fetch categories:", data.message);
                }
            } catch (err){
                console.error("Error fetching categories;", err);
            }
        }
        fetchCategories();
    }, []);


    return(
        <>
            <div className="categories">
                {categories.map((cat) => (
                    <CategoryButton
                        key={cat.CategoryID}
                        name={cat.Name}
                        // TODO - Make onClick function fetch the specified products 
                        onClick={() => console.log("Clicked category: ", cat.CategoryID)}
                    />
                ))}
            </div>
        </>
    )
}

export default Categories;