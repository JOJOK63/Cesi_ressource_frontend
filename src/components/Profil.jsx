import { useResourceStore } from '../script/store';
import apiService from "../script/apiService";
import { useEffect, useState } from 'react';


export function Profil(){

    const [profilData, setProfilData] = useState(null);

    useEffect(() => {
        const getProfil = async () => {
            try {
                const data = await apiService.showSession();
                setProfilData(data);
            } catch (error) {
                console.error('Error fetching profile:', error);
                // Vous pouvez gérer les erreurs ici, par exemple afficher un message d'erreur à l'utilisateur
            }
        };

        getProfil();
    }, []);

    console.log(profilData);

    return (
        <div style={{ marginTop: '80px' }}>
                {profilData ? (
                <div>
                    {/* Afficher les données du profil */}
                    <p>Nom: {profilData.name}</p>
                    <p>Email: {profilData.email}</p>
                    {/* Ajoutez d'autres champs de profil selon vos besoins */}
                </div>
            ) : (
                <h1>Bienvenue sur la page profil</h1>
            )}
        </div>
    );
}

export default Profil;