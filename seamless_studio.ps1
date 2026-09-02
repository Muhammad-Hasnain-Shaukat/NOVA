Add-Type -AssemblyName System.Drawing

$src = "C:\Users\Doctor Computers\.gemini\antigravity-ide\brain\0c1c8887-00b2-4bd0-a875-1c49b1f63b3f\nova_male_streetwear_1788346104155.jpg"
$outDir = "C:\Users\Doctor Computers\.gemini\antigravity-ide\scratch\NOVA\assets"

$img = [System.Drawing.Bitmap]::FromFile($src)
$w = $img.Width
$h = $img.Height

$plain = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$masked = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# Render with smooth alpha feathering towards the 4 borders so it blends seamlessly into the website
for ($y = 0; $y -lt $h; $y++) {
    $ny = $y / [double]$h
    for ($x = 0; $x -lt $w; $x++) {
        $nx = $x / [double]$w
        $c = $img.GetPixel($x, $y)

        # Calculate edge feathering alpha
        $alphaLeft = [Math]::Min(1.0, [Math]::Max(0.0, ($nx - 0.05) / 0.18))
        $alphaRight = [Math]::Min(1.0, [Math]::Max(0.0, (0.95 - $nx) / 0.18))
        $alphaTop = [Math]::Min(1.0, [Math]::Max(0.0, ($ny - 0.03) / 0.12))
        $alphaBottom = [Math]::Min(1.0, [Math]::Max(0.0, (0.98 - $ny) / 0.08))

        $edgeAlpha = [Math]::Min($alphaLeft, [Math]::Min($alphaRight, [Math]::Min($alphaTop, $alphaBottom)))
        $finalAlpha = [int]($edgeAlpha * 255)

        $plain.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($finalAlpha, $c.R, $c.G, $c.B))

        # Masked layer: futuristic cyan-tinted cyber techwear
        $r = [int]($c.R * 0.7)
        $g = [Math]::Min(255, [int]($c.G * 1.15))
        $b = [Math]::Min(255, [int]($c.B * 1.4 + 20))
        $masked.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($finalAlpha, $r, $g, $b))
    }
}

$plainPath = Join-Path $outDir "male-plain.png"
$maskedPath = Join-Path $outDir "male-masked.png"

$plain.Save($plainPath, [System.Drawing.Imaging.ImageFormat]::Png)
$masked.Save($maskedPath, [System.Drawing.Imaging.ImageFormat]::Png)

$img.Dispose()
$plain.Dispose()
$masked.Dispose()

Write-Host "Seamless studio image created with perfect edge feathering!"
