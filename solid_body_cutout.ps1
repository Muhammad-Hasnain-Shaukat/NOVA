$code = @"
using System;
using System.Drawing;
using System.Drawing.Imaging;

public class SolidBodyCutout {
    public static void Clean(string srcPath, string plainOut, string maskedOut) {
        using (Bitmap src = new Bitmap(srcPath)) {
            int w = src.Width;
            int h = src.Height;
            Bitmap plain = new Bitmap(w, h, PixelFormat.Format32bppArgb);
            Bitmap masked = new Bitmap(w, h, PixelFormat.Format32bppArgb);

            // Determine left and right body edge for each row y
            for (int y = 0; y < h; y++) {
                int leftEdge = 0;
                int rightEdge = w - 1;

                // Scan left to right
                for (int x = 0; x < w; x++) {
                    Color c = src.GetPixel(x, y);
                    int maxDiff = Math.Max(Math.Abs(c.R - c.G), Math.Max(Math.Abs(c.G - c.B), Math.Abs(c.R - c.B)));
                    int avg = (c.R + c.G + c.B) / 3;

                    // Studio gray background indicator
                    bool isGrayBg = maxDiff < 14 && avg >= 95;
                    
                    // Below knees/floor level
                    if (y > h * 0.75 && maxDiff < 16 && avg >= 85) {
                        isGrayBg = true;
                    }

                    if (!isGrayBg) {
                        leftEdge = x;
                        break;
                    }
                }

                // Scan right to left
                for (int x = w - 1; x >= 0; x--) {
                    Color c = src.GetPixel(x, y);
                    int maxDiff = Math.Max(Math.Abs(c.R - c.G), Math.Max(Math.Abs(c.G - c.B), Math.Abs(c.R - c.B)));
                    int avg = (c.R + c.G + c.B) / 3;

                    bool isGrayBg = maxDiff < 14 && avg >= 95;
                    if (y > h * 0.75 && maxDiff < 16 && avg >= 85) {
                        isGrayBg = true;
                    }

                    if (!isGrayBg) {
                        rightEdge = x;
                        break;
                    }
                }

                // If no body detected on this line (e.g. above head or below shoes)
                if (leftEdge >= rightEdge || y < h * 0.03 || y > h * 0.97) {
                    for (int x = 0; x < w; x++) {
                        plain.SetPixel(x, y, Color.FromArgb(0, 0, 0, 0));
                        masked.SetPixel(x, y, Color.FromArgb(0, 0, 0, 0));
                    }
                    continue;
                }

                // Fill pixels
                for (int x = 0; x < w; x++) {
                    if (x < leftEdge || x > rightEdge) {
                        plain.SetPixel(x, y, Color.FromArgb(0, 0, 0, 0));
                        masked.SetPixel(x, y, Color.FromArgb(0, 0, 0, 0));
                    } else {
                        // Check between-legs gap (only between y: 58% to 88% and x: 48.5% to 54%)
                        bool isBetweenLegs = false;
                        if (y > h * 0.58 && y < h * 0.88 && x > w * 0.485 && x < w * 0.54) {
                            Color c = src.GetPixel(x, y);
                            int maxDiff = Math.Max(Math.Abs(c.R - c.G), Math.Max(Math.Abs(c.G - c.B), Math.Abs(c.R - c.B)));
                            int avg = (c.R + c.G + c.B) / 3;
                            if (maxDiff < 14 && avg >= 100) {
                                isBetweenLegs = true;
                            }
                        }

                        if (isBetweenLegs) {
                            plain.SetPixel(x, y, Color.FromArgb(0, 0, 0, 0));
                            masked.SetPixel(x, y, Color.FromArgb(0, 0, 0, 0));
                        } else {
                            Color c = src.GetPixel(x, y);
                            plain.SetPixel(x, y, c);

                            // Masked cyber cyan grade
                            int r = (int)(c.R * 0.7);
                            int g = Math.Min(255, (int)(c.G * 1.18));
                            int b = Math.Min(255, (int)(c.B * 1.45 + 25));
                            masked.SetPixel(x, y, Color.FromArgb(255, r, g, b));
                        }
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

[SolidBodyCutout]::Clean($src, $plain, $masked)
Write-Host "SolidBodyCutout finished: 100% solid, opaque character with transparent background!"
