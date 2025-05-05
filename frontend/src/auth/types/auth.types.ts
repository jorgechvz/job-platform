export type LoginType = {
    email: string;
    password: string;
}

export type RegisterType = {
    name?: string;
    email: string;
    password: string;
}

export type TokenType = {
    access_token: string;
}


/* Auth Form types */

export type LoginFormType = {
    email: string;
    password: string;
}
