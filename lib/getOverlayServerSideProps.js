
import clientPromise from '../lib/mongodb'
import { getLatestFollowers } from './getLatestFollowers';

import { getServerSession } from "next-auth/next"
import { authOptions } from "/pages/api/auth/[...nextauth]"

export async function getOverlayServerSideProps(context) {

    let session = await getServerSession(context.req, context.res, authOptions);

    const wait = false;
    let overlayData;
    let dbName = 'ship-logs';
    if (process.env.NODE_ENV === 'development') {
        //console.log('development mode');
        dbName = 'ship-logs-dev';
    } 

    //console.log('using dbName: ', dbName);

    //Connect to Database:
    try {
        const client = await clientPromise
        const db = client.db(dbName);
        const overlayDataCall = await db
        .collection("thbar_data")
        .find({})
        .limit(10)
        .toArray();

        overlayData = JSON.parse(JSON.stringify(overlayDataCall))

    } catch (e) {
        console.error(e)
    } 


    let followers = null;
    //Reworked 12.17.2023 - getting token via logged in user and nextAuth
    if (session) {
        followers = await getLatestFollowers(session.token.accessToken);
    }
    

    /* let rememberedTwitchToken = overlayData[0].twitchAccessToken;
    //console.log('rememberedTwitchToken: ', rememberedTwitchToken);

    //get latest followers if we can:
    let followers = await getLatestFollowers(rememberedTwitchToken);
    //console.log(followers?.message);


    if (followers?.message === "Invalid OAuth token") {

        console.log('latestFollowers is invalid, getting new token');
        //fetch and store new token:
        const tokenUrl = 'https://id.twitch.tv/oauth2/token';
        const params = new URLSearchParams({
            client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
            client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
            //code: code,
            grant_type: 'client_credentials', //client_credentials //authorization_code
            //redirect_uri: redirectUri
        });

        //channel:manage:redemptions
        //user:edit:follows

        console.log('getting real token - fetch from twitch');
        const fData = await fetch(tokenUrl, {
            method: 'POST',
            body: params
        })

        const jsonData = await fData.json() 
        let twitchAccessTokenFromTV = jsonData.access_token;  

        try {
            const client = await clientPromise
            const db = client.db(dbName);
            const overlayDataCall = await db
            .collection("thbar_data")
            .updateOne(
                { "twitchAccessToken": rememberedTwitchToken },
                { $set: { "twitchAccessToken": twitchAccessTokenFromTV } }
            );
            console.log('updated token in db');
        } catch (e) {
            console.error(e)
        }   


        rememberedTwitchToken = twitchAccessTokenFromTV;
    } else {
        
    }


    //Made Postman calls for this for deving. - Vince 08/20/2023
    //const twitchAccessToken = process.env.TWITCH_ACCESS_TOKEN; //this is for testing only.
    const twitchAccessToken = rememberedTwitchToken;  */


    return {
        props: { 
        //twitchAccessToken, 
        overlayData,
        followers
        }
    };
}