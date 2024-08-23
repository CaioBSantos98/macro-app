import axios from "axios";
import IUserDetails from "../interfaces/IUserDetails";

axios.defaults.withCredentials = true;
const url = import.meta.env.VITE_API_URL;
 
export const login = async (email: string, password: string, onSucess: (userDetails: IUserDetails) => void) => {
    try {
        const response = await axios.post(`${url}/login`, {email, password});
        const data: IUserDetails = response.data;
        onSucess(data);
    } catch (error) {
        console.error('Error during login', error);
    }
}

export const getUser = async (onSucess: (userDetails: IUserDetails) => void) => {
    try {
        const response = await axios.get(`${url}/api/user`);
        const data: IUserDetails = response.data;
        onSucess(data)
    } catch (error) {
        console.error('Error during get user', error);
    }
}