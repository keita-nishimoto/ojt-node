# ojt-node
OJT用。JavaScriptの基礎を学ぶ為のリポジトリ。

## 動作環境

Node.js v8.7.0 が必要です。

また `yarn` というpackageがグローバルインストールされている必要があります。

`npm install -g yarn` と実行するとインストールが可能です。

`yarn --version` と実行して以下のように表示されたらインストールが完了しています。

```text
$ yarn --version
1.2.1
```

[web-developer-ojt/linux/task.md](https://github.com/keita-nishimoto/web-developer-ojt/blob/master/linux/task.md) に載っている課題が完了していれば、`yarn` 以外の環境は出来ている想定です。

`npm` や `yarn` については後で詳しく記述します。

## package管理システムの概要

はじめに `yarn` と `npm` について軽く説明します。

`yarn` はFacebook製のpackage管理システムです。

本プロジェクトの直下に移動して `yarn install` を実行してみて下さい。

しばらく時間が経つと、`node_modules` というディレクトリが作成されている事が分かると思います。

このコマンドは `package.json` 内に書かれているpackageをインターネット上からダウンロードしてくる為の行動です。

`yarn.lock` というファイルはダウンロード時のpackageのバージョンを固定する為の物です。

ダウンロードして保存する先が `node_modules` ディレクトリという訳です。

このファイルをgitで管理しておけば理論上、誰の環境でも同じ環境が作れるという訳です。

このpackage管理の仕組み上、`node_modules` はgit管理をしないのが一般的です。 

ちなみに Node.js 公式のpackage管理システムが `npm` です。

なので `npm install` と実行しても同じ事が出来ますが、現状まだ `yarn` のほうが便利な点が多いのでlessonでは `yarn` を利用します。

ちなみに `package.json` の書き方は `npm` との互換性があるので、後で `npm` に乗り換えてもそれ程学習コストは発生しないでしょう。

筆者は逆に `npm` から `yarn` に乗り換えた経験がありますが、慣れるまでほとんど時間がかかりませんでした。

`package.json` の書き方は以下のドキュメントを参考にして下さい。

- [原文](https://docs.npmjs.com/files/package.json)
- [日本語訳](http://liberty-technology.biz/PublicItems/npm/package.json.html)

ちなみに `yarn` をインストールした時に使った `-g` というオプションはグローバルインストールという意味で該当プロジェクトの直下にだけではなく、システム全体でそのpackageが利用出来るようになります。

`-g` を使うのはプロジェクトを横断して実行するような一部の特殊なコマンドだけで他のpackageは基本的に各プロジェクト毎に管理するのが一般的です。

以上が Node.js でのpackage管理の仕組みですが、他の言語のpackage管理システムも大きくは変わりません。

近年ではどの言語でも、このような形でpackage管理を行うのが一般的という事を把握しておいて下さい。

### packageを追加するには

本プロジェクト直下で `yarn add package-name` のように実行します。

これを行うとpackageのダウンロードを行いつつ `package.json` にもpackage情報を自動的に書き込んでくれます。

実際に実行すると `package.json` の `dependencies` に新しいpackageが書き込まれている事が確認出来ます。

似たような項目に `devDependencies` という項目がありますが、こちらはテストの際や開発中にしか使わないpackageを入れる為の物です。

`dependencies` には実際に本番環境のプログラム上で利用するライブラリだけを含める事が推奨されます。

どちらに入れても挙動に変化がない事が多いですが一部のツールでは、この違いによって挙動が変わる物も存在するので一応、把握しておいて下さい。

※ `devDependencies` にpackageを書き込むには `yarn add package-name --dev` のように `--dev` を付けます。
