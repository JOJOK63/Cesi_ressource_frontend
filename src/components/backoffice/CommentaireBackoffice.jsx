import { useEffect, useState } from 'react';
import { useCommentairesStore } from "../../script/store";
import  CommentaireCardBackoffice from './CommentaireCardBackoffice'

  
function CommentaireBackoffice(/*images*/){
    //const commentaires = useCommentairesStore(state => state.commentaires);
    const fetchComentaire = useCommentairesStore(state => state.fetchData);
    const [commentaires, setcommentaires] = useState([]);




     useEffect(() => {
        const fetchData = async () => {
            const commentairesData = await fetchComentaire();
            setcommentaires(commentairesData);
        };

        fetchData();
    }, []);


    const handleClick = () => {
        console.log(commentaires);
    };



    return (
        <>
        <div className="card-ressource-backoffice card-ressource-backoffice-header">
            <div>Message</div>
            <div>Date</div>
            <div>Ressource</div>
            <div>Créateur</div>
            <div>Commentaire Parent</div>
        </div>  
        <main className="show-ressources-backoffice">
            {commentaires.map(commentaire => (
                <CommentaireCardBackoffice key={commentaire.id} commentaire={commentaire} /> // Passez l'utilisateur comme prop à UtilisateurCardBackoffice
            ))}
      </main>

<button onClick={handleClick}>Click me</button>
        </>


    );
}


export default CommentaireBackoffice;