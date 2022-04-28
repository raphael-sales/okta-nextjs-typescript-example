import axios from 'axios'
import NextAuth from 'next-auth'
import OktaProvider from 'next-auth/providers/okta'

const options = {
  // Configure one or more authentication providers
  providers: [
    OktaProvider({
      clientId: process.env.OKTA_CLIENTID,
      clientSecret: process.env.OKTA_CLIENTSECRET,
      issuer: process.env.OKTA_ISSUER,
      checks: ["pkce", "state"],
    }),
    // ...add more providers here
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      if(account){
        // Persist the OAuth access_token to the token right after signin
        let body = {
          token: account.access_token,
        }

        //Call to Register API
        axios.post(process.env.VINTED_SERVICE_URL, body).then(response => {
          console.log("response:", response.data)
        })
      }
      return token
    }
  }
}

export default (req, res) => NextAuth(req, res, options)
