'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import { useTheme } from '@/hooks/use-theme';
import { useMemeData } from '@/hooks/use-meme-data';
import Header from './components/header/header';
import MemeImageLane from './components/meme-image-lane/meme-image-lane';
import TweetContainer from './components/tweet-container/tweet-container';
import Footer from './components/footer/footer';

/**
 * アプリケーションのメインページ
 */
export default function Home() {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);

  // テーマ関連のフック
  const {
    theme,
    mounted: themeMounted,
    setSpecificTheme,
    bgStyle,
  } = useTheme();

  // ミームデータ関連のフック
  const {
    selectedMemeImage,
    tweetIds,
    isLoading,
    memeImages,
    handleImageSelect,
  } = useMemeData();

  // ページのロード完了状態を管理
  useEffect(() => {
    setMounted(true);
    // フェードインアニメーションのタイミング
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted || !themeMounted) {
    // 最初の表示時のフラッシュを防ぐためのプレースホルダー
    return <div className={styles.placeholder}></div>;
  }

  return (
    <main
      className={`${styles.main} ${
        theme === 'dark' ? styles.dark : styles.light
      }`}
      style={bgStyle}
    >
      <div
        className={`${styles.container} ${
          isPageLoaded ? styles.loaded : styles.loading
        }`}
      >
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
