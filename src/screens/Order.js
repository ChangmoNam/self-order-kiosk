import { Box, CircularProgress, Dialog, DialogTitle, Grid, ImageList, ImageListItem, ListItem, Paper, Typography } from "@material-ui/core"
import { useEffect, useState } from "react";
import {  useDispatch, useSelector } from "react-redux";
import OrderCategories from "../components/OrderCategories";
import { useStyles } from "../styles"
import { listCategories, listProducts } from "../Reducers";
import { useNavigate } from "react-router-dom";
import OrderProducts from "../components/OrderProducts";

const Order = () => {
    const location = useSelector((state)=>state.location);
    const [selected, setSelected] = useState(1);
    const categoryList = useSelector((state)=>state.categoryList)
    // const { loading, categories } = categoryList

    const [categoryName, setCategoryName] = useState('Beverages');
    const categoryProduct = useSelector((state)=>state.productList)
    const {productLoading, products} = categoryProduct;

    const [isOpen, setIsOpen] = useState(false);
    const [curProduct, setCurProduct] = useState({});
    
    const closeHandler = () => {
        setIsOpen(false);
    }
    const productClickHandler = (p) => {
        setCurProduct(p);
        setIsOpen(true);
    }

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        listCategories(dispatch); 
    }, [dispatch])

    useEffect(()=>{
        // reqProducts(dispatch);
        listProducts(dispatch, categoryName)
    }, [categoryName])
    
    // console.log('productList: ',categoryProduct, productLoading, products)

    const styles = useStyles();
    function onClickSelected(e) {
        setSelected(e.id);
        setCategoryName(e.name);
    };


    function orderCategory(item) {
        // categoryClickHandler(item.name);
        try {
            return(<OrderCategories key={item.image} item={item} selected={selected} />)
        } catch (error) {
            console.log('err:', error)
        }
    }

    return (
        <Box className={styles.order}>
            <Dialog
                maxWidth="sm"
                fullWidth={true}
                // open={isOpen}
                // onClose={closeHandler}
            >
                <DialogTitle className={styles.center}>
                    {/* Add {products.name} */}
                </DialogTitle>

            </Dialog>
            <Box className={styles.orderSub} style={{width:"22%"}}>
                <img onClick={()=>{navigate('/')}} className={styles.imageList} style={{cursor:'pointer'}} src='/images/logo.png' />
                {categoryList.categories? (
                    categoryList.categories.map((item, index)=>(
                        <span onClick={()=>onClickSelected(item)}>
                            {orderCategory(item)}
                        </span>  
                ))) : (<>no</>)}
            </Box>
     
            <Box className={[styles.orderSub, styles.orderBorder]} style={{width:"78%"}}>
                <Typography>{location}</Typography>
                <Grid container spacing={1}>
                {productLoading? (
                    <CircularProgress />
                ):( 
                    products.map((item, index)=>(
                        <span onClick={()=>productClickHandler(item)} style={{width:"50%"}}>
                            <OrderProducts key={item.image} item={item} idx={index} />
                        </span>
                    ))
                )}
                </Grid>
                {/* <Typography>{categories? (
                    categories[selected-1].script.details
                ):(<>no</>)}</Typography>

                {loading? (
                    <CircularProgress />
                ):(
                    showScripts(categories[selected-1].script.number, categories[selected-1].script.src).map((item, index)=>(
                        <span>
                            <Typography>{index} {item}</Typography>
                        </span>
                    ))
                )} */}
                

                
            </Box>
        </Box>
    )
}

export default Order
