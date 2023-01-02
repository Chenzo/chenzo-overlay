import Head from 'next/head'

import Header from 'components/Header'
import HeadShot from 'components/HeadShot'
import Footer from 'components/Footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>Chenzo&apos;s Overlay</title>
      </Head>
      <Header/>
      <main>
          <HeadShot/>

      </main>
        <Footer/>
    </>
  )
}
