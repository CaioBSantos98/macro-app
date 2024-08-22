import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";

const NavBar = () => {
    return (
        <nav className={styles.container}>
            <ul>
                <li><Link to={"/"}>Home</Link></li>
                <li><Link to={"meals"}>Meals</Link></li>
                <li><Link to={"login"}>Login</Link></li>
            </ul>
        </nav>
    )
}

export default NavBar;