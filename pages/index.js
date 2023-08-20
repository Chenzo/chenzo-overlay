import Head from 'next/head'
import { useState, useEffect, useCallback } from "react";
//import { Socket } from 'socket.io-client'
import { io } from 'socket.io-client'

import { Client } from 'tmi.js';

import Header from 'components/Header'
import HeadShot from 'components/HeadShot'
import Footer from 'components/Footer'
import AudioObject from 'components/AudioObject';
import Sunks from 'components/Sunks';


import ChannelPoints from 'lib/ChannelPoints';
//import connectToDatabase  from 'lib/Database';
import clientPromise from '../lib/mongodb'


export default function Home({twitchAccessToken, socketServer, overlayData}) {

  let socket;
  const [currentAudio, setCurrentAudio] = useState(""); 
  const [sunkShipArray, setSunkShipArray] = useState([]);
  const [alignment, setCurrentAlignment] = useState("50");
  const [lastChat, setLastChat] = useState({id: "123fsd", usr: "Twitch", msg: "Chat Initializing"});
  
  //random this perhaps: 
  const [headType, setHeadType] = useState("chenzo");
  let chatInit = false;
  let socketInit = false;


  const token = `oauth:${process.env.NEXT_PUBLIC_OAUTH}`;
  const client = new Client({
    options: { 
      debug: false
    },
    identity: {
      username: 'chenzorama',
      password: token
    },
    channels: [ 'chenzorama' ]
  })

  const startChat = () => {
    if (!chatInit) {

      client.connect().catch(console.error);
      client.on('message', (channel, tags, message, self) => {
        if(self) return;
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

  

  const socket_user_name = 'thbar_obs';
  //const socket_room = 'panel_remote';
  const socket_room = 'teaxc64in';

  const handleNoConnect = function(err) {
    console.log('connection error (error commented out)');
    //console.log(err)
};

  const onConnect = function() {
    console.log("Connected to Socket I/O Server!!!");
    socket.emit('joinRoom', {
        name: socket_user_name,
        room: socket_room
    });
};


const onToAuxEvent = function(evtData) {
  console.log("received ToAuxEvent!!");
  console.log(evtData);

  if (evtData.event == "playaudio") {
      setCurrentAudio(evtData.target);
  }

  if (evtData.event == "overlaycommand") {
    console.log("DO THE THING - overlaycommand")
    setHeadType(evtData.target);
  }

  if (evtData.event == "addcrew") {
      console.log("trying to add crew");
      //displayOBJ.addCrew(evtData.target);
  }

  if (evtData.event == "removecrew") {
      //displayOBJ.removeCrew(evtData.target);
  }

  if (evtData.event == "addsnake") {
      console.log("George Found")
      //displayOBJ.addSnake(evtData.target);
  }

  if (evtData.event == "removesnake") {
      console.log("George Died")
      //displayOBJ.removeSnake();
  }
}


const onAnEvent = function(theEventDat) {
  console.log("received event!!");
  console.log(theEventDat);

  if (theEventDat.event == "shipsunk" || theEventDat.event == "shipresunk" 
  || theEventDat.event == "shipsunk-flag" || theEventDat.event == "shipresunk-flag"
  || theEventDat.event == "factionshipsunk" || theEventDat.event == "factionshipsunk-flag") {
      console.log(theEventDat.ship);
      let daShip = theEventDat.ship.split("-")[0];
      console.log(daShip);
      setSunkShipArray(sunkShipArray => [...sunkShipArray, daShip])
    
  }

  if (theEventDat.event == "setAlignment") {
    console.log(theEventDat.ship)
    setCurrentAlignment(theEventDat.ship);
  }
/* 
  if (theEventDat.event == "playaudio") {
      console.log("I'm here... this should be it?");
      console.log(theEventDat.ship);
      displayOBJ.playAudio(theEventDat.ship);
  }

   */
}

  const initSocket = () => {
    if (!socketInit) {
      socket = io(socketServer);
      socket.on('connect_error', handleNoConnect);
      socket.on("connect", onConnect);
      socket.on("toAuxEvent", onToAuxEvent);
      socket.on("anEvent", onAnEvent);
      socketInit = true;
    }
  }

  const setUpChannelPointsPolling = useCallback(() => {
    console.log("!!!!!only call me once");
    //ChannelPoints(twitchAccessToken);
  }, []);

  useEffect(() => {
    setUpChannelPointsPolling();
  }, [setUpChannelPointsPolling]);


  useEffect(() => {
    console.log("initSocket");
    //initSocket();
    //startChat();
    //ChannelPoints(twitchAccessToken);

    /* const getValid = async () => {
      let token = "zu5hpg67kjpy6ul7j44i07rqi9kop9";
      const body  = await fetch(`https://id.twitch.tv/oauth2/validate`, {
        method: 'GET',
        headers: {
            "Authorization": `OAuth ${token}`
        }
      })
      const data = await body.json();
      console.log(data);
    };

    getValid(); */

}, []);

  console.log("OVERLAYDATA: ");
  console.log(overlayData)



  return (
    
    <>
      <Head>
        <title>Chenzo&apos;s Overlay</title>
      </Head>
      <Header alignment={alignment}/>
      <main>
          <HeadShot headType={headType}/>

      </main>
        <Sunks sunkShipArray={sunkShipArray}/>
        <Footer twitchAccessToken={twitchAccessToken} lastChat={lastChat}/>
        <AudioObject currentAudio={currentAudio} setCurrentAudio={setCurrentAudio} />
    </>
  )
}


export async function getServerSideProps() {

  const wait = true;

  const tokenUrl = 'https://id.twitch.tv/oauth2/token';
  const params = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
    client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
    //code: code,
    grant_type: 'client_credentials', //authorization_code
    //redirect_uri: redirectUri
  });

  let twitchAccessTokenFromTV = "123456789fake";
  if (!wait) {
    console.log('getting real token');
    const fData = await fetch(tokenUrl, {
      method: 'POST',
      body: params
    })

    const jsonData = await fData.json()
    console.log(jsonData);
    twitchAccessTokenFromTV = jsonData.access_token;  

  } 

  //Made Postman calls for this for deving. - Vince 08/20/2023

  const socketServer =  process.env.NEXT_PUBLIC_SOCKET_SERVER;
  //const twitchAccessToken = process.env.TWITCH_ACCESS_TOKEN; //this is for testing only.
  const twitchAccessToken = twitchAccessTokenFromTV;

    let dbName = 'ship-logs';
  if (process.env.NODE_ENV === 'development') {
    console.log('development mode');
    dbName = 'ship-logs-dev';
  } 

  console.log('using dbName: ', dbName);
  try {
    const client = await clientPromise
    const db = client.db(dbName);
    const overlayDataCall = await db
    .collection("thbar_data")
    .find({})
    .limit(10)
    .toArray();

      let overlayData = JSON.parse(JSON.stringify(overlayDataCall))
      return {
        props: { 
          twitchAccessToken, 
          socketServer,  
          overlayData
        }
    };
  } catch (e) {
    console.error(e)
    return { props: { twitchAccessToken, socketServer } }
  }

  


}