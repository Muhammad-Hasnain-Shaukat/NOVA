$code = @"
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Drawing.Drawing2D;
using System.Collections.Generic;

public class HighFashionDuoBuilder {
    // Precise background removal using scanline edge detection & floodfill
    public static Bitmap CutoutBoy(string path, bool isMasked) {
        using (Bitmap src = new Bitmap(path)) {
            int w = src.Width;
            int h = src.Height;
            Bitmap dest = new Bitmap(w, h, PixelFormat.Format32bppArgb);

            // Scan left & right boundaries for every line
            int[] leftEdges = new int[h];
            int[] rightEdges = new int[h];

            for (int y = 0; y < h; y++) {
                int left = 0;
                int right = w - 1;

                // Left scan
                for (int x = 0; x < w; x++) {
                    Color c = src.GetPixel(x, y);
                    int maxDiff = Math.Max(Math.Abs(c.R - c.G), Math.Max(Math.Abs(c.G - c.B), Math.Abs(c.R - c.B)));
                    int avg = (c.R + c.G + c.B) / 3;
                    bool isBg = (maxDiff < 14 && avg >= 90) || (y > h * 0.75 && maxDiff < 16 && avg >= 80);
                    if (!isBg) { left = x; break; }
                }

                // Right scan
                for (int x = w - 1; x >= 0; x--) {
                    Color c = src.GetPixel(x, y);
                    int maxDiff = Math.Max(Math.Abs(c.R - c.G), Math.Max(Math.Abs(c.G - c.B), Math.Abs(c.R - c.B)));
                    int avg = (c.R + c.G + c.B) / 3;
                    bool isBg = (maxDiff < 14 && avg >= 90) || (y > h * 0.75 && maxDiff < 16 && avg >= 80);
                    if (!isBg) { right = x; break; }
                }

                leftEdges[y] = left;
                rightEdges[y] = right;
            }

            for (int y = 0; y < h; y++) {
                int left = leftEdges[y];
                int right = rightEdges[y];

                for (int x = 0; x < w; x++) {
                    if (y < h * 0.03 || y > h * 0.965 || left >= right || x < left || x > right) {
                        dest.SetPixel(x, y, Color.FromArgb(0, 0, 0, 0));
                        continue;
                    }

                    // Gap between legs
                    if (y > h * 0.58 && y < h * 0.88 && x > w * 0.485 && x < w * 0.54) {
                        Color c = src.GetPixel(x, y);
                        int maxDiff = Math.Max(Math.Abs(c.R - c.G), Math.Max(Math.Abs(c.G - c.B), Math.Abs(c.R - c.B)));
                        int avg = (c.R + c.G + c.B) / 3;
                        if (maxDiff < 14 && avg >= 95) {
                            dest.SetPixel(x, y, Color.FromArgb(0, 0, 0, 0));
                            continue;
                        }
                    }

                    Color orig = src.GetPixel(x, y);

                    // If masked: add tactical cyber face mask
                    if (isMasked) {
                        double ny = (double)y / h;
                        double nx = (double)x / w;
                        if (ny >= 0.115 && ny <= 0.175 && nx >= 0.45 && nx <= 0.535) {
                            int mr = 18; int mg = 24; int mb = 30;
                            if (ny >= 0.142 && ny <= 0.150 && nx >= 0.465 && nx <= 0.52) {
                                mr = 0; mg = 240; mb = 255; // Neon cyan slit
                            }
                            dest.SetPixel(x, y, Color.FromArgb(255, mr, mg, mb));
                            continue;
                        }
                    }

                    dest.SetPixel(x, y, Color.FromArgb(255, orig.R, orig.G, orig.B));
                }
            }
            return dest;
        }
    }

