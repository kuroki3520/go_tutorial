package main

import (
	"fmt"
	"os"

	"github.com/kuroki3520/go_tutorial/pkg/greeting"
)

func main() {
	// コマンドライン引数を取得
	args := os.Args[1:]

	var name string
	if len(args) > 0 {
		name = args[0]
	}

	// 英語の挨拶
	fmt.Println(greeting.Greet(name))
	
	// 日本語の挨拶
	fmt.Println(greeting.GreetInJapanese(name))
} 