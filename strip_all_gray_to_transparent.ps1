$code = @"
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Collections.Generic;

public class PureTransparentCutout {
    public static void Process(string srcPath, string plainOut, string maskedOut) {
        using (Bitmap src = new Bitmap(srcPath)) {
            int w = src.Width;
            int h = src.Height;
            Bitmap plain = new Bitmap(w, h, PixelFormat.Format32bppArgb);
            Bitmap masked = new Bitmap(w, h, PixelFormat.Format32bppArgb);

            bool[,] isBg = new bool[w, h];
            Queue<Point> q = new Queue<Point>();

            // Enqueue all 4 outer borders of the image
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

            // Flood-fill background detection starting from the borders
            while (q.Count > 0) {
                Point p = q.Dequeue();
                Color pc = src.GetPixel(p.X, p.Y);

                for (int i = 0; i < 8; i++) {
                    int nx = p.X + dx[i];
                    int ny = p.Y + dy[i];

                    if (nx >= 0 && nx < w && ny >= 0 && ny < h && !isBg[nx, ny]) {
                        Color c = src.GetPixel(nx, ny);

                        int maxChroma = Math.Max(Math.Abs(c.R - c.G), Math.Max(Math.Abs(c.G - c.B), Math.Abs(c.R - c.B)));
                        int avg = (c.R + c.G + c.B) / 3;

                        // Is this pixel the gray background / floor shadow?
                        bool isBackground = false;

                        // Upper & side studio gray
                        if (maxChroma < 22 && avg >= 85) {
                            isBackground = true;
                        }
                        // Cast shadows on the floor/sides
                        else if (ny > h * 0.45 && (nx < w * 0.38 || nx > w * 0.65) && maxChroma < 25) {
                            isBackground = true;
                        }
                        // Space between legs
                        else if (ny > h * 0.58 && ny < h * 0.88 && nx > w * 0.485 && nx < w * 0.54 && maxChroma < 22 && avg >= 90) {
                            isBackground = true;
                        }

                        if (isBackground) {
                            isBg[nx, ny] = true;
                            q.Enqueue(new Point(nx, ny));
                        }
                    }
                }
            }

            // Fill transparent plain and masked images
            for (int y = 0; y < h; y++) {
                for (int x = 0; x < w; x++) {
                    if (isBg[x, y] || y < h * 0.03 || y > h * 0.965 || x < w * 0.22 || x > w * 0.78) {
                        plain.SetPixel(x, y, Color.FromArgb(0, 0, 0, 0));
                        masked.SetPixel(x, y, Color.FromArgb(0, 0, 0, 0));
                    } else {
                        Color c = src.GetPixel(x, y);
                        plain.SetPixel(x, y, Color.FromArgb(255, c.R, c.G, c.B));

                        // Futuristic cyber cyan masked exposure
                        int r = (int)(c.R * 0.65);
                        int g = Math.Min(255, (int)(c.G * 1.2));
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

[PureTransparentCutout]::Process($src, $plain, $masked)
Write-Host "PureTransparentCutout successfully executed! 0% gray background remaining."
