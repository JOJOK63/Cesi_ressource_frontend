import PropTypes from "prop-types";



function CommentaireCardBackoffice({ commentaire }){

    

    return (
        <>
            <div className="card-ressource-backoffice card-ressource-action-backoffice-show card-ressource-backoffice-row" key={commentaire.id}>
                <div>{commentaire.contenu}</div>
                <div>{new Date(commentaire.date).toLocaleDateString()}</div>
                <div><p>{commentaire.ressource.title}</p></div> 
                <div><p>{commentaire.utilisateur.email}</p></div>
   
                <div><p>{commentaire.parentComment?.contenu || "N/A"}</p></div>

            </div>



            
        </>
    ); 
}

CommentaireCardBackoffice.propTypes = {
    commentaire: PropTypes.shape({
        id: PropTypes.number.isRequired,
        contenu: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        ressource: PropTypes.shape({
            title: PropTypes.string.isRequired,
            }).isRequired,
        utilisateur: PropTypes.shape({
            email: PropTypes.string.isRequired,
            }).isRequired,
        parentComment: PropTypes.string.isRequired,
    }).isRequired,
};
  
export default CommentaireCardBackoffice;