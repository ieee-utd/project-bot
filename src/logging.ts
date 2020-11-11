import { client } from "./app";


client.on("voiceStateUpdate", function (oldMember, newMember) { 

    let oldVoice = oldMember.channelID; 
    let newVoice = newMember.channelID; 
    if (oldVoice != newVoice) {
      if (oldVoice == null) {
        console.log("User joined!");
      } else if (newVoice == null) {
        console.log("User left!");
      } else {
        console.log("User switched channels!");
      }
    }
  });



  //TODO: Find a way to identify users by role. We only want to log time for the tutors