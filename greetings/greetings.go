package greetings

import (
    "errors"
    "fmt"
    "math/rand"
    "time"
)

// init sets initial values for variables used in the function.
func init() {
    rand.Seed(time.Now().UnixNano())
}

// Hello returns a greeting for the named person.
func Hello(name string) (string, error) {
    // If no name was given, return an error with a message.
    if name == "" {
        return "", errors.New("empty name")
    }

    // Create a slice of message formats.
    formats := []string{
        "Hi, %v. Welcome!",
        "Great to see you, %v!",
        "Hail, %v! Well met!",
    }

    // Return a greeting that embeds the name in a message.
    message := fmt.Sprintf(formats[rand.Intn(len(formats))], name)
    return message, nil
} 