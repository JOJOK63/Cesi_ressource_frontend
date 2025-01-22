import React, { useState,useEffect } from 'react';
import Input from '../forms/Input';
import { useResourceStore } from '../../script/store';
import { Navigate, useNavigate } from 'react-router-dom';
import '../../style/connection.css'


function ConnexionAdmin() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loginStore = useResourceStore(state => state.login); 
  const user = useResourceStore(state => state.user);
  const navigate = useNavigate();
 
  const handleLogin = async () => {
    await loginStore(email, password);
  };

  useEffect(() => {
    // Vérifie si user est défini et effectue la redirection
    if (user) {
      console.log(user);
      if (user.role === "CITOYEN"){
        navigate("/connection");
        console.log("l'utilisateur n'a pas les droits");
        return;
      }
      navigate("/backoffice");
    }
  }, [user, history]);

  return (
    <>
    <div className='form-connection'>
      <Input 
        // label='Email : '
        placeholder="Email"
        value={email}
        onChange={setEmail}
      />
      <Input 
        // label='Mot de passe : '
        placeholder="Mot de passe"
        type="password"
        value={password}
        onChange={setPassword}
      />
      <button onClick={handleLogin}>
        Valider
      </button>
      </div>
    </>
  );
}

export default ConnexionAdmin;
