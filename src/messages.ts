//--------------------------------------------Command Parser---------------------------------------

import { client } from "./app";
import { listEvents } from "./helpers/events";


const prefix = "<:forge:771148728919916544>";                                                         //Sets the prefix

client.on("message", async function (message) {
  console.log("received a message");
  if (message.author.bot) return;                                         //Verifies that the author of the message is a bot
  if (!message.content.startsWith(prefix)) return;                        //Verifies that the message begins with the prefix


  const commandBody = message.content.slice(prefix.length);               //Removes prefix from message content
  const args = commandBody.split(" ");                                    //Results in an array containing command name (and potential arguments)\
  const command = (args.shift() || "a").toLowerCase();                    //Removes first element from args array (command name). Leaves only arguments in the array

  // there are several ways you can organize the message sending logic
  // I'll leave it up to you, but good practice dictates this file should be kept fairly minimal
  switch (command) {
    case "ping":
      message.reply(`Pong! This message had a latency of ${Date.now() - message.createdTimestamp}ms.`);
      break;
    case "intro":
      message.reply("Hello, I am IEEE's Learning Assistant. You can call me ILA.");
      break;
    case "events":
      message.reply(`Request Received:\n ${await listEvents()}`);
      break;
    // TODO there should be a command for setting the prefix, and make it so only an Admin can do it. (hardcoding is bad)
    default:
      message.reply("TODO put usage instructions here");
  }
});