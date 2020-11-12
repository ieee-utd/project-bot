require("dotenv").config();
import * as Discord from "discord.js";
import { Settings, DateTime } from "luxon";
Settings.defaultZoneName = "America/Chicago";

export const client = new Discord.Client();                                 //For interacting with the Discord API. This client represents the discord bot.
import "./messages";
import "./watcher";
import "./helpers/schedule";

console.log(`Started bot at ${DateTime.local().toISOTime()}`);
client.login(process.env.BOT_TOKEN);                                         //Login method for having the Discord API identify the bot via env variables, for Heroku
