const { test, expect } = require('@playwright/test');

test.describe('Olho de Sauron Baby - Video Rotation, Lock & Responsive UI', () => {
  test('rotate button cycles 0 -> 90 -> 180 -> 270 -> 0 degrees with proper styling and attributes', async ({ page }) => {
    await page.goto('/r/test-rotation');

    const rotateBtn = page.locator('#rotateBtn');
    const rotateAngleBadge = page.locator('#rotateAngleBadge');
    const remoteVideo = page.locator('#remoteVideo');
    const videoContainer = page.locator('#videoContainer');

    await expect(rotateBtn).toBeVisible();
    await expect(remoteVideo).toBeAttached();

    // 1. Initial State: 0°
    await expect(rotateAngleBadge).toHaveText('0°');
    await expect(remoteVideo).toHaveAttribute('data-rotation', '0');

    // 2. Click 1 -> 90°
    await rotateBtn.click();
    await page.waitForTimeout(350); // wait for CSS transition to settle
    await expect(rotateAngleBadge).toHaveText('90°');
    await expect(remoteVideo).toHaveAttribute('data-rotation', '90');
    expect(await remoteVideo.evaluate((el) => el.style.transform)).toContain('rotate(90deg)');

    // Check no overflow in container
    const isOverflown90 = await videoContainer.evaluate((el) => {
      return el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth;
    });
    expect(isOverflown90).toBe(false);

    // 3. Click 2 -> 180°
    await rotateBtn.click();
    await expect(rotateAngleBadge).toHaveText('180°');
    await expect(remoteVideo).toHaveAttribute('data-rotation', '180');
    expect(await remoteVideo.evaluate((el) => el.style.transform)).toContain('rotate(180deg)');

    // 4. Click 3 -> 270°
    await rotateBtn.click();
    await page.waitForTimeout(350); // wait for CSS transition to settle
    await expect(rotateAngleBadge).toHaveText('270°');
    await expect(remoteVideo).toHaveAttribute('data-rotation', '270');
    expect(await remoteVideo.evaluate((el) => el.style.transform)).toContain('rotate(270deg)');

    const isOverflown270 = await videoContainer.evaluate((el) => {
      return el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth;
    });
    expect(isOverflown270).toBe(false);

    // 5. Click 4 -> 0°
    await rotateBtn.click();
    await page.waitForTimeout(350);
    await expect(rotateAngleBadge).toHaveText('0°');
    await expect(remoteVideo).toHaveAttribute('data-rotation', '0');
  });

  test('rotation angle is persisted to localStorage and restored on reload', async ({ page }) => {
    await page.goto('/r/test-rotation-storage');

    const rotateBtn = page.locator('#rotateBtn');
    const rotateAngleBadge = page.locator('#rotateAngleBadge');
    const remoteVideo = page.locator('#remoteVideo');

    // Rotate twice to reach 180°
    await rotateBtn.click(); // 90°
    await rotateBtn.click(); // 180°
    await expect(rotateAngleBadge).toHaveText('180°');

    // Verify localStorage has 'sauron-video-rotation' = '180'
    const storedAngle = await page.evaluate(() => localStorage.getItem('sauron-video-rotation'));
    expect(storedAngle).toBe('180');

    // Reload page
    await page.reload();

    // Verify rotation is restored immediately on load
    await expect(rotateAngleBadge).toHaveText('180°');
    await expect(remoteVideo).toHaveAttribute('data-rotation', '180');
  });

  test('lock button toggles UI lock, disables rotation while locked, and unlocks upon holding', async ({ page }) => {
    await page.goto('/r/test-lock');

    const lockBtn = page.locator('#lockBtn');
    const rotateBtn = page.locator('#rotateBtn');
    const rotateAngleBadge = page.locator('#rotateAngleBadge');

    await expect(lockBtn).toBeVisible();
    await expect(rotateBtn).toBeVisible();

    // Rotate to 90°
    await rotateBtn.click();
    await expect(rotateAngleBadge).toHaveText('90°');

    // Lock the interface
    await lockBtn.click();
    await expect(page.locator('body')).toHaveClass(/ui-locked/);
    await expect(lockBtn).toHaveClass(/locked/);

    // While locked, clicking rotateBtn should NOT change angle
    // In CSS, pointer-events is none; force clicking or dispatching event shouldn't change state
    await page.evaluate(() => {
      const btn = document.getElementById('rotateBtn');
      if (btn) btn.click();
    });
    await expect(rotateAngleBadge).toHaveText('90°');

    // Hold the lock button to unlock (2000ms hold threshold)
    await lockBtn.dispatchEvent('mousedown');
    await page.waitForTimeout(2200);
    await lockBtn.dispatchEvent('mouseup');

    // Verify unlocked state
    await expect(page.locator('body')).not.toHaveClass(/ui-locked/);
    await expect(lockBtn).not.toHaveClass(/locked/);

    // Now rotation works again
    await rotateBtn.click();
    await expect(rotateAngleBadge).toHaveText('180°');
  });

  test('tablet and mobile responsive layout in landscape and portrait', async ({ page }) => {
    // 1. Tablet Landscape (1280x800)
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/r/test-responsive');

    const rotateBtn = page.locator('#rotateBtn');
    const lockBtn = page.locator('#lockBtn');
    const bottomBar = page.locator('.bottom-bar');
    const videoContainer = page.locator('#videoContainer');

    await expect(bottomBar).toBeVisible();
    await expect(rotateBtn).toBeVisible();
    await expect(lockBtn).toBeVisible();

    // Rotate to 90deg and verify no horizontal or vertical page scrollbar
    await rotateBtn.click();
    const hasScrollbarLandscape = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth ||
             document.documentElement.scrollHeight > window.innerHeight;
    });
    expect(hasScrollbarLandscape).toBe(false);

    // 2. Tablet Portrait (800x1280)
    await page.setViewportSize({ width: 800, height: 1280 });
    await expect(bottomBar).toBeVisible();
    await expect(rotateBtn).toBeVisible();

    const hasScrollbarPortrait = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth ||
             document.documentElement.scrollHeight > window.innerHeight;
    });
    expect(hasScrollbarPortrait).toBe(false);

    // 3. Touch target sizes: Minimum 44x44px for buttons
    const rotateBox = await rotateBtn.boundingBox();
    expect(rotateBox.width).toBeGreaterThanOrEqual(44);
    expect(rotateBox.height).toBeGreaterThanOrEqual(44);

    const lockBox = await lockBtn.boundingBox();
    expect(lockBox.width).toBeGreaterThanOrEqual(44);
    expect(lockBox.height).toBeGreaterThanOrEqual(44);
  });

  test('screen size controls allow choosing Fit, Fill, and Zoom levels with persistence', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/r/test-screen-sizes');

    const screenSizeBtn = page.locator('#screenSizeBtn');
    const screenSizeBadge = page.locator('#screenSizeBadge');
    const remoteVideo = page.locator('#remoteVideo');

    await expect(screenSizeBtn).toBeVisible();
    await expect(screenSizeBadge).toHaveText('Fit');
    await expect(remoteVideo).toHaveCSS('object-fit', 'contain');

    // 1. Cycle to Fill
    await screenSizeBtn.click();
    await expect(screenSizeBadge).toHaveText('Fill');
    await expect(remoteVideo).toHaveCSS('object-fit', 'cover');

    // 2. Cycle to 1.25x
    await screenSizeBtn.click();
    await expect(screenSizeBadge).toHaveText('1.25x');
    expect(await remoteVideo.evaluate((el) => el.style.transform)).toContain('scale(1.25)');

    // 3. Cycle to 1.5x
    await screenSizeBtn.click();
    await expect(screenSizeBadge).toHaveText('1.5x');
    expect(await remoteVideo.evaluate((el) => el.style.transform)).toContain('scale(1.5)');

    // 4. Cycle to 2x
    await screenSizeBtn.click();
    await expect(screenSizeBadge).toHaveText('2x');
    expect(await remoteVideo.evaluate((el) => el.style.transform)).toContain('scale(2)');

    // Verify localStorage persistence
    const savedFit = await page.evaluate(() => localStorage.getItem('sauron-video-fit'));
    const savedZoom = await page.evaluate(() => localStorage.getItem('sauron-video-zoom'));
    expect(savedFit).toBe('fill');
    expect(savedZoom).toBe('2');

    // Reload page and verify persistence
    await page.reload();
    await expect(screenSizeBadge).toHaveText('2x');
    await expect(remoteVideo).toHaveCSS('object-fit', 'cover');
    expect(await remoteVideo.evaluate((el) => el.style.transform)).toContain('scale(2)');
  });

  test('rotated video in 90 and 270 degrees occupies maximum screen dimensions without shrinking', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/r/test-rotated-large');

    const rotateBtn = page.locator('#rotateBtn');
    const remoteVideo = page.locator('#remoteVideo');

    // Rotate to 270deg
    await rotateBtn.click(); // 90°
    await rotateBtn.click(); // 180°
    await rotateBtn.click(); // 270°

    await page.waitForTimeout(400);

    // Verify physical width and height swapped to match container bounds (800x1280)
    const dimensions = await remoteVideo.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      return {
        styleWidth: el.style.width,
        styleHeight: el.style.height,
        rectWidth: rect.width,
        rectHeight: rect.height
      };
    });

    // In a 1280x800 screen, the rotated element has physical width 800 and height 1280
    // When rotated 270deg, its bounding box expands to fill the entire 1280x800 screen!
    expect(dimensions.styleWidth).toBe('800px');
    expect(dimensions.styleHeight).toBe('1280px');
    expect(dimensions.rectWidth).toBeCloseTo(1280, 0);
    expect(dimensions.rectHeight).toBeCloseTo(800, 0);
  });
});
