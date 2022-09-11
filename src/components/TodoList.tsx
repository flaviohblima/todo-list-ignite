import styles from './TodoList.module.css'
import { PlusCircle } from 'phosphor-react'
import clipboard from '../assets/clipboard.svg'
import { TodoItem } from './TodoItem'
import { useState } from 'react'
import { v4 as uuid } from 'uuid'

interface ITodo {
  id: string;
  title: string;
  done: boolean;
}

export const TodoList = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [todoTitle, setTodoTitle] = useState('');

  const isTodoTitleEmpty = todoTitle.trim().length === 0

  const numberOfDoneTodos = todos.reduce((total, todo) => {
    if (todo.done) {
      return total + 1
    }
    return total
  }, 0)

  const doneTodosTextIndicator = todos.length === 0
    ? '0'
    : `${numberOfDoneTodos} de ${todos.length}`

  const handleChangeTodoTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.setCustomValidity('');
    setTodoTitle(event.target.value)
  }

  const handleTodoTitleInvalid = (event: React.InvalidEvent<HTMLInputElement>) => {
    event.target.setCustomValidity('Este campo é obrigatório!');
  }

  const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isTodoTitleEmpty) {
      return
    }

    const todo = {
      id: uuid(),
      title: todoTitle,
      done: false,
    }
    setTodos(oldTodos => [...oldTodos, todo])
    setTodoTitle('')
  }

  const handleDeleteTodoItem = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const handleToggleTodoItem = (id: string) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, done: !todo.done }
      }
      return todo
    }))
  }

  return (
    <main className={styles.main}>
      <form onSubmit={handleAddTodo}>
        <input
          placeholder='Adicione uma nova tarefa'
          value={todoTitle}
          onChange={handleChangeTodoTitle}
          onInvalid={handleTodoTitleInvalid}
          required
        />
        <button type="submit" disabled={isTodoTitleEmpty}>
          Criar <PlusCircle size={16} />
        </button>
      </form>


      <header className={styles.header}>
        <p>Tarefas criadas
          <span>{todos.length}</span>
        </p>
        <p>Concluídas
          <span>{doneTodosTextIndicator}</span>
        </p>
      </header>

      <ul className={styles.list}>
        {todos.length > 0
          ? todos.map((todo) => (
            <TodoItem
              key={todo.id}
              {...todo}
              onDelete={handleDeleteTodoItem}
              ontoggle={handleToggleTodoItem}
            />
          ))
          : (
            <div className={styles.emptylist}>
              <img src={clipboard} alt="Ícone de clipboard" />
              <p>Você ainda não tem tarefas cadastradas</p>
              <p>Crie tarefar e organize seus itens a fazer</p>
            </div>
          )}
      </ul>
    </main>
  )
}