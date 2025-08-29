# LLM Agent POC (Browser-Based Multi-Tool Reasoning)

This is a **Proof-of-Concept** browser-based LLM agent that demonstrates multi-tool reasoning. The agent can:

- Take user input in the browser.
- Query an LLM for output.
- Dynamically trigger tool calls (Google Search, AI Pipe, JS code execution).
- Loop until the task is complete, integrating results at each step.

---

## Live Demo

[View the app on Render](https://llm-agent-poc-7m0u.onrender.com/)

---

## Features

- **Model Picker**: Select between GPT-4 or GPT-3.5.
- **Tools Integration**:
  - Google Search API snippets
  - AI Pipe API
  - Sandbox JS code execution
- **Conversation Window**: Displays user and agent messages.
- **Error Handling**: Alerts shown using Bootstrap.

---

## How to Run Locally

1. Clone the repo:

```bash
git clone https://github.com/Sreenija-19/llm-agent-poc.git
cd llm-agent-poc
# llm-agent-poc
