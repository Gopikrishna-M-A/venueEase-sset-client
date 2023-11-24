import GoogleProvider from 'next-auth/providers/google'
const baseURL = process.env.BASE_URL 


export const options = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        })
    ],
    theme: {
        colorScheme: "light", // "auto" | "dark" | "light"
        brandColor: "#2F2E2E", // Hex color code
        logo: "", // Absolute URL to image
        buttonText: "" // Hex color code
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            const newUser = {
                name: user.name,
                email: user.email,
                image: user.image,
                oAuthId: user.id,
              };
              const response = await fetch(`${baseURL}/api/user/register`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
              });
              const data = await response.json();
              console.log("user",data);
              return true;
        },
        async session({ session }) {
            const response = await fetch(`${baseURL}/api/user/email/${session.user.email}`, { method: 'GET' });
              const data = await response.json();
              session.user._id = data[0]._id;
              session.user.admin = data[0].admin;
             
            return session
        }
    }
} 