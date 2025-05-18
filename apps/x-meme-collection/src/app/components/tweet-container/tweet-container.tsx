import { memo, useMemo } from 'react';
import { Tweet } from 'react-tweet';
import styles from './tweet-container.module.css';
import LoadingSpinner from '../loading-spinner/loading-spinner';
import { MemeImage, Theme } from '@x-meme-collection/shared-interfaces';
import { Card } from '@x-meme-collection/ui';

interface TweetContainerProps {
  theme: Theme;
  tweetIds: string[];
  isLoading: boolean;
  selectedMemeImage: string;
  memeImages: MemeImage[];
}

/**
 * ツイート表示コンテナコンポーネント（メモ化）
 */
const TweetContainer = memo(
  ({
    theme,
    tweetIds,
    isLoading,
    selectedMemeImage,
    memeImages,
  }: TweetContainerProps) => {
    // 選択中の画像の情報を取得（メモ化）
    const selectedImage = useMemo(
      () => memeImages.find((img) => img.id === selectedMemeImage),
      [memeImages, selectedMemeImage]
    );

    // ヘッダーコンポーネントをメモ化
    const headerComponent = useMemo(() => {
      const titleClassName = `${styles.title} ${
        theme === 'dark' ? styles.titleDark : styles.titleLight
      }`;

      const countClassName = `${styles.count} ${
        theme === 'dark' ? styles.countDark : styles.countLight
      }`;

      return (
        <div className={styles.header}>
          <div className={styles.titleContainer}>
            <span className={titleClassName}>
              {selectedImage?.alt || '話題のツイート'}
            </span>
          </div>
          <div>
            <span className={countClassName}>{tweetIds.length}件</span>
          </div>
        </div>
      );
    }, [theme, selectedImage, tweetIds.length]);

    // フッターコンポーネントをメモ化
    const footerComponent = useMemo(() => {
      const footerTextClassName = `${styles.footerText} ${
        theme === 'dark' ? styles.footerTextDark : styles.footerTextLight
      }`;

      const footerCountClassName = `${styles.footerCount} ${
        theme === 'dark' ? styles.footerCountDark : styles.footerCountLight
      }`;

      return (
        <div className={styles.footer}>
          <p className={footerTextClassName}>公開ツイートです</p>

          <div className={footerCountClassName}>{tweetIds.length}件</div>
        </div>
      );
    }, [theme, tweetIds.length]);

    // コンテンツ部分をメモ化
    const contentComponent = useMemo(() => {
      if (isLoading) {
        return <LoadingSpinner theme={theme} />;
      }

      if (tweetIds.length > 0) {
        return (
          <div className={styles.tweetsList}>
            {tweetIds.map((id, index) => (
              <div key={index} className={`${styles.tweetWrapper} ${theme}`}>
                <div className={styles.tweetContainer}>
                  <Tweet id={id} />
                </div>
              </div>
            ))}
          </div>
        );
      }

      const emptyStateClassName = `${styles.emptyState} ${
        theme === 'dark' ? styles.emptyStateDark : styles.emptyStateLight
      }`;

      return (
        <div className={emptyStateClassName}>
          関連するツイートが見つかりませんでした。別の画像を選んでみてください。
        </div>
      );
    }, [isLoading, theme, tweetIds]);

    return (
      <Card theme={theme} header={headerComponent} footer={footerComponent}>
        <div className={styles.content}>{contentComponent}</div>
      </Card>
    );
  }
);

// 開発時のデバッグ用に表示名を設定
TweetContainer.displayName = 'TweetContainer';

export default TweetContainer;
