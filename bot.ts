import {Telegraf} from "telegraf";

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.on('inline_query', async (ctx) => {
    const query = ctx.inlineQuery.query?.trim();
});
