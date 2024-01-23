import styles from './update-meal.module.css';
import Select from './select';

export default function Food({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={styles.food}>
    <Select />
    {children}
  </div>;
}
