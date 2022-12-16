import axios from "axios";
import { useEffect, useState } from "react";

interface ToDo {
  id: number;
  body: string;
}

function ListedToDos(): JSX.Element {
  const [toDoList, setToDoList] = useState<ToDo[]>([]);
  const [typedToDo, setTypedToDo] = useState<string>("");

  async function fetchAndStoreToDos() {
    const fetchedToDoData = await axios.get("http://localhost:4000/todos");
    console.log(fetchedToDoData);
    const dataArr: ToDo[] = fetchedToDoData.data;
    setToDoList(
      dataArr.map((toDoData) => {
        return toDoData;
      })
    );
  }

  useEffect(() => {
    fetchAndStoreToDos();
  }, []);

  async function handleToDoSubmission() {
    if (typedToDo !== "") {
      console.log("trying to post: ", typedToDo);
      const newToDoEntry: ToDo = { id: toDoList.length + 1, body: typedToDo };
      await axios.post("http://localhost:4000/todos", newToDoEntry);
      fetchAndStoreToDos();
    }
  }

  async function handleDeleteRequest(id: number) {
    console.log("deleting todo of id ", id);
    await axios.delete(`http://localhost:4000/todos/${id}`);
    fetchAndStoreToDos();
  }

  return (
    <>
      <input
        type="text"
        placeholder="Enter To-Do"
        onChange={(e) => {
          setTypedToDo(e.target.value);
        }}
      ></input>
      <button onClick={handleToDoSubmission}>Submit To-Do</button>
      <table>
        <tbody className="todoList">
          {toDoList.map((todo) => {
            return (
              <tr key={todo.id}>
                <td className="todoBod">{todo.body}</td>
                <td>
                  <input type="checkbox" className="todoBox"></input>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteRequest(todo.id)}
                    className="delbtn"
                  >
                    Delete To-Do
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default ListedToDos;
