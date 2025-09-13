import NextAuth from "next-auth"
import KeycloakProvider from "next-auth/providers/keycloak"

const handler = NextAuth({
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
      issuer: process.env.KEYCLOAK_ISSUER, 
    }), 
  ],
  secret: process.env.NEXTAUTH_SECRET,

  events: {
    async signOut({ token }) {
      if (!token?.refresh_token) return

      try {
        await fetch(`${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/logout`, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            client_id: process.env.KEYCLOAK_CLIENT_ID,
            client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
            refresh_token: token.refresh_token,
          }),
        })
      } catch (e) {
        console.error("Keycloak logout error:", e)
      }
    },
  },

  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.access_token = account.access_token
        token.refresh_token = account.refresh_token
        token.id_token = account.id_token
      }
      return token
    },
    async session({ session, token }) {
      session.access_token = token.access_token
      session.refresh_token = token.refresh_token
      session.id_token = token.id_token
      return session
    },
  },
})

export { handler as GET, handler as POST }


// import NextAuth from "next-auth"
// import KeycloakProvider from "next-auth/providers/keycloak"

// const handler = NextAuth({
//   providers: [
//     KeycloakProvider({
//       clientId: process.env.KEYCLOAK_CLIENT_ID,
//       clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
//       issuer: process.env.KEYCLOAK_ISSUER, // مثل: http://localhost:8080/realms/my-app
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
// })

// export { handler as GET, handler as POST }
