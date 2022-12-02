import { useEffect, useState } from "react"

interface ToDo {
    id: number
    todo: string
}

function ListedToDos(): JSX.Element {
    const [toDoList, setToDoList] = useState<string[]>([])
    const [typedToDo, setTypedToDo] = useState<string>("")

    useEffect(() => {
        fetch("https://6389f8bfc5356b25a20e0c49.mockapi.io/todos")
            .then(response => response.json())
            .then((fetchedToDos: ToDo[]) => setToDoList([fetchedToDos[0].todo]));
    }, [])

    function handleToDoSubmission() {
        if (typedToDo !== "") {
            return setToDoList([...toDoList, typedToDo])
        }
    }

    return (
        <>
            <input type="text" placeholder="Enter To-Do"
                onChange={(e) => { setTypedToDo(e.target.value)}}></input>
            <button onClick={handleToDoSubmission}>Submit To-Do</button>
            <ul className="todoList">
                {toDoList.map(todo => {
                    if (toDoList.length > 0) {
                        return (<><input type="checkbox"></input><span>{todo}</span><hr /></>)
                    }
                })}
            </ul>
        </>
    )
}

export default ListedToDos