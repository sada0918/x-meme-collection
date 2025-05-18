import { getCurrentDateJP } from '@/utils/formatters';
import styles from './header.module.css';
import { Theme } from '@x-meme-collection/shared-interfaces';
import { ThemeToggle } from '@x-meme-collection/ui';

interface HeaderProps {
  theme: Theme;
  setSpecificTheme: (theme: Theme) => void;
}

/**
 * アプリケーションのヘッダーコンポーネント
 */
const Header: React.FC<HeaderProps> = ({ theme, setSpecificTheme }) => {
  const currentDate = getCurrentDateJP();

  return (
    <header className={styles.header}>
      <div
        className={`${styles.updateBadge} ${
          theme === 'dark' ? styles.updateBadgeDark : styles.updateBadgeLight
        }`}
      >
        <span
          className={`${styles.dot} ${
            theme === 'dark' ? styles.dotDark : styles.dotLight
          }`}
        ></span>
        {currentDate} 更新
      </div>

      {/* レスポンシブなタイトル - スマホでの改行を防止 */}
      <h1
        className={`${styles.title} ${
          theme === 'dark' ? styles.titleDark : styles.titleLight
        }`}
      >
        例のミームまとめ
      </h1>

      <p
        className={`${styles.subtitle} ${
          theme === 'dark' ? styles.subtitleDark : styles.subtitleLight
        }`}
      >
        Xで話題のミームポストをまとめてチェック！
      </p>

      {/* テーマ切替ボタン */}
      <ThemeToggle theme={theme} setSpecificTheme={setSpecificTheme} />
    </header>
  );
};

export default Header;
