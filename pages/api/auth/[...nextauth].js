import NextAuth from "next-auth"
import TwitchProvider from "next-auth/providers/twitch"
export const authOptions = {

  providers: [
    TwitchProvider({
        clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
        clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
        authorization: {
            params: {
                scope: "openid user:read:email moderator:read:followers"
            }
        },
    })
    // ...add more providers here
  ],
  /* adapter: MongoDBAdapter(clientPromise), */
  secret: process.env.NEXTAUTH_SECRET,
  /* pages: {
    signIn: '/login',
    signOut: '/'
  }, */
  callbacks: {
    async jwt({ token, account, profile }) {
        // Persist the OAuth access_token and or the user id to the token right after signin
        if (account) {
          token.accessToken = account.access_token
          token.id = profile.id
        }
        return token
    },
    async session({ session, token }) {
      //console.log("---------- session");
      session.token = token;
      return session
    }, 

    //This alone gets the access token. Saving for future knowledge
    /* async jwt(token, user) {
        if (user) {
          token.accessToken = user.accessToken;
        }
        console.log("--JWT ACCESS");
        console.log(token);
        return token;
    }, */
  }
}
export default NextAuth(authOptions)