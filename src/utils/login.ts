import axios from "axios";

axios.defaults.withCredentials = true;

export const login = (email: string, password: string) => {
    const url = import.meta.env.VITE_API_URL;
    axios.post(`${url}/login`, {
        email: email,
        password: password
    }).then((response) => {
        return response.data
    }).catch((error) => {
        return error
    })
}