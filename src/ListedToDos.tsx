import axios from "axios"
import { useEffect, useState } from "react"

interface ToDo {
    id: number
    body: string
}

function ListedToDos(): JSX.Element {
    const [toDoList, setToDoList] = useState<ToDo[]>([])
    const [typedToDo, setTypedToDo] = useState<string>("")

    async function fetchAndStoreToDos() {
        const fetchedToDoData = await axios.get("http://localhost:4000/todos")
        console.log(fetchedToDoData)
        const dataArr: ToDo[] = fetchedToDoData.data
        setToDoList(dataArr.map((toDoData) => {
            return toDoData
        }));
    }

    useEffect(() => {
        fetchAndStoreToDos()
    }, [])

    async function handleToDoSubmission() {
        if (typedToDo !== "") {
            // return setToDoList([...toDoList, typedToDo])
            const bodyString = JSON.stringify({ todo: typedToDo })
            await fetch("http://localhost:4000/todos", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: bodyString
            })
            fetchAndStoreToDos()
            // .then clear input field and tell suer it has been a success;
        }
    }

    return (
        <>
            <input type="text" placeholder="Enter To-Do"
                onChange={(e) => { setTypedToDo(e.target.value) }}></input>
            <button onClick={handleToDoSubmission}>Submit To-Do</button>
            <ul className="todoList">
                {toDoList.map((todo)  => {
                    if (toDoList.length > 0) {
                        return (
                            <>
                                <input type="checkbox"></input>
                                <li key={todo.id}>{todo.body}</li>
                                <hr />
                            </>
                        )
                    }
                    else return <span>There are currently no To-Do's!</span>
                })}
            </ul>
        </>
    )
}

export default ListedToDos