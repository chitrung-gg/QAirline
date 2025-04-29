import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config(); 

test.use({
  storageState: undefined,
});

test('Autonomous Test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Đăng nhập' }).click();
  await page.getByRole('textbox', { name: 'Email của bạn Email của bạn' }).click();
  await page.getByRole('textbox', { name: 'Email của bạn Email của bạn' }).fill('admin@qairline.com');
  await page.getByRole('textbox', { name: 'Email của bạn Email của bạn' }).press('Tab');
  await page.getByRole('textbox', { name: 'Mật khẩu Mật khẩu' }).fill('QAirline123');
  await page.locator('form').getByRole('button', { name: 'Đăng nhập' }).click();
  await page.getByRole('link', { name: 'Admin' }).click();
  await page.getByRole('link', { name: 'Sân bay' }).click();
  await page.getByRole('button', { name: 'Thêm mới' }).click();
  await page.getByRole('textbox', { name: 'Tên sân bay Tên sân bay*' }).click();
  await page.getByRole('textbox', { name: 'Tên sân bay Tên sân bay*' }).fill('Sân Bay B');
  await page.getByRole('textbox', { name: 'Tên sân bay Tên sân bay*' }).press('Tab');
  await page.getByRole('textbox', { name: 'Thành phố Thành phố*' }).fill('Hồ Chí Minh');
  await page.getByRole('textbox', { name: 'Thành phố Thành phố*' }).press('Tab');
  await page.getByRole('textbox', { name: 'Quốc gia Quốc gia*' }).fill('Việt Nam');
  await page.getByRole('textbox', { name: 'Quốc gia Quốc gia*' }).press('Tab');
  await page.getByRole('textbox', { name: 'Mã IATA Mã IATA*' }).fill('HCM');
  await page.locator('div:nth-child(4) > .group > div > .relative > .inline-flex').click();
  await page.getByRole('button', { name: 'Tạo sân bay' }).click();
});

test('Codegen Test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Đăng nhập' }).click();
  await page.getByRole('textbox', { name: 'Email của bạn Email của bạn' }).click();
  await page.getByRole('textbox', { name: 'Email của bạn Email của bạn' }).fill('admin@qairline.com');
  await page.getByRole('textbox', { name: 'Email của bạn Email của bạn' }).press('Tab');
  await page.getByRole('textbox', { name: 'Mật khẩu Mật khẩu' }).fill('QAirline123');
  await page.getByRole('textbox', { name: 'Mật khẩu Mật khẩu' }).press('Enter');
  await page.locator('form').getByRole('button', { name: 'Đăng nhập' }).click();
  await page.getByRole('link', { name: 'Admin' }).click();
  await page.getByRole('link', { name: 'Sân bay' }).click();
  await page.getByRole('button', { name: 'Thêm mới' }).click();
  await page.getByRole('textbox', { name: 'Tên sân bay Tên sân bay*' }).click();
  await page.getByRole('textbox', { name: 'Tên sân bay Tên sân bay*' }).fill('ABC');
  await page.getByRole('textbox', { name: 'Tên sân bay Tên sân bay*' }).press('Tab');
  await page.getByRole('textbox', { name: 'Thành phố Thành phố*' }).fill('XYZ');
  await page.getByRole('textbox', { name: 'Thành phố Thành phố*' }).press('Tab');
  await page.getByRole('textbox', { name: 'Quốc gia Quốc gia*' }).fill('VN');
  await page.getByRole('textbox', { name: 'Quốc gia Quốc gia*' }).press('Tab');
  await page.getByRole('textbox', { name: 'Mã IATA Mã IATA*' }).fill('VN');
  await page.getByRole('button', { name: 'Tạo sân bay' }).click();
  await page.getByRole('button', { name: 'Đóng' }).click();
});

test('Tạo sân bay thành công', async ({ page, context }) => {
  await context.clearCookies();

  await page.goto('http://localhost:3000/auth/login', {timeout: 180000}); 
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  await page.getByPlaceholder('Email').fill(process.env.ADMIN_EMAIL || '');
  await page.getByPlaceholder('Mật khẩu').fill(process.env.ADMIN_PASSWORD || '');
  await page.locator('form').getByRole('button', { name: 'Đăng nhập' }).click();

  await page.waitForURL('**', { waitUntil: 'load' });

  await page.locator('text=Admin').click();

  await page.waitForURL('**/admin', { timeout: 180000 });

  const airportLink = page.getByRole('link', { name: 'Sân bay' });
  await expect(airportLink).toBeVisible({ timeout: 180000 });     
  await expect(airportLink).toBeEnabled();                        
  await airportLink.click();  
  await page.waitForURL('**/admin/airport', { timeout: 180000 });

  await expect(page).toHaveURL(/\/admin\/airport$/, { timeout: 180000 });


  const addButton = page.getByRole('button', { name: 'Thêm mới' });
  await addButton.waitFor({ state: 'visible' });
  await addButton.click();

  await page.waitForURL('**/admin/airport/create', { timeout: 180000 });

  await page.getByLabel('Tên sân bay').fill('Sân bay quốc tế Vân Đồn');
  await page.getByLabel('Thành phố').fill('Quảng Ninh');
  await page.getByLabel('Quốc gia').fill('Việt Nam');
  await page.getByLabel('Mã IATA').fill('VDO');

  await page.getByRole('button', { name: 'Tạo sân bay' }).click();

  const successModal = page.getByText('Tạo sân bay thành công!');
  await expect(successModal).toBeVisible({ timeout: 10000 });

  const closeButton = page.getByRole('button', { name: 'Đóng' });
  await expect(closeButton).toBeVisible(); 
  await closeButton.waitFor({ state: 'attached' });
  await closeButton.click();

  await expect(page).toHaveURL('http://localhost:3000/admin/airport', { timeout: 180000 });
});


