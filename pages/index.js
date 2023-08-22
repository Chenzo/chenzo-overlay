import Head from 'next/head'
import { useState, useEffect, useCallback } from "react";
//import { Socket } from 'socket.io-client'
import { io } from 'socket.io-client'

import Header from 'components/Header'
import HeadShot from 'components/HeadShot'
import Footer from 'components/Footer'
import AudioObject from 'components/AudioObject';
import Sunks from 'components/Sunks';

import { getOverlayServerSideProps } from 'lib/getOverlayServerSideProps';
import { useOverlayContext } from 'lib/overlay.context'
import { getChat } from 'lib/getChat';

import ChannelPoints from 'lib/ChannelPoints';


export default function Home({twitchAccessToken, socketServer, overlayData, followers}) {

  const { setLatestFollowers, setLastChat } = useOverlayContext();
  

  let socket;
  const [currentAudio, setCurrentAudio] = useState(""); 
  const [sunkShipArray, setSunkShipArray] = useState([]);
  const [alignment, setCurrentAlignment] = useState("50");
  //random this perhaps: 
  const [headType, setHeadType] = useState("chenzo");
  let socketInit = false;
  

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
    setLatestFollowers(followers);
  }, []);

  useEffect(() => {
    setUpChannelPointsPolling();
  }, [setUpChannelPointsPolling]);


  useEffect(() => {
    //initSocket();
    //ChannelPoints(twitchAccessToken);
    let chat = getChat(setLastChat);

  }, []);


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
        <Footer />
        <AudioObject currentAudio={currentAudio} setCurrentAudio={setCurrentAudio} />
    </>
  )
}

export const getServerSideProps = async (context) => await getOverlayServerSideProps(context);
