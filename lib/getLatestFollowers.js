


export const getLatestFollowers = async function(twitchAccessToken) {


    console.log(twitchAccessToken)
    let tdata = await fetch('https://api.twitch.tv/helix/users/follows?to_id=' + process.env.NEXT_PUBLIC_USERID, {
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