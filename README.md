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

## npm scriptについて

`package.json` の `scripts` という箇所に注目して見ましょう。

ここに書かれている `test:all` これは全てのテストプログラムを実行する為のコマンドになります。
 
`yarn run test:all` と実行して見ましょう。

テストコードが実行されたのが分かるかと思います。

テストコードは npm package の mocha というテスト用フレームワークを使って実行されています。

なので本当は下記のようにコマンドを実行しなければいけません。

```bash
./node_modules/.bin/mocha src/tests/**/*.test.js
```

`yarn` によってインストールされた mocha のライブラリをコマンドとして実行している訳ですね。

しかし毎回、このような長いコマンドを打つのは面倒だし引数に `src/tests/**/*.test.js` も面倒です。

そこで、`package.json` の `scripts` にコマンドを定義しておくと `yarn run コマンド名` で実行出来るようになるという訳です。

npm script と呼ばれるこの仕組みは地味に強力で便利なので把握しておくと良いでしょう。

## 本プロジェクトで定義されている npm script

本プロジェクトで定義されている npm script について説明しておきます。

### test

先程の `test:all` は全てのテストコードを実行しますが、こちらはテストコードが書かれたファイルを指定して実行します。

`yarn run test src/tests/algorithm/search.test.js` と実行してみて下さい。

テストが実行されたのが分かるかと思います。

さらに -g オプションで特定のテストケースだけを実行する事が可能です。

`yarn run test src/tests/algorithm/search.test.js -g testFallLinearSearchTargetIsNotFound` と実行してみて下さい。

### test:all

先程説明した通り全てのテストケースを実行する為のコマンドです。

### test:coverage

全てのテストを実行しつつコードカバレッジを出力する為のコマンドです。

`yarn run test:coverage` を実行した直後に `yarn run coverage:report:html` を実行してみて下さい。

`coverage` ディレクトリ内に HTMLやCSSファイルが生成されているかと思います。

`coverage/index.html` をブラウザで開いて見ましょう。

![coverage2017-10-27 00 08 49](https://user-images.githubusercontent.com/11032365/32060892-157a05b2-baab-11e7-975c-a00e4069827f.png)

こんな感じで、テストコードで実行された行が緑になって表示され、テストコードがどのくらいプログラム本体をテスト出来ているかを確認出来ます。

テストが網羅されているか確認する1つの指標になると思います。

ただし `カバレッジが100% != テストが全てOK` です。

カバレッジを通過していても、テストが出来ていないパターンは普通に存在するので、あくまで1つの目安に捉えましょう。

私個人の主観ですが、カバレッジはソースコード全体の80%程度カバー出来ていれば、最低限問題ないと思います。

それ以上になるとテストを書く極端に膨らむケースが多いと感じます。

何事もバランスが大事だと思います。

### test:debug

Debuggerを起動させつつ、テストを実行する為のコマンドです。

事前準備としてテストを実行したい箇所に `debugger;` という記述を追加しておく必要があります。

今回デバッグ対象にしたいのは `ojt-node/src/algorithm/search.js` なのでファイルの先頭にでも追記します。

```javascript 1.8
// ojt-node/src/algorithm/search.js の先頭に以下を追加
debugger;
```

次に `yarn run test:debug src/tests/algorithm/search.test.js` と実行して下さい。

Google Chromeのアドレスバーに `chrome://inspect` と入力して下さい。

そうすると、下記のような画面が開くので、`inspect` のリンクを開くとデバッグがDebuggerが起動します。

![node-debug1](https://user-images.githubusercontent.com/11032365/32061970-191c870a-baae-11e7-892e-7e6c54a14309.png)

ステップ実行で変数の中身等を確認しながら問題点の確認が出来ます。

![node-debug2](https://user-images.githubusercontent.com/11032365/32062319-23f716da-baaf-11e7-9fb4-1265b1f03056.png)

実行が終わると `Waiting for the debugger to disconnect...` というメッセージがコンソール上に表示されるので、Debuggerを閉じましょう。

※ 閉じないとテストが終了しないです。

ちなみに、この手順に関してのみ Mac上でNode.jsが実行出来る環境になっている前提です。（本カリキュラムで用意した [ojt-linux-vagrant](https://github.com/keita-nishimoto/ojt-linux-vagrant) を利用している場合）

vagrant上のプログラムをローカルのChromeDebuggerでデバックする方法はあるので、[こちらの記事](http://keruuweb.com/node-js-vagrant%E4%B8%8A%E3%81%AEnode-js%E3%82%92chrome%E3%81%A7%E3%83%87%E3%83%90%E3%83%83%E3%82%B0%E3%81%99%E3%82%8B/) 等を参考に挑戦してみるといいでしょう。

JavaScript だと一番、簡単なデバッグ方法として `console.log(変数名);` みたいに console APIを使ってデバッグをする方法もありますが、これは問題のある箇所がある程度特定出来ている時には有効ですが、どこで問題が起きているか分からない場合は効率が悪い事も多いです。

Debuggerを使いこなすには少しだけ訓練が必要ですが、十分にリターンを得られるだけの開発効率が身につけられるので、効率が悪いなと感じたら、是非ともチャレンジしてみて下さい。

