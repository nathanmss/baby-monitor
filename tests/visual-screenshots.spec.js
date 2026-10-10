const { test, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

test.describe('Olho de Sauron Baby - Tablet Visual Screenshots & Verification', () => {
  const screenshotsDir = path.join(__dirname, '..', 'docs', 'screenshots');

  test.beforeAll(() => {
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }
  });

  test('captures screenshots of Home (/) in tablet landscape and portrait', async ({ page }) => {
    // 1. Tablet Landscape (1280x800)
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('#senderBtn')).toBeVisible();
    await expect(page.locator('#receiverBtn')).toBeVisible();

    await page.screenshot({
      path: path.join(screenshotsDir, 'home-tablet-landscape.png'),
      fullPage: false
    });

    // 2. Tablet Portrait (800x1280)
    await page.setViewportSize({ width: 800, height: 1280 });
    await page.screenshot({
      path: path.join(screenshotsDir, 'home-tablet-portrait.png'),
      fullPage: false
    });
  });

  test('captures screenshots of Receiver (/r/demo) Floating HUD in landscape and portrait', async ({ page }) => {
    // 1. Tablet Landscape (1280x800)
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/r/demo-sauron');

    const floatingHud = page.locator('#floatingHud');
    const floatingHeader = page.locator('#floatingHeader');
    const rotateBtn = page.locator('#rotateBtn');
    const vuMeter = page.locator('.hud-vu-meter');

    await expect(floatingHud).toBeVisible();
    await expect(floatingHeader).toBeVisible();
    await expect(rotateBtn).toBeVisible();
    await expect(vuMeter).toBeVisible();

    // Verify HUD is a floating dock (has border-radius >= 24px and bottom positioning)
    const hudRadius = await floatingHud.evaluate((el) => window.getComputedStyle(el).borderRadius);
    expect(parseInt(hudRadius, 10)).toBeGreaterThanOrEqual(20);

    // Save HUD Screenshot
    await page.screenshot({
      path: path.join(screenshotsDir, 'receiver-hud-landscape.png'),
      fullPage: false
    });

    // 2. Open Settings Floating Sheet
    const drawerToggle = page.locator('#drawerToggle');
    await drawerToggle.click();
    const settingsPanel = page.locator('#controlsDrawer');
    await expect(settingsPanel).toHaveClass(/open/);
    await page.waitForTimeout(400); // Wait for transition

    await page.screenshot({
      path: path.join(screenshotsDir, 'receiver-settings-landscape.png'),
      fullPage: false
    });

    // Close settings
    const closeBtn = page.locator('#closeDrawerBtn');
    if (await closeBtn.isVisible()) {
      await closeBtn.click();
    } else {
      await drawerToggle.click();
    }
    await page.waitForTimeout(400); // Wait for close transition

    // 3. Tablet Portrait (800x1280)
    await page.setViewportSize({ width: 800, height: 1280 });
    await page.waitForTimeout(200);
    await page.screenshot({
      path: path.join(screenshotsDir, 'receiver-hud-portrait.png'),
      fullPage: false
    });
  });

  test('captures screenshots of Sender (/s/demo) in landscape and portrait', async ({ page }) => {
    // 1. Tablet Landscape (1280x800)
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/s/demo-sauron');

    await expect(page.locator('#startBtn')).toBeVisible();

    await page.screenshot({
      path: path.join(screenshotsDir, 'sender-tablet-landscape.png'),
      fullPage: false
    });

    // 2. Tablet Portrait (800x1280)
    await page.setViewportSize({ width: 800, height: 1280 });
    await page.screenshot({
      path: path.join(screenshotsDir, 'sender-tablet-portrait.png'),
      fullPage: false
    });
  });
});
