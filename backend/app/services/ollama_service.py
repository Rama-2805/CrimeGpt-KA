import ollama


def chat_with_ai(messages):

    response = ollama.chat(
        model="qwen2.5-coder:14b",
        messages=messages,
    )

    return response["message"]["content"]