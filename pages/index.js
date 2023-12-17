import Head from 'next/head'
import { useState, useEffect, useCallback } from "react";
//import { Socket } from 'socket.io-client'
//import { io } from 'socket.io-client'

import Header from 'components/Header'
import HeadShot from 'components/HeadShot'
import Footer from 'components/Footer'
import AudioObject from 'components/AudioObject';
import Sunks from 'components/Sunks';

import { getOverlayServerSideProps } from 'lib/getOverlayServerSideProps';
import { useOverlayContext } from 'lib/overlay.context'
import { getChat } from 'lib/getChat';
import { getSocket } from 'lib/getSocket';

import ChannelPoints from 'lib/ChannelPoints';

//import { useSession } from "next-auth/react"

let once = true;

export default function Home({twitchAccessToken, overlayData, followers}) {

  //const { data: session} = useSession();

  const { setLatestFollowers, setLastChat } = useOverlayContext();
  
  const [currentAudio, setCurrentAudio] = useState(""); 
  const [sunkShipArray, setSunkShipArray] = useState([]);
  const [alignment, setCurrentAlignment] = useState("50");
  const [headType, setHeadType] = useState("chenzo");



  useEffect(() => {
    if (once) {
      console.log("call channel points: ");
     // ChannelPoints(twitchAccessToken);
      //let socket = getSocket(setCurrentAudio, setHeadType, setSunkShipArray, setCurrentAlignment);
      setLatestFollowers(followers);
      //let chat = getChat(setLastChat);
      once = false;
    }
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
