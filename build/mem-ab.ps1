# build/mem-ab.ps1 - measure Chrome renderer memory for different page sets
param([string]$Root = "C:\Users\user1\Downloads\stitch_modern_website_redesign")

function Measure-Session([string]$Pages, [string]$Label) {
  Get-Process chrome -ErrorAction SilentlyContinue | Stop-Process -Force
  Start-Sleep -Seconds 2
  $env:PAGES = $Pages
  $env:HOLD = "12000"
  $job = Start-Job -ScriptBlock { param($b) node "$b\build\memcheck.mjs" 2>&1 } -ArgumentList $Root
  Start-Sleep -Seconds 9
  $peak = 0; $peakR = 0
  for ($i = 0; $i -lt 14; $i++) {
    $p = Get-Process chrome -ErrorAction SilentlyContinue
    if ($p) {
      $ws = ($p | Measure-Object WorkingSet64 -Sum).Sum
      $r  = ($p | Sort-Object WorkingSet64 -Descending | Select-Object -First 1).WorkingSet64
      if ($ws -gt $peak) { $peak = $ws }
      if ($r -gt $peakR) { $peakR = $r }
    }
    Start-Sleep -Seconds 2
  }
  $out = Receive-Job $job -Wait -ErrorAction SilentlyContinue
  Stop-Job $job -ErrorAction SilentlyContinue; Remove-Job $job -Force -ErrorAction SilentlyContinue
  Get-Process chrome -ErrorAction SilentlyContinue | Stop-Process -Force
  "{0,-28} chrome total {1,6} MB | largest proc {2,6} MB" -f $Label, [math]::Round($peak/1MB), [math]::Round($peakR/1MB)
}

Write-Output "=== renderer memory A/B (headless Chrome) ==="
Measure-Session "contact" "1 small page (contact)"
Measure-Session "index" "1 home page"
Measure-Session "product" "1 heavy page (product)"
Measure-Session "index,about,service,product,rice,oil,vegetables,fruits,spices,contact" "ALL 10 pages"
