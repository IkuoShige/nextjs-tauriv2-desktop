# Next.js + Tauri v2 + shadcn/ui デスクトップアプリ

このプロジェクトは、Next.js、Tauri v2、shadcn/uiを組み合わせたモダンなデスクトップアプリケーションのテンプレートです。

## 特徴

- 🚀 **Next.js App Router**: 最新のReactフレームワークを使用
- 🛠 **Tauri v2**: 軽量で高速なデスクトップアプリケーションフレームワーク
- 🎨 **shadcn/ui**: 美しく使いやすいUIコンポーネント
- 🎯 **TypeScript**: 型安全なコーディング
- 🎭 **Tailwind CSS**: ユーティリティファーストのCSSフレームワーク
- 🌙 **ダークモード**: 組み込みのテーマ切り替え機能

## 必要条件

- Node.js 18.0.0以上
- Rust（最新版）
- システム依存のビルドツール（[Tauriの前提条件](https://tauri.app/v1/guides/getting-started/prerequisites)を参照）

## インストール

```bash
# リポジトリのクローン
git clone [リポジトリURL]
cd tauri-app

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run tauri dev
```

## 開発

```bash
# Next.js開発サーバーの起動
npm run dev

# Tauriアプリケーションの開発
npm run tauri dev

# 型チェック
npm run typecheck

# ビルド
npm run build
```

## プロジェクト構造

```
tauri-app/
├── src/                    # Next.jsフロントエンドコード
│   ├── app/                # App Router
│   ├── components/         # UIコンポーネント
│   ├── lib/               # ユーティリティ関数
│   └── styles/            # グローバルスタイル
├── src-tauri/             # Tauriバックエンド
│   ├── src/               # Rustソースコード
│   └── capabilities/      # Tauri権限設定
├── public/                # 静的ファイル
└── ...設定ファイル
```

## 主要な機能

- 📁 **ファイルエクスプローラー**: システムファイルの閲覧と操作
- 🖥 **システム情報**: OS情報の表示
- 🎨 **テーマ切り替え**: ダーク/ライトモードの切り替え
- 🚀 **高速な起動**: 最適化されたパフォーマンス

## セキュリティ

- Tauriのセキュリティモデルに基づく権限管理
- 適切なエラーハンドリング
- セキュアなIPC通信

## ライセンス

MITライセンス

## 貢献

1. このリポジトリをフォーク
2. 新しいブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'feat: add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 謝辞

- [Next.js](https://nextjs.org/)
- [Tauri](https://tauri.app/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
