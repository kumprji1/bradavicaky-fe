import { createContext } from 'react'

export const AuthContext = createContext({
    userId: null,
    username: null,
    name: null,
    surname: null,
    role: null,
    token: null,
    login: () => {},
    logout: () => {}
})