import { useParams, useNavigate, NavLink } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import '../../style/ressource_details.css';
import { useResourceStore } from '../../script/store';
import axios from "axios";
import apiService from "../../script/apiService";



export function ResourceDetail() {
    const {id} = useParams();
    const user = useResourceStore(state => state.user);
    const [resource, setResource] = useState(null); // Utilise useState pour déclarer resource
    const navigateTo = useNavigate();
    
    useEffect(() => {
        const fetchResources = async () => {
            try {
                const result = await apiService.fetchResourcesById(id);
                const resourceData = result.resource;
                console.log("Ressources chargées :", resourceData);
                setResource(resourceData); // Met à jour la valeur de resource avec les données récupérées
            } catch (error) {
                console.error("Erreur lors du chargement du détail de la ressource :", error);
            }
        };

        fetchResources();
    }, []);



    if (!resource) {
        return <div>Ressource non trouvée</div>; 
    }

    const handleDelete = async () => {
        try {
            await apiService.deleteResource(id,user)
            navigateTo('/ressources');
        } catch (error) {
            console.error('Error deleting resource:', error);
            // Gérer les erreurs de suppression ici (par exemple, afficher un message d'erreur à l'utilisateur)
        }
    };

   // Vérifie si l'utilisateur est l'auteur de la ressource
   const isAuthor = user && user.id === resource.utilisateur.id;
       
    return (
        <>
            <main className="show-ressource-detail">
                <div className="card-ressource-detail">
                    <div className='card-ressource-informations-detail'>
                        <div>
                            <img src={resource.file}  alt={resource.title} />
                        </div>
                        <div>
                            <h2>{resource.title}</h2>
                            <p>{resource.description}</p>
                        </div>
                    </div>
                    <div className='card-ressource-metadata-detail'>
                        <div>
                            <span>Publié le:</span>
                            <p>{new Date(resource.creationDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <span>Date de début :</span>
                            <p>{new Date(resource.eventStart).toLocaleString()}</p> 
                        </div>
                        <div>
                            <span>Date de fin :</span>
                            <p>{new Date(resource.eventEnd).toLocaleString()}</p>
                        </div>
                        {/* <div>
                            <span>Statut :</span>
                            <p>{resource.statut}</p> 
                        </div> */}
                    </div>
                    {/* Affiche la partie action seulement si l'utilisateur est l'auteur */}
                    {isAuthor && (
                        <div className='card-ressource-action-detail'>
                            <div>
                            <NavLink to={`/ressources/${id}/modification`}>
                                <button className="modification">
                                    Modifier
                                </button>
                            </NavLink>
                            </div>
                            <div className="delete">
                                <button onClick={() => handleDelete(resource.id)}>Supprimer</button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}

export default ResourceDetail;
