import { exec } from 'child_process'
import util from 'util'

const execAsync = util.promisify(exec)

export async function runReconPipeline(target: string): Promise<string> {
  let output = `🔍 Recon Report for: ${target}\n\n`

  try {
    // 1. Subdomain Enumeration
    output += `🌐 Subdomain scan using subfinder:\n`
    const { stdout: subdomains } = await execAsync(`subfinder -d ${target} -silent`)
    output += subdomains + '\n'

    // 2. HTTP Probing
    output += `📸 Probing active domains with httpx:\n`
    const { stdout: httpxOut } = await execAsync(`echo "${subdomains}" | httpx -silent`)
    output += httpxOut + '\n'

    // 3. AI Analysis (Ollama only, no env needed)
    const prompt = `
You are an expert OSINT analyst helping a bug bounty hunter.

Given the following recon data, identify:
- The top 3 high-value targets or endpoints
- Why they are interesting (tech stack, auth, potential flaws)
- Next steps to test or exploit

Recon Data:
---
${output}
---

Respond in markdown with sections and bullet points.
`

    const res = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      body: JSON.stringify({
        model: 'llama3',
        prompt: prompt,
        stream: false,
      }),
    })

    const data = await res.json()
    const aiOutput = data.response || '⚠️ AI response failed.'

    output += `\n🧠 AI-Powered Suggestions:\n\n${aiOutput}`
    return output
  } catch (error: any) {
    return `❌ Recon failed: ${error.message}`
  }
}
