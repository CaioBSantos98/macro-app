import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import { useRecoilValue } from "recoil";
import { authState } from "../../state/atom";

const NavBar = () => {
    const authStateValue = useRecoilValue(authState);

    return (
        <nav className={styles.container}>
            <ul>
                <li><Link to={"/"}>Home</Link></li>
                {authStateValue.isAuthenticated && 
                    <li><Link to={"meals"}>Meals</Link></li>                
                }
                {authStateValue.isAuthenticated ?
                    <li><Link to={"profile"}>Meu perfil</Link></li> :
                    <li><Link to={"login"}>Login</Link></li>
                }
            </ul>
        </nav>
    )
}

export default NavBar;