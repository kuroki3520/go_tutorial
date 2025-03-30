package greeting

import "testing"

func TestGreet(t *testing.T) {
	tests := []struct {
		name     string
		input    string
		expected string
	}{
		{
			name:     "empty name",
			input:    "",
			expected: "Hello, World!",
		},
		{
			name:     "with name",
			input:    "Go",
			expected: "Hello, Go!",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := Greet(tt.input); got != tt.expected {
				t.Errorf("Greet() = %v, want %v", got, tt.expected)
			}
		})
	}
}

func TestGreetInJapanese(t *testing.T) {
	tests := []struct {
		name     string
		input    string
		expected string
	}{
		{
			name:     "empty name",
			input:    "",
			expected: "こんにちは、世界！",
		},
		{
			name:     "with name",
			input:    "Go言語",
			expected: "こんにちは、Go言語！",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := GreetInJapanese(tt.input); got != tt.expected {
				t.Errorf("GreetInJapanese() = %v, want %v", got, tt.expected)
			}
		})
	}
} 