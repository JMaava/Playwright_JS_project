import {expect, test} from "@playwright/test"

    // test ('title TC', async({page}) => {
    // await ...
    // })

test.describe('first test', ()=> {

    test.beforeEach(async({page})=>{
        await page.goto('https://demoqa.com/');
    })
    
    test ('verify page title', async({page}) => {
        expect(await page.title()).toEqual('DEMOQA');
        });

    test ('fill out the text box', async({page}) => {
        await page.locator('.card-body>h5').first().click();
        await page.locator('ul.menu-list>li>span:text-is("Text Box")').click();
        await page.locator('#userName').fill('Maria');
        // await page.pause();
        })
        
})