import { useState } from 'react';
import '../../style/backoffice.css';
import { useResourceStore } from '../../script/store';
import ResourcesBackoffice from './ResourcesBackoffice';
import CategoriesBackoffice from './CategoriesBackoffice'; // Importez d'autres composants si nécessaire
import UtilisateurBackoffice from './UtilisateurBackoffice';
import CommentaireBackoffice from './CommentaireBackoffice';
import ComptesBackoffice from './ComptesBackoffice';
import StatistiquesBackoffice from './StatistiquesBackoffice';
import { NavLink } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

function Backoffice() {
    const [activeTab, setActiveTab] = useState('users'); // Définir 'users' comme onglet actif par défaut
    const user = useResourceStore(state => state.user);
    const logoutUser = useResourceStore(state => state.logout);

    if (!user) {
        return <Navigate to="/admin" replace />;
    } 



    const handleLogout = async () => {
        await logoutUser();
    };

    return (
        <div>
            <div className="container-backoffice">
                <div className="menu-backoffice">
                    <div className="div-boutons-backoffice">
                        <NavLink className={`boutons-backoffice ${activeTab === 'users' ? 'activef' : ''}`} onClick={() => setActiveTab('users')}>Utilisateurs</NavLink>

                        <NavLink className={`boutons-backoffice ${activeTab === 'commentaires' ? 'activef' : ''}`} onClick={() => setActiveTab('commentaires')}>Commentaires</NavLink>
                        
                        <NavLink className={`boutons-backoffice ${activeTab === 'categories' ? 'activef' : ''}`} onClick={() => setActiveTab('categories')}>Catégories</NavLink>
                        <NavLink className={`boutons-backoffice ${activeTab === 'resources' ? 'activef' : ''}`} onClick={() => setActiveTab('resources')}>Ressources</NavLink>
                        <NavLink className={`boutons-backoffice ${activeTab === 'createAccount' ? 'activef' : ''}`} onClick={() => setActiveTab('createAccount')}>Création compte</NavLink>
                        <NavLink className={`boutons-backoffice ${activeTab === 'statistics' ? 'activef' : ''}`} onClick={() => setActiveTab('statistics')}>Statistiques</NavLink>
                        
                        <NavLink className="boutons-backoffice bouton-deconnexion-backoffice" to='/' onClick={handleLogout}>Déconnexion</NavLink>
                    </div>
                </div>
                 <div className="zone-backoffice">
                    {activeTab === 'resources' && <ResourcesBackoffice />}
                    {activeTab === 'users' && <UtilisateurBackoffice />}
                    {activeTab === 'categories' && <CategoriesBackoffice />}
                    
                    {activeTab === 'commentaires' && <CommentaireBackoffice />}
                    {activeTab === 'createAccount' && <ComptesBackoffice />}
                    {activeTab === 'statistics' && <StatistiquesBackoffice />}
                    
                </div> 
            </div>
        </div>

        
    );
}

export default Backoffice;
