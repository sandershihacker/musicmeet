// src/interfaces/user.ts
// This is the user interface type

export interface IUser {
    facebook: {
        email: string,
        id: string,
        name: string,
        token: string
    };
    google: {
        email: string,
        id: string,
        name: string,
        token: string
    };
    local: {
        email: string,
        password: string
    };
}
