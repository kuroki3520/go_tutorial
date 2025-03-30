package greeting

import "fmt"

// Greet returns a greeting message for the given name
func Greet(name string) string {
	if name == "" {
		name = "World"
	}
	return fmt.Sprintf("Hello, %s!", name)
}

// GreetInJapanese returns a greeting message in Japanese
func GreetInJapanese(name string) string {
	if name == "" {
		name = "世界"
	}
	return fmt.Sprintf("こんにちは、%s！", name)
} 