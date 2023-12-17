
export const getLatestFollowers = async function(twitchAccessToken) {

    //twitchAccessToken = "3702u2sa1jdh63mk1lsgw1l1mxvdg8"
    //let tdata = await fetch('https://api.twitch.tv/helix/users/follows?to_id=' + process.env.NEXT_PUBLIC_USERID, {
    let tdata = await fetch(`https://api.twitch.tv/helix/channels/followers?broadcaster_id=${process.env.NEXT_PUBLIC_USERID}&first=5`, {
        method: 'GET',
        headers: {
        'Client-ID': process.env.NEXT_PUBLIC_CLIENT_ID,
        'Authorization': "Bearer " + twitchAccessToken
        }
    })
    .then(response => response.json())
    .then(data => {
        //displayFollowers(data),
        //console.log(data);
        return data;
    })
    .catch(error => {
        console.log("Twitch Fetch Errored: " + error)
        return error;
    }); 


    return tdata;

    
};