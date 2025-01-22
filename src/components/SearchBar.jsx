import {Input} from "./forms/Input";
import { Checkbox } from "./forms/Checkbox";
import '../style/searchbar.css'

export function SearchBar({search,onSearchChange}) {

  return <div className="searchbar">
    <div className="searchbar-content">
        <Input
            label = 'Rechercher :'
            value={search} 
            onChange={onSearchChange} 
            placeholder="votre recherche"/>
    </div>
  </div>
 
}
export default SearchBar;