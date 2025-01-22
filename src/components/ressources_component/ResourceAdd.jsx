import { useParams, useNavigate } from "react-router-dom";
import { useResourceStore } from '../../script/store';
import apiService from "../../script/apiService";
import { Navigate } from "react-router-dom";
import '../../style/ressource_add.css'
export function ResourceAdd() {
    const user = useResourceStore(state => state.user);
    const navigateTo = useNavigate();
   //Si aucun utilisateur n'est connecté, rediriger vers la page de connexion
   if (!user) {
    return <Navigate to="/connection" replace />;
} 
    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;


        // Créer un objet ressource avec les valeurs des champs de formulaire
        const ressource = {
            title: form.title.value,
            description: form.description.value,
            file: form.imgLink.value,
            eventStart: form.startAt.value,
            eventEnd: form.finishAt.value,
        };

        try {
            await apiService.addRessource(user, ressource);
            // Naviguer vers la page des ressources après l'ajout réussi
            navigateTo('/ressources');
            console.log(ressource)
        } catch (error) {
            console.error('Error add resource:', error);
            // Gérer les erreurs ici (par exemple, afficher un message d'erreur à l'utilisateur)
        }
    }
 

    // Si l'utilisateur est connecté, afficher la page de création de ressource
    return (
        <div className="container-ressource-add">
            <h1>AJOUTER UNE RESSOURCE</h1>
        <form onSubmit={handleSubmit}>
        <div className='ressource-add-form'>
            <div>
                <label htmlFor="title">titre</label>
                <input type="text" id='title' name='title' placeholder='Saisir titre' />
            </div>
            <div>
                <label htmlFor="description">description</label>
                <input type="text" id='description' name='description' placeholder='Saisir une description' />
            </div> 
            <div>
                <label htmlFor="imgLink">lien de l'image</label>
                <input type="text" id='imgLink' name='imgLink' placeholder="Mettre lien de l'image" />
            </div>
            <div>
                <label htmlFor="startAt">Début de l'événement</label>
                <input type="datetime-local" id='startAt' name='startAt' />
            </div> 
            <div>
                <label htmlFor="finishAt">Fin de l'événement</label>
                <input type="datetime-local" id='finishAt' name='finishAt' />
            </div> 
            <div>
                <button>Envoyer</button>
            </div>
        </div>
      
    </form>
    </div>
    );
}

export default ResourceAdd;