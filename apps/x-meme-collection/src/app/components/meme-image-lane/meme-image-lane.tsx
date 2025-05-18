import styles from './meme-image-lane.module.css';
import { MemeImage, Theme } from '@x-meme-collection/shared-interfaces';

interface MemeImageLaneProps {
  theme: Theme;
  memeImages: MemeImage[];
  selectedMemeImage: string;
  handleImageSelect: (id: string) => void;
}

/**
 * ミーム画像選択用のレーンコンポーネント
 */
const MemeImageLane: React.FC<MemeImageLaneProps> = ({
  theme,
  memeImages,
  selectedMemeImage,
  handleImageSelect,
}) => {
  return (
    <div className={styles.container}>
      <div
        className={`${styles.laneContainer} ${
          theme === 'dark' ? styles.laneContainerDark : styles.laneContainerLight
        }`}
      >
        <h2
          className={`${styles.title} ${
            theme === 'dark' ? styles.titleDark : styles.titleLight
          }`}
        >
          見たいミームの画像を選択
        </h2>
        <div className={styles.imageList}>
          {memeImages.map((image) => (
            <div
              key={image.id}
              onClick={() => handleImageSelect(image.id)}
              className={`${styles.imageItem} ${
                selectedMemeImage === image.id ? styles.selected : styles.unselected
              }`}
            >
              <div
                className={`${styles.imageContainer} ${
                  selectedMemeImage === image.id ? styles.selectedImageContainer : ''
                } ${
                  theme === 'dark' ? styles.imageContainerDark : styles.imageContainerLight
                }`}
              >
                <div
                  className={styles.image}
                  style={{
                    backgroundImage: `url('${image.src}')`,
                  }}
                  aria-label={image.alt}
                ></div>
              </div>
              {selectedMemeImage === image.id && (
                <div
                  className={`${styles.indicator} ${
                    theme === 'dark' ? styles.indicatorDark : styles.indicatorLight
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemeImageLane;