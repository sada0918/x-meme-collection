import { useState, useEffect } from 'react';
import { MemeImage } from '@x-meme-collection/shared-interfaces';
// 実際のAPIインポートをコメントアウト
// import { fetchMemeImages, fetchRelatedTweets } from '../services/api';

/**
 * ミームデータの状態管理とロジックを扱うカスタムフック（モックデータ版）
 */
export const useMemeData = () => {
  const [selectedMemeImage, setSelectedMemeImage] = useState<string>('');
  const [tweetIds, setTweetIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [memeImages, setMemeImages] = useState<MemeImage[]>([]);

  // 修正したモックデータ
  const mockMemeImages: MemeImage[] = [
    { id: 'meme1', src: '/images/meme1.jpg', alt: '面白いミーム画像1' },
    { id: 'meme2', src: '/images/meme2.jpg', alt: '面白いミーム画像2' },
    { id: 'meme3', src: '/images/meme3.jpg', alt: '面白いミーム画像3' },
  ];

  // モックツイートIDのマッピング
  const mockTweetMapping: Record<string, string[]> = {
    meme1: ['1234567890123456789', '2345678901234567890'],
    meme2: [
      '3456789012345678901',
      '4567890123456789012',
      '5678901234567890123',
    ],
    meme3: ['6789012345678901234'],
  };

  // 初期ロード時にモック画像を設定
  useEffect(() => {
    const loadMockImages = async () => {
      // 遅延をシミュレート
      setTimeout(() => {
        setMemeImages(mockMemeImages);

        // 最初の画像を選択
        if (mockMemeImages.length > 0) {
          setSelectedMemeImage(mockMemeImages[0].id);
          loadMockRelatedTweets(mockMemeImages[0].id);
        } else {
          setIsLoading(false);
        }
      }, 500); // 0.5秒の遅延
    };

    loadMockImages();
  }, []);

  // モックツイートを取得
  const loadMockRelatedTweets = async (imageId: string) => {
    setIsLoading(true);
    // 遅延をシミュレート
    setTimeout(() => {
      try {
        const tweets = mockTweetMapping[imageId] || [];
        setTweetIds(tweets);
      } catch (error) {
        console.error('モックツイートの取得に失敗しました:', error);
        setTweetIds([]);
      } finally {
        setIsLoading(false);
      }
    }, 300); // 0.3秒の遅延
  };

  // 画像選択時の処理
  const handleImageSelect = (imageId: string) => {
    setSelectedMemeImage(imageId);
    loadMockRelatedTweets(imageId);
  };

  return {
    selectedMemeImage,
    tweetIds,
    isLoading,
    memeImages,
    handleImageSelect,
  };
};

// import { useState, useEffect } from 'react';
// import { MemeImage } from '@x-meme-collection/shared-interfaces';
// import { fetchMemeImages, fetchRelatedTweets } from '../services/api';

// /**
//  * ミームデータの状態管理とロジックを扱うカスタムフック
//  */
// export const useMemeData = () => {
//   const [selectedMemeImage, setSelectedMemeImage] = useState<string>('');
//   const [tweetIds, setTweetIds] = useState<string[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [memeImages, setMemeImages] = useState<MemeImage[]>([]);

//   // 初期ロード時に画像を取得
//   useEffect(() => {
//     const loadImages = async () => {
//       try {
//         const images = await fetchMemeImages();
//         setMemeImages(images);

//         // 最初の画像を選択
//         if (images.length > 0) {
//           setSelectedMemeImage(images[0].id);
//           await loadRelatedTweets(images[0].id);
//         } else {
//           setIsLoading(false);
//         }
//       } catch (error) {
//         console.error('画像の取得に失敗しました:', error);
//         setIsLoading(false);
//       }
//     };

//     loadImages();
//   }, []);

//   // 選択された画像に基づいて関連ツイートを取得
//   const loadRelatedTweets = async (imageId: string) => {
//     setIsLoading(true);
//     try {
//       const tweets = await fetchRelatedTweets(imageId);
//       setTweetIds(tweets);
//     } catch (error) {
//       console.error('ツイートの取得に失敗しました:', error);
//       setTweetIds([]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // 画像選択時の処理
//   const handleImageSelect = (imageId: string) => {
//     setSelectedMemeImage(imageId);
//     loadRelatedTweets(imageId);
//   };

//   return {
//     selectedMemeImage,
//     tweetIds,
//     isLoading,
//     memeImages,
//     handleImageSelect,
//   };
// };
