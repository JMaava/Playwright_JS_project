import {expect, test} from "@playwright/test"

test.describe('few tests', ()=> {

    test ('check visible title', async({page})=>{
        await page.goto('https://openweathermap.org/');

        await page.getByRole('link', {name: 'Guide'}).click();

        await expect(page.getByRole('heading', {name: 'Guide'})).toBeVisible();
        await expect(page).toHaveURL('https://openweathermap.org/guide');
    })

    test ('check login', async({page})=>{
        await page.goto('https://the-internet.herokuapp.com/login');

        await page.getByRole('textbox', {name: 'username'}).fill('tomsmith');
        await page.getByRole('textbox', {name: 'password'}).fill('SuperSecretPassword!');
        await page.getByRole('button', {name: ' Login'}).click();

        await expect(page.getByText('You logged into a secure area!')).toBeVisible();
        // await expect(page.locator('#flash')).toHaveText('You logged into a secure area!'); - не пройдет, т.к. есть пробелы до и после текста
        await expect(page.locator('#flash')).toContainText('You logged into a secure area!');
        
    })

    test ('checkbox', async({page})=>{
        await page.goto('https://home.openweathermap.org/users/sign_in');

        await page.getByRole('checkbox', {name: 'Remember me'}).check();

        await expect(page.getByRole('checkbox', {name: 'Remember me'})).toBeChecked();
    })
    
    test ('radiobutton', async({page})=>{
        await page.goto('https://home.openweathermap.org/questions');

        await page.getByLabel('Yes').check();

        await expect(page.getByLabel('Yes')).toBeChecked();
    })

    test ('hover', async({page})=>{
        await page.goto('https://the-internet.herokuapp.com/hovers');

        await page.getByAltText('User Avatar').first().hover();

        await expect(page.getByText('name: user1')).toBeVisible();
    })

    test ('checkbox uncheck', async({page})=>{
        await page.goto('https://the-internet.herokuapp.com/checkboxes');

        await page.getByRole('checkbox').last().uncheck();

        await expect(page.getByRole('checkbox').last()).not.toBeChecked();
    })

    test ('list elements', async({page})=>{
        await page.goto('https://the-internet.herokuapp.com/disappearing_elements');

        const list = page.getByRole('listitem');
        console.log(await list.allInnerTexts());
        // [ 'Home', 'About', 'Contact Us', 'Portfolio', 'Gallery' ]

        await list.filter({hasText: 'Home'}).click();
    })

    test ('select', async({page})=>{
        await page.goto('https://the-internet.herokuapp.com/dropdown');
        
        const selectMenu = page.locator('#dropdown');
        await selectMenu.selectOption('Option 1')

        await expect(selectMenu).toHaveValue('1');
        await expect(selectMenu.locator('option:checked')).toHaveText('Option 1');
        await expect(selectMenu.getByText('Option 1')).toHaveAttribute('selected', 'selected');
    })

    test ('multiselect', async({page})=>{
        await page.goto('https://demoqa.com/select-menu');

        await page.getByText('Select...').click();
        await page.locator('#react-select-4-option-0').click();
        await page.locator('#react-select-4-option-1').click();

        await expect(page.locator('.css-1rhbuit-multiValue')).toHaveText(['Green', 'Blue']);
    })
    

})