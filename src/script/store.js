import {create } from "zustand";
import apiService from "./apiService";
//permet de créer des selector qui rend plus simple l'appel des différents éléments du store
const createSelectors = (_store) => {
    let store = _store;
    store.use = {};
    for (let k of Object.keys(store.getState())) {
        store.use[k] = () => store((s) => s[k]);
    }
    return store;
};

export const useCategoryStore = createSelectors(create((set) => ({
  categories: [],

  fetchCategories: async () => {
    try {
      const response = await apiService.fetchCategories(); // Assure-toi d'avoir une fonction fetchCategories dans ton apiService
      if (response) {
        set({ categories: response.category });
        return response.category

      } else {
        console.error('Invalid data format for categories:', response);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  },
})));

export const useResourceStore = createSelectors(create((set) => ({
    resources: [],
    setRessources: (newResources) => set({ resources: newResources }),
    user:null,

    inscription: async (userDto) => {
      try {
        const response = await apiService.createUser(userDto);
      } catch (error) {
        console.error('Error logging in:', error);
      }
    },
 
    login: async (email, password) => {
      try {
       // console.log(email,password);
        const response = await apiService.connectUser(email, password);
        set({userDataLogin : response});
        
        if (typeof(response)  === 'object') {
          set({ user: response });
          localStorage.setItem('token', response.token);
        } else {
          console.error('Invalid data format:', response);
        }
      } catch (error) {
        console.error('Error logging in:', error);
      }
    },

    logout: async()=>{
      const response = await apiService.logoutUser();
      if(response == "success"){
        set({user:null});
        localStorage.removeItem('token', response.token);
      }else {
        console.error("Deconnection failed:");
      }
    },
  

    fetchData: async () => {
      try {
        const response = await apiService.fetchResources();
        console.log(response);
  
        if (response && response.resources && Array.isArray(response.resources)) {
          set({ resources: response.resources });
        } else {
          console.error('Invalid data format:', response);
        }
      } catch (error) {
        console.error('Error fetching resources:', error);
      }
    },
  })));

// Créez un store pour gérer les données des utilisateurs
export const useUserStore = create((set) => ({
  users: [],

  // Fonction pour charger les données des utilisateurs depuis l'API
  fetchData: async () => {
      try {
          const response = await apiService.fetchUsers();
          console.log("response", response);

          if (response && response.users && Array.isArray(response.users)) {
              set({ users: response.users });
          } else {
              console.error('Format de données invalide :', response);
          }
      } catch (error) {
          console.error('Erreur lors de la récupération des utilisateurs :', error);
      }
  },
}));


// Créez un store pour gérer les commentaires
export const useCommentairesStore = create((set) => ({
  commentaires: [],

  // Fonction pour charger les données des utilisateurs depuis l'API
  fetchData: async () => {
      try {
          const response = await apiService.fetchCommentaires();


          if (response) {
              set({ commentaires: response.commentaires });

              console.log(response)

              return response
            
          } else {
              console.error('Format de données invalide :', response);
          }
      } catch (error) {
          console.error('Erreur lors de la récupération des utilisateurs :', error);
      }
  },
}));