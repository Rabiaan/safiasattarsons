// build/memab.mjs - A/B renderer memory: blank page vs a full site session
import { execSync } from 'node:child_process';
import path from 'node:path';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const root = process.argv[2];
const pages = process.argv[3] || '';
const label = process.argv[4] || 'run';

function ps(cmd) {
  return execSync(`powershell -NoProfile -Command "${cmd}"`, { encoding: 'utf8' }).trim();
}
function totalMB() {
  const out = ps(
    "$p = Get-Process chrome -ErrorAction SilentlyContinue; " +
    "if ($p) { [math]::Round((($p | Measure-Object WorkingSet64 -Sum).Sum)/1MB,0) } else { 0 }"
  );
  return Number(out);
}
function rendererMB() {
  const out = ps(
    "$p = Get-Process chrome -ErrorAction SilentlyContinue | Sort-Object WorkingSet64 -Descending | Select-Object -First 1; " +
    "if ($p) { [math]::Round($p.WorkingSet64/1MB,0) } else { 0 }"
  );
  return Number(out);
}

ps("Get-Process chrome -ErrorAction SilentlyContinue | Stop-Process -Force");
await new Promise((r) => setTimeout(r, 2000));
console.log(`\n[${label}] baseline (no chrome): ${totalMB()} MB`);

const env = pages ? { PAGES: pages } : {};
const child = execSync(
  `node "${path.join(root, 'build', 'memcheck.mjs')}"`,
  { encoding: 'utf8', env: { ...process.env, ...env, HOLD: '15000' }, timeout: 300000 }
);
console.log(child.split('\n').filter((l) => /MB|PAGE|---/.test(l)).slice(-14).join('\n'));

const peakTotal = totalMB();
const peakRenderer = rendererMB();
console.log(`[${label}] chrome total working set: ${peakTotal} MB   largest process (renderer): ${peakRenderer} MB`);
ps("Get-Process chrome -ErrorAction SilentlyContinue | Stop-Process -Force");
