

const customRewardBody = {
    title: "Blast Them!",
    prompt: "There they are! Blast them!",
    //cost: 10 * 1000 * 1000,
    cost: 2500,
    is_enabled: true,
    is_global_cooldown_enabled: true,
    global_cooldown_seconds: 2 * 60,
}

let clientId = ""
let userId = ""
let headers = {}
let rewardId = ""
let pollingInterval


// validates the provided token and validates the token has the correct scope(s). additionally, uses the response to pull the correct client_id and broadcaster_id
const validateToken = async (twitchAccessToken) => {
    let r;
    console.log("-----");
    console.log(twitchAccessToken);

    
   try {
        const body = await fetch(`https://id.twitch.tv/oauth2/validate`, {
            method: 'GET',
            headers: {
                "Authorization": `OAuth ${twitchAccessToken}`
            }
        })

        r = await body.json();
        console.log(r);
    } catch (error) {
        console.log(error);
        console.log('Invalid token. Please get a new token using twitch token -u -s "channel:manage:redemptions user:edit:follows"')
        return false
    }

    console.log(r);

    if(r.scopes.indexOf("channel:manage:redemptions") == -1 || r.scopes.indexOf("user:edit:follows") == -1 || !r.hasOwnProperty('user_id')){
        console.log('Invalid scopes. Please get a new token using twitch token -u -s "channel:manage:redemptions user:edit:follows"')
        return false
    }

    // update the global variables to returned values
    clientId = r.client_id
    userId = r.user_id
    headers = {
        "Authorization": `Bearer ${twitchAccessToken}`,
        "Client-ID": clientId,
        "Content-Type": "application/json"
    }

    return true
}

// returns an object containing the custom rewards, or if an error, null
const getCustomRewards = async () => {
    try {
        let { body } = await got(`https://api.twitch.tv/helix/channel_points/custom_rewards?broadcaster_id=${userId}`, { headers: headers })
        
        //console.log("getCustomRewards");
        //console.log(JSON.parse(body).data);
        
        return JSON.parse(body).data
    } catch (error) {
        console.log(error)
        return null
    }
}


const main = async (twitchAccessToken) => {

    console.log("main", twitchAccessToken)
    let t = await validateToken(twitchAccessToken);

    if (await validateToken() == false) {
        return
    }
    

   /*  let rewards = await getCustomRewards()
    if (rewards != null) {
        rewards.forEach(v => {
            if (v.title == customRewardBody.title) {
                rewardId = v.id
            } 
        })
    }else{
        console.log("The streamer does not have access to Channel Points. They need to be a Twitch Affiliate or Partner.");
    }
    // if the reward isn't set up, add it 
    if (rewardId == "" && await addCustomReward() == false) {
        return
    } */

    console.log("here is where we would poll for redemptions")
    //pollForRedemptions()
}

function ChannelPoints  (twitchAccessToken) {
	console.log("ChannelPoints", twitchAccessToken);
    main(twitchAccessToken);
}

export default ChannelPoints
