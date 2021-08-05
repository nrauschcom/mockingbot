import {Telegraf} from "telegraf";
import * as crypto from 'crypto';

const bot = new Telegraf(process.env.token ?? '1923930394:AAHikPkG_08r3rcQv4kpk2IxoXJTpolo3v8');

function mockText(input: string): string {
    return [...input].map((char, idx) => char[idx % 2 == 0 ? 'toUpperCase' : 'toLowerCase']()).join('');
}

bot.on('inline_query', async (ctx) => {
    try {
        const query = ctx.inlineQuery.query?.trim();
        const mocked = mockText(query);

        await ctx.answerInlineQuery([
            {
                type: 'article',
                id: 'mock-text-' + crypto.createHash('md5').update(query).digest('hex'),
                title: 'Mock that Shit!',
                description: mocked.substr(0, 150),
                input_message_content: {
                    message_text: mocked
                }
            },
            /*{
                type: 'photo',
                id: 'mock-photo-' + crypto.createHash('md5').update(query).digest('hex'),
                title: 'Spongebob Mock',
                description: 'Generate a Spongebob Mock Meme on the Fly',
                photo_url: 'https://imgflip.com/s/meme/Mocking-Spongebob.jpg',
                thumb_url: 'https://imgflip.com/s/meme/Mocking-Spongebob.jpg'
            }*/
        ], {is_personal: false});
    } catch(e) {
        console.log(e);
    }
});

bot.launch();
