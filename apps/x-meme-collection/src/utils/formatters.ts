/**
 * 現在の日付を日本語形式で取得する
 * @returns 日本語形式の日付文字列 (例: 2025年5月11日)
 */
export const getCurrentDateJP = (): string => {
  return new Date().toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * ツイートの日付を表示用にフォーマット
 * @param dateString ツイートの日付文字列
 * @returns フォーマットされた日付
 */
export const formatTweetDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * 相対時間を計算（例：「3分前」、「2時間前」など）
 * @param dateString 日付文字列
 * @returns 相対時間の文字列
 */
export const getRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds}秒前`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}分前`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}時間前`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays}日前`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths}ヶ月前`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears}年前`;
};
