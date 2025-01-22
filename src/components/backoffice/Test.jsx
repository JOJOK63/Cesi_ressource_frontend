import { useEffect } from "react";
import { useUserStore } from "../../script/store";

const Test = () => {
  const users = useUserStore(state => state.users);
  const fetchData = useUserStore(state => state.fetchData);

  useEffect(() => {
    fetchData(); // Appel à fetchData pour récupérer les utilisateurs lors du chargement du composant
  }, [fetchData]);

  return (
    <div>
      <h2>Liste des utilisateurs :</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.firstName} {user.lastName} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Test;
