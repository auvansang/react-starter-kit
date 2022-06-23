import { test, expect } from '@playwright/test';
test('test', async ({ page }) => {
  // Go to https://admin-smartpos-uat.mafc.vn/
  await page.goto('https://admin-smartpos-uat.mafc.vn/');
  // Click text=Đăng nhập
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://id-smartpos-uat.mafc.vn/account/login?returnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3Dsmartpos-admin-web%26redirect_uri%3Dhttps%253A%252F%252Fadmin-smartpos-uat.mafc.vn%252Fauth%252Fsignin-callback%26response_type%3Dcode%26scope%3Dopenid%2520profile%2520email%2520offline_access%2520http-aggregator%2520identity%2520merchant%2520notification%2520catalog%2520transaction%26state%3D3ac396d3b9ce4297b137f4856c183ad2%26code_challenge%3DrpNWnRBN733DmY89nvkRTMTk6xlTxL-7kKn4rRccxDI%26code_challenge_method%3DS256%26response_mode%3Dquery' }*/),
    page.locator('text=Đăng nhập').click(),
  ]);
  // Click [placeholder="Username"]
  await page.locator('[placeholder="Username"]').click();
  // Fill [placeholder="Password"]
  await page.locator('[placeholder="Password"]').fill('P#ssw0rd');
  // Click button:has-text("Login")
  await page.locator('button:has-text("Login")').click();
  await expect(page).toHaveURL(
    'https://id-smartpos-uat.mafc.vn/account/login?returnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3Dsmartpos-admin-web%26redirect_uri%3Dhttps%253A%252F%252Fadmin-smartpos-uat.mafc.vn%252Fauth%252Fsignin-callback%26response_type%3Dcode%26scope%3Dopenid%2520profile%2520email%2520offline_access%2520http-aggregator%2520identity%2520merchant%2520notification%2520catalog%2520transaction%26state%3D3ac396d3b9ce4297b137f4856c183ad2%26code_challenge%3DrpNWnRBN733DmY89nvkRTMTk6xlTxL-7kKn4rRccxDI%26code_challenge_method%3DS256%26response_mode%3Dquery'
  );
});
