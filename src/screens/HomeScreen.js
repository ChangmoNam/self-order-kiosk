import {Box, Card, CardActionArea, Typography} from '@material-ui/core';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import { useStyles } from '../styles';
import ChooseScreen from './ChooseScreen';

const HomeScreen = () => {

    const styles = useStyles();
    const navigate = useNavigate();
    function handleClick() {
        navigate('/choose');
    }
    return (
        <Card>
            <CardActionArea>
                <Box onClick={handleClick}>
                    <Box className={[styles.root, styles.red]}>
                        <Box className={[styles.main, styles.center]}>
                            <Typography component="h6" variant="h6">
                                Fast & Easy
                            </Typography>
                            <Typography component="h1" variant="h1">
                                Order <br/> & pay <br/> here
                            </Typography>
                            <TouchAppIcon fontSize="large"></TouchAppIcon>
                        </Box>
                        <Box className={[styles.center, styles.green]}>
                            <Logo large></Logo>
                            <Typography component="h5" variant="h5">
                                Touch to start
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </CardActionArea>
        </Card>


    )
}

export default HomeScreen
