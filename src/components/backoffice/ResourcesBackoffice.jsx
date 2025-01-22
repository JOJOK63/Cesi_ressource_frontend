import '../../style/ressources.css';
import { useEffect } from 'react';
import { useResourceStore } from '../../script/store';
import RessourceCardBackoffice from './RessourceCardBackoffice';

  
function ResourcesBackoffice(/*images*/){
    const fetchResources = useResourceStore(state => state.fetchData); // Accédez à la fonction fetchData
    const resources = useResourceStore(state => state.resources); // Accédez à la liste des ressources

    useEffect(() => {
        fetchResources(); // Appelez fetchData au chargement du composant
    }, [fetchResources]);

    return (
        <>
            {/* Entête fixe */}
            <div className="card-ressource-backoffice card-ressource-backoffice-header">
                <div>Titre</div>
                <div>Date de création</div>
                <div>Utilisateur</div>
                <div>Statut</div>
                <div>Action</div>
            </div>

            {/* Liste des ressources avec zone de défilement */}
            <main className="show-ressources-backoffice">
                {resources.map((resource) => (
                    <RessourceCardBackoffice
                        key={resource.id}
                        resource={resource}
                    />
                ))}
            </main>
        </>
    );
}


export default ResourcesBackoffice;