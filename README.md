# Go Tutorial Project

このリポジトリは、[Go公式チュートリアル](https://go.dev/doc/tutorial/create-module)に沿って学習するためのプロジェクトです。

## プロジェクト構成

- `greetings/`: 再利用可能なモジュールとして実装された挨拶機能
  - `greetings.go`: 挨拶機能の実装
  - `go.mod`: モジュール定義ファイル

- `hello/`: greetingsモジュールを使用するサンプルアプリケーション
  - `main.go`: アプリケーションのエントリーポイント
  - `go.mod`: モジュール定義ファイル

## 実行方法

helloアプリケーションを実行するには：

```bash
cd hello
go run .
```

## 依存関係の管理

このプロジェクトはGo Modulesを使用して依存関係を管理しています：

```bash
go mod tidy  # 依存関係を整理
```

## チュートリアルの進捗

1. ✅ Create a module -- Write a small module with functions you can call from another module.
2. ✅ Call your code from another module -- Import and use your new module.
3. ✅ Return and handle an error -- Add simple error handling.
4. ✅ Return a random greeting -- Handle data in slices (Go's dynamically-sized arrays).
5. ⬜️ Return greetings for multiple people -- Store key/value pairs in a map.
6. ⬜️ Add a test -- Use Go's built-in unit testing features to test your code.
7. ⬜️ Compile and install the application -- Compile and install your code locally. 