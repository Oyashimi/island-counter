# island-counter

H×Wのグリッド上で連続する床(`.`)の最大領域を求め、DFS/BFSのメモリの使い方の違いを可視化するWebアプリ。

## 開発

```sh
npm install
npm run dev
```

## ビルド

```sh
npm run build
```

出力先は`dist/`。

## デプロイ

Cloudflare PagesにGitHub連携で配置する。ダッシュボードでの設定は次の通り。

| 項目 | 値 |
|---|---|
| ビルドコマンド | `npm run build` |
| ビルド出力ディレクトリ | `dist` |

## 構成

```
index.html
src/
  main.ts          UIの配線
  grid.ts          盤面データとランダム生成
  style.css
  algorithms/      最大領域を求めるアルゴリズム(cpp/から移植)
  render/
    canvas.ts      盤面のCanvas描画
cpp/               アルゴリズムのC++原本(参照用)
```
