import {expect, test} from "@playwright/test"

test.describe('playwright.dev', ()=> {
    test ('verify page title', async({page}) => {
        await page.goto('https://playwright.dev/');

        await expect(page).toHaveTitle(/Playwright/);
        });

    test ('get started link', async({page}) => {
        await page.goto('https://playwright.dev/');
        await page.locator('.getStarted_Sjon').click();

        await expect(page).toHaveURL(/.*intr/); // https://playwright.dev/docs/intro
        await expect(page.locator('a:text-is("How to install Playwright")')).toBeVisible();
        })

    test ('to do list', async({page})=> {
        await page.goto('https://example.cypress.io/todo');

        await expect(page.locator('.header h1')).toHaveText('todo')
    })

    test ('new to do', async({page})=> {
        await page.goto('https://example.cypress.io/todo');

        let newToDo = page.locator('input.new-todo');
        await expect(newToDo).toBeVisible();
        await expect(newToDo).toHaveAttribute('placeholder', 'What needs to be done?');

        let countToDoElements = page.locator('ul.todo-list li');
        await expect(countToDoElements).toHaveCount(2);
    })

    })
