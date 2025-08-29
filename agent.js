const conversationEl = document.getElementById("conversation");
const userInputEl = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const modelPicker = document.getElementById("modelPicker");
const alertContainer = document.getElementById("alertContainer");

let messages = [];

sendBtn.onclick = async () => {
    const text = userInputEl.value.trim();
    if (!text) return;
    appendMessage(text, "user-msg");
    userInputEl.value = "";
    messages.push({ role: "user", content: text });
    await agentLoop();
};

function appendMessage(text, cls) {
    const div = document.createElement("div");
    div.className = cls;
    div.innerText = text;
    conversationEl.appendChild(div);
    conversationEl.scrollTop = conversationEl.scrollHeight;
}

function showAlert(msg) {
    alertContainer.innerHTML = `<div class="alert alert-danger">${msg}</div>`;
    setTimeout(() => alertContainer.innerHTML = "", 3000);
}

// Tool Implementations
async function callGoogleSearch(query) {
    try {
        const resp = await fetch(`https://your-google-search-proxy.com/search?q=${encodeURIComponent(query)}`);
        const data = await resp.json();
        return data.snippets.join("\n");
    } catch(e) {
        showAlert("Google Search failed");
        return "";
    }
}

async function callAIPipe(input) {
    try {
        const resp = await fetch(`https://your-aipipe-proxy.com/run`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ input })
        });
        const data = await resp.json();
        return data.output;
    } catch(e) {
        showAlert("AI Pipe call failed");
        return "";
    }
}

async function executeJS(code) {
    try {
        return eval(code);
    } catch(e) {
        return `JS Error: ${e.message}`;
    }
}

// Main Agent Loop
async function agentLoop() {
    try {
        const lastMessage = messages[messages.length - 1].content;
        let output = "";
        let toolCalls = [];

        if (lastMessage.toLowerCase().includes("search ")) {
            toolCalls.push({ tool: "google_search", input: lastMessage.replace(/search /i, "") });
        } else if (lastMessage.toLowerCase().includes("aipipe ")) {
            toolCalls.push({ tool: "aipipe", input: lastMessage.replace(/aipipe /i, "") });
        } else if (lastMessage.toLowerCase().includes("js ")) {
            toolCalls.push({ tool: "js", input: lastMessage.replace(/js /i, "") });
        } else {
            output = `Agent: You said "${lastMessage}"`;
        }

        for (let tc of toolCalls) {
            let result = "";
            if (tc.tool === "google_search") result = await callGoogleSearch(tc.input);
            else if (tc.tool === "aipipe") result = await callAIPipe(tc.input);
            else if (tc.tool === "js") result = await executeJS(tc.input);
            output += `\n[${tc.tool} result]: ${result}`;
            messages.push({ role: "tool", content: result });
        }

        appendMessage(output, "agent-msg");

    } catch (err) {
        showAlert(err.message);
    }
}
