import { memo, useMemo } from 'react';
import { getCurrentDateJP } from '@/utils/formatters';
import styles from './header.module.css';
import { Theme } from '@x-meme-collection/shared-interfaces';
import { ThemeToggle } from '@x-meme-collection/ui';

interface HeaderProps {
  theme: Theme;
  setSpecificTheme: (theme: Theme) => void;
}

/**
 * アプリケーションのヘッダーコンポーネント（メモ化）
 */
const Header = memo(({ theme, setSpecificTheme }: HeaderProps) => {
  // 日付の取得とメモ化
  const currentDate = useMemo(() => getCurrentDateJP(), []);

  // クラス名をメモ化
  const updateBadgeClassName = useMemo(
    () =>
      `${styles.updateBadge} ${
        theme === 'dark' ? styles.updateBadgeDark : styles.updateBadgeLight
      }`,
    [theme]
  );

  const dotClassName = useMemo(
    () =>
      `${styles.dot} ${theme === 'dark' ? styles.dotDark : styles.dotLight}`,
    [theme]
  );

  const titleClassName = useMemo(
    () =>
      `${styles.title} ${
        theme === 'dark' ? styles.titleDark : styles.titleLight
      }`,
    [theme]
  );

  const subtitleClassName = useMemo(
    () =>
      `${styles.subtitle} ${
        theme === 'dark' ? styles.subtitleDark : styles.subtitleLight
      }`,
    [theme]
  );

  return (
    <header className={styles.header}>
      <div className={updateBadgeClassName}>
        <span className={dotClassName}></span>
        {currentDate} 更新
      </div>

      {/* レスポンシブなタイトル - スマホでの改行を防止 */}
      <h1 className={titleClassName}>例のミームまとめ</h1>

      <p className={subtitleClassName}>
        Xで話題のミームポストをまとめてチェック！
      </p>

      {/* テーマ切替ボタン */}
      <ThemeToggle theme={theme} setSpecificTheme={setSpecificTheme} />
    </header>
  );
});

// 開発時のデバッグ用に表示名を設定
Header.displayName = 'Header';

export default Header;
