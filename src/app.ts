require("dotenv").config();
import * as Discord from "discord.js";

export const client = new Discord.Client();                                 //For interacting with the Discord API. This client represents the discord bot.
import "./messages";
import "./helpers/schedule";
//client.login(process.env.BOT_TOKEN);                                      //Login method for having the Discord API identify the bot via env variables, for Heroku
console.log("Started bot!");
client.login(process.env.BOT_TOKEN);                                        //Login for local testing
