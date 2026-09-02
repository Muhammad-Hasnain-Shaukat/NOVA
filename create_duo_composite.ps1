$code = @"
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Drawing.Drawing2D;

public class DuoStreetwearComposite {
    // Helper to get transparent cutout of a character
    public static Bitmap GetTransparentCutout(string path, bool isMaskedBoy, bool isGirl) {
        using (Bitmap src = new Bitmap(path)) {
            int w = src.Width;
            int h = src.Height;
            Bitmap dest = new Bitmap(w, h, PixelFormat.Format32bppArgb);

            for (int y = 0; y < h; y++) {
                int left = 0;
                int right = w - 1;

                // Find left edge
                for (int x = 0; x < w; x++) {
                    Color c = src.GetPixel(x, y);
                    int maxDiff = Math.Max(Math.Abs(c.R - c.G), Math.Max(Math.Abs(c.G - c.B), Math.Abs(c.R - c.B)));
                    int avg = (c.R + c.G + c.B) / 3;

                    bool isBg = maxDiff < 18 && avg >= 85;
                    if (!isBg) { left = x; break; }
                }

                // Find right edge
                for (int x = w - 1; x >= 0; x--) {
                    Color c = src.GetPixel(x, y);
                    int maxDiff = Math.Max(Math.Abs(c.R - c.G), Math.Max(Math.Abs(c.G - c.B), Math.Abs(c.R - c.B)));
                    int avg = (c.R + c.G + c.B) / 3;

                    bool isBg = maxDiff < 18 && avg >= 85;
                    if (!isBg) { right = x; break; }
                }

                for (int x = 0; x < w; x++) {
                    if (x < left || x > right || y < h * 0.03 || y > h * 0.97 || left >= right) {
                        dest.SetPixel(x, y, Color.FromArgb(0, 0, 0, 0));
                    } else {
                        // Between legs gap check
                        bool isBetween = false;
                        if (y > h * 0.58 && y < h * 0.88 && x > w * 0.485 && x < w * 0.54) {
                            Color c = src.GetPixel(x, y);
                            int maxDiff = Math.Max(Math.Abs(c.R - c.G), Math.Max(Math.Abs(c.G - c.B), Math.Abs(c.R - c.B)));
                            int avg = (c.R + c.G + c.B) / 3;
                            if (maxDiff < 16 && avg >= 95) isBetween = true;
                        }

                        if (isBetween) {
                            dest.SetPixel(x, y, Color.FromArgb(0, 0, 0, 0));
                        } else {
                            Color c = src.GetPixel(x, y);
                            
                            // If masked boy: add tactical lower-face techwear mask
                            if (isMaskedBoy && !isGirl) {
                                double ny = (double)y / h;
                                double nx = (double)x / w;
                                // Boy's face / lower mouth region (ny: 0.11 to 0.17, nx: 0.46 to 0.53)
                                if (ny >= 0.115 && ny <= 0.175 && nx >= 0.45 && nx <= 0.535) {
                                    // Tactical carbon mask with neon cyan cyber accents
                                    int mr = 18;
                                    int mg = 24;
                                    int mb = 30;
                                    if (ny >= 0.145 && ny <= 0.152 && nx >= 0.465 && nx <= 0.52) {
                                        // Neon glowing cyan breathing slit
                                        mr = 0; mg = 240; mb = 255;
                                    }
                                    dest.SetPixel(x, y, Color.FromArgb(255, mr, mg, mb));
                                    continue;
                                }
                            }

                            dest.SetPixel(x, y, Color.FromArgb(255, c.R, c.G, c.B));
                        }
                    }
                }
            }

            return dest;
        }
    }

    public static void BuildDuo(string malePlainPath, string femalePlainPath, string femaleMaskedPath, string outPlain, string outMasked) {
        int canvasW = 1500;
        int canvasH = 1100;

        using (Bitmap duoPlain = new Bitmap(canvasW, canvasH, PixelFormat.Format32bppArgb))
        using (Bitmap duoMasked = new Bitmap(canvasW, canvasH, PixelFormat.Format32bppArgb))
        using (Graphics gPlain = Graphics.FromImage(duoPlain))
        using (Graphics gMasked = Graphics.FromImage(duoMasked)) {
            gPlain.SmoothingMode = SmoothingMode.HighQuality;
            gPlain.InterpolationMode = InterpolationMode.HighQualityBicubic;
            gMasked.SmoothingMode = SmoothingMode.HighQuality;
            gMasked.InterpolationMode = InterpolationMode.HighQualityBicubic;

            // 1. Process Boy (Left-Center)
            using (Bitmap boyPlain = GetTransparentCutout(malePlainPath, false, false))
            using (Bitmap boyMasked = GetTransparentCutout(malePlainPath, true, false)) {
                int boyW = 820;
                int boyH = 1050;
                int boyX = 80;
                int boyY = 40;

                gPlain.DrawImage(boyPlain, new Rectangle(boyX, boyY, boyW, boyH));
                gMasked.DrawImage(boyMasked, new Rectangle(boyX, boyY, boyW, boyH));
            }

            // 2. Process Girl (Right-Center, overlapping slightly in streetwear duo fashion)
            using (Bitmap girlPlain = GetTransparentCutout(femalePlainPath, false, true))
            using (Bitmap girlMasked = GetTransparentCutout(femaleMaskedPath, false, true)) {
                int girlW = 780;
                int girlH = 1030;
                int girlX = 640;
                int girlY = 60;

                gPlain.DrawImage(girlPlain, new Rectangle(girlX, girlY, girlW, girlH));
                gMasked.DrawImage(girlMasked, new Rectangle(girlX, girlY, girlW, girlH));
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

[DuoStreetwearComposite]::BuildDuo($malePlain, $femalePlain, $femaleMasked, $outPlain, $outMasked)
Write-Host "Streetwear Duo Composite (Boy & Girl with masks) successfully built with 100% transparent background!"
