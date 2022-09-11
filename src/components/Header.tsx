import styles from './Header.module.css'
import rocketLogo from '../assets/rocket.svg'

export const Header = () => {
  return (
    <header className={styles.header}>
      <img src={rocketLogo} alt="Logotipo do TodoList" />
      <h1>to<span>do</span></h1>
    </header>
  )
}