test('Tạo sân bay thiếu trường', async ({ page, context }) => {
  await context.clearCookies();

  await page.goto('http://localhost:3000/auth/login', {timeout: 180000});
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  await page.getByPlaceholder('Email').fill(process.env.ADMIN_EMAIL || '');
  await page.getByPlaceholder('Mật khẩu').fill(process.env.ADMIN_PASSWORD || '');
  await page.locator('form').getByRole('button', { name: 'Đăng nhập' }).click();

  await page.waitForURL('**', { waitUntil: 'load' });

  const adminMenu = page.getByRole('link', { name: 'Admin' });
  await expect(adminMenu).toBeVisible({ timeout: 180000 });

  await adminMenu.click();
  await page.waitForURL('**/admin', { timeout: 180000 });

  const airportLink = page.getByRole('link', { name: 'Sân bay' });
  await expect(airportLink).toBeVisible({ timeout: 180000 });      
  await expect(airportLink).toBeEnabled();                        
  await airportLink.click();  

  await airportLink.click();
  await expect(page).toHaveURL(/\/admin\/airport$/, { timeout: 180000 });


  const addButton = page.getByRole('button', { name: 'Thêm mới' });
  await addButton.waitFor({ state: 'visible' });
  await addButton.click();

  await page.waitForURL('**/admin/airport/create', { timeout: 180000 });

  await page.getByRole('button', { name: 'Tạo sân bay' }).click();

  const failedModal = page.getByText('Vui lòng kiểm tra lại thông tin. Đã có lỗi xảy ra khi tạo sân bay');
  await expect(failedModal).toBeVisible({ timeout: 10000 });

  const closeButton = page.getByRole('button', { name: 'Đóng' });
  await expect(closeButton).toBeVisible(); 
  await closeButton.waitFor({ state: 'attached' }); 
  await closeButton.click(); 

  await expect(page).toHaveURL(/\/admin\/airport\/create$/);
});


test('Hiển thị lỗi khi API trả về lỗi', async ({ page, context }) => {
  await context.clearCookies();
  await page.goto('http://localhost:3000/auth/login');
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  await page.getByPlaceholder('Email').fill(process.env.ADMIN_EMAIL || '');
  await page.getByPlaceholder('Mật khẩu').fill(process.env.ADMIN_PASSWORD || '');
  await page.locator('form').getByRole('button', { name: 'Đăng nhập' }).click();
  await page.waitForURL('**', { waitUntil: 'load' });

  const adminMenu = page.getByRole('link', { name: 'Admin' });
  await expect(adminMenu).toBeVisible();
  await adminMenu.click();

  const airportLink = page.getByRole('link', { name: 'Sân bay' });
  await airportLink.click();
  await expect(page).toHaveURL(/\/admin\/airport$/);

  const addButton = page.getByRole('button', { name: 'Thêm mới' });
  await addButton.click();
  await expect(page).toHaveURL(/\/admin\/airport\/create$/);

  await page.getByLabel('Tên sân bay').fill('Sân bay lỗi');
  await page.getByLabel('Thành phố').fill('Hà Nội');
  await page.getByLabel('Quốc gia').fill('Việt Nam');
  await page.getByLabel('Mã IATA').fill('ERR');

  await page.route('**/airport', async route => {
    console.log('Intercepted!');
    await route.fulfill({
      status: 400,
      contentType: 'application/json',
      body: JSON.stringify({
        message: 'Error',
      }),
    });
  });

  await page.getByRole('button', { name: 'Tạo sân bay' }).click();

  const failedModal = page.getByText('Vui lòng kiểm tra lại thông tin. Đã có lỗi xảy ra khi tạo sân bay');
  await expect(failedModal).toBeVisible({ timeout: 10000 });

  const closeButton = page.getByRole('button', { name: 'Đóng' });
  await closeButton.click();

  await expect(page).toHaveURL(/\/admin\/airport\/create$/);
});