# Ry2X.NET (Personal Homepage)

私、Ry2Xの個人ホームページのリポジトリです。  
Astro と Tailwind CSS を使用して構築されており、Cloudflare Pages 上でホスティングされています。
[ry2x.net](https://ry2x.net) で公開中のサイトのソースコードを管理しています。

## ✨ 特徴 (Features)

- **Astro による高速な描画**: アイランドアーキテクチャを活用した静的サイトジェネレーター。
- **Tailwind CSS**: ユーティリティファーストなスタイリング（v4系を採用）。
- **Cloudflare Pages**: サイトのホスティングと、SSR/APIルート実行環境（`@astrojs/cloudflare` アダプターを使用）。
- **Markdown ベースのコンテンツ管理**: `src/content/` 以下でプロジェクトやブログ記事を管理。
- **コンタクトフォーム**: Cloudflare Turnstile によるスパム対策と、Resend API を用いたメール送信機能。
- **ダークモード対応**: システム設定の自動検知およびヘッダーからの手動切り替え機能。
- **Dev Container サポート**: `.devcontainer` を用いた一貫した開発環境の提供。

## 🛠 技術スタック (Tech Stack)

- [Astro](https://astro.build/) (v5)
- [Tailwind CSS](https://tailwindcss.com/) (v4)
- [TypeScript](https://www.typescriptlang.org/)
- [Cloudflare Pages & Workers](https://pages.cloudflare.com/)
- [Resend](https://resend.com/)
- [Cloudflare Turnstile](https://www.cloudflare.com/ja-jp/products/turnstile/)

## 🚀 開発環境のセットアップ (Getting Started)

### 前提条件

- Node.js (v20以上推奨)
- pnpm (`corepack enable` で利用可能)
- devContainerを使用する場合は、`docker`/`podman`とdevContainerのセットアップが必要です。

### 1. インストール

リポジトリをクローンし、依存関係をインストールします。

```bash
git clone https://github.com/ry2x/Ry2X_HomePage.git
cd Ry2X_HomePage
pnpm i
```

### 2. 環境変数の設定

ローカルでの開発とAPIのテスト用に環境変数ファイルを作成します。

**クライアントサイド環境変数**:
`.env.example` をコピーして `.env` を作成します。

```bash
cp .env.example .env
```

※ Turnstile のローカルテスト用サイトキー（1x000...）が設定されています。

**サーバーサイド環境変数**:
`.dev.vars.example` をコピーして `.dev.vars` を作成し、実際のAPIキー等を入力します。

```bash
cp .dev.vars.example .dev.vars
```

### 3. 開発サーバーの起動

```bash
pnpm dev
```

ブラウザでAstroから指定されたローカルURL（例: `http://localhost:3000`）にアクセスして、サイトを確認します。

### 4. devContainerの使用

最も簡単な方法は、VSCodeでリポジトリを開き、devContainerを起動することです。
このリポジトリをクローンした後、VSCodeで「Reopen in Container」を選択してください。
その後、 ２と３の手順をdevContainer内のターミナルで実行してください。

## 📁 プロジェクト構成 (Project Structure)

```text
/
├── .devcontainer/       # 開発コンテナ設定
├── .github/             # CI/CDワークフロー (GitHub Actions)
├── public/              # 静的アセット（画像、ファビコン、マニフェストなど）
├── src/
│   ├── assets/          # 処理される画像アセット
│   ├── components/      # UIコンポーネント (Header, Footer, SEO, DarkModeToggleなど)
│   ├── content/         # Markdownコンテンツ (blog, projects)
│   ├── layouts/         # 共通レイアウト (BaseLayout)
│   ├── lib/             # ユーティリティ関数 (コンテンツ取得など)
│   ├── pages/           # ルーティング (ページ、APIエンドポイント)
│   ├── styles/          # グローバルCSS (Tailwind設定)
│   └── types/           # TypeScript型定義
├── astro.config.mjs     # Astroの設定ファイル
├── tailwind.config.js   # Tailwind CSSの設定ファイル
└── wrangler.jsonc       # Cloudflare Workers/Pagesの設定
```

### 📝 コンテンツの追加・編集

- **プロジェクト**: `src/content/projects/` にMarkdownファイルを追加。フロントマターでタイトル、説明、URL、使用技術などを指定。
- **ブログ**: `src/content/blog/` にMarkdownファイルを追加。フロントマターでタイトル、日付、タグなどを指定。
ブログ記事やプロジェクトの追加方法、フロントマター（メタデータ）の記述ルールについては[`src/content/README.md`](src/content/README.md) を参照してください。

## 🌐 デプロイ (Deployment)

このプロジェクトは GitHub Actions を使用して、main ブランチに変更がプッシュされると自動的に Cloudflare Pages にデプロイされるよう設定されています。
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) を確認してください。

デプロイには以下の GitHub Secrets が設定されている必要があります：

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `PUBLIC_TURNSTILE_SITE_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`

### 📄 ライセンス (License)

© Ry2X. All rights reserved.
