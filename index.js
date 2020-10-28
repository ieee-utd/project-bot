let ieee = require("./ieeeCall");                                           //Import ieeeCall.js
require('dotenv').config();
const Discord = require("discord.js");
//const config = require("./config.json");

const client = new Discord.Client();                                        //For interacting with the Discord API. This client represents the discord bot.


//--------------------------------------------Command Parser---------------------------------------
const prefix = "!";                                                         //Sets the prefix
client.on("message", function(message) { 
    if (message.author.bot) return;                                         //Verifies that the author of the message is a bot
    if (!message.content.startsWith(prefix)) return;                        //Verifies that the message begins with "!"
    
    
    const commandBody = message.content.slice(prefix.length);               //Removes "!" from message content
    const args = commandBody.split(' ');                                    //Results in an array containing command name (and potential arguments)
    const command = args.shift().toLowerCase();                             //Removes first element from args array (command name). Leaves only arguments in the array


    if (command == "ping") {
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
    }

    if (command == "intro") {
        message.reply("Hello, I am IEEE's Learning Assistant. You can call me ILA.");
    }

    if (command == "events") {
        message.reply(ieee.listEvents());
    }
});       


client.login(process.env.BOT_TOKEN);                                             //Login method for having the Discord API identify the bot
