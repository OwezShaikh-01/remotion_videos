import numpy as np
from scipy import ndimage as ndi
from PIL import Image
rng = np.random.default_rng(7)
H, W = 1400, 2400
def noise(sigma):
    n = ndi.gaussian_filter(rng.standard_normal((H, W)).astype(np.float32), sigma)
    return n / n.std()
low = noise(60); mid = noise(18); fine = noise(3); micro = noise(1.0)
yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
ripple = np.sin((yy * 0.045) + low * 3.2 + xx * 0.004) * 0.9
height = ripple + mid * 0.35 + fine * 0.25 + micro * 0.12
gy, gx = np.gradient(ndi.gaussian_filter(height, 1.2))
# low sun from upper-left
shade = np.clip(0.5 - (gx * 0.8 + gy * 1.0) * 2.2, 0, 1)
def tone(base, shade_amt, tint_amt):
    base = np.array(base, np.float32)
    k = (0.70 + shade_amt * shade)[..., None]
    img = base[None, None, :] * k
    img *= (1 + 0.05 * low[..., None])
    img += (micro[..., None] * 5.0)
    # warm-to-cool gradient lighting, brighter top-left
    glow = 0.96 + 0.08 * (1 - np.sqrt(((xx - 700) / 2400) ** 2 + ((yy - 300) / 1400) ** 2))[..., None]
    img *= glow
    return np.clip(img, 0, 255).astype(np.uint8)
dry = tone((176, 142, 92), 0.42, 0)
Image.fromarray(dry).save('public/img/sand.jpg', quality=92)
# wet sand: smoother, darker, glossy
h2 = ndi.gaussian_filter(height, 4)
gy2, gx2 = np.gradient(h2)
shade2 = np.clip(0.5 - (gx2 + gy2) * 6, 0, 1)
wet = np.array((120, 92, 56), np.float32)[None, None, :] * (0.78 + 0.35 * shade2)[..., None]
sheen = np.clip(low * 0.5 + 0.3, 0, 1)[..., None] * np.array((38, 38, 34), np.float32)[None, None, :]
wet = np.clip(wet + sheen + micro[..., None] * 3, 0, 255).astype(np.uint8)
Image.fromarray(wet).save('public/img/sandwet.jpg', quality=92)
# film grain tile
g = np.random.default_rng(3)
n = g.integers(0, 2, (512, 512)) * 255
a = g.integers(0, 46, (512, 512))
tile = np.stack([n, n, n, a], -1).astype(np.uint8)
Image.fromarray(tile, 'RGBA').save('public/img/grain.png')
print('ok')
