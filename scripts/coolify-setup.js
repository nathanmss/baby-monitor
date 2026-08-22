const { chromium } = require('@playwright/test');

(async () => {
  console.log('Iniciando navegador Playwright para acesso ao Coolify...');
  const browser = await chromium.launch({
    headless: false,
    args: ['--start-maximized']
  });

  const context = await browser.newContext({
    viewport: null
  });

  const page = await context.newPage();
  
  console.log('Navegando para http://2.24.83.99:8000 ...');
  await page.goto('http://2.24.83.99:8000/', { waitUntil: 'domcontentloaded', timeout: 30000 });

  console.log('Página carregada! Aguardando você preencher as credenciais e fazer login...');
  
  // Wait for login to complete (URL changes away from /login or dashboard elements become visible)
  try {
    await page.waitForFunction(() => {
      return !window.location.pathname.includes('/login') && 
             (document.body.innerText.includes('Projects') || document.body.innerText.includes('Dashboard') || document.body.innerText.includes('Servers'));
    }, { timeout: 300000 }); // 5 minutes timeout for user to log in

    console.log('Login detectado com sucesso!');
    console.log('URL atual:', page.url());
  } catch (err) {
    console.log('Tempo limite aguardando login ou login realizado.');
  }

  // Keep alive or allow automation to continue
  // We can write page status
})();
