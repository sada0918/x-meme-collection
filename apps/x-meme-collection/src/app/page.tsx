'use client';

import { useState, useEffect, useMemo } from 'react';
import styles from './page.module.css';
import { useCachedTheme } from '@/hooks/use-cached-theme';
import { useSwrMemeData } from '@/hooks/use-swr-meme-data';
import dynamic from 'next/dynamic';

// コンポーネントの動的インポート（code splitting）
const Header = dynamic(() => import('./components/header/header'), {
  ssr: false,
  loading: () => <div className={styles.headerPlaceholder}></div>,
});

const MemeImageLane = dynamic(
  () => import('./components/meme-image-lane/meme-image-lane'),
  {
    ssr: false,
    loading: () => <div className={styles.lanePlaceholder}></div>,
  }
);

const TweetContainer = dynamic(
  () => import('./components/tweet-container/tweet-container'),
  {
    ssr: false,
    loading: () => <div className={styles.tweetContainerPlaceholder}></div>,
  }
);

const Footer = dynamic(() => import('./components/footer/footer'), {
  ssr: false,
});

/**
 * アプリケーションのメインページ（キャッシュ対応版）
 */
export default function Home() {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);

  // 改善したキャッシュ対応のフック
  const {
    theme,
    mounted: themeMounted,
    setSpecificTheme,
    bgStyle,
  } = useCachedTheme();

  // SWRを使用したキャッシュ対応のデータフック
  const {
    selectedMemeImage,
    tweetIds,
    isLoading,
    memeImages,
    handleImageSelect,
  } = useSwrMemeData();

  // ページのロード完了状態を管理
  useEffect(() => {
    setMounted(true);
    // フェードインアニメーションのタイミング
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // メインクラス名をメモ化
  const mainClassName = useMemo(
    () => `${styles.main} ${theme === 'dark' ? styles.dark : styles.light}`,
    [theme]
  );

  // コンテナクラス名をメモ化
  const containerClassName = useMemo(
    () =>
      `${styles.container} ${isPageLoaded ? styles.loaded : styles.loading}`,
    [isPageLoaded]
  );

  // ページがまだマウントされていない場合のプレースホルダー
  if (!mounted || !themeMounted) {
    return <div className={styles.placeholder}></div>;
  }

  return (
    <main className={mainClassName} style={bgStyle}>
      <div className={containerClassName}>
        {/* ヘッダー */}
        <Header theme={theme} setSpecificTheme={setSpecificTheme} />

        {/* 画像選択レーン */}
        <MemeImageLane
          theme={theme}
          memeImages={memeImages}
          selectedMemeImage={selectedMemeImage}
          handleImageSelect={handleImageSelect}
        />

        {/* ツイート表示コンテナ */}
        <TweetContainer
          theme={theme}
          tweetIds={tweetIds}
          isLoading={isLoading}
          selectedMemeImage={selectedMemeImage}
          memeImages={memeImages}
        />

        {/* フッター */}
        <Footer theme={theme} />
      </div>
    </main>
  );
}
