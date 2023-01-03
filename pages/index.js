import Head from 'next/head'

import Header from 'components/Header'
import HeadShot from 'components/HeadShot'
import Footer from 'components/Footer'

export default function Home({twitchAccessToken}) {

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


  return { props: { twitchAccessToken } }
}