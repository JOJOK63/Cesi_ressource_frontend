import axios from "axios";
import { useResourceStore } from '../script/store';

const API_URL = 'http://localhost:8080/';


const apiService = {
  
  fetchResources: async () => {
    try {
      const response = await axios.get(`${API_URL}ressources`);
      return response.data;
    } catch (error) {
      console.error('Error fetching ressources:', error);
      throw error;
    }
  },

  fetchCategories: async () => {
    try {
      const response = await axios.get(`${API_URL}categories`);
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  fetchResourcesById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}ressources/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching ressources:', error);
      throw error;
    }
  },

  addRessource: async (user, ressource) => {
    try {
    //   const response = await axios.post(`${API_URL}ressources`, ressource, {
    //     headers: {
    //         Authorization: `Bearer ${user.token}` // Injecter le jeton dans l'en-tête Authorization
    //     }
    // });
     
    const config = {
        headers: {
            Authorization: `Bearer ${user.token}` // Injecter le jeton dans l'en-tête Authorization
        }

    };
    const response = await axios.post(`${API_URL}ressources`,ressource,config);

      return response.data;
    } catch (error) {
      console.error('Error adding ressources:', error);
      throw error;
    }
  },

  deleteResource: async (id,user) => {
    console.log("on passe dans le delete")
    try {

        // Créer un objet de configuration pour Axios
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}` // Injecter le jeton dans l'en-tête Authorization
            }
        };

        // Envoyer une requête DELETE avec les informations de l'utilisateur connecté et le jeton d'authentification
        await axios.delete(`${API_URL}ressources/${id}`, config);
    } catch (error) {
        console.error('Error deleting resource:', error);
        throw error;
    }
},

  updateResource: async ( newData,user,id) => {

    // Fonction pour mettre à jour une ressource avec de nouvelles données
    try {
      console.log("id " + id );
      console.log("data " + newData.title);
      console.log("user " + user.lastName );
      const config = {
        headers: {
            Authorization: `Bearer ${user.token}` // Injecter le jeton dans l'en-tête Authorization
        }
      };

    const response = await axios.put(`${API_URL}ressources/${id}`, newData, config);
      return response.data;
    } catch (error) {
      console.error('Error adding ressources:', error);
      throw error;
    }
  },

  updateUser: async ( newData,user,id) => {

    // Fonction pour mettre à jour une ressource avec de nouvelles données
    try {
      console.log("id " + id );
      console.log("data " + newData.role);
      console.log("data " + newData.actif);
      const config = {
        headers: {
            Authorization: `Bearer ${user.token}` // Injecter le jeton dans l'en-tête Authorization
        }
      };

    const response = await axios.put(`${API_URL}users/${id}`, newData, config);
      return response.data;
    } catch (error) {
      console.error('Error adding ressources:', error);
      throw error;
    }
  },


////////////////////////////////////////
/////////////////////    USER 

createUser: async (userDto) => {
  try {

  
    const response = await axios.post(`${API_URL}signup`, userDto);
    return response;
  } catch (error) {
    console.error('Error fetching ressources:', error);
    throw error;
  }
},

connectUser: async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}login`, { email, password });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error connecting user:', error);
    throw error;
  }
},


logoutUser: async () => {
  try {
    // Supprimer le token côté client (par exemple, depuis le stockage local)
    localStorage.removeItem('token'); // Supprimer le token du stockage local

    const response = await axios.get(`${API_URL}disconnect`);
    return response.data;
  } catch (error) {
    console.error('Error disconnect user:', error);
    throw error;
  }
},


showSession: async () => {
  try {
    const response = await axios.get(`${API_URL}session`);
    return response.data;
  } catch (error) {
    console.error('Error disconnect user:', error);
    throw error;
  }
},

fetchUsers: async () => {
  try {
      const response = await axios.get(`${API_URL}users`);
      return response.data;
  } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs :', error);
      throw error;
  }
},

///////////////////////////////////////////////
////// COMMENTAIRES

fetchCommentaires: async () => {
  try {
      const response = await axios.get(`${API_URL}commentary`);
      return response.data;
  } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs :', error);
      throw error;
  }
},

//USER Backoffice


// fetchResources: async () => {
//   try {
//     const response = await axios.get(`${API_URL}ressources`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching ressources:', error);
//     throw error;
//   }
// },

};
export default apiService;
