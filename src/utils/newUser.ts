import axios from "axios";
import INewUser from "../interfaces/INewUser";

const url = import.meta.env.VITE_API_URL;

export const createNewUser = async (newUser: INewUser) => {
    try {
        const response = await axios.post(`${url}/api/user`, newUser);
        if(response.status === 201) {
            return true;
        } else {
            return false;
        }
    } catch(error) {
        console.error('Not possible to create a new user', error);
    }
}