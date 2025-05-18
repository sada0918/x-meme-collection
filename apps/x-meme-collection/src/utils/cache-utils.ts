/**
 * アプリケーションのキャッシュユーティリティ
 */

// キャッシュ有効期限の定数
export const CACHE_DURATIONS = {
  MEME_IMAGES: 24 * 60 * 60 * 1000, // 24時間
  TWEETS: 30 * 60 * 1000, // 30分
  USER_PREFERENCES: 7 * 24 * 60 * 60 * 1000, // 7日間
};

/**
 * ローカルストレージにデータを保存する
 * @param key キャッシュキー
 * @param data 保存するデータ
 * @param expirationMs 有効期限（ミリ秒）
 */
export const setLocalStorageCache = <T>(
  key: string,
  data: T,
  expirationMs: number
): void => {
  const item = {
    value: data,
    expiry: Date.now() + expirationMs,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

/**
 * ローカルストレージからデータを取得する
 * @param key キャッシュキー
 * @returns キャッシュされたデータまたはnull
 */
export const getLocalStorageCache = <T>(key: string): T | null => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;

  try {
    const item = JSON.parse(itemStr);
    const now = Date.now();

    // 有効期限をチェック
    if (now > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }

    return item.value as T;
  } catch (error) {
    console.error('キャッシュの読み込みエラー:', error);
    localStorage.removeItem(key);
    return null;
  }
};

/**
 * セッションストレージにデータを保存する
 * @param key キャッシュキー
 * @param data 保存するデータ
 */
export const setSessionStorageCache = <T>(key: string, data: T): void => {
  sessionStorage.setItem(key, JSON.stringify(data));
};

/**
 * セッションストレージからデータを取得する
 * @param key キャッシュキー
 * @returns キャッシュされたデータまたはnull
 */
export const getSessionStorageCache = <T>(key: string): T | null => {
  const itemStr = sessionStorage.getItem(key);
  if (!itemStr) return null;

  try {
    return JSON.parse(itemStr) as T;
  } catch (error) {
    console.error('セッションキャッシュの読み込みエラー:', error);
    sessionStorage.removeItem(key);
    return null;
  }
};

// キャッシュキー定数
export const CACHE_KEYS = {
  MEME_IMAGES: 'meme-images',
  TWEETS_BY_IMAGE_ID: (imageId: string) => `tweets-${imageId}`,
  THEME: 'user-theme',
};
