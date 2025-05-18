//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  // Nx特有のオプション設定
  // https://nx.dev/recipes/next/next-config-setup を参照
  nx: {
    // includeInSourceMaps: true,
  },

  // 画像最適化の設定
  images: {
    domains: ['pbs.twimg.com'], // Twitter画像のドメインを許可
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // 警告を修正したキャッシュ設定
  experimental: {
    // 警告された非推奨のオプションを削除
  },

  // 外部パッケージの指定（experimentalからルートに移動）
  serverExternalPackages: ['@x-meme-collection/shared-interfaces'],

  // キャッシュヘッダーを追加（本番環境でのみ有効化）
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value:
              'public, max-age=3600, s-maxage=86400, stale-while-revalidate=31536000',
          },
        ],
      },
      {
        source: '/meme-images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value:
              'public, max-age=86400, s-maxage=604800, stale-while-revalidate=31536000',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // レスポンスの圧縮設定
  compress: true,

  reactStrictMode: true,
  poweredByHeader: false,
};

const plugins = [
  // 必要に応じてNext.jsの追加プラグインを追加
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
