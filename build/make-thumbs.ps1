# build/make-thumbs.ps1 - generate light-weight thumbnails for catalogue (product grid) images
# Product grids show ~130 images at once; full-resolution photos decode to hundreds of MB.
param(
  [string]$Root = "C:\Users\user1\Downloads\stitch_modern_website_redesign",
  [int]$MaxDim = 600,
  [int]$Quality = 80
)

Add-Type -AssemblyName System.Drawing

$imgDir = Join-Path $Root 'images'
$thumbDir = Join-Path $imgDir 'thumbs'
New-Item -ItemType Directory -Path $thumbDir -Force | Out-Null

$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$encParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]$Quality)

# only catalogue images (referenced by the product data) get thumbnails
$catFiles = Get-ChildItem (Join-Path $Root 'build\legacy-data') -Filter *.js -ErrorAction SilentlyContinue
$wanted = New-Object System.Collections.Generic.HashSet[string]
foreach ($f in $catFiles) {
  $txt = Get-Content -LiteralPath $f.FullName -Raw
  foreach ($m in [regex]::Matches($txt, 'images/([A-Za-z0-9 _\-\./&+]+\.(?:png|jpe?g))')) {
    [void]$wanted.Add($m.Groups[1].Value.Trim())
  }
}

$made = 0; $kept = 0; $bytes = 0L
foreach ($rel in $wanted) {
  $srcRel = $rel -replace '^products/', ''
  $srcPath = Join-Path $imgDir ($rel -replace '/', '\')
  if (-not (Test-Path -LiteralPath $srcPath)) { continue }
  $outRel = $srcRel
  if ([System.IO.Path]::GetExtension($outRel) -ne '.jpg') {
    $outRel = [System.IO.Path]::ChangeExtension($outRel, '.jpg')
  }
  $outPath = Join-Path $thumbDir ($outRel -replace '/', '\')
  $outDir = Split-Path $outPath -Parent
  if (-not (Test-Path -LiteralPath $outDir)) { New-Item -ItemType Directory -Path $outDir -Force | Out-Null }

  $src = $null; $bmp = $null
  try {
    $src = [System.Drawing.Image]::FromFile($srcPath)
    $w = $src.Width; $h = $src.Height
    $scale = [math]::Min(1.0, $MaxDim / [math]::Max($w, $h))
    $nw = [math]::Max(1, [int][math]::Round($w * $scale))
    $nh = [math]::Max(1, [int][math]::Round($h * $scale))

    $bmp = New-Object System.Drawing.Bitmap($nw, $nh)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.DrawImage($src, 0, 0, $nw, $nh)
    $g.Dispose(); $src.Dispose(); $src = $null

    $tmp = "$outPath.tmp"
    $bmp.Save($tmp, $jpegCodec, $encParams)
    $bmp.Dispose(); $bmp = $null
    Move-Item -LiteralPath $tmp -Destination $outPath -Force
    $bytes += (Get-Item -LiteralPath $outPath).Length
    $made++
  } catch {
    Write-Output "  ! skipped $rel : $($_.Exception.Message)"
    if ($src) { $src.Dispose() }
    if ($bmp) { $bmp.Dispose() }
  }
}
Write-Output "thumbnails: $made created in images\thumbs ($([math]::Round($bytes/1KB)) KB total)"
