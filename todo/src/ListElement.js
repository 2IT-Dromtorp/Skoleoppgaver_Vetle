import data from './todo.json';

const ListElement = ({name, description, isCompleted}) => {
    console.log(name, description, isCompleted);
    return(
        <div className="listelement">
            <h2>{name}</h2>
            <p>{description}</p>
            <input type='checkbox' defaultChecked={isCompleted}></input>
        </div>
    )
}
export default ListElement;