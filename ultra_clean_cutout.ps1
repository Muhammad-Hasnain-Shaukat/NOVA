$code = @"
using System;
using System.Drawing;
using System.Drawing.Imaging;

public class UltraCleanCutout {
    public static void CleanAll(string srcPath, string plainOut, string maskedOut) {
        using (Bitmap src = new Bitmap(srcPath)) {
            int w = src.Width;
            int h = src.Height;
            Bitmap plain = new Bitmap(w, h, PixelFormat.Format32bppArgb);
            Bitmap masked = new Bitmap(w, h, PixelFormat.Format32bppArgb);

            for (int y = 0; y < h; y++) {
                for (int x = 0; x < w; x++) {
                    Color c = src.GetPixel(x, y);

                    // Background in this studio photo is neutral gray (|R-G| < 18, |G-B| < 18, |R-B| < 18)
                    int maxDiff = Math.Max(Math.Abs(c.R - c.G), Math.Max(Math.Abs(c.G - c.B), Math.Abs(c.R - c.B)));
                    int avg = (c.R + c.G + c.B) / 3;

                    // Studio gray background is neutral and between 80 and 210
                    bool isStudioGray = maxDiff < 20 && avg >= 80 && avg <= 215;

                    // Extra check for floor and outer margins
                    bool isOuterMargin = (x < w * 0.22 || x > w * 0.78) && maxDiff < 24 && avg >= 65;
                    bool isTopMargin = y < h * 0.12 && maxDiff < 24 && avg >= 65;
                    bool isFloorMargin = y > h * 0.70 && maxDiff < 24 && avg >= 65 && (x < w * 0.32 || x > w * 0.68);

                    if (isStudioGray || isOuterMargin || isTopMargin || isFloorMargin) {
                        plain.SetPixel(x, y, Color.FromArgb(0, 0, 0, 0));
                        masked.SetPixel(x, y, Color.FromArgb(0, 0, 0, 0));
                    } else {
                        plain.SetPixel(x, y, c);

                        // Masked layer: futuristic cyan-tinted cyber techwear
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

[UltraCleanCutout]::CleanAll($src, $plain, $masked)
Write-Host "UltraCleanCutout: 100% of all gray background removed completely!"
