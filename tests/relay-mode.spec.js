const { test, expect } = require('@playwright/test');

test.describe('Relay Mode & Config API', () => {
  test('webrtc-config endpoint responds with relay availability', async ({ request }) => {
    const res = await request.get('/api/webrtc-config?transport=relay');
    expect(res.ok()).toBeTruthy();
    const data = await res.json();
    expect(data).toHaveProperty('relayAvailable');
    expect(data).toHaveProperty('iceServers');
    expect(Array.isArray(data.iceServers)).toBe(true);
  });

  test('Sender initializes in relay mode when requested', async ({ context }) => {
    const sessionName = `relay-${Date.now()}`;

    const senderPage = await context.newPage();
    await senderPage.goto(`/s/${sessionName}?transport=relay&q=sd`);

    const localVideo = senderPage.locator('#localVideo');
    await expect(localVideo).toBeVisible();

    const startBtn = senderPage.locator('#startBtn');
    if (await startBtn.isVisible()) {
      await startBtn.click();
    }

    await expect(senderPage.locator('#statusDot')).toHaveClass(/connected/, { timeout: 8000 });
    await senderPage.close();
  });
});
