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
 * ツイート表示コンテナコンポーネント
 */
const TweetContainer: React.FC<TweetContainerProps> = ({
  theme,
  tweetIds,
  isLoading,
  selectedMemeImage,
  memeImages,
}) => {
  // 選択中の画像の情報を取得
  const selectedImage = memeImages.find((img) => img.id === selectedMemeImage);

  const renderHeader = () => (
    <div className={styles.header}>
      <div className={styles.titleContainer}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`${styles.icon} ${
            theme === 'dark' ? styles.iconDark : styles.iconLight
          }`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        <span
          className={`${styles.title} ${
            theme === 'dark' ? styles.titleDark : styles.titleLight
          }`}
        >
          {selectedImage?.alt || '話題のツイート'}
        </span>
      </div>
      <div>
        <span
          className={`${styles.count} ${
            theme === 'dark' ? styles.countDark : styles.countLight
          }`}
        >
          {tweetIds.length}件
        </span>
      </div>
    </div>
  );

  const renderFooter = () => (
    <div className={styles.footer}>
      <p
        className={`${styles.footerText} ${
          theme === 'dark' ? styles.footerTextDark : styles.footerTextLight
        }`}
      >
        公開ツイートです
      </p>

      <div
        className={`${styles.footerCount} ${
          theme === 'dark' ? styles.footerCountDark : styles.footerCountLight
        }`}
      >
        {tweetIds.length}件
      </div>
    </div>
  );

  return (
    <Card theme={theme} header={renderHeader()} footer={renderFooter()}>
      <div className={styles.content}>
        {isLoading ? (
          <LoadingSpinner theme={theme} />
        ) : tweetIds.length > 0 ? (
          <div className={styles.tweetsList}>
            {tweetIds.map((id, index) => (
              <div key={index} className={`${styles.tweetWrapper} ${theme}`}>
                <div className={styles.tweetContainer}>
                  <Tweet id={id} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className={`${styles.emptyState} ${
              theme === 'dark' ? styles.emptyStateDark : styles.emptyStateLight
            }`}
          >
            関連するツイートが見つかりませんでした。別の画像を選んでみてください。
          </div>
        )}
      </div>
    </Card>
  );
};

export default TweetContainer;
