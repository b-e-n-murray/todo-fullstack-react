import { useState } from "react"

function ListedToDos(): JSX.Element {
    const [toDoList, setToDoList] = useState<string[]>([])
    const [typedToDo, setTypedToDo] = useState<string>("")

    function handleToDoSubmission() {
        if (typedToDo !== "") {
            return setToDoList([...toDoList, typedToDo])
        }
    }
    return (
        <>
            <input type="text" placeholder="Enter To-Do"
                onChange={(e) => { setTypedToDo(e.target.value) }}></input>
            <button onClick={handleToDoSubmission}>Submit To-Do</button>
            <ul className="todoList">
                {toDoList.map(todo => {
                    if (toDoList.length > 0) {
                        return (<><input type="checkbox"></input><span>{todo}</span><hr/></>)
                    }
                })}
            </ul>
        </>
    )
}

export default ListedToDos