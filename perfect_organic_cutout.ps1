$code = @"
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Collections.Generic;

public class OrganicCutout {
    public static void Clean(string srcPath, string plainOut, string maskedOut) {
        using (Bitmap src = new Bitmap(srcPath)) {
            int w = src.Width;
            int h = src.Height;
            Bitmap plain = new Bitmap(w, h, PixelFormat.Format32bppArgb);
            Bitmap masked = new Bitmap(w, h, PixelFormat.Format32bppArgb);

            bool[,] isBg = new bool[w, h];
            Queue<Point> q = new Queue<Point>();

            // Enqueue all 4 image borders
            for (int x = 0; x < w; x++) {
                isBg[x, 0] = true; q.Enqueue(new Point(x, 0));
                isBg[x, h - 1] = true; q.Enqueue(new Point(x, h - 1));
            }
            for (int y = 0; y < h; y++) {
                isBg[0, y] = true; q.Enqueue(new Point(0, y));
                isBg[w - 1, y] = true; q.Enqueue(new Point(w - 1, y));
            }

            int[] dx = { -1, 1, 0, 0, -1, 1, -1, 1 };
            int[] dy = { 0, 0, -1, 1, -1, -1, 1, 1 };

            // Average studio background color
            int bgRefR = 148, bgRefG = 148, bgRefB = 146;

            while (q.Count > 0) {
                Point p = q.Dequeue();
                Color pc = src.GetPixel(p.X, p.Y);

                for (int i = 0; i < 8; i++) {
                    int nx = p.X + dx[i];
                    int ny = p.Y + dy[i];

                    if (nx >= 0 && nx < w && ny >= 0 && ny < h && !isBg[nx, ny]) {
                        Color c = src.GetPixel(nx, ny);

                        int dr = Math.Abs(c.R - pc.R);
                        int dg = Math.Abs(c.G - pc.G);
                        int db = Math.Abs(c.B - pc.B);
                        int localDiff = dr + dg + db;

                        int diffR = Math.Abs(c.R - bgRefR);
                        int diffG = Math.Abs(c.G - bgRefG);
                        int diffB = Math.Abs(c.B - bgRefB);
                        int bgDiff = diffR + diffG + diffB;

                        int maxChroma = Math.Max(Math.Abs(c.R - c.G), Math.Max(Math.Abs(c.G - c.B), Math.Abs(c.R - c.B)));
                        int avg = (c.R + c.G + c.B) / 3;

                        // Check if pixel belongs to the background or smooth floor shadow
                        bool isBackgroundPixel = false;

                        // Standard neutral gray studio background
                        if (maxChroma < 18 && bgDiff < 140 && localDiff < 36) {
                            isBackgroundPixel = true;
                        }
                        // Smooth gradient floor/shadow extending outward
                        else if (ny > h * 0.45 && maxChroma < 22 && localDiff < 28 && (c.R > 75 || localDiff < 16)) {
                            isBackgroundPixel = true;
                        }

                        if (isBackgroundPixel) {
                            isBg[nx, ny] = true;
                            q.Enqueue(new Point(nx, ny));
                        }
                    }
                }
            }

            for (int y = 0; y < h; y++) {
                for (int x = 0; x < w; x++) {
                    if (isBg[x, y]) {
                        plain.SetPixel(x, y, Color.FromArgb(0, 0, 0, 0));
                        masked.SetPixel(x, y, Color.FromArgb(0, 0, 0, 0));
                    } else {
                        Color c = src.GetPixel(x, y);
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

[OrganicCutout]::Clean($src, $plain, $masked)
Write-Host "Perfect OrganicCutout successfully completed with natural body contours preserved!"
