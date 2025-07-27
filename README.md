# 🤖 GEARZ ReconSynth

GEARZ ReconSynth is an AI-powered OSINT and attack surface mapping tool built for bug bounty hunters and red teamers. Just input a company name or domain — and ReconSynth returns subdomains, leaked credentials, employee data, GitHub exposures, and AI-ranked attack vectors.

---

## 🧠 Features

- 🛰️ Domain + subdomain enumeration  
- 🕵️‍♂️ Email and credential leak scanning  
- 🔍 GitHub OSINT (exposed keys, repos)  
- 🧠 AI-powered attack surface prioritization  
- ⚡ Instant output, no config needed  
- 🦾 Works offline via Ollama or online via OpenAI  

---

## ⚙️ Setup

### 1. Clone and install
### 2. must be running ollama or an AI in the backend for app responses

### ON WINDOWS
### winget install Ollama.Ollama
### ollama serve
### ollama run llama3

ON macOS
###brew install ollama
###ollama serve
###ollama run llama3


###RUN THE APP 
###npm run dev

### VISIT
### http://localhost:3000


```bash
git clone https://github.com/Gearsoldier/gearz-reconsynth.git
cd gearz-reconsynth
npm install
