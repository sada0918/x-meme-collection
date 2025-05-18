import useSWR from 'swr';
import { useState, useEffect, useCallback } from 'react';
import { MemeImage } from '@x-meme-collection/shared-interfaces';
import {
  CACHE_KEYS,
  getLocalStorageCache,
  setLocalStorageCache,
  CACHE_DURATIONS,
} from '@/utils/cache-utils';

// ダミーデータフェッチャー（実際のAPIに置き換えます）
const fetchMemeImages = async (): Promise<MemeImage[]> => {
  // モックデータ（実際のAPIリクエストに置き換えます）
  const mockMemeImages: MemeImage[] = [
    {
      id: 'aomine',
      src: '/meme-images/aomine.jpg',
      alt: '青峰',
    },
    {
      id: 'aomine2',
      src: '/meme-images/aomine.jpg',
      alt: '青峰',
    },
    {
      id: 'aomine3',
      src: '/meme-images/aomine.jpg',
      alt: '青峰',
    },
    {
      id: 'aomine4',
      src: '/meme-images/aomine.jpg',
      alt: '青峰',
    },
  ];

  // APIリクエストをシミュレート
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockMemeImages), 300);
  });
};

// 関連ツイートを取得するためのダミーフェッチャー
const fetchRelatedTweets = async (imageId: string): Promise<string[]> => {
  // ローカルキャッシュをチェック
  const cachedTweets = getLocalStorageCache<string[]>(
    CACHE_KEYS.TWEETS_BY_IMAGE_ID(imageId)
  );

  if (cachedTweets) {
    return cachedTweets;
  }

  // モックツイートIDのマッピング
  const mockTweetMapping: Record<string, string[]> = {
    aomine: [
      '1917513692163498304',
      '1920783669263786213',
      '1918823508097786303',
    ],
    aomine2: [
      '1921174389766209860',
      '1920783669263786213',
      '1918823508097786303',
    ],
    aomine3: [
      '1921174389766209860',
      '1920783669263786213',
      '1918823508097786303',
    ],
    aomine4: [
      '1917513692163498304',
      '1920783669263786213',
      '1918823508097786303',
    ],
  };

  // APIリクエストをシミュレート
  return new Promise((resolve) => {
    setTimeout(() => {
      const tweets = mockTweetMapping[imageId] || [];
      // キャッシュに保存
      setLocalStorageCache(
        CACHE_KEYS.TWEETS_BY_IMAGE_ID(imageId),
        tweets,
        CACHE_DURATIONS.TWEETS
      );
      resolve(tweets);
    }, 300);
  });
};

/**
 * SWRを使用したキャッシュ対応のミームデータフック
 */
export const useSwrMemeData = () => {
  const [selectedMemeImage, setSelectedMemeImage] = useState<string>('');
  const [isInitialized, setIsInitialized] = useState(false);

  // SWRを使用してミーム画像を取得
  const {
    data: memeImages = [],
    error: memeImagesError,
    isLoading: isLoadingMemeImages,
  } = useSWR<MemeImage[]>(CACHE_KEYS.MEME_IMAGES, fetchMemeImages, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    dedupingInterval: CACHE_DURATIONS.MEME_IMAGES,
    // 60秒間のキャッシュ保持
    onSuccess: (data) => {
      // ローカルストレージにも保存（オフライン対応）
      setLocalStorageCache(
        CACHE_KEYS.MEME_IMAGES,
        data,
        CACHE_DURATIONS.MEME_IMAGES
      );

      // 初回ロード時に最初の画像を選択
      if (data.length > 0 && !isInitialized) {
        setSelectedMemeImage(data[0].id);
        setIsInitialized(true);
      }
    },
  });

  // 選択された画像に基づいてツイートを取得
  const {
    data: tweetIds = [],
    error: tweetsError,
    isLoading: isLoadingTweets,
  } = useSWR<string[]>(
    selectedMemeImage
      ? [CACHE_KEYS.TWEETS_BY_IMAGE_ID(selectedMemeImage), selectedMemeImage]
      : null,
    // 選択された画像IDでツイートを取得
    () => fetchRelatedTweets(selectedMemeImage),
    {
      revalidateOnFocus: false,
      // 30分のキャッシュ保持
      dedupingInterval: CACHE_DURATIONS.TWEETS,
    }
  );

  // 画像選択時の処理
  const handleImageSelect = useCallback((imageId: string) => {
    setSelectedMemeImage(imageId);
  }, []);

  // エラー処理
  useEffect(() => {
    if (memeImagesError) {
      console.error(
        'ミーム画像の取得中にエラーが発生しました:',
        memeImagesError
      );
    }
    if (tweetsError) {
      console.error('ツイートの取得中にエラーが発生しました:', tweetsError);
    }
  }, [memeImagesError, tweetsError]);

  return {
    selectedMemeImage,
    tweetIds,
    isLoading: isLoadingMemeImages || isLoadingTweets,
    memeImages,
    handleImageSelect,
  };
};
