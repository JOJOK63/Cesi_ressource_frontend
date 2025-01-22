import PropTypes from "prop-types";



function CategorieCardBackoffice({ category }){

    

    return (
        <>
            <div className="card-ressource-backoffice card-ressource-action-backoffice-show card-ressource-backoffice-row" key={category.id}>
                <div>{category.category_name}</div>

            </div>



            
        </>
    ); 
}

CategorieCardBackoffice.propTypes = {
    category: PropTypes.shape({
      id: PropTypes.number.isRequired,
      category_name: PropTypes.string.isRequired,
    }).isRequired,
  };

export default CategorieCardBackoffice;