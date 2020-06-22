import { AZ_Selectors } from './SiteCSSSelectors'
import puppeteer from 'puppeteer'
export class myScraper {

    constructor(public url: string) {

    }

    public async initScraping(): Promise<string[]> {
        //let t =   await new Promise(resolve => setTimeout(resolve, 500));
        const titles: string[] = [];

        try {


            const browser = await puppeteer.launch({ headless: false });
            const page = await browser.newPage();
            page.setDefaultTimeout(60 * 1000);
            page.setDefaultNavigationTimeout(120 * 1000);

            await page.setViewport({ width: 1920, height: 926 });
            await page.goto(this.url, {
                waitUntil: 'networkidle0'
            });

            await page.type(AZ_Selectors.InputIdSel, 'video games')
            await page.click(AZ_Selectors.SearchButtonSel)
            await page.waitForSelector(AZ_Selectors.SearchResult)

            let products = await page.$$(AZ_Selectors.SearchResult);
            for (let p of products) {

                let e = await p.$(AZ_Selectors.Title);

                // let a = await page.evaluate(el=>el.textContent, e);
                let t = await page.evaluate(el => el.innerText, e);
                titles.push(t.trime());
            }

            await page.screenshot({ path: `amazon.search.result.${Date.now().toString()}.png` });
            await browser.close();
            
            

        } catch (err) {
            console.log(`Something went wrong while scraping >> ${err}`)
        }

        return titles;

    }
}
