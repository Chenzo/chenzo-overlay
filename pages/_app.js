import '../styles/globals.scss'

import { OverlayWrapper } from 'lib/overlay.context'
import { SessionProvider } from "next-auth/react"


export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <OverlayWrapper>
        <Component {...pageProps} />
      </OverlayWrapper>
    </SessionProvider>
  )
}
