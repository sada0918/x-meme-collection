import styles from './card.module.css';
import { Theme } from '@x-meme-collection/shared-interfaces';

export interface CardProps {
  children: React.ReactNode;
  theme: Theme;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

/**
 * 汎用カードコンポーネント
 */
export function Card({ children, theme, header, footer }: CardProps) {
  return (
    <div
      className={`${styles.card} ${
        theme === 'dark' ? styles.dark : styles.light
      }`}
    >
      {header && <div className={styles.header}>{header}</div>}
      <div className={styles.body}>{children}</div>
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
}

export default Card;
