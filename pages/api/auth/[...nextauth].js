import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
//
export const authOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 30,
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials;
        // perform you login logic
        // find out user from db
        if (email !== "admin@local.local" || password !== "admin123") {
          throw new Error("invalid credentials");
        }
        return {
          id: "1234",
          name: "John Doe",
          email: "john@gmail.com",
          role: "admin",
        };
        // return credentials
      },
      //   async authorize(credentials, req) {
      //     connectMongo().catch(error => { error: "Connection Failed...!"})
      //     console.log(credentials);
      //     check user existance
      //     const result = await Users.findOne( { email : credentials.email})
      //     if(!result){
      //         throw new Error("No user Found with Email Please Sign Up...!")
      //     }
      //     // compare()
      //     const checkPassword = await compare(credentials.password, result.password);
      //     // incorrect password
      //     if(!checkPassword || result.email !== credentials.email){
      //         throw new Error("Username or Password doesn't match");
      //     }
      //     return result;
      //   },
    }),
  ],
  pages: {
    signIn: "/auth/signin", // es a la pag que redirije el middelware si no es admin
    // error: '/auth/error',
    // signOut: '/auth/signout'
  },
  callbacks: {
    jwt(params) {
        console.log(params)
      if (params.user?.role) {
        params.token.role = params.user.role;
      }
      return params.token;
    },
  },
  //   secret: process.env.JWT_SECRET,
};

export default NextAuth(authOptions);
