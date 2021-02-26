//--------------------------------------------Command Parser---------------------------------------

import { Message } from "discord.js";
import { client } from "./app";
import { getIeeeEvents, formatEvents } from "./helpers/ieeeEvent";

export const BOT_PREFIX = process.env.BOT_PREFIX || "!";                             //Sets the prefix

const commands: { [command: string]: { description: string, func: Function } } = {
  "events": { description: "Lists upcoming events", func: getEvents },
  "help": { description: "You already know what this does", func: getHelp }
};

async function getEvents(message: Message) {
  const eventList = await getIeeeEvents();
  if (eventList) {
    return `${formatEvents(eventList)}`;
  }
  else {
    return sendError(message);
  }
}

function getHelp() {
  const helpReply = "**Here are some recognized commands**\n";
  const descriptions = Object.keys(commands).map((key) => {
    return "**" + BOT_PREFIX + key + "**: " + commands[key].description;
  }).join("\n");
  return helpReply + descriptions;
}

function sendError(message: Message) {
  console.warn("[error]", message);
  return "Something went wrong. <@&758053725943103536> is on it.";
}

client.on("message", async function (message) {
  try {

    // console.log("received a message");
    if (message.author.bot) return;                                         //Verifies that the author of the message is not a bot
    if (!message.content.startsWith(BOT_PREFIX)) return;                        //Verifies that the message begins with the prefix        

    const commandBody = message.content.slice(BOT_PREFIX.length).trim();               //Removes prefix from message content
    const args = commandBody.split(" ");                                    //Results in an array containing command name (and potential arguments)  
    const command = args.shift()?.toLowerCase();                            //Removes first element from args array (command name). Leaves only arguments in the array
    if (!command)
      return;

    const commandObj = commands[command];
    if (commandObj) {
      const mes = await commandObj.func(message, ...args);
      message.channel.send(mes + "\n\nHelp build the IEEE Bot <:forge:692829660643459162> at <https://github.com/ieee-utd/project-bot>");
    }
    // else {
    // message.channel.send("Command not recognized, please try again or type !help for more");
    // }
  } catch (e) {
    message.channel.send(sendError(e));
  }
});
