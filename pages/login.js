
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'

export default function Login() {
    const { data: session } = useSession()
    if (session) {
      return (
        <>
          Signed in as {session.user.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
          <br/>
          <br/>
          <Link href="/">Back To Overlay</Link>
        </>
      )
    }
    return (
      <>
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button>
      </>
    )
}