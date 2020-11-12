//--------------------------------------------Command Parser---------------------------------------

import { Message } from "discord.js";
import { client } from "./app";
import { getIeeeEvents } from "./helpers/rest";
import { formatEvents } from "./helpers/ieeeEvent";

const prefix = process.env.BOT_PREFIX || "!";                             //Sets the prefix

const commands: { [command: string]: { description: string, func: Function } } = {
  "events": { description: "Lists upcoming events", func: getEvents },
  "help": { description: "You already know what this does", func: getHelp }
};

async function getEvents(message: Message) {
  const eventList = await getIeeeEvents();
  if (eventList) // TODO handle eror states
    message.reply(`Request Received:\n ${formatEvents(eventList)}`);
  else
    sendError(message);
}

function getHelp(message: Message) {

  const helpReply = "**Here are some recognized commands**\n";
  const descriptions = Object.keys(commands).map((key) => {
    return "**" + prefix + key + "**: " + commands[key].description;
  }).join("\n");
  message.reply(helpReply + descriptions);
}

function sendError(message: Message) {
  message.reply("Something went wrong. @Forge - Bot is on it.");
}

client.on("message", async function (message) {
  // console.log("received a message");
  if (message.author.bot) return;                                         //Verifies that the author of the message is not a bot
  if (!message.content.startsWith(prefix)) return;                        //Verifies that the message begins with the prefix        

  const commandBody = message.content.slice(prefix.length);               //Removes prefix from message content
  const args = commandBody.split(" ");                                    //Results in an array containing command name (and potential arguments)  
  const command = args.shift()?.toLowerCase();                            //Removes first element from args array (command name). Leaves only arguments in the array
  if (!command)
    return;

  const commandObj = commands[command];
  if (commandObj) {
    await commandObj.func(message, ...args);
  } else {
    message.reply("Command not recognized, please try again or type !help for more");
  }
});
