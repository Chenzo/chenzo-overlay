import '../styles/globals.scss'

import { OverlayWrapper } from 'lib/overlay.context'

export default function App({ Component, pageProps }) {
  return (
    <OverlayWrapper>
      <Component {...pageProps} />
    </OverlayWrapper>
  )
}
