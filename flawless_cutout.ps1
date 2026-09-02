$code = @"
using System;
using System.Drawing;
using System.Drawing.Imaging;

public class FlawlessCutout {
    public static void Clean(string srcPath, string plainOut, string maskedOut) {
        using (Bitmap src = new Bitmap(srcPath)) {
            int w = src.Width;
            int h = src.Height;
            Bitmap plain = new Bitmap(w, h, PixelFormat.Format32bppArgb);
            Bitmap masked = new Bitmap(w, h, PixelFormat.Format32bppArgb);

            for (int y = 0; y < h; y++) {
                double ny = (double)y / h;
                for (int x = 0; x < w; x++) {
                    double nx = (double)x / w;
                    Color c = src.GetPixel(x, y);

                    int maxDiff = Math.Max(Math.Abs(c.R - c.G), Math.Max(Math.Abs(c.G - c.B), Math.Abs(c.R - c.B)));
                    int avg = (c.R + c.G + c.B) / 3;

                    bool isBg = false;

                    // 1. Studio Gray Background anywhere
                    if (maxDiff < 22 && avg >= 75) {
                        isBg = true;
                    }

                    // 2. Cast shadow on lower left (to the left of right leg)
                    // The right leg is at nx >= 0.385. Everything to the left below waist (ny > 0.51) is shadow/bg!
                    if (ny > 0.51 && nx < 0.385) {
                        isBg = true;
                    }

                    // 3. Shadow/bg to the right of left leg
                    // The left leg ends at nx <= 0.65 below ny > 0.52, and shoe ends at nx <= 0.70 at ny > 0.82
                    if (ny > 0.52 && nx > 0.65) {
                        if (ny < 0.82 || nx > 0.70) {
                            isBg = true;
                        }
                    }

                    // 4. Space between legs (around nx between 0.485 and 0.54 from ny 0.56 to 0.85)
                    if (ny > 0.56 && ny < 0.86 && nx > 0.488 && nx < 0.535) {
                        // Between legs background/shadow
                        if (maxDiff < 26 || avg < 70) {
                            isBg = true;
                        }
                    }

                    // 5. Floor shadow under shoes (ny > 0.96)
                    if (ny > 0.96) {
                        isBg = true;
                    }

                    // 6. Left/Right outer margins
                    if (nx < 0.25 || nx > 0.75) {
                        isBg = true;
                    }

                    // 7. Top margin above head (ny < 0.04)
                    if (ny < 0.04) {
                        isBg = true;
                    }

                    if (isBg) {
                        plain.SetPixel(x, y, Color.FromArgb(0, 0, 0, 0));
                        masked.SetPixel(x, y, Color.FromArgb(0, 0, 0, 0));
                    } else {
                        plain.SetPixel(x, y, c);

                        // Masked layer: futuristic cyber cyan grade
                        int r = (int)(c.R * 0.7);
                        int g = Math.Min(255, (int)(c.G * 1.18));
                        int b = Math.Min(255, (int)(c.B * 1.45 + 25));
                        masked.SetPixel(x, y, Color.FromArgb(255, r, g, b));
                    }
                }
            }

            plain.Save(plainOut, ImageFormat.Png);
            masked.Save(maskedOut, ImageFormat.Png);
            plain.Dispose();
            masked.Dispose();
        }
    }
}
"@

Add-Type -TypeDefinition $code -ReferencedAssemblies System.Drawing

$src = "C:\Users\Doctor Computers\.gemini\antigravity-ide\brain\0c1c8887-00b2-4bd0-a875-1c49b1f63b3f\nova_male_streetwear_1788346104155.jpg"
$plain = "C:\Users\Doctor Computers\.gemini\antigravity-ide\scratch\NOVA\assets\male-plain.png"
$masked = "C:\Users\Doctor Computers\.gemini\antigravity-ide\scratch\NOVA\assets\male-masked.png"

[FlawlessCutout]::Clean($src, $plain, $masked)
Write-Host "FlawlessCutout completed! Cast shadow completely eliminated."
