import { useState, useEffect, useCallback, useMemo } from 'react';
import { Theme } from '@x-meme-collection/shared-interfaces';
import {
  CACHE_KEYS,
  getLocalStorageCache,
  setLocalStorageCache,
  CACHE_DURATIONS,
} from '@/utils/cache-utils';

/**
 * キャッシュを活用したテーマ管理のカスタムフック
 */
export const useCachedTheme = () => {
  // クライアントサイドレンダリング時のみ実行されるように
  const [theme, setThemeState] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  // テーマ状態を更新する関数（メモ化）
  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    // ローカルストレージに保存
    if (typeof window !== 'undefined') {
      setLocalStorageCache(
        CACHE_KEYS.THEME,
        newTheme,
        CACHE_DURATIONS.USER_PREFERENCES
      );
    }
  }, []);

  // マウント時に一度だけ実行
  useEffect(() => {
    // コンポーネントがマウントされたことを記録
    setMounted(true);

    // システム設定の監視を設定（メディアクエリ）
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      const savedTheme = getLocalStorageCache<Theme>(CACHE_KEYS.THEME);
      if (!savedTheme) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    // 初期テーマを設定（キャッシュを優先）
    const savedTheme = getLocalStorageCache<Theme>(CACHE_KEYS.THEME);
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme(mediaQuery.matches ? 'dark' : 'light');
    }

    // イベントリスナーを追加
    mediaQuery.addEventListener('change', handleSystemThemeChange);

    // クリーンアップ関数
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [setTheme]);

  // テーマ切替（メモ化）
  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  }, [theme, setTheme]);

  // 特定のテーマを設定（メモ化）
  const setSpecificTheme = useCallback(
    (newTheme: Theme) => {
      setTheme(newTheme);
    },
    [setTheme]
  );

  // テーマに応じた背景グラデーション効果（メモ化）
  const bgStyle = useMemo(
    () =>
      theme === 'dark'
        ? {
            backgroundImage:
              'radial-gradient(circle at 80% 20%, rgba(30, 58, 138, 0.08) 0%, rgba(0, 0, 0, 0) 60%)',
          }
        : {
            backgroundImage:
              'radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.06) 0%, rgba(255, 255, 255, 0) 60%)',
          },
    [theme]
  );

  return {
    theme,
    mounted,
    toggleTheme,
    setSpecificTheme,
    bgStyle,
  };
};
