Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\Doctor Computers\.gemini\antigravity-ide\brain\0c1c8887-00b2-4bd0-a875-1c49b1f63b3f\nova_male_streetwear_1788346104155.jpg"
$outDir = "C:\Users\Doctor Computers\.gemini\antigravity-ide\scratch\NOVA\assets"
if (!(Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir -Force }

$img = [System.Drawing.Bitmap]::FromFile($srcPath)
$width = $img.Width
$height = $img.Height

$outPlain = New-Object System.Drawing.Bitmap($width, $height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$outMasked = New-Object System.Drawing.Bitmap($width, $height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# Background color sampling from corners & top border
$bgR = 148.0
$bgG = 148.0
$bgB = 146.0

for ($y = 0; $y -lt $height; $y++) {
    for ($x = 0; $x -lt $width; $x++) {
        $p = $img.GetPixel($x, $y)
        $dr = [Math]::Abs($p.R - $bgR)
        $dg = [Math]::Abs($p.G - $bgG)
        $db = [Math]::Abs($p.B - $bgB)
        $dist = [Math]::Sqrt($dr*$dr + $dg*$dg + $db*$db)

        # Floor gradient adjust in lower corners
        if ($y -gt ($height * 0.78) -and ($x -lt ($width * 0.25) -or $x -gt ($width * 0.75))) {
            $fdist = [Math]::Sqrt([Math]::Pow($p.R - 128, 2) + [Math]::Pow($p.G - 126, 2) + [Math]::Pow($p.B - 124, 2))
            if ($fdist -lt $dist) { $dist = $fdist }
        }

        # Check if inside the body / silhouette (exclude edges)
        $isBody = ($dist -ge 22) -or ($x -gt ($width * 0.32) -and $x -lt ($width * 0.68) -and $y -gt ($height * 0.16) -and $y -lt ($height * 0.88))

        if (-not $isBody) {
            $outPlain.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
            $outMasked.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        } else {
            $alpha = 255
            if ($dist -lt 30) {
                $alpha = [int](($dist - 14) / 16.0 * 255.0)
                if ($alpha -lt 0) { $alpha = 0 }
                if ($alpha -gt 255) { $alpha = 255 }
            }

            $outPlain.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $p.R, $p.G, $p.B))

            # For masked version, draw tactical cyber visor & neon cyan accents across eye line (y approx 14% to 18% of height)
            $isVisorArea = ($y -ge [int]($height * 0.14)) -and ($y -le [int]($height * 0.18)) -and ($x -ge [int]($width * 0.42)) -and ($x -le [int]($width * 0.55))
            if ($isVisorArea) {
                # Cyber cyan visor glow
                $outMasked.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, 0, 240, 255))
            } else {
                # High-contrast cyber techwear tint
                $r = [int]($p.R * 0.85)
                $g = [int]($p.G * 0.95)
                $b = [int]([Math]::Min(255, $p.B * 1.25))
                $outMasked.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $r, $g, $b))
            }
        }
    }
}

$plainPath = Join-Path $outDir "male-plain.png"
$maskedPath = Join-Path $outDir "male-masked.png"
$outPlain.Save($plainPath, [System.Drawing.Imaging.ImageFormat]::Png)
$outMasked.Save($maskedPath, [System.Drawing.Imaging.ImageFormat]::Png)

Write-Host "Both transparent male-plain.png and male-masked.png saved to $outDir!"
$img.Dispose()
$outPlain.Dispose()
$outMasked.Dispose()
