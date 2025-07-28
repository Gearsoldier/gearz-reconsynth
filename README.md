ChatGPT said:
Absolutely — here’s your polished README for GEARZ ReconSynth, rewritten for clarity and professionalism while keeping your cyberpunk/AI vibe intact. Includes full setup instructions for both Ollama and OpenAI users:

markdown
Copy
Edit
# 🧠 GEARZ ReconSynth

GEARZ ReconSynth is an AI-powered reconnaissance engine built for bug bounty hunters, red teamers, and OSINT pros. Just input a company name or domain — and ReconSynth will scan public data for subdomains, leaks, employee info, and exposed GitHub assets, then use AI to prioritize the most exploitable targets.

---

## ⚙️ Setup

### 1. Clone the Repo

```bash
git clone https://github.com/Gearsoldier/gearz-reconsynth.git
cd gearz-reconsynth
npm install
2. Run the App
bash
Copy
Edit
npm run dev
Open http://localhost:3000 in your browser.

🤖 AI Backend Options (Choose One)
Option A: Use Ollama (Local AI)
Install Ollama and pull the LLaMA3 model locally:

🪟 Windows
powershell
Copy
Edit
winget install Ollama.Ollama
ollama run llama3
🍎 macOS
bash
Copy
Edit
brew install ollama
ollama run llama3
🐧 Linux
bash
Copy
Edit
curl -fsSL https://ollama.com/install.sh | sh
ollama run llama3
Ollama will run locally at http://localhost:11434.

Option B: Use OpenAI API (Cloud)
Add your API key to the environment:

bash
Copy
Edit
export OPENAI_API_KEY=sk-...
You can edit lib/ai.ts to switch between local (Ollama) or OpenAI endpoints.

🔍 Features
🌐 Domain & subdomain OSINT

🕵️ Credential & breach dump analysis

📂 GitHub repo + key exposure scanning

🧠 AI prioritization of attack paths

🧪 Instant results, no setup required

🦾 Works offline with Ollama
