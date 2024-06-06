import {expect, test} from "@playwright/test"

test.describe('demoQa practice form', ()=> {

    test.beforeEach(async({page})=>{
        await page.goto('https://demoqa.com/automation-practice-form/');
    })

    test ('check filling Registration Form', async({page})=>{
        await page.getByPlaceholder('First Name').fill('Ivan');
        await expect(page.locator('#firstName')).toHaveValue('Ivan')

        await page.getByRole('textbox', {name: 'Last Name'}).fill('Ivanov');
        await page.getByRole('textbox', {name: 'name@example.com'}).fill('test@ya.ru');
        await page.locator('label[for="gender-radio-1"]').check();
        await expect(page.locator('label[for="gender-radio-1"]')).toBeChecked();

        await page.getByRole('textbox', {name: 'Mobile Number'}).fill('80000000000');

        await page.getByRole('textbox', {name: 'name@example.com'}).fill('test@ya.ru');
    })

    test ('check unfilling Registration Form', async({page})=>{
        await page.getByRole('button', {name: 'submit'}).click();

        await expect(page.locator('#firstName')).toHaveCSS('border-color', 'rgb(220, 53, 69)')
    })

})