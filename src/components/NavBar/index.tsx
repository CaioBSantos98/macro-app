import { Box, List, ListItem } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import ProfileMenu from "./ProfileMenu";

const NavBar = () => {

    return (
        <Box component="nav" className={styles.container}>
            <List>
                <ListItem>
                    <Link to={"meals"}>Refeições </Link>
                </ListItem>
                <ListItem>
                    <Link to={"foods"}>Alimentos </Link>
                </ListItem>
            </List>
            <ProfileMenu />
        </Box>
    )
}

export default NavBar;