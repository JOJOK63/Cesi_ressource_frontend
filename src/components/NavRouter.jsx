import {createBrowserRouter,Route,Link, Outlet, RouterProvider, useRouteError, useNavigation,redirect} from 'react-router-dom'
import ResourceDetail from './ressources_component/ResourceDetail'
import Connection from './authentification/Connection';
import { NavLink } from 'react-router-dom';
import {Spinner} from './Spinner';
import {ResourceAdd} from './ressources_component/ResourceAdd'
import {Resources} from './ressources_component/Resources'
import SearchBar from './SearchBar';
import {About} from '../components/About';
import '../style/navbar.css'
import Logo from '../assets/Logo_Ressource.png'
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ResourceModification from './ressources_component/ResourceModification';
import { useResourceStore } from '../script/store';
import { useNavigate } from 'react-router-dom';
import  {Profil} from '../components/Profil'
import ConnexionAdmin from './backoffice/ConnexionAdmin';
import Backoffice from './backoffice/Backoffice';



export function NavRouter() {
    const router = createBrowserRouter([
        {
            path: '/',
            element:
                  <Root />,
            errorElement: <PageError />,
            children: [
                {
                    path: '', // Définir le chemin de la page d'accueil
                    element: <Resources />, // Déplacer le composant Resources ici
                },
                {
                    path: 'ressources',
                    element: (
                        <div>
                            <main>
                                <Outlet />
                            </main>
                        </div>
                    ),
                    children: [
                        {
                            path: '',
                            element: <Resources />,
                        },
                        {
                            path: 'detail/:id',
                            element: <ResourceDetail />,
                        },
                        {
                            path: ':id/modification',
                            element: <ResourceModification />,
                        },
                        {
                            path: 'add',
                            element: <ResourceAdd />,
                        },
                        {
                            path: 'search',
                            element: <SearchBar />,
                        },
                    ],
                },
                {
                    path: 'connection',
                    element: <Connection />,
                },
                {
                    path: 'profil',
                    element: <Profil />,
                },
                {
                    path: 'about',
                    element: <About />,
                },
                {
                    path: 'admin',
                    element: <ConnexionAdmin />,
                },
                {
                    path: 'backoffice',
                    element: <Backoffice />,
                    
                },
                {
                    path: 'logout',
                  },
                  
            ],
        },
    ]);

    function PageError() {
        const error = useRouteError();
        return (
            <>
                <h1>Une petite erreur a pop prenez en soin</h1>
                <p>{error?.error?.toString() ?? error?.toString()}</p>
            </>
        );
    }

    function Root() {
        const { state } = useNavigation();

        //permet de récupérer l'état du menu et de Set un nouvel etat si changement
        const [isMenuOpen, setIsMenuOpen] = useState(false);

        //représenter l'url actuel
        const location = useLocation();
        console.log(location)
        const userLogin = useResourceStore(state=>state.userDataLogin);
        const user = useResourceStore(state => state.user);
        const logoutStore= useResourceStore(state => state.logout); 
        const token = useResourceStore(state => state.token);  
        // Fonction pour gérer le clic sur le bouton burger et toggle le menu
        const toggleMenu = () => {
            setIsMenuOpen(!isMenuOpen);
        };

        // Vérifie si vous êtes dans le backoffice
        const isBackoffice = location.pathname.startsWith('/backoffice');



        const handleLogout = async () => {
            await logoutStore();
        };

        useEffect(() => {
            setIsMenuOpen(false);
        }, [location]);
     

        return (
            <>  
                <header className="navbar">
                        <div className="navbar-brand">
                            <NavLink to="/ressources">
                                <div className='navbar-logo'>
                                <img src={Logo} alt="logo" className="logo" />
                                </div>
                            </NavLink>
                        </div>
                    
                        <div className="burger-menu" onClick={() => {toggleMenu()}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24">
                                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6h18M3 12h18M3 18h18"/>
                            </svg>
                        </div>
                        {/* <nav className="nav-links"> */}
                        <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                            
                        {user && user.role === "ADMIN" && !isBackoffice ? <NavLink to="/backoffice">Dashboard</NavLink> : null}


                            
                            {!isBackoffice && <NavLink to="/ressources" activeClassName="active">Ressources</NavLink>}
                           
                            {!isBackoffice && user ? <NavLink to="/profil">Profil</NavLink> : null}
                            
                            {!isBackoffice && <NavLink to="/about">A propos</NavLink>}
                            {!isBackoffice && user ? (
                            <NavLink to="/" onClick={handleLogout}>Déconnexion</NavLink>
                            ) : !isBackoffice && (
                            <NavLink to="/connection">Connexion</NavLink>

                        )}
                        </nav>
                </header>
                <Outlet />
                
            </>
        );
    }

    return <RouterProvider router={router} />;
}

export default NavRouter;
