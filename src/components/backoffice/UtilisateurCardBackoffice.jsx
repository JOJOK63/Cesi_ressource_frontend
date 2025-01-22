import PropTypes from "prop-types";
import { useState } from 'react'
import { useResourceStore } from "../../script/store";
import apiService from '../../script/apiService';


function UtilisateurCardBackoffice({ user }) {
    
    const users = useResourceStore(state => state.user);
    const [selectedRole, setSelectedRole] = useState(user.role); // État sélectionné dans le menu déroulant
    const [selectedActif, setSelectedActif] = useState(Boolean(user.actif)); // Convertir en booléen
    const handleRoleChange = async (event) => {
        const newEtat = event.target.value;
        const updatedRole = { ...user, role: newEtat }; // Créer une copie de la ressource avec le nouvel état
        setSelectedRole(newEtat); // Mettre à jour l'état dans le state local

        try {
            // Vérifier si l'utilisateur est connecté
            if (users) {
                // Appel à l'API pour mettre à jour toute la ressource avec les nouvelles données et les informations de l'utilisateur
                await apiService.updateUser(updatedRole, users, user.id); // Passez le token d'authentification à la fonction
            } else {
                console.error('Utilisateur non connecté.');
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la ressource:', error);
        }
    };

    const handleActifChange = async (event) => {
        const newEtat = event.target.value;
        const updatedActif = { ...user, actif: newEtat }; // Créer une copie de la ressource avec le nouvel état
        setSelectedActif(newEtat); // Mettre à jour l'état dans le state local

        try {
            // Vérifier si l'utilisateur est connecté
            if (users) {
                // Appel à l'API pour mettre à jour toute la ressource avec les nouvelles données et les informations de l'utilisateur
                await apiService.updateUser(updatedActif, users, user.id); // Passez le token d'authentification à la fonction
            } else {
                console.error('Utilisateur non connecté.');
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la ressource:', error);
        }
    };


  console.log(user);

  return (
    <>
      <div className="card-ressource-backoffice card-ressource-action-backoffice-show card-ressource-backoffice-row" key={user.id}>
        <div>{user.firstName}</div>
        <div>{user.lastName}</div>
        <div>{user.email}</div>
        <div>
            <select value={selectedRole} onChange={handleRoleChange}>
                <option value="CITOYEN">CITOYEN</option>
                <option value="MODO">MODERATEUR</option>
                <option value="ADMIN">ADMINISTRATEUR</option>
                <option value="SUPER_ADMIN">SUPER-ADMINISTRATEUR</option>
            </select>
        </div>
        <div>
            <select value={selectedActif} onChange={handleActifChange}>
            <option value="true">Actif</option>
            <option value="false">Inactif</option>
            </select>
        </div>
      </div>
    </>
  );
}

UtilisateurCardBackoffice.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    actif: PropTypes.bool.isRequired, // Accepte booléen
    birthDate: PropTypes.string.isRequired,
  }).isRequired,
};

export default UtilisateurCardBackoffice;
