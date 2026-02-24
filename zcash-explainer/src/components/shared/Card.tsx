import { type ReactNode } from 'react'

interface CardProps {
  title?: string
  children: ReactNode
  className?: string
  terminal?: boolean
}

export function Card({ title, children, className = '', terminal = false }: CardProps) {
  return (
    <div
      className={`wireframe-card overflow-hidden ${className}`}
    >
      {title && (
        <div className="px-5 py-3 border-b border-[var(--rule)]">
          <h3 className="font-mono text-sm font-medium text-[var(--accent)]">
            {terminal ? `> ${title}` : title}
          </h3>
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  )
}
