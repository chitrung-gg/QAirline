// import { test, expect } from '@playwright/test';

// test.use({ storageState: undefined });

// test('Admin đăng nhập và kiểm tra menu Admin', async ({ page }) => {
//   await page.goto('${process.env.FRONTEND_URL}:${process.env.FRONTEND_PORT}/auth/login');

//   await page.getByPlaceholder('Email').fill('admin@qairline.com');
//   await page.getByPlaceholder('Mật khẩu').waitFor({ state: 'visible' });
//   await page.getByPlaceholder('Mật khẩu').fill('QAirline123');

//   await page.locator('form').getByRole('button', { name: 'Đăng nhập' }).click();

//   // 4. Chờ chuyển hướng về trang chủ hoặc dashboard
//   await page.waitForURL('**', { timeout: 180000 }); // 180 giây = 3 phút

//   // 5. Kiểm tra xem "Admin" có xuất hiện trong Navbar không
//   await page.waitForSelector('a:has-text("Admin")', { timeout: 180000 });

//   const adminMenu = await page.getByRole('link', { name: 'Admin' });
//   await expect(adminMenu).toBeVisible({ timeout: 10000 });


//   // 6. Truy cập trang admin
//   await adminMenu.click();
//   await page.waitForURL('**/admin', { timeout: 180000 });

//   // 7. Kiểm tra một số mục trong sidebar admin
//   await expect(page.getByRole('link', { name: 'Người dùng' })).toBeVisible();
//   await expect(page.getByRole('link', { name: 'Tàu bay' })).toBeVisible();
// });
