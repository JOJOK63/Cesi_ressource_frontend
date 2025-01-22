import '../../style/ressources.css';
import SearchBar from '../SearchBar';
import { NavLink } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { useResourceStore } from '../../script/store';
import RessourceCard from './RessourceCard';

  
export function Resources(/*images*/){
    const fetchResources = useResourceStore(state => state.fetchData); // Accédez à la fonction fetchData
    const resources = useResourceStore(state => state.resources); // Accédez à la liste des ressources
    const user = useResourceStore(state => state.user);

    useEffect(() => {
        fetchResources(); // Appelez fetchData au chargement du composant
    }, [fetchResources]);

    const [search, setSearch] = useState('');

    const visibleResources = resources.filter(resource =>
        resource.title.toLowerCase().includes(search.toLowerCase())
    );

    

    return (
        <>
          
            <SearchBar
                search={search}
                onSearchChange={setSearch}
            />
                <main className="show-ressources">
                {visibleResources.map((resource) => (
                    resource.etat === "ACCEPTED" && (
                       <RessourceCard
                        key={resource.id}
                        resource={resource}
                       ></RessourceCard>
                    )
                ))}
            </main>
            <NavLink  to="/ressources/add"><svg className='add-ressource-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(249,166,24,1)"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 11H7V13H11V17H13V13H17V11H13V7H11V11Z"></path></svg></NavLink>
        </>
    );

}

export default Resources;