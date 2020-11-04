//--------------------------------------------Command Parser---------------------------------------

//import { start } from "repl";
import { client } from "./app";
import { listEvents } from "./helpers/events";
//const ieee = require("axios");




let  prefix = "!";                                //Sets the prefix
const botChannelID = "773445176831639552";        //Channel ID for bot channel. This may have to be changed when deployed to IEEE's server


client.on("message", async function (message) {
  console.log("received a message");
  if (message.author.bot) return;                                         //Verifies that the author of the message is a bot
  if (!message.content.startsWith(prefix)) return;                        //Verifies that the message begins with the prefix


  const commandBody = message.content.slice(prefix.length);               //Removes prefix from message content
  const args = commandBody.split(" ");                                    //Results in an array containing command name (and potential arguments)\
  const command = (args.shift() || "a").toLowerCase();                    //Removes first element from args array (command name). Leaves only arguments in the array



 

  //setInterval(eventScheduler, 86400000);

  let pingDescription ="Returns elapsed time to travel to/from bot";
  let introDescription ="Gives brief introduction about the bot";
  let eventsDescription ="Lists upcoming events";
  let edit_prefixDescription = "ADMIN COMMAND - Changes the prefix of commands"
  let testDescription ="don't use this unless ur me or something";
  let helpDescription ="You already know what this does";



  let commands = ["ping", "intro", "events", "edit_prefix", "test", "help"];
  let commandsDescription = [pingDescription, introDescription, eventsDescription, edit_prefixDescription, testDescription, helpDescription];

  
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

    case "edit_prefix":
      
      if(adminChannel(message.channel.id))
      {
        message.reply("Please enter your desired prefix:");
          
      }
      break;
  
    case "test":
      //you can test stuff here
      
      break;

    // TODO there should be a command for setting the prefix, and make it so only an Admin can do it. (hardcoding is bad)
    //      * Find a way to read the user's next input, and assign it to prefix variable
    
    case "help":
      let helpReply ="**Here are some recognized commands**\n";

      for (let i=0; i< commands.length; i++)
      {
        helpReply += "**" + prefix +  commands[i] + "**: " + commandsDescription[i] + "\n";
      }

      message.reply(helpReply);
      break;

    default:
      message.reply("Command not recognized, please try again or type !help for more");
    
  }
});



/*****************************************************************************************************
* Function:   adminChannel (currentChannel:string)
*
* Descr:      This function takes the current channel from the user and verifies whether it is the 
*             bot channel, which may be restricted to admins
*
* Input:      currentChannel - the expected value is from "message.channel.id" in the command
*             parsing function
*
* Return:     vertification - A boolean value indicating whether the channel is the bot channel
*****************************************************************************************************/

function adminChannel (currentChannel:string)
{

  let verification = false;
  if(currentChannel == botChannelID)
    verification = true;
    
  return verification;
}