import '../../style/ressources.css';
import SearchBar from '../SearchBar';
import { NavLink } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { useResourceStore } from '../../script/store';
import RessourceCardBackoffice from './RessourceCardBackoffice';

  
function StatistiquesBackoffice(/*images*/){
    
    return (
        <>
        <div>
            <h1>Statistiques</h1>
        </div>   
        </>
    );
}


export default StatistiquesBackoffice;