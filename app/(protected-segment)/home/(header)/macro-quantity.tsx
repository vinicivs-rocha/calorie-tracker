import React from 'react'
import styles from './header.module.css'

export default function MacroQuantity({ name, quantity }: { name: string, quantity: number }) {
  function formatName(name: string) {
    switch (name) {
      case 'carbo':
        return 'Carboidratos'
      case 'protein':
        return 'Proteínas'
      case 'fat':
        return 'Gorduras'
      default:
        return 'Sem dados'
    }
  }
  return (
    <div className={styles.macrosItem}>
      <span>{formatName(name)}</span>
      <div className={styles.macrosItemSeparator}/>
      <span>{quantity}g</span>
    </div>
  )
}
