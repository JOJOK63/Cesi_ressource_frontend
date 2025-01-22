import { useParams, useNavigate } from "react-router-dom";
import { useResourceStore } from '../../script/store';
import apiService from "../../script/apiService";
import { useState, useEffect } from "react";
import '../../style/ressource_update.css'


export function ResourceModification() {
    const { id } = useParams();
    const navigateTo = useNavigate();
    const user = useResourceStore(state => state.user);
    const [resourceData, setResourceData] = useState(null);

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const result = await apiService.fetchResourcesById(id);
                const resourceData = result.resource;
                setResourceData(resourceData);
            } catch (error) {
                console.error('Erreur lors du chargement de la ressource:', error);
            }
        };
        fetchResources();
    }, [id]);

    if (!resourceData) {
        return <div>Ressource non trouvée</div>; 
    }


    const handleChange = (event) => {
        const { name, value } = event.target;
        setResourceData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleModify = async (event) => {
        event.preventDefault();
        try {
            await apiService.updateResource(resourceData,user ,id);
            navigateTo('/ressources');
        } catch (error) {
            console.error('Error modifying resource:', error);
        }
    }

    return (
        <div className="container-ressource-modification">
            <h1>Modifier la ressource</h1>
            <form onSubmit={handleModify}>
                <div className='ressource-add-form'>
                    <div>
                        <label htmlFor="title">titre</label>
                        <input type="text" id='title' name='title' placeholder='Saisir titre' value={resourceData.title} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="description">description</label>
                        <input type="text" id='description' name='description' placeholder='Saisir une description' value={resourceData.description} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="imgLink">lien de l'image</label>
                        <input type="text" id='imgLink' name='file' placeholder="Mettre lien de l'image" value={resourceData.file} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="startAt">Début de l'événement</label>
                        <input type="datetime-local" id='startAt' name='eventStart' value={resourceData.eventStart} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="finishAt">Fin de l'événement</label>
                        <input type="datetime-local" id='finishAt' name='eventEnd' value={resourceData.eventEnd} onChange={handleChange} />
                    </div>
                    <div>
                        <button>Modifier</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ResourceModification;
