Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\Doctor Computers\.gemini\antigravity-ide\brain\0c1c8887-00b2-4bd0-a875-1c49b1f63b3f\nova_male_streetwear_1788346104155.jpg"
$outDir = "C:\Users\Doctor Computers\.gemini\antigravity-ide\scratch\NOVA\assets"
if (!(Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir -Force }

$img = [System.Drawing.Bitmap]::FromFile($srcPath)
$width = $img.Width
$height = $img.Height

$outPlain = New-Object System.Drawing.Bitmap($width, $height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$outMasked = New-Object System.Drawing.Bitmap($width, $height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# 2D array of isBackground
$isBg = New-Object 'bool[,]' $width, $height
$queue = New-Object System.Collections.Generic.Queue[System.Drawing.Point]

# Enqueue all border pixels
for ($x = 0; $x -lt $width; $x++) {
    $isBg[$x, 0] = $true
    $queue.Enqueue((New-Object System.Drawing.Point($x, 0)))
    $isBg[$x, $height - 1] = $true
    $queue.Enqueue((New-Object System.Drawing.Point($x, $height - 1)))
}
for ($y = 0; $y -lt $height; $y++) {
    $isBg[0, $y] = $true
    $queue.Enqueue((New-Object System.Drawing.Point(0, $y)))
    $isBg[$width - 1, $y] = $true
    $queue.Enqueue((New-Object System.Drawing.Point($width - 1, $y)))
}

# Average background color
$bgR = 148.0
$bgG = 148.0
$bgB = 146.0

# Directions for BFS (8-way)
$dx = @(-1, 1, 0, 0, -1, 1, -1, 1)
$dy = @(0, 0, -1, 1, -1, -1, 1, 1)

while ($queue.Count -gt 0) {
    $pt = $queue.Dequeue()
    $cx = $pt.X
    $cy = $pt.Y

    for ($i = 0; $i -lt 8; $i++) {
        $nx = $cx + $dx[$i]
        $ny = $cy + $dy[$i]

        if ($nx -ge 0 -and $nx -lt $width -and $ny -ge 0 -and $ny -lt $height) {
            if (-not $isBg[$nx, $ny]) {
                $p = $img.GetPixel($nx, $ny)
                $dr = [Math]::Abs($p.R - $bgR)
                $dg = [Math]::Abs($p.G - $bgG)
                $db = [Math]::Abs($p.B - $bgB)
                $dist = [Math]::Sqrt($dr*$dr + $dg*$dg + $db*$db)

                # Lower floor gradient tolerance
                if ($ny -gt ($height * 0.75)) {
                    $fdist = [Math]::Sqrt([Math]::Pow($p.R - 128, 2) + [Math]::Pow($p.G - 126, 2) + [Math]::Pow($p.B - 124, 2))
                    if ($fdist -lt $dist) { $dist = $fdist }
                }

                # Threshold for background connectivity
                if ($dist -lt 55) {
                    $isBg[$nx, $ny] = $true
                    $queue.Enqueue((New-Object System.Drawing.Point($nx, $ny)))
                }
            }
        }
    }
}

# Write output pixels with feathered edges
for ($y = 0; $y -lt $height; $y++) {
    for ($x = 0; $x -lt $width; $x++) {
        if ($isBg[$x, $y]) {
            $outPlain.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
            $outMasked.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        } else {
            # Check edge distance to background for soft anti-aliasing
            $nearBg = $false
            for ($i = 0; $i -lt 8; $i++) {
                $nx = $x + $dx[$i]
                $ny = $y + $dy[$i]
                if ($nx -ge 0 -and $nx -lt $width -and $ny -ge 0 -and $ny -lt $height) {
                    if ($isBg[$nx, $ny]) { $nearBg = $true; break }
                }
            }

            $p = $img.GetPixel($x, $y)
            $alpha = 255
            if ($nearBg) { $alpha = 200 }

            $outPlain.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $p.R, $p.G, $p.B))

            # Masked version: sleek cyberpunk tactical grading
            $r = [int]($p.R * 0.8)
            $g = [int]([Math]::Min(255, $p.G * 1.15))
            $b = [int]([Math]::Min(255, $p.B * 1.45))
            $outMasked.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $r, $g, $b))
        }
    }
}

$plainPath = Join-Path $outDir "male-plain.png"
$maskedPath = Join-Path $outDir "male-masked.png"
$outPlain.Save($plainPath, [System.Drawing.Imaging.ImageFormat]::Png)
$outMasked.Save($maskedPath, [System.Drawing.Imaging.ImageFormat]::Png)

Write-Host "Floodfill clean transparent male-plain.png and male-masked.png created successfully!"
$img.Dispose()
$outPlain.Dispose()
$outMasked.Dispose()
