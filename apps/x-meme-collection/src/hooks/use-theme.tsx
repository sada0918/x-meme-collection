import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Theme } from '@x-meme-collection/shared-interfaces';
import { themeState } from '@/app/atoms/theme-atoms';

/**
 * テーマの状態管理とロジックを扱うカスタムフック (Recoilを使用)
 */
export const useTheme = () => {
  const [theme, setTheme] = useRecoilState(themeState);
  const [mounted, setMounted] = useState(false);

  // テーマの初期設定
  useEffect(() => {
    setMounted(true);

    if (!mounted) return;

    // システム設定の監視を設定
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      const savedTheme = localStorage.getItem('theme') as Theme | null;
      if (!savedTheme) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    // 初期テーマを設定
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme(mediaQuery.matches ? 'dark' : 'light');
    }

    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [mounted, setTheme]);

  // テーマ切替
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // 特定のテーマを設定
  const setSpecificTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // テーマに応じた背景グラデーション効果
  const bgStyle =
    theme === 'dark'
      ? {
          backgroundImage:
            'radial-gradient(circle at 80% 20%, rgba(30, 58, 138, 0.08) 0%, rgba(0, 0, 0, 0) 60%)',
        }
      : {
          backgroundImage:
            'radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.06) 0%, rgba(255, 255, 255, 0) 60%)',
        };

  return {
    theme,
    mounted,
    toggleTheme,
    setSpecificTheme,
    bgStyle,
  };
};
