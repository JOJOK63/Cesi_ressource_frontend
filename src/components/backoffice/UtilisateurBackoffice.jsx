import { useEffect } from "react";
import { useUserStore } from "../../script/store";
import UtilisateurCardBackoffice from "./UtilisateurCardBackoffice"; // Importez le composant UtilisateurCardBackoffice

const UtilisateurBackoffice = () => {
  const users = useUserStore(state => state.users);
  const fetchData = useUserStore(state => state.fetchData);

  useEffect(() => {
    fetchData(); // Appel à fetchData pour récupérer les utilisateurs lors du chargement du composant
  }, [fetchData]);
  

  return (
    <>
      <div className="card-ressource-backoffice card-ressource-backoffice-header">
        <div>Prénom</div>
        <div>Nom</div>
        <div>Email</div>
        <div>Rôle</div>
        <div>Status</div>
      </div>

      <main className="show-ressources-backoffice">
        {users.map(user => (
          <UtilisateurCardBackoffice key={user.id} user={user} /> // Passez l'utilisateur comme prop à UtilisateurCardBackoffice
        ))}
      </main>
    </>
  );
};

export default UtilisateurBackoffice;
