import {expect, test} from "@playwright/test"

test.describe('lesson 15', ()=> {

    test ('Verify user drag and drop elements', async({page})=>{
        await goto('https://www.globalsqa.com/demo-site/draganddrop/');

        const frame = page.frameLocator('[rel-title="Photo Manager"] iframe');

        await frame.locator()
    })
})