const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();  // Load environment variables from .env file

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

// bot.on('message', (option) => {
//     console.log("Message received on the bot:", option.text); // Log the message text

//     bot.sendMessage(option.chat.id, "Hello").catch((error) => {
//         console.error("Error sending message:", error); // Handle potential errors
//     });
// });

bot.on('message', (option) => {
        bot.sendMessage(option.chat.id, `Hello ${option.from.first_name}, type /hi to get an exclusive shayri...`).catch((error) => {
            console.error("Error sending message:", error); // Handle potential errors
        });
    });


bot.onText(/\/hi/, async (option) => {
    const response = await axios.get('http://localhost:3000/shayri');
    if(!response) {
        bot.sendMessage(option.chat.id, `Sorry ${option.from.first_name}, currently server is off !!!`);
    }
    const poems = response.data;

    console.log(option);

    const randomIndex = Math.floor(Math.random() * poems.length);
    const poem = poems[randomIndex];

    bot.sendMessage(option.chat.id, poem.text);
})