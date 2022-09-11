import React from 'react'
import styles from './TodoItem.module.css'
import { Trash } from 'phosphor-react'

interface TodoItemProps {
  id: string;
  title: string;
  done: boolean;
  ontoggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  id,
  title,
  done,
  onDelete,
  ontoggle,
}) => {
  const handleOnToggle = () => {
    ontoggle(id)
  }

  const handleOnDelete = () => {
    onDelete(id);
  }

  return (
    <li className={styles.listitem}>
      <label htmlFor={`list-item-${id}`}>
        <input
          type="checkbox"
          checked={done}
          id={`list-item-${id}`}
          className={styles.checkbox}
          onClick={handleOnToggle}
        />
        <span></span>

        <p>{title}</p>
      </label>

      <button className={styles.deleteButton} onClick={handleOnDelete}>
        <Trash />
      </button>
    </li>
  )
}