import Head from 'next/head'
import { useState, useEffect } from "react";
//import { Socket } from 'socket.io-client'
import { io } from 'socket.io-client'

import Header from 'components/Header'
import HeadShot from 'components/HeadShot'
import Footer from 'components/Footer'
import AudioObject from 'components/AudioObject';

export default function Home({twitchAccessToken, socketServer}) {

  let socket;
  const [currentAudio, setCurrentAudio] = useState(""); 

  const socket_user_name = 'thbar_obs';
  //const socket_room = 'panel_remote';
  const socket_room = 'teaxc64in';

  const handleNoConnect = function(err) {
    console.log('connection error');
    console.log(err)
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

  const initSocket = () => {
    socket = io(socketServer);
    socket.on('connect_error', handleNoConnect);
    socket.on("connect", onConnect);
    socket.on("toAuxEvent", onToAuxEvent);
  }

  useEffect(() => {
    console.log("initSocket");
    initSocket();
}, []);

  return (
    
    <>
      <Head>
        <title>Chenzo&apos;s Overlay</title>
      </Head>
      <Header/>
      <main>
          <HeadShot/>

      </main>
        <Footer twitchAccessToken={twitchAccessToken}/>
        <AudioObject currentAudio={currentAudio} setCurrentAudio={setCurrentAudio} />
    </>
  )
}


export async function getServerSideProps() {

  //Get Twitch Access Token  
  const fData = await fetch('https://id.twitch.tv/oauth2/token?client_id=' + process.env.NEXT_PUBLIC_CLIENT_ID + '&client_secret=' + process.env.NEXT_PUBLIC_CLIENT_SECRET + '&grant_type=client_credentials', {
      method: 'POST',
    })
  const jsonData = await fData.json()
  const twitchAccessToken = jsonData.access_token;  

  const socketServer =  process.env.NEXT_PUBLIC_SOCKET_SERVER;

  return { props: { twitchAccessToken, socketServer } }
}