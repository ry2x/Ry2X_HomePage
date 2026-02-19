# Content Guidelines

このディレクトリには、プロジェクトとブログ記事のMarkdownファイルを配置します。

## フロントマター規則

すべてのMarkdownファイルには、以下のフロントマターフィールドを含める必要があります：

### 必須フィールド

- `title` (文字列) — コンテンツのタイトル
- `description` (文字列) — メタタグやプレビューで使用される概要

### オプションフィールド

- `date` (ISO 8601文字列) — ブログ記事では必須、プロジェクトではオプション（例: "2026-02-16"）
- `tags` (文字列配列) — カテゴリータグ（例: ["astro", "tailwind"]）
- `slug` (文字列) — URL用スラッグ（省略時はファイル名から自動生成）
- `cover` (相対パス) — カバー画像パス。コンテンツファイルからの相対パスで指定（例: `./thumb.png`）。Astroのアセットパイプラインで自動最適化される
- `draft` (ブール値) — true の場合、ビルド時にスキップされる

## フロントマターの例

```yaml
---
title: "My Awesome Project"
date: "2026-02-16"
description: "This is a short summary used on listings and meta tags."
tags: ["astro", "tailwind", "typescript"]
slug: "my-awesome-project"
cover: "./thumb.png"
draft: false
---
```

## ファイル名規則

### ブログ記事 (`blog/`)

- 推奨: `YYYY-MM-DD-slug.md` （例: `2026-02-16-getting-started.md`）
- または: `slug.md` （例: `getting-started.md`）

### プロジェクト (`projects/`)

- 推奨: `slug.md`（例: `my-project.md`）
- または: サブディレクトリ構成（後述）

## ディレクトリ構成（コンテンツ固有画像を使う場合）

画像をコンテンツと同じ場所に置く場合は、サブディレクトリに `index.md` を作成します。
ディレクトリ名がそのままスラッグになります。

```sh
src/content/projects/
  ├─ my-awesome-app/
  │  ├─ index.md        ← スラッグ: "my-awesome-app"
  │  ├─ thumb.png
  │  └─ screenshot.jpg
  └─ simple-project.md  ← スラッグ: "simple-project"
```

`index.md` のフロントマターでは相対パスで画像を参照します：

```yaml
cover: "./thumb.png"
```

Markdownの本文中からも相対パスで参照できます：

```md
![スクリーンショット](./screenshot.jpg)
```

## 画像とアセット

- サイト全体のアセット（OGP画像・favicon など）は `public/assets/` に配置
- コンテンツ固有の画像は、上記のサブディレクトリ構成でコンテンツと同じ場所に配置（推奨）

## 注意事項

- ファイルを移動・リネームする場合は、関連するimporter（`lib/content.ts`のglob パターンなど）を更新してください
- `draft: true` のファイルはビルドに含まれません
- スラッグが重複しないように注意してください
