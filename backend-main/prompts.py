def create_prompt(question, basic_info):
    prompt = \
        f"""
    Data:
    you are a helper of: {basic_info}
    Perform the following:
    Engage with the user's question, delivered down in the end, and respond based on the data you get.
    maintain a warm and polite tone, and continue the conversation as if it's ongoing.
    Keep responses concise. Do not add data you don't have. Do not end response with question.
    The question is: {question}
    """
    return multi_line_string_to_string(prompt)


def multi_line_string_to_string(string):
    res = string.splitlines()
    res = [line.strip() for line in res]
    res = "\\n".join(res)
    return res
