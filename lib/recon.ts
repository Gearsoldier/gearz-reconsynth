import { exec } from 'child_process'
import util from 'util'

const execAsync = util.promisify(exec)

export async function runReconPipeline(target: string): Promise<string> {
  let output = `🔍 GEARZ Recon Report for: ${target}\n\n`

  try {
    // 1. Subdomain Enumeration with subfinder
    output += `🌐 Running subfinder...\n`
    const { stdout: subfinderOut } = await execAsync(`subfinder -d ${target} -silent`)
    const subdomains = subfinderOut
      .split('\n')
      .filter((line) => line.trim() !== '')
      .join('\n')
    output += subdomains + '\n\n'

    if (!subdomains) {
      output += `⚠️ No subdomains found.\n`
      return output
    }

    // 2. Probing with httpx (ensure it's piped cleanly)
    output += `📸 Running httpx on discovered subdomains...\n`
    const { stdout: httpxOut } = await execAsync(`echo "${subdomains}" | httpx -silent`)
    output += httpxOut + '\n\n'

    output += `✅ Recon complete. Tools used: subfinder + httpx\n`

    return output
  } catch (err: any) {
    return `❌ Recon failed: ${err.message}`
  }
}
