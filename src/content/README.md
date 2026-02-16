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
- `cover` (文字列) — カバー画像パス（例: "/assets/covers/my-project.jpg"）
- `draft` (ブール値) — true の場合、ビルド時にスキップされる

## フロントマターの例

```yaml
---
title: "My Awesome Project"
date: "2026-02-16"
description: "This is a short summary used on listings and meta tags."
tags: ["astro", "tailwind", "typescript"]
slug: "my-awesome-project"
cover: "/assets/covers/my-project.jpg"
draft: false
---
```

## ファイル名規則

### ブログ記事 (`blog/`)
- 推奨: `YYYY-MM-DD-slug.md` （例: `2026-02-16-getting-started.md`）
- または: `slug.md` （例: `getting-started.md`）

### プロジェクト (`projects/`)
- 推奨: `slug.md` （例: `my-project.md`）

## 画像とアセット

- サイト全体のアセットは `public/assets/` に配置
- コンテンツ固有の画像は、関連するコンテンツフォルダに配置し、適切なパスで参照

## 注意事項

- ファイルを移動・リネームする場合は、関連するimporter（`lib/content.ts`のglob パターンなど）を更新してください
- `draft: true` のファイルはビルドに含まれません
- スラッグが重複しないように注意してください
