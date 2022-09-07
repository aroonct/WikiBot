require('dotenv').config()
const { Telegraf } = require('telegraf')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.command('start', ctx => ctx.reply('Bienvenidas(os) al buscador de wikipedia, este bot te permite realizar busquedas de la plataforma wikipedia, devolviendo una lista de resultados, de acuerdo a la palabra que ingreses.\n\nPara comenzar solo escribe lo que deseas buscar.\nAutor: @begin24'))
bot.command('help', ctx => ctx.reply('Para comenzar solo escribe lo que deseas buscar.\nAutor: @begin24'))
bot.command('autor', ctx => ctx.reply('Autor: @begin24'))

bot.on('text', ctx => {
    const url ='https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=';
    const search = ctx.message.text;
    const urlSearch = url + search;
    const request = require('request');
    request(urlSearch, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const data = JSON.parse(body);
            const results = data.query.search;
            let message = '';
            results.forEach(element => {
                message += `*${element.title}*(https://es.wikipedia.org/wiki/${element.title}) \n\n`;
            });
            ctx.reply(message);

        } else {
            ctx.reply('No se encontraron resultados');
        }
    }
    );
}
);

bot.launch();