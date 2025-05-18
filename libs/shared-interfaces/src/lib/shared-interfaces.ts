/**
 * ミーム画像のインターフェース
 */
export interface MemeImage {
  id: string; // 画像のユニークID
  src: string; // 画像のパス
  alt: string; // 画像の代替テキスト
  data?: string; // Base64エンコードされた画像データ（APIリクエスト用）
}

/**
 * ツイートデータのインターフェース
 */
export interface Tweet {
  id: string; // ツイートID
  imageId: string; // 関連する画像ID
  tweetDate: string; // ツイート日時
}

/**
 * API応答の標準形式
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * テーマタイプ
 */
export type Theme = 'light' | 'dark';
