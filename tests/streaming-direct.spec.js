const { test, expect } = require('@playwright/test');

test.describe('Direct WebRTC Streaming', () => {
  test('1 Sender streams to 1 Receiver in Direct mode', async ({ context }) => {
    const sessionName = `session-${Date.now()}`;

    // Sender Page
    const senderPage = await context.newPage();
    await senderPage.goto(`/s/${sessionName}?q=sd`);

    // Check sender video element
    const localVideo = senderPage.locator('#localVideo');
    await expect(localVideo).toBeVisible();

    // Start streaming if not auto-started
    const startBtn = senderPage.locator('#startBtn');
    if (await startBtn.isVisible()) {
      await startBtn.click();
    }

    // Wait for sender to indicate it is connected to signaling/streaming
    await expect(senderPage.locator('#statusDot')).toHaveClass(/connected/, { timeout: 8000 });

    // Receiver Page
    const receiverPage = await context.newPage();
    await receiverPage.goto(`/r/${sessionName}`);

    // Wait for receiver connection to establish
    await expect(receiverPage.locator('#statusDot')).toHaveClass(/connected/, { timeout: 10000 });

    // Check remote video element presence
    const remoteVideo = receiverPage.locator('#remoteVideo');
    await expect(remoteVideo).toBeVisible();

    // Open controls drawer and verify volume slider interaction
    const drawerToggle = receiverPage.locator('#drawerToggle');
    if (await drawerToggle.isVisible()) {
      await drawerToggle.click();
    }

    const volumeSlider = receiverPage.locator('#volume');
    await expect(volumeSlider).toBeVisible({ timeout: 5000 });
    await volumeSlider.fill('75');
    await expect(receiverPage.locator('#volumeDisplay')).toContainText('75');

    // Clean up
    await receiverPage.close();
    await senderPage.close();
  });
});
