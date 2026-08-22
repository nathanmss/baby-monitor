const { test, expect } = require('@playwright/test');

test.describe('Multiple Simultaneous Receivers', () => {
  test('1 Sender feeds 2 Receivers concurrently without interference', async ({ browser }) => {
    const sessionName = `multi-${Date.now()}`;

    // Create 3 isolated browser contexts
    const senderContext = await browser.newContext({
      permissions: ['camera', 'microphone']
    });
    const receiver1Context = await browser.newContext();
    const receiver2Context = await browser.newContext();

    // 1. Launch Sender
    const senderPage = await senderContext.newPage();
    await senderPage.goto(`/s/${sessionName}?q=sd`);

    const startBtn = senderPage.locator('#startBtn');
    if (await startBtn.isVisible()) {
      await startBtn.click();
    }
    await expect(senderPage.locator('#statusDot')).toHaveClass(/connected/, { timeout: 8000 });

    // 2. Launch Receiver 1
    const receiver1Page = await receiver1Context.newPage();
    await receiver1Page.goto(`/r/${sessionName}`);
    await expect(receiver1Page.locator('#statusDot')).toHaveClass(/connected/, { timeout: 10000 });
    await expect(receiver1Page.locator('#remoteVideo')).toBeVisible();

    // 3. Launch Receiver 2
    const receiver2Page = await receiver2Context.newPage();
    await receiver2Page.goto(`/r/${sessionName}`);
    await expect(receiver2Page.locator('#statusDot')).toHaveClass(/connected/, { timeout: 10000 });
    await expect(receiver2Page.locator('#remoteVideo')).toBeVisible();

    // 4. Verify API status shows 2 active receivers for this session
    const statusRes = await senderPage.request.get(`/api/status/${sessionName}`);
    expect(statusRes.ok()).toBeTruthy();
    const statusData = await statusRes.json();
    expect(statusData.senderActive).toBe(true);
    expect(statusData.receiverCount).toBe(2);

    // 5. Disconnect Receiver 1 and ensure Receiver 2 stays active
    await receiver1Page.close();
    await receiver1Context.close();

    // Wait a brief moment for disconnect propagation
    await receiver2Page.waitForTimeout(1000);

    // Verify Receiver 2 is still connected
    await expect(receiver2Page.locator('#statusDot')).toHaveClass(/connected/);

    // Verify API status reflects 1 receiver remaining
    const updatedStatusRes = await senderPage.request.get(`/api/status/${sessionName}`);
    const updatedStatusData = await updatedStatusRes.json();
    expect(updatedStatusData.receiverCount).toBe(1);

    // Clean up
    await receiver2Page.close();
    await receiver2Context.close();
    await senderPage.close();
    await senderContext.close();
  });
});
