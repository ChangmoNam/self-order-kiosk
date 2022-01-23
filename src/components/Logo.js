import { useStyles } from "../styles"

const Logo = () => {

    const styles = useStyles();
    
    return (
        <img
            src="/images/logo.png"
            alt="Food order"
            className={styles.largeLogo}    
        >
        </img>
    )
}

export default Logo
