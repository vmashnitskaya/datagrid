export interface Auth {
    token: string;
    userId: string;
}

export interface User {
    email: string;
    password: string;
}

export interface AuthState {
    token: string;
    userId: string;
    error: string;
    loading: boolean;
}
