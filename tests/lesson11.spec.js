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

    test ('todos check done', async({page})=>{
        await page.goto('https://example.cypress.io/todo');
        const label_check = page.locator('.todo-list li label').first()

        await page.locator('.toggle').first().check();

        await expect(page.locator('section>ul>li').first()).toHaveAttribute('class', 'completed');
        await expect(label_check).toHaveCSS('color', 'rgb(205, 205, 205)')
        await expect(label_check).toHaveCSS('text-decoration', /line-through/)
    })

    test ('menu Commands', async({page})=>{
        await page.goto('https://example.cypress.io/todo');
        const menuCommand = await page.locator('.dropdown-menu li');
        const menuCommandExpect = [ "Querying", "Traversal", "Actions", "Window", "Viewport","Location", "Navigation",
                                     "Assertions", "Misc", "Connectors", "Aliasing", "Waiting", "Network Requests",
                                     "Files", "Storage", "Cookies", "Spies, Stubs & Clocks",];

        await expect(menuCommand).toHaveText(menuCommandExpect)
    })
//не проверен, сайт недоступен
    test ('tableCountRows', async({page})=>{
        await page.goto('https://demoqa.com/webtables');

        const tableRows = page.locator('.rt-tbody>div');

        expect(await tableRows.count()).toBe(10);
        await expect(tableRows).toHaveCount(10)
    })

   test ('tableCountRows5', async({page})=>{
        await page.goto('https://demoqa.com/webtables');

        const tableRows = page.locator('.rt-tbody>div');

        await page.getByLabel('rows per page').selectOption('5');

        await expect(tableRows).toHaveCount(5)
    })

    test('newTabInWindow', async({page})=>{
        await page.goto('https://openweathermap.org/');

        const pageHeadPromise = page.waitForEvent("popup");
        await page.getByRole('link', {name:'Marketplace'}).first().click();
        const newPageMarketplace = await pageHeadPromise;

       // await expect(newPageMarketplace.getByRole('heading', {name:'Custom Weather Products'})).toBeVisible();
        await expect(newPageMarketplace).toHaveURL('https://home.openweathermap.org/marketplace')

    })

    test('waitFor', async({page})=>{
        await page.goto('https://openweathermap.org/');

        await page.getByPlaceholder('Search city').fill('New York');
        await page.getByRole('button', {name:'Search'}).click();

        const dropDownMenu = page.locator('ul.search-dropdown-menu');
        await dropDownMenu.waitFor({state:'attached'});

        await expect(dropDownMenu.locator('li>span:nth-child(1)')).toHaveText(['New York City, US ', 'New York, US '])
    })

    test ('tableRowsSort', async({page})=>{
        await page.goto('https://demoqa.com/webtables');

        const table = page.locator('.rt-table');
        const headers = page.locator('.rt-th');
        const rows = page.locator('[role="rowgroup"]');

        const headerData = await headers.allInnerTexts();

        const getTableData = async() => {
            const tableData = [];
            for (let i = 0; i< await rows.count(); i++) {
                const column = await rows.nth(i).locator('.rt-td');
                const columnData = (await column.allTextContents()).map(el=>el.trim());
                tableData.push(headerData.reduce((acc, el, ind)=>{return {...acc, [el]:columnData[ind]}; }, {} ))
            }
            return tableData.filter(obj => obj['First Name'])
        }

        const originalTableData = await getTableData();

        const expectedTableData = originalTableData.sort((a,b) => a['First Name'].localeCompare(b['First Name']))

        const selectedHeader = headers.filter ({hasText:'First Name'});
        await selectedHeader.click();

        const actualTableData = await getTableData();

        console.log(actualTableData);
        console.log(expectedTableData);

        expect(actualTableData).toEqual(expectedTableData);

    })

   test('uploadFile', async({page})=>{
        await page.goto('https://demoqa.com/automation-practice-form');

        await page.getByLabel('Select picture').setInputFiles('tests/З1.PNG');
        await page.getByPlaceholder('First Name').fill('Maria');
        await page.getByPlaceholder('Last Name').fill('Test');
        await page.locator('label[for="gender-radio-1"]').check();
        await page.getByPlaceholder('Mobile Number').fill('9001001010');
        await page.getByRole('button', {name:'Submit'}).click();

        const actualResult = await page.locator('tbody>tr:nth-child(8)>td:nth-child(2)');

        expect(actualResult).toHaveText('З1.PNG')
    })

})