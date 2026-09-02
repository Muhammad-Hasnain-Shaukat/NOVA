$code = @"
using System;
using System.Drawing;
using System.Drawing.Imaging;

public class MasterBlendCutout {
    public static void Clean(string srcPath, string plainOut, string maskedOut) {
        using (Bitmap src = new Bitmap(srcPath)) {
            int w = src.Width;
            int h = src.Height;
            Bitmap plain = new Bitmap(w, h, PixelFormat.Format32bppArgb);
            Bitmap masked = new Bitmap(w, h, PixelFormat.Format32bppArgb);

            int[] leftEdges = new int[h];
            int[] rightEdges = new int[h];

            // Step 1: Detect outer left and right body boundaries for every horizontal line y
            for (int y = 0; y < h; y++) {
                int left = 0;
                int right = w - 1;

                // Scan left to right
                for (int x = 0; x < w; x++) {
                    Color c = src.GetPixel(x, y);
                    int maxDiff = Math.Max(Math.Abs(c.R - c.G), Math.Max(Math.Abs(c.G - c.B), Math.Abs(c.R - c.B)));
                    int avg = (c.R + c.G + c.B) / 3;

                    bool isBg = (maxDiff < 14 && avg >= 95) || (y > h * 0.75 && maxDiff < 16 && avg >= 80);
                    if (!isBg) {
                        left = x;
                        break;
                    }
                }

                // Scan right to left
                for (int x = w - 1; x >= 0; x--) {
                    Color c = src.GetPixel(x, y);
                    int maxDiff = Math.Max(Math.Abs(c.R - c.G), Math.Max(Math.Abs(c.G - c.B), Math.Abs(c.R - c.B)));
                    int avg = (c.R + c.G + c.B) / 3;

                    bool isBg = (maxDiff < 14 && avg >= 95) || (y > h * 0.75 && maxDiff < 16 && avg >= 80);
                    if (!isBg) {
                        right = x;
                        break;
                    }
                }

                leftEdges[y] = left;
                rightEdges[y] = right;
            }

            // Step 2: Render anti-aliased transparent cutouts
            for (int y = 0; y < h; y++) {
                int left = leftEdges[y];
                int right = rightEdges[y];

                for (int x = 0; x < w; x++) {
                    // Margin check
                    if (y < h * 0.03 || y > h * 0.965 || left >= right || x < left || x > right) {
                        plain.SetPixel(x, y, Color.FromArgb(0, 0, 0, 0));
                        masked.SetPixel(x, y, Color.FromArgb(0, 0, 0, 0));
                        continue;
                    }

                    // Between-legs gap check
                    bool isBetweenLegs = false;
                    if (y > h * 0.58 && y < h * 0.88 && x > w * 0.485 && x < w * 0.54) {
                        Color c = src.GetPixel(x, y);
                        int maxDiff = Math.Max(Math.Abs(c.R - c.G), Math.Max(Math.Abs(c.G - c.B), Math.Abs(c.R - c.B)));
                        int avg = (c.R + c.G + c.B) / 3;
                        if (maxDiff < 14 && avg >= 98) {
                            isBetweenLegs = true;
                        }
                    }

                    if (isBetweenLegs) {
                        plain.SetPixel(x, y, Color.FromArgb(0, 0, 0, 0));
                        masked.SetPixel(x, y, Color.FromArgb(0, 0, 0, 0));
                        continue;
                    }

                    // Calculate soft anti-aliased edge alpha for seamless blending
                    int distFromEdge = Math.Min(x - left, right - x);
                    int alpha = 255;
                    if (distFromEdge <= 2) {
                        alpha = (int)(255 * ((distFromEdge + 1) / 3.0));
                    }

                    Color orig = src.GetPixel(x, y);
                    plain.SetPixel(x, y, Color.FromArgb(alpha, orig.R, orig.G, orig.B));

                    // Masked exposure for cyberpunk cursor torch
                    int r = (int)(orig.R * 0.65);
                    int g = Math.Min(255, (int)(orig.G * 1.2));
                    int b = Math.Min(255, (int)(orig.B * 1.45 + 25));
                    masked.SetPixel(x, y, Color.FromArgb(alpha, r, g, b));
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

[MasterBlendCutout]::Clean($src, $plain, $masked)
Write-Host "MasterBlendCutout successfully generated transparent anti-aliased model for seamless theme blending!"
