const { test, expect } = require('@playwright/test');

test.describe('Olho de Sauron Baby - Direct app loading & i18n', () => {
  test('direct app load without commercial landing page and supports i18n', async ({ page }) => {
    // 1. Loading root "/" should directly load the application (no marketing landing)
    await page.goto('/');

    // Check PWA manifest link in head
    const manifest = await page.locator('link[rel="manifest"]').getAttribute('href');
    expect(manifest).toBe('/manifest.webmanifest');

    // Title and main heading must be "BabySauron"
    await expect(page).toHaveTitle(/BabySauron|Olho de Sauron Baby/i);
    await expect(page.locator('h1')).toContainText(/BabySauron|Olho de Sauron Baby/i);

    // Core app mode controls are immediately present
    await expect(page.locator('#sessionInput')).toBeVisible();
    await expect(page.locator('#senderBtn')).toBeVisible();
    await expect(page.locator('#receiverBtn')).toBeVisible();

    // Verify absence of legacy commercial/marketing landing page elements
    await expect(page.locator('.hero')).toHaveCount(0);
    await expect(page.locator('#features')).toHaveCount(0);
    await expect(page.locator('#how-it-works')).toHaveCount(0);
    await expect(page.locator('#open-source')).toHaveCount(0);
    await expect(page.locator('a[href*="github.com"]')).toHaveCount(0);

    // Language switcher
    const ptBtn = page.locator('.lang-btn[data-lang="pt-BR"]').first();
    const enBtn = page.locator('.lang-btn[data-lang="en-US"]').first();

    // Switch to en-US
    await enBtn.click();
    await expect(page.locator('#senderBtn .role-title')).toContainText(/Baby's Phone/i);
    const savedLangEn = await page.evaluate(() => localStorage.getItem('babymonitor-lang'));
    expect(savedLangEn).toBe('en-US');

    // Switch back to pt-BR
    await ptBtn.click();
    await expect(page.locator('#senderBtn .role-title')).toContainText(/Celular do Bebê/i);
    const savedLangPt = await page.evaluate(() => localStorage.getItem('babymonitor-lang'));
    expect(savedLangPt).toBe('pt-BR');
  });

  test('validates PWA manifest endpoint for BabySauron', async ({ request }) => {
    const res = await request.get('/manifest.webmanifest');
    expect(res.ok()).toBeTruthy();
    const json = await res.json();
    expect(json.name).toMatch(/BabySauron|Olho de Sauron Baby/i);
    expect(json.display).toBe('standalone');
    expect(json.icons.length).toBeGreaterThan(0);
  });

  test('start page operates session inputs, quality, mode and transport toggles', async ({ page }) => {
    await page.goto('/start.html');

    // Fill session
    const sessionInput = page.locator('#sessionInput');
    await sessionInput.fill('sala-bebe');

    // Toggle quality to SD and back to HD
    const sdOption = page.locator('.quality-option[data-quality="sd"]');
    const hdOption = page.locator('.quality-option[data-quality="hd"]');
    await sdOption.click();
    await expect(sdOption).toHaveClass(/active/);
    await hdOption.click();
    await expect(hdOption).toHaveClass(/active/);

    // Toggle audio only mode
    const audioMode = page.locator('.stream-option[data-mode="audio"]');
    const avMode = page.locator('.stream-option[data-mode="av"]');
    await audioMode.click();
    await expect(audioMode).toHaveClass(/active/);
    await avMode.click();
    await expect(avMode).toHaveClass(/active/);

    // Toggle connection route
    const relayOption = page.locator('.transport-option[data-transport="relay"]');
    const directOption = page.locator('.transport-option[data-transport="direct"]');
    await relayOption.click();
    await expect(relayOption).toHaveClass(/active/);
    await directOption.click();
    await expect(directOption).toHaveClass(/active/);
  });

  test('responsive viewport checks on mobile (360x800 and 390x844)', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto('/');
    await expect(page.locator('#senderBtn')).toBeVisible();
    await expect(page.locator('#receiverBtn')).toBeVisible();

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await expect(page.locator('#senderBtn')).toBeVisible();
    await expect(page.locator('#receiverBtn')).toBeVisible();
  });
});
