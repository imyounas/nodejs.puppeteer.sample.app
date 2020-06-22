import { myScraper } from './scraper'

const main = async () => {
  const s: myScraper = new myScraper('http://amazon.com/');
  const productTitles = await s.initScraping();
}

main();