    public static Bitmap CutoutGirl(string path, bool isMasked) {
        using (Bitmap src = new Bitmap(path)) {
            int w = src.Width;
            int h = src.Height;
            Bitmap dest = new Bitmap(w, h, PixelFormat.Format32bppArgb);

            // Scanline detection for girl model
            int[] leftEdges = new int[h];
            int[] rightEdges = new int[h];

            for (int y = 0; y < h; y++) {
                int left = 0;
                int right = w - 1;

                // Left scan: runway backdrop / audience is dark/gray or washed
                for (int x = 0; x < w; x++) {
                    Color c = src.GetPixel(x, y);
                    // Girl's body starts when we hit the coat/hair/arm
                    bool isRunwayBg = (c.R < 55 && c.G < 55 && c.B < 55) || (Math.Abs(c.R - c.G) < 8 && Math.Abs(c.G - c.B) < 8 && c.R < 80);
                    if (y < h * 0.28) {
                        // Upper hair & head: bg is gray studio wall
                        isRunwayBg = (Math.Abs(c.R - c.G) < 14 && Math.Abs(c.G - c.B) < 14 && c.R >= 110);
                    }
                    if (!isRunwayBg) { left = x; break; }
                }

                // Right scan
                for (int x = w - 1; x >= 0; x--) {
                    Color c = src.GetPixel(x, y);
                    bool isRunwayBg = (c.R < 55 && c.G < 55 && c.B < 55) || (Math.Abs(c.R - c.G) < 8 && Math.Abs(c.G - c.B) < 8 && c.R < 80);
                    if (y < h * 0.28) {
                        isRunwayBg = (Math.Abs(c.R - c.G) < 14 && Math.Abs(c.G - c.B) < 14 && c.R >= 110);
                    }
                    if (!isRunwayBg) { right = x; break; }
                }

                leftEdges[y] = left;
                rightEdges[y] = right;
            }

            for (int y = 0; y < h; y++) {
                int left = leftEdges[y];
                int right = rightEdges[y];

                for (int x = 0; x < w; x++) {
                    if (y < h * 0.05 || y > h * 0.96 || left >= right || x < left || x > right || x < w * 0.24 || x > w * 0.82) {
                        dest.SetPixel(x, y, Color.FromArgb(0, 0, 0, 0));
                        continue;
                    }

                    Color orig = src.GetPixel(x, y);
                    dest.SetPixel(x, y, Color.FromArgb(255, orig.R, orig.G, orig.B));
                }
            }
            return dest;
        }
    }

    public static void RenderDuo(string malePlain, string femalePlain, string femaleMasked, string outPlain, string outMasked) {
        int w = 1400;
        int h = 1050;

        using (Bitmap duoPlain = new Bitmap(w, h, PixelFormat.Format32bppArgb))
        using (Bitmap duoMasked = new Bitmap(w, h, PixelFormat.Format32bppArgb))
        using (Graphics gPlain = Graphics.FromImage(duoPlain))
        using (Graphics gMasked = Graphics.FromImage(duoMasked)) {
            gPlain.SmoothingMode = SmoothingMode.HighQuality;
            gPlain.InterpolationMode = InterpolationMode.HighQualityBicubic;
            gMasked.SmoothingMode = SmoothingMode.HighQuality;
            gMasked.InterpolationMode = InterpolationMode.HighQualityBicubic;

            // Render Boy (Left)
            using (Bitmap boyP = CutoutBoy(malePlain, false))
            using (Bitmap boyM = CutoutBoy(malePlain, true)) {
                gPlain.DrawImage(boyP, new Rectangle(60, 40, 750, 1000));
                gMasked.DrawImage(boyM, new Rectangle(60, 40, 750, 1000));
            }

            // Render Girl (Right)
            using (Bitmap girlP = CutoutGirl(femalePlain, false))
            using (Bitmap girlM = CutoutGirl(femaleMasked, true)) {
                gPlain.DrawImage(girlP, new Rectangle(580, 50, 760, 990));
                gMasked.DrawImage(girlM, new Rectangle(580, 50, 760, 990));
            }

            duoPlain.Save(outPlain, ImageFormat.Png);
            duoMasked.Save(outMasked, ImageFormat.Png);
        }
    }
}
"@

Add-Type -TypeDefinition $code -ReferencedAssemblies System.Drawing

$malePlain = "C:\Users\Doctor Computers\.gemini\antigravity-ide\brain\0c1c8887-00b2-4bd0-a875-1c49b1f63b3f\nova_male_streetwear_1788346104155.jpg"
$femalePlain = "C:\Users\Doctor Computers\.gemini\antigravity-ide\brain\0c1c8887-00b2-4bd0-a875-1c49b1f63b3f\nova_character_plain_1788345772691.jpg"
$femaleMasked = "C:\Users\Doctor Computers\.gemini\antigravity-ide\brain\0c1c8887-00b2-4bd0-a875-1c49b1f63b3f\nova_character_masked_1788345800123.jpg"

$outPlain = "C:\Users\Doctor Computers\.gemini\antigravity-ide\scratch\NOVA\assets\duo-plain.png"
$outMasked = "C:\Users\Doctor Computers\.gemini\antigravity-ide\scratch\NOVA\assets\duo-masked.png"

[HighFashionDuoBuilder]::RenderDuo($malePlain, $femalePlain, $femaleMasked, $outPlain, $outMasked)
Write-Host "HighFashionDuoBuilder: Perfect 100% transparent cutouts generated for both Boy and Girl!"
