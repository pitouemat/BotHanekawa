const { Client, Intents, MessageAttachment, Message } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })
const token = "";
const fetch = require('node-fetch');

client.on("message", (msg) => {
    if (msg.author.bot === true) return
    if (msg.content.startsWith("H!")) {

        let query = msg.content.substring(2).replace(' ', '');
        const api = `https://api.jikan.moe/v3/search/anime?q=${query}`

        fetch(api)
            .then(function(response) {
                return response.json();
            })
            .then(function(dados) {
                const data = dados.results[0];

                const title = data.title;
                const img = data.image_url;
                const score = data.score;
                const episodes = data.episodes;
                const members = data.members;
                const id = data.mal_id;

                const url_id = `https://api.jikan.moe/v3/anime/${id}`;

                fetch(url_id)
                    .then(function(response) {
                        return response.json();
                    })
                    .then(function(dados) {
                        const sinopse = dados.synopsis
                        const pop = dados.popularity
                        const rank = dados.rank;
                        const favorites = dados.favorites;

                        msg.reply(
                            `**${title}** \n${sinopse} \n \nScore ⭐: ${score}            Episódios 📺: ${episodes}            Membros🧍: ${members}     \nFavoritos 💓: ${favorites}       Rank 🏆: ${rank}              Popularity  📣: ${pop}`)
                    })
            });
    }
})

client.login(token);
console.log("Estou Pronta!");
