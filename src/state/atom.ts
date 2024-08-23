import { atom } from "recoil";
import IAuthState from "../interfaces/IAuthState";

export const authState = atom<IAuthState>({
    key: 'authState',
    default: {
        isAuthenticated: false,
        id: '',
        name: '',
        email: '',
        birthDate: ''
    }
})