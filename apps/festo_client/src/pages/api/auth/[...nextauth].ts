import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// import { Provider } from "next-auth/providers";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_CLIENT_SCERET,
    }),
    // ...add more providers here
  ],
  secret: process.env.NEXT_AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    encryption: true,
  },
};

export default NextAuth(authOptions);
