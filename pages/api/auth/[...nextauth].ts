import NextAuth from 'next-auth'
import OktaProvider from 'next-auth/providers/okta'

const options = {
  // Configure one or more authentication providers
  providers: [
    OktaProvider({
      clientId: process.env.OKTA_CLIENTID,
      clientSecret: process.env.OKTA_CLIENTSECRET,
      issuer: process.env.OKTA_ISSUER
    }),
    // ...add more providers here
  ],
  callbacks: {
    async session({ session, user, token }) {
      session.accessToken = token.accessToken
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    }
  }
}

export default (req, res) => NextAuth(req, res, options)
