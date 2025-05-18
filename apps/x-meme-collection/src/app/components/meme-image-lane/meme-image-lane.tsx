import { memo, useMemo } from 'react';
import styles from './meme-image-lane.module.css';
import { MemeImage, Theme } from '@x-meme-collection/shared-interfaces';

interface MemeImageLaneProps {
  theme: Theme;
  memeImages: MemeImage[];
  selectedMemeImage: string;
  handleImageSelect: (id: string) => void;
}

/**
 * ミーム画像選択用のレーンコンポーネント（メモ化）
 */
const MemeImageLane = memo(
  ({
    theme,
    memeImages,
    selectedMemeImage,
    handleImageSelect,
  }: MemeImageLaneProps) => {
    // コンテナクラス名をメモ化
    const laneContainerClassName = useMemo(
      () =>
        `${styles.laneContainer} ${
          theme === 'dark'
            ? styles.laneContainerDark
            : styles.laneContainerLight
        }`,
      [theme]
    );

    // タイトルクラス名をメモ化
    const titleClassName = useMemo(
      () =>
        `${styles.title} ${
          theme === 'dark' ? styles.titleDark : styles.titleLight
        }`,
      [theme]
    );

    // 個々の画像アイテムのレンダリング
    const renderImageItems = useMemo(
      () =>
        memeImages.map((image) => {
          const isSelected = selectedMemeImage === image.id;

          // 画像アイテムのクラス名
          const imageItemClassName = `${styles.imageItem} ${
            isSelected ? styles.selected : styles.unselected
          }`;

          // 画像コンテナのクラス名
          const imageContainerClassName = `${styles.imageContainer} ${
            isSelected ? styles.selectedImageContainer : ''
          } ${
            theme === 'dark'
              ? styles.imageContainerDark
              : styles.imageContainerLight
          }`;

          // インジケーターのクラス名
          const indicatorClassName = `${styles.indicator} ${
            theme === 'dark' ? styles.indicatorDark : styles.indicatorLight
          }`;

          return (
            <div
              key={image.id}
              onClick={() => handleImageSelect(image.id)}
              className={imageItemClassName}
            >
              <div className={imageContainerClassName}>
                <div
                  className={styles.image}
                  style={{
                    backgroundImage: `url('${image.src}')`,
                  }}
                  aria-label={image.alt}
                ></div>
              </div>
              {isSelected && <div className={indicatorClassName}></div>}
            </div>
          );
        }),
      [memeImages, selectedMemeImage, theme, handleImageSelect]
    );

    return (
      <div className={styles.container}>
        <div className={laneContainerClassName}>
          <h2 className={titleClassName}>見たいミームの画像を選択</h2>
          <div className={styles.imageList}>{renderImageItems}</div>
        </div>
      </div>
    );
  }
);

// 開発時のデバッグ用に表示名を設定
MemeImageLane.displayName = 'MemeImageLane';

export default MemeImageLane;
