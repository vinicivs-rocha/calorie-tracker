import styles from './update-meal.module.css';

export default function NameInput({ initialValue }: { initialValue: string }) {
  return (
    <input type='text' placeholder='Digite o nome da refeição' className={styles.nameInput} value={initialValue}/>
  )
}
