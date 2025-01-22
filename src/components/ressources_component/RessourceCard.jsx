import { NavLink } from 'react-router-dom';
import '../../style/ressources.css';
import PropTypes from 'prop-types'; // Importez PropTypes depuis la bibliothèque prop-types
export function RessourceCard({resource}){
    return <>
         <div className="card-ressource"
           key={resource.id}
          >
                        <div className='card-ressource-informations'>
                            <div className='card-ressource-informations-div-img'>
                                <img src={resource.file} alt={resource.title} />
                            </div>
                            <div>
                                <h2>{resource.title}</h2>
                                <p>
                                    {resource.description}
                                </p>
                            </div>
                        </div>
                        <div className='card-ressource-action'>
                            <div>
                                <NavLink to={`/ressources/detail/${resource.id}`}>
                                    <button>Détails</button>
                                </NavLink>
                            </div>
                        </div>
                    </div>
    </>
}
// Définissez les propTypes pour le composant RessourceCard
RessourceCard.propTypes = {
    resource: PropTypes.shape({
        id: PropTypes.number.isRequired,
        file: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    }).isRequired
};
export default RessourceCard;