//module augmentation

import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
    interface Session {
        user: {
            id: string,
            role: string,
        } & DefaultSession
        token: JWT
    }

    interface User extends DefaultUser {
        id: string
        role: string
        password: string
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        id: string
        role: string;
        sub: string;
    }
}