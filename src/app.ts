require("dotenv").config();
import * as Discord from "discord.js";
import { Settings, DateTime } from "luxon";
Settings.defaultZoneName = "America/Chicago";

export const client = new Discord.Client();                                 //For interacting with the Discord API. This client represents the discord bot.
import { BOT_PREFIX } from "./messages";
import "./messages";
import "./watcher";
import "./helpers/schedule";

console.log(`Started bot at ${DateTime.local().toISOTime()}`);

client.on("ready", () => {
  console.log(`Logged in as ${client.user?.tag}!`);
  client.user?.setActivity({ name: `Use ${BOT_PREFIX}events to list events`, type: "PLAYING" });
});

client.login(process.env.BOT_TOKEN);                                         //Login method for having the Discord API identify the bot via env variables, for Heroku
