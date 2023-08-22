
import { Client } from 'tmi.js';

export const getChat = function(setLastChat) {
    let chatInit = false;

    //const token = `oauth:${process.env.NEXT_PUBLIC_OAUTH}`;
    //const token = `oauth:${twitchAccessToken}`;

    //console.log("this is the OAUTH token: " + token);
    const client = new Client({
        //Not posting, so don't require these.
        /* options: { 
        debug: true
        },
        identity: {
        username: 'chenzorama',
        password: token
        }, */
        channels: [ 'chenzorama' ]
    })

    const startChat = () => {
        if (!chatInit) {

            console.log("starting chat")
    
            client.connect().catch(console.error);
            client.on('message', (channel, tags, message, self) => {
            if(self) return;
            console.log("message: " + message);
            if(message.toLowerCase() === '!hello') {
                client.say(channel, `@${tags.username}, heya!`);
            }
            if(message.toLowerCase() === '!scooby') {
                setHeadType('skully');
            }
            if(message.toLowerCase() === '!chenzo') {
                setHeadType('chenzo');
            }
            if(message.toLowerCase() === '!canada') {
                setHeadType('canada');
            }
            if(message.toLowerCase() === '!vumeter') {
                setHeadType('vumeter');
            }
            setLastChat({id: tags.id, usr: tags.username, msg: message, emotes: tags.emotes})
            });
            chatInit = true;
        }
    }

    startChat();


    return ("good");
    
};