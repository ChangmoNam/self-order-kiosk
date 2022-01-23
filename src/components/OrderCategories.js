import { Grid, Paper, Typography } from "@material-ui/core"
import { useStyles } from "../styles"

export default function OrderCategories(props) {

    const styles = useStyles();
    const Item = props.item;
    const Selected = props.selected;

    console.log('OrderCategories: ', Item.id, props.selected);
    return (
        <Paper className={styles.orderPaper} style={Selected===Item.id? {backgroundColor:'gold'}:{}}>
            <Grid container spacing={2}>
                <Grid item className={styles.orderPaper}>
                    <img className={styles.imageList} alt={Item.alt} src={Item.image}/>
                </Grid>
            </Grid>
            <Grid item container className={styles.orderPaperTypo}>
                <Typography className={styles.orderPaperTypo}>
                    {Item.explain}
                </Typography>
            </Grid>
        </Paper>
    )
}

// const OrderCategories = (item, selected) => {

//     const styles = useStyles();
//     const Item = item.item;
//     const bgColor = {};
//     // const Selected = selected;
//     console.log(Item.id, selected);
//     if(selected) {const bgColor = {backgroundColor: 'gold'}};
//     // console.log(bgColor);
//     return (        

//         <Paper className={styles.orderPaper} style={bgColor}>
//             <Grid container spacing={2}>
//                 <Grid item className={styles.orderPaper}>
//                     <img className={styles.imageList} alt={Item.alt} src={Item.src}/>
//                 </Grid>
//             </Grid>
//             <Grid item container className={styles.orderPaperTypo}>
//                 <Typography className={styles.orderPaperTypo}>
//                     {Item.explain}
//                 </Typography>
//             </Grid>
//         </Paper>
//     )
// }

// export default OrderCategories
