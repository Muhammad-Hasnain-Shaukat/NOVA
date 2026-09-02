$code = @"
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Collections.Generic;

public class ImageProcessor {
    public static void Process(string srcPath, string plainOut, string maskedOut) {
        using (Bitmap src = new Bitmap(srcPath)) {
            int w = src.Width;
            int h = src.Height;
            Bitmap plain = new Bitmap(w, h, PixelFormat.Format32bppArgb);
            Bitmap masked = new Bitmap(w, h, PixelFormat.Format32bppArgb);

            bool[,] isBg = new bool[w, h];
            Queue<Point> q = new Queue<Point>();

            // Enqueue edges
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

            while (q.Count > 0) {
                Point p = q.Dequeue();
                for (int i = 0; i < 8; i++) {
                    int nx = p.X + dx[i];
                    int ny = p.Y + dy[i];
                    if (nx >= 0 && nx < w && ny >= 0 && ny < h && !isBg[nx, ny]) {
                        Color c = src.GetPixel(nx, ny);
                        // Neutral gray background check
                        double diff = Math.Abs(c.R - 148) + Math.Abs(c.G - 148) + Math.Abs(c.B - 146);
                        
                        // Floor check towards bottom corners
                        if (ny > h * 0.75) {
                            double fdiff = Math.Abs(c.R - 128) + Math.Abs(c.G - 126) + Math.Abs(c.B - 124);
                            if (fdiff < diff) diff = fdiff;
                        }

                        if (diff < 90) {
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

                        // Masked layer: rich cyber-cyan tactical color grade
                        int r = (int)(c.R * 0.75);
                        int g = Math.Min(255, (int)(c.G * 1.12));
                        int b = Math.Min(255, (int)(c.B * 1.35 + 20));
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

[ImageProcessor]::Process($src, $plain, $masked)
Write-Host "C# ImageProcessor generated clean transparent male-plain.png and male-masked.png!"
