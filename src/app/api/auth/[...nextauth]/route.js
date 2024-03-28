import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@/Utilities/database";
import userList from "@/models/User";
console.log({
  clientId: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
});

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await userList.findOne({
        email: session.user.email,
      });

      session.user.id = sessionUser._id;
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();

        /* CHECK IF USER EXISTS */
        const userExists = await userList.findOne({
          email: profile.email,
        });

        /* IF USER DOESNT EXIST CREATE NEW USER */
        if (!userExists) {
          await userList.create({
            email: profile.email,
            username: profile.name.replace("", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
