import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@material-ui/core";
import { useStyles } from "../styles";

function OrderProducts (props) {

    const styles = useStyles();
    const item = props.item
    // console.log('OrderProducts: ',props.idx, item)

    return (
        <Grid item style={{width:"100%"}}>
            <Card className={styles.card}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt={item.name}
                        image={item.image}
                        className={styles.media}
                        // style={{width: 30%}}
                    />
                </CardActionArea>
                <CardContent>
                    <Typography
                        gutterBottom
                        variant="body2"
                        component="p"
                    >
                        {item.name}
                    </Typography>
                    <Box>
                        <Typography
                            variant="body2"
                            component="p"
                        >
                            {item.calorie} Cal
                        </Typography>
                        <Typography
                            variant="body2"
                            component="p"
                        >
                            $ {item.price}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    )
};

OrderProducts.propTypes = {};

export default OrderProducts;
