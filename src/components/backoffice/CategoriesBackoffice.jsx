import { useEffect, useState } from 'react';
import { useCategoryStore } from '../../script/store';
import  CatégoriesCardBackoffice from './CatégoriesCardBackoffice'

function CategoriesBackoffice() {
    const fetchCategories = useCategoryStore(state => state.fetchCategories);
    const [categories, setCategories] = useState([]);



    
    useEffect(() => {
        const fetchData = async () => {
            const categoriesData = await fetchCategories();
            setCategories(categoriesData);
        };

        fetchData();
    }, []);

   





    return (
        <>
        <div>
            <div className="card-ressource-backoffice card-ressource-backoffice-header">
                <div>Nom</div>
            </div>          
            <main className="show-ressources-backoffice">
                {categories.map(category => (
                    <CatégoriesCardBackoffice key={category.id} category={category} />
                ))}
            </main>
        </div>
        </>
    ); 
}

export default CategoriesBackoffice;
