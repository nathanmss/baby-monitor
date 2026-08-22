const { test, expect } = require('@playwright/test');

test.describe('Landing page & i18n', () => {
  test('renders landing page and supports switching between pt-BR and en-US', async ({ page }) => {
    await page.goto('/');

    // Check PWA link in head
    const manifest = await page.locator('link[rel="manifest"]').getAttribute('href');
    expect(manifest).toBe('/manifest.webmanifest');

    // If on mobile viewport, open navigation menu first
    const mobileMenuBtn = page.locator('.mobile-menu-btn');
    if (await mobileMenuBtn.isVisible()) {
      await mobileMenuBtn.click();
    }

    const ptBtn = page.locator('.lang-btn[data-lang="pt-BR"]').first();
    const enBtn = page.locator('.lang-btn[data-lang="en-US"]').first();

    // Switch to pt-BR
    await ptBtn.click();
    await expect(page.locator('h1')).toContainText(/Transforme celulares/i);
    const savedLangPt = await page.evaluate(() => localStorage.getItem('babymonitor-lang'));
    expect(savedLangPt).toBe('pt-BR');

    // Switch to en-US
    await enBtn.click();
    await expect(page.locator('h1')).toContainText(/Turn any phone/i);
    const savedLangEn = await page.evaluate(() => localStorage.getItem('babymonitor-lang'));
    expect(savedLangEn).toBe('en-US');

    // Switch back to pt-BR
    await ptBtn.click();
    await expect(page.locator('h1')).toContainText(/Transforme celulares/i);
  });

  test('validates PWA manifest endpoint', async ({ request }) => {
    const res = await request.get('/manifest.webmanifest');
    expect(res.ok()).toBeTruthy();
    const json = await res.json();
    expect(json.name).toContain('Babá Eletrônica');
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
    await page.goto('/start.html');
    await expect(page.locator('#senderBtn')).toBeVisible();
    await expect(page.locator('#receiverBtn')).toBeVisible();

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/start.html');
    await expect(page.locator('#senderBtn')).toBeVisible();
    await expect(page.locator('#receiverBtn')).toBeVisible();
  });
});
