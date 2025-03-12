import type { ReactNode } from "react"
import styles from "./card.module.css"

interface CardProps {
  title: string
  children: ReactNode
  className?: string
  size?: "normal" | "wide" | "tall" | "large"
}

export default function Card({ title, children, className = "", size = "normal" }: CardProps) {
  return (
    <div className={`${styles.card} ${styles[size]} ${className}`}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.content}>{children}</div>
    </div>
  )
}

