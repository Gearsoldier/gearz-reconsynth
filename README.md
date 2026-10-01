# 🧠 GEARZ ReconSynth

GEARZ ReconSynth is a local Next.js interface for an authorized domain-reconnaissance workflow. It runs ProjectDiscovery's subfinder to enumerate subdomains, passes the results to ProjectDiscovery's httpx for HTTP probing, and displays the combined report in the browser.

Built with Next.js 14, React, TypeScript, Tailwind CSS, and react-markdown.

## Current functionality

1. Accept a domain through the web interface
2. Run subfinder on that domain
3. If subdomains are returned, probe them with httpx
4. Display the command output as a Markdown report

The active API route imports [`lib/recon.ts`](lib/recon.ts). A separate [`lib/ai.ts`](lib/ai.ts) contains an Ollama-based analysis variant, but the route does not call it. AI analysis and hosted OpenAI support are not part of the current application flow.

Employee discovery, breach-dump analysis, and GitHub secret scanning are also not implemented.

## Important security limitation

**Keep this prototype local and trusted-only.** The current backend interpolates the submitted target into a shell command. Its API validates only that the input is a nonempty string, which leaves a command-injection risk. Do not expose the app to untrusted users or accept copied, unreviewed input.

Use only a plain domain that you own or are explicitly authorized to assess. The form mentions company names, but the implemented command expects a domain. Input validation, safer process invocation, authentication, and resource limits need work before shared deployment.

httpx makes network requests to discovered hosts. Confirm that the discovered subdomains are included in your authorization before running this workflow.

## Requirements

- Node.js and npm compatible with the locked Next.js 14.2.30 release
- [ProjectDiscovery subfinder](https://docs.projectdiscovery.io/opensource/subfinder/install)
- [ProjectDiscovery httpx](https://docs.projectdiscovery.io/opensource/httpx/install)

Install the two external tools using their official instructions and make both executables available on the `PATH` inherited by the Next.js server. The Python HTTPX library is a different project and does not supply the expected recon tool.

Check that the correct tools are available without starting a scan:

```bash
subfinder -version
httpx -version
```

Ollama and an OpenAI API key are not required by the active route. Reconnaissance requires network access.

## Local setup

```bash
git clone https://github.com/Gearsoldier/gearz-reconsynth.git
cd gearz-reconsynth
npm ci
npm run dev -- --hostname 127.0.0.1
```

Open [http://localhost:3000](http://localhost:3000), enter an authorized plain domain, and select **Begin Recon**. The report includes subfinder output and, when subdomains are found, httpx output. Errors from the toolchain are returned in the report.

Run the app in an environment that supports Node.js child processes and the required command-line tools. A static export or browser-only host cannot execute this backend.

## Project structure

- [`app/page.tsx`](app/page.tsx): target form and Markdown report
- [`app/api/recon/route.ts`](app/api/recon/route.ts): POST endpoint and basic input check
- [`lib/recon.ts`](lib/recon.ts): active subfinder → httpx pipeline
- [`lib/ai.ts`](lib/ai.ts): separate, currently unwired Ollama analysis variant
- [`package.json`](package.json): dependencies and scripts

## Development commands

- `npm run dev`: start the development server
- `npm run build`: create a production build
- `npm run start -- --hostname 127.0.0.1`: serve an existing build locally

There are no dedicated test or lint scripts and no automated test suite in this repository. A successful build would not verify the external reconnaissance tools, target authorization, or the security of the API.

## Troubleshooting

- **Command not found:** check that subfinder and ProjectDiscovery httpx are installed and visible to the server process
- **No subdomains found:** the pipeline stops before HTTP probing; this is not proof that the domain has no other assets
- **No AI section:** expected with the current route; the Ollama variant is not wired into it
- **Large or slow jobs:** the pipeline uses buffered shell commands and has no job queue, cancellation UI, or explicit per-command timeout configuration

## Responsible use

Run reconnaissance only within an explicit, current authorization. Review the scope of every discovered host and follow the relevant program or organization's testing rules. Treat reports as unverified observations rather than proof of a vulnerability.
