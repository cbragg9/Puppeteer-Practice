const puppeteer = require("puppeteer");

async function scrape() {
  let url = "https://www.eventbrite.com/d/online/black-lives-matter/?page=1&lang=en";
  let browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  });
  let page = await browser.newPage();

  await page.goto(url, { waitUntil: "networkidle2" });

  let data = await page.evaluate(() => {
    let dates = [];
    let titles = [];
    let urls = [];

    document.querySelectorAll("div.search-event-card-rectangle-image > div > div > div > article > div.eds-event-card-content__content-container.eds-l-pad-right-2 > div.eds-event-card-content__content > div > div.eds-event-card-content__primary-content > div")
      .forEach(element => {
        if (!dates.includes(element.innerText) && dates.length < 10) dates.push(element.innerText);
      });

    document.querySelectorAll("div.search-event-card-rectangle-image > div > div > div > article > div.eds-event-card-content__content-container.eds-l-pad-right-2 > div.eds-event-card-content__content > div > div.eds-event-card-content__primary-content > a > h3 > div > div.eds-event-card__formatted-name--is-clamped.eds-event-card__formatted-name--is-clamped-three.eds-text-weight--heavy")
      .forEach(element => {
        if (!titles.includes(element.innerText) && titles.length < 10) titles.push(element.innerText);
      });

    document.querySelectorAll("a.eds-event-card-content__action-link")
      .forEach(element => { 
        if (!urls.includes(element.href) && urls.length < 10) urls.push(element.href)
      })

    let arrayOfEvents = [];

    for (let i = 0; i < dates.length; i++) {
      arrayOfEvents.push({
        date: dates[i],
        title: titles[i],
        url: urls[i]
      })
    };

    return arrayOfEvents;
  })

  return data;

};


module.exports = scrape();
