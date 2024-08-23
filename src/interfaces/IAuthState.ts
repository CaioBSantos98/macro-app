import IUserDetails from "./IUserDetails";

interface IAuthState extends IUserDetails {
    isAuthenticated: boolean;
}

export default IAuthState;