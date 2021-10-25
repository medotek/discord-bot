const {Client, Intents} = require('discord.js');
const {token} = require('./config.json');
// Import files

// Set up API REST
const express = require('express');
const {postEmbedMessages} = require("./src/api/postEmbedMessages");
const {fetchAllChannels} = require("./src/api/fetchAllChannels");

// Create a new client instance
const client = new Client({intents: [Intents.FLAGS.GUILDS]});
const app = express();
app.use(express.json());

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Ready!');

    let time = 0;
    setInterval(() => {
            time = time + 5;
            let plurial = '';
            // Accorder au pluriel mdr
            if (time > 1) {
                plurial = 's';
            }

            client.user.setActivity('Pulling ' + time + ' time' + plurial);
        }, 5000
    )

    fetchAllChannels(app, client);
    postEmbedMessages(app, client);
});

app.listen(8080, () => console.log(`Started server at http://localhost:8080!`));

client.login(token).then().catch(err => {
    console.log(err)
})


