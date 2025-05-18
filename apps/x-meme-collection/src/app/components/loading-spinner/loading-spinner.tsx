import styles from './loading-spinner.module.css';
import { Theme } from '@x-meme-collection/shared-interfaces';

interface LoadingSpinnerProps {
  theme: Theme;
}

/**
 * ローディング表示用のスピナーコンポーネント
 */
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ theme }) => {
  return (
    <div className={styles.container}>
      <div
        className={`${styles.spinner} ${
          theme === 'dark' ? styles.spinnerDark : styles.spinnerLight
        }`}
      ></div>
    </div>
  );
};

export default LoadingSpinner;