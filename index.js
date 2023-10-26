import {Client,GatewayIntentBits} from 'discord.js';
import config from './config.json' assert { type: 'json' };
const client = new Client({intents: [GatewayIntentBits.Guilds]});
import { checkTokenSafety } from 'ayran';
import { QuickDB } from 'quick.db';
const db = new QuickDB();
import RSSParser from 'rss-parser';
const req = new RSSParser();

client.on("ready", async() => {
    console.log(`${client.user.username} olarak bağlanıldı.`)
    setInterval(async() => {
        let request = await req.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${config.YouTubeKanalID}`)
        if(!config.message) {console.log("config.json'da bulunan message doldurulması zorunludur.");process.exit(0);}
        if(await db.get(`sonVideo`) == request.items[0].link) return
        await db.set("sonVideo", request.items[0].link)
        const channel = await client.channels.cache.get(config.DiscordKanalID)
        channel.send({content: config.message.replaceAll("{author}", request.items[0].author)+`||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​|| _ _ _ _ _ _ ${request.items[0].link}`})
    }, 5000);
})//ayran

checkTokenSafety(config)
client.login(config.token).catch(err => {
    console.log("Bota bağlanılamadı. Gereken intentleri açmamış olabilir veya tokeni yanlış girmiş olabilirsiniz:");
    console.log(err);
});