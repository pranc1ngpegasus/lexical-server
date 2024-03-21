# lexical-server

リッチテキストエディタの[lexical](https://lexical.dev/)形式に合わせたHTML/JSON/Markdownを相互に変換できるサーバです。

## 仕組み
lexicalは`@lexical/headless`パッケージを提供しており、フロントエンドの環境がなくともheadlessエディタ内で操作をすることができます。
例えば`/html_to_json`エンドポイントはlexical形式のHTMLをリクエストボディに受け取り、headlessエディタに取り込んだあとJSON形式で吐き出したものをレスポンスとして返却します。

## 起動方法

パッケージマネージャおよびランタイムに[bun](https://bun.sh/)を利用しています。
`bun install`で依存パッケージをインストールしたのち、`bun run`で起動させます。

```shell
bun install
```

```shell
bun run --hot index.ts
```

## 注意点

HTMLをパースするパッケージであるJSDOMがNode.js依存が強い(fsとか)パッケージであるためCloudflare Workersやdenoなどの互換ランタイム上ではうまく動作しません。
