import { ILoginRequest } from "@/app/core/application/dto";
import { AuthService } from "@/app/infrastructure/services/auth.service";
import NextAuth, { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface AuthToken {
    id?: string;
    token?: string;
}

interface AuthUser {
    id: string;
    email: string;
    token: string;
}

interface CustomSession extends Session {
    user: {
        id?: string;
        token?: string;
        email?: string;
        role?: string;
        photo?: string;
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "email"},
                password: {label: "Password", type: "password"},
        },
        authorize: async (credentials) => {
            if (!credentials?.email  || !credentials?.password) {
                console.error("Credenciales faltantes")
                return null;
        }
            const loginRequest: ILoginRequest = {
                email: credentials.email,
                password: credentials.password,
            }

            try {
                const authService = new AuthService();
                const response = await authService.login(loginRequest);

                const user = response.data.user;

                return {
                    id: user.email,
                    email: user.email,
                    role: user.role,
                    photo: user.photo,
                    token: response.data.access_token,
                } as AuthUser
            } catch (error) {
                console.log(error);
                return Promise.reject(new Error(JSON.stringify(error)))
            }
        },
}),
    ],
    session: {
        strategy: "jwt", 
    },
    callbacks: {
        async jwt({token, user}){
            if (user) {
                const authUser = user as AuthUser;
                token.id = authUser.id;
                token.token = authUser.token;
            }
            return token;
        },
        async session({session, token}){
            const customSession = session as CustomSession;
            customSession.user.id = (token as AuthToken).id;
            customSession.user.token = (token as AuthToken).token
            return customSession
    },
}
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST};