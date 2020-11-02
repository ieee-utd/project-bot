//--------------------------------------------Command Parser---------------------------------------

//import { start } from "repl";
import { client } from "./app";
import { listEvents } from "./helpers/events";
//const ieee = require("axios");




const prefix = "!";                             //Sets the prefix

client.on("message", async function (message) {
  console.log("received a message");
  if (message.author.bot) return;                                         //Verifies that the author of the message is a bot
  if (!message.content.startsWith(prefix)) return;                        //Verifies that the message begins with the prefix


  const commandBody = message.content.slice(prefix.length);               //Removes prefix from message content
  const args = commandBody.split(" ");                                    //Results in an array containing command name (and potential arguments)\
  const command = (args.shift() || "a").toLowerCase();                    //Removes first element from args array (command name). Leaves only arguments in the array



 

  //setInterval(eventScheduler, 86400000);

  let pingDescription="Returns elapsed time to travel to/from bot";
  let introDescription="Gives brief introduction about the bot";
  let eventsDescription="Lists upcoming events";
  let testDescription="don't use this unless ur me or something";
  let helpDescription="You already know what this does";



  let commands= ["ping", "intro", "events", "test", "help"];
  let commandsDescription=[pingDescription, introDescription, eventsDescription, testDescription, helpDescription];

  
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

    case "test":
      //you can test stuff here
      
      break;

    // TODO there should be a command for setting the prefix, and make it so only an Admin can do it. (hardcoding is bad)
    
    case "help":
      let helpReply="**Here are some recognized commands**\n";

      for (let i=0; i< commands.length; i++)
      {
        helpReply+= "**" + prefix +  commands[i] + "**: " + commandsDescription[i] + "\n";
      }

      message.reply(helpReply);
      break;

    default:
      message.reply("Command not recognized, please try again or type !help for more");
    
  }
});