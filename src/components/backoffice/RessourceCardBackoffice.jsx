import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../../style/ressources_backoffice.css'
import PropTypes from 'prop-types';
import apiService from '../../script/apiService';
import { useResourceStore } from '../../script/store';

function RessourceCardBackoffice({ resource }) {

    const user = useResourceStore(state => state.user);
    const [selectedEtat, setSelectedEtat] = useState(resource.etat); // État sélectionné dans le menu déroulant
    const handleEtatChange = async (event) => {
        const newEtat = event.target.value;
        const updatedResource = { ...resource, etat: newEtat }; // Créer une copie de la ressource avec le nouvel état
        setSelectedEtat(newEtat); // Mettre à jour l'état dans le state local

        try {
            // Vérifier si l'utilisateur est connecté
            if (user) {
                // Appel à l'API pour mettre à jour toute la ressource avec les nouvelles données et les informations de l'utilisateur
                await apiService.updateResource(updatedResource, user, resource.id); // Passez le token d'authentification à la fonction
            } else {
                console.error('Utilisateur non connecté.');
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la ressource:', error);
        }
    };

    return (
        <div className="card-ressource-backoffice card-ressource-action-backoffice-show card-ressource-backoffice-row" key={resource.id}>
            <div>{resource.title}</div>
            <div>{new Date(resource.creationDate).toLocaleDateString()}</div>
            <div>{resource.utilisateur.firstName} {resource.utilisateur.lastName}</div>
            {/* Menu déroulant pour sélectionner l'état */}
            <div>
                <select value={selectedEtat} onChange={handleEtatChange}>
                    <option value="WAIT">WAIT</option>
                    <option value="ACCEPTED">ACCEPTED</option>
                    <option value="REJECTED">REJECTED</option>
                </select>
            </div>
            <div>
                <NavLink to={`/ressources/detail/${resource.id}`}>
                    <button>Détails</button>
                </NavLink>
            </div>
        </div>
    );
}

RessourceCardBackoffice.propTypes = {
    resource: PropTypes.shape({
        id: PropTypes.number.isRequired,
        file: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        creationDate: PropTypes.string.isRequired,
        utilisateur: PropTypes.shape({
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired,
        }).isRequired,
        etat: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    }).isRequired
};

export default RessourceCardBackoffice;
