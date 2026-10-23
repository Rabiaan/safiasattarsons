# build/optimize-images.ps1 - downscale and re-encode oversized images
# Keeps every image under a sane decoded-memory budget so the browser never OOMs.
param(
  [string]$Root = "C:\Users\user1\Downloads\stitch_modern_website_redesign",
  [int]$MaxDim = 1600,
  [int]$Quality = 82,
  [int]$PngToJpegKb = 200
)

Add-Type -AssemblyName System.Drawing

$imgDir = Join-Path $Root 'images'
$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$encParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]$Quality)

$before = 0L; $after = 0L; $savedBytes = 0L; $converted = @{}; $shrunk = 0

$files = Get-ChildItem $imgDir -Recurse -File | Where-Object { $_.Extension -match '^\.(jpg|jpeg|png)$' }

foreach ($f in $files) {
  $before += $f.Length
  $src = $null; $bmp = $null
  try {
    $src = [System.Drawing.Image]::FromFile($f.FullName)
    $w = $src.Width; $h = $src.Height
    $hasAlpha = (($src.PixelFormat -band [System.Drawing.Imaging.PixelFormat]::Alpha) -ne 0)
    $isPng = $f.Extension -match '^\.png$'
    $tooBig = [math]::Max($w, $h) -gt $MaxDim
    $pngWorthConverting = $isPng -and -not $hasAlpha -and ($f.Length/1KB) -gt $PngToJpegKb

    if (-not $tooBig -and -not $pngWorthConverting) { $after += $f.Length; $src.Dispose(); continue }

    $scale = 1.0
    if ($tooBig) { $scale = $MaxDim / [math]::Max($w, $h) }
    $nw = [math]::Max(1, [int][math]::Round($w * $scale))
    $nh = [math]::Max(1, [int][math]::Round($h * $scale))

    $bmp = New-Object System.Drawing.Bitmap($nw, $nh)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.DrawImage($src, 0, 0, $nw, $nh)
    $g.Dispose(); $src.Dispose(); $src = $null

    $target = $f.FullName
    if ($pngWorthConverting) {
      $target = [System.IO.Path]::ChangeExtension($f.FullName, '.jpg')
      $rel = $f.FullName.Substring($imgDir.Length + 1)
      $converted[$rel] = $rel.Substring(0, $rel.Length - 4) + '.jpg'
    }

    $tmp = "$target.tmp"
    if ($target.ToLower().EndsWith('.jpg') -or $target.ToLower().EndsWith('.jpeg')) {
      $bmp.Save($tmp, $jpegCodec, $encParams)
    } else {
      $bmp.Save($tmp, [System.Drawing.Imaging.ImageFormat]::Png)
    }
    $bmp.Dispose(); $bmp = $null

    Move-Item -LiteralPath $tmp -Destination $target -Force
    if ($pngWorthConverting) { Remove-Item -LiteralPath $f.FullName -Force }
    $newLen = (Get-Item -LiteralPath $target).Length
    $after += $newLen
    $savedBytes += ($f.Length - $newLen)
    $shrunk++
  } catch {
    Write-Output "  ! skipped $($f.Name): $($_.Exception.Message)"
    if ($src) { $src.Dispose() }
    if ($bmp) { $bmp.Dispose() }
    $after += $f.Length
  }
}

Write-Output "processed $($files.Count) images | $shrunk optimised"
Write-Output ("payload: {0:N1} MB -> {1:N1} MB (saved {2:N1} MB)" -f ($before/1MB), ($after/1MB), ($savedBytes/1MB))

if ($converted.Count) {
  $mapPath = Join-Path $Root 'build\image-map.json'
  $converted | ConvertTo-Json | Set-Content -LiteralPath $mapPath -Encoding UTF8
  Write-Output "converted $($converted.Count) PNG photo(s) -> JPEG; map written to build\image-map.json"
}
