import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";


const { VITE_APP_HOST } = import.meta.env;

const Todo = ({ userName, setToken, token, isLogin, setIsLogin}) => {
  const navigate = useNavigate() // 把 hook 取出來做使用

  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [todoEdit, setTodoEdit] = useState({})

  useEffect(() => {
    getTodos();
  }, [token])

  const getTodos = async () => {
    try {
      const res = await axios.get(`${VITE_APP_HOST}/todos/`, {
        headers: {
          authorization: token
        }
      })
      console.log(res)
      setTodos(res.data.data)
    } catch (error) {
      console.log(error.message);
    }
  }
  const addTodo = async () => {
    if (!newTodo) return
    const todo = {
      content: newTodo
    }
    await axios.post(`${VITE_APP_HOST}/todos`, todo, {
      headers: {
        authorization: token
      }
    })
    setNewTodo('')
    getTodos()
  }

  const deleteTodo = async (id) => {
    await axios.delete(`${VITE_APP_HOST}/todos/${id}`, {
      headers: {
        authorization: token
      }
    })
    getTodos()
  }

  const updateTodo = async (id) => {
    const todo = todos.find((todo) => todo.id === id)
    todo.content = todoEdit[id];
    await axios.put(`${VITE_APP_HOST}/todos/${id}`, todo, {
      headers: {
        authorization: token
      }
    })
    getTodos()
    setTodoEdit({
      ...todoEdit,
      [id]: ''
    })
  }

  const toggleStatus = async (id) => {
    await axios.patch(`${VITE_APP_HOST}/todos/${id}/toggle`, {},
      {
        headers: {
          authorization: token
        }
      }
    )
    getTodos()

  }

  

  //登出
  const signOut = () => {
    axios.post(`${VITE_APP_HOST}/users/sign_out`, {},
      {
        headers: {
          Authorization: token,
        }
      }
    ).then(response => {
      console.log(response);
      setIsLogin(false);
      alert(response.data.message);
      navigate('/')
    }).catch((error) => {
      console.log(error);
      alert(error.response.data.message);
    });
  };



  return (
    isLogin ? (
      <div id="todoListPage" className="bg-half">
        <nav>
          <h1>ONLINE TODO LIST</h1>
          <ul>
            <li className="todo_sm"><span>{userName}的代辦</span></li>
            <li><button onClick={signOut}>登出</button></li>
          </ul>
        </nav>

        <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder="New Todo" />
        <button onClick={addTodo}>Add Todo</button>
        <ul>
          {todos.map((item) => {
            return (
              <li key={item.id}>
                {item.content} {item.status ? '完成' : '未完成'} | {todoEdit[item.id]}
                <input type="text" placeholder="更新值" onChange={(e) => {
                  const newTodoEdit = { ...todoEdit };
                  newTodoEdit[item.id] = e.target.value;
                  setTodoEdit(newTodoEdit);
                }} />
                <button onClick={() => deleteTodo(item.id)}>Delete</button>
                <button onClick={() => updateTodo(item.id)}>Update</button>
                <button onClick={() => toggleStatus(item.id)}>Toggle Status</button>
              </li>
            );
          })}
        </ul>
      </div>
    ) : '請先登入'
  );

}

export default Todo