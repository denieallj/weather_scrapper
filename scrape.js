const request = require('request');
const cheerio = require('cheerio');

request('https://darksky.net/forecast/3.8197,103.3292/ca12/en', (error, response, html) => {

    if (error && response.statusCode != 200) {
        return console.log(error);
    }

    const $ = cheerio.load(html);

    const weather = $('.summary.swap').text();

    console.log(weather);

    console.log("\nTemp Range for the week");
    console.log("-----------------------");

    $('#week').children('a').each((i, el) => {
        const day_temp = $(el).find('span').first();

        const day = $(day_temp).find('span.name').text();

        const temp = $(el).find('span.tempRange');

        const temp_min = $(temp).find('span.minTemp').text();

        const temp_max = $(temp).find('span.maxTemp').text();

        console.log(`${day.trim()} = Min temp: ${temp_min}C <------------> Max temp: ${temp_max}C`);


    });
});