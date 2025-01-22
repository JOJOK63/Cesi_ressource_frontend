import React, { useState,useEffect } from 'react';
import Input from '../forms/Input';
import { useResourceStore } from '../../script/store';
import { Navigate, useNavigate } from 'react-router-dom';
import '../../style/connection.css'
function Connection() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthDate, setbirthDate] = useState('');
  const [first_name, setfirst_name] = useState('');
  const [last_name, setlast_name] = useState('');

  const userDto = {
    lastName: last_name,
    firstName: first_name,
    birthDate: birthDate,
    email: email,
    password: password
  };

  const [isLoginForm, setIsLoginForm] = useState(true); // Nouvel état pour gérer l'affichage des formulaires
  const [inscriptionSuccess, setInscriptionSuccess] = useState(false);
  const loginStore = useResourceStore(state => state.login);
  const user = useResourceStore(state => state.user);
  const createUser = useResourceStore(state => state.inscription)
  const navigate = useNavigate();
 
  const handleLogin = async () => {
    await loginStore(email, password);
  };

  const handleInscr = async () => {
    try {
      await createUser(userDto);
      setInscriptionSuccess(true); // Mettre à jour l'état si l'inscription est réussie
      setIsLoginForm(true)
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  useEffect(() => {
    // Vérifie si user est défini et effectue la redirection
    if (user) {
      console.log(user);
      navigate("/ressources");
    }

      // Réinitialiser l'état lors du démontage du composant
  return () => {
    setInscriptionSuccess(false);
  }; 
  }, [user, history]);

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  return (
    <>
{inscriptionSuccess && (
      <div style={{ color: 'green' }}>Compte correctement créé !</div>
    )}
      <div className='form-connection'>
        <Input
          placeholder="Email"
          value={email}
          onChange={setEmail}
        />
        <Input
          placeholder="Mot de passe"
          value={password}
          onChange={setPassword}
          type="password"
        />
        <button onClick={handleLogin}>
          Valider
        </button>
        <button onClick={toggleForm}> {/* Bouton pour basculer entre le formulaire de connexion et celui d'inscription */}
          {isLoginForm ? 'S\'inscrire' : 'Se connecter'}
        </button>
      </div>
      {!isLoginForm && ( /* Affichage du formulaire d'inscription si isLoginForm est false */
        <div className='form-connection'>
          <Input
            placeholder="Last name"
            value={last_name}
            onChange={setlast_name}
          />
          <Input
            placeholder="First name"
            value={first_name}
            onChange={setfirst_name}
          />
          <input
            placeholder="Date de Naissance"
            type="date"
            value={birthDate}
            onChange={e => setbirthDate(e.target.value)}  
          />
          <Input
            placeholder="Email"
            value={email}
            onChange={setEmail}
          />
          <Input
            placeholder="Mot de passe"
            value={password}
            onChange={setPassword}
            type="password"
          />
          <button onClick={handleInscr}>
            Valider
          </button>
          <button onClick={toggleForm}> {/* Bouton pour basculer entre le formulaire de connexion et celui d'inscription */}
            {isLoginForm ? 'S\'inscrire' : 'Se connecter'}
          </button>

        </div>
      )}


    </>
  );
}

export default Connection;
