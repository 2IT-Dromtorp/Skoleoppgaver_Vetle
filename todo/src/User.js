import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const User = () => {
    const params = useParams();
    const [availableLists, setAvailableLists] = useState([])
    const [todoLists, setTodoLists] = useState([])

    useEffect(() => {
        fetch(encodeURI(`/availablelists?user=${params.user}`), {
            method: "get"
        })
        .then((res) => res.json())
        .then((data) => {setAvailableLists(data);setTodoLists([])})
        .catch((error) => console.error("Error fetching data:", error))
    }, [params])

    useEffect(() => {
        async function FetchData() {
            console.log(availableLists)
            for (let i in availableLists) {
                await fetch(encodeURI(`/api/todo/name?id=${availableLists[i]}`), {
                    method: "get",
                    })
                    .then((res) => res.json())
                    .then((data) => {setTodoLists([...todoLists, data])})
                    .catch((error) => console.error("Error fetching data:", error))
            }
        }
        FetchData()
    }, [availableLists]);

    return(
        <>
            <h1>{params.user}</h1>
            <ul>
                {todoLists.map((todoList, index) => {
                    console.log(todoList)
                    return (<li key={index}>{todoList.name}</li>)
                })}
            </ul>
        </>
    )
}
export default User
