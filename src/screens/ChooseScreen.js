import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from "@material-ui/core"
import Logo from "../components/Logo"
import { useStyles } from "../styles"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCurLocation } from "../Reducers";

const ChooseScreen = () => {

    const styles = useStyles();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    // const { location } = useSelector(state=>state.location);
    const selectLocation = (e) => {
        selectCurLocation(dispatch, e);
    };

    function onClickManager(e) {
        selectLocation(e);
        navigate('/order');
        // console.log(location);
    }

    return (
        <Box className={[styles.root, styles.navy, styles.subroot]}>
            <Box className={[styles.main, styles.center]}>
                <Logo large></Logo>
                <Typography
                    variant="h4"
                    component="h4"
                    className={styles.center}
                    gutterBottom
                >
                    Where will you be eating today?
                </Typography>
            </Box>
            <Box className={styles.cards}>
                <Card onClick={()=>onClickManager('EAT IN')} className={[styles.card, styles.space]}>
                    <CardActionArea>
                        <CardMedia 
                            component="img"
                            alt="Eat in"
                            image="/images/eatin.png"
                            className={styles.media}
                        />
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant="h4"
                                color="textPrimary"
                                component="p"
                            >
                                Eat in
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Card onClick={()=>onClickManager('TAKE OUT')}  className={[styles.card, styles.space]}>
                    <CardActionArea>
                        <CardMedia 
                            component="img"
                            alt="Take out"
                            image="/images/takeout.png"
                            className={styles.media}
                        />
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant="h4"
                                color="textPrimary"
                                component="p"
                            >
                                Take out
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Box>
            <Box>
                <Box onClick={()=>navigate('/')} className={[styles.backLeft, styles.backText]}>
                    <ArrowBackIcon className={styles.backArrow}/>
                    <Typography className={styles.backText}>Back</Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default ChooseScreen
