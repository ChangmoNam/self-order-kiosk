import { Box, Button, CircularProgress, Collapse, Dialog, DialogActions, DialogContent, DialogTitle, Grid, ImageList, ImageListItem, ListItem, Paper, Typography } from "@material-ui/core"
import { useEffect, useState } from "react";
import {  useDispatch, useSelector } from "react-redux";
import OrderCategories from "../components/OrderCategories";
import { useStyles } from "../styles"
import { changeCartList, listCategories, listProducts } from "../Reducers";
import { useNavigate } from "react-router-dom";
import OrderProducts from "../components/OrderProducts";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const Order = () => {
    const location = useSelector((state)=>state.location);
    const [selected, setSelected] = useState(1);
    const categoryList = useSelector((state)=>state.categoryList)

    const [categoryName, setCategoryName] = useState('Beverages');
    const categoryProduct = useSelector((state)=>state.productList)
    const {productLoading, products} = categoryProduct;

    const [collapseOpen, setCollapseOpen] = useState(false);

    const [isOpen, setIsOpen] = useState(false);
    const [curProduct, setCurProduct] = useState({});
    const [curNumProduct, setCurNumProduct] = useState(0);

    const {cartIds, totalPrice, totalItems, cartLists} = useSelector((state)=>state.carts)

    const closeHandler = () => {
        setIsOpen(false);
    }
    const productClickHandler = (p) => {
        setCurProduct(p);
        setIsOpen(true);
        setCurNumProduct(0);
    }
    const controlNumProduct = (e) => {        
        if(e===1) setCurNumProduct(curNumProduct+1);
        else if (curNumProduct !== 0 && e===-1) setCurNumProduct(curNumProduct-1);
    }
    const addOrders = (dispatch) => {
        if (curNumProduct!==0) {
            setCurNumProduct(0);
            const tmpCartLists = cartLists.find((x) => x.name === curProduct.name)
            let orderItems = tmpCartLists ?
                cartLists.map((x) => 
                    x.name === curProduct.name ? 
                    {"id": x.id,"name":x.name, "items":x.items+curNumProduct, "price":(Number(x.price)+(curProduct.price * curNumProduct)).toFixed(1)}
                    : x
                ) : [...cartLists, {"id": cartIds+1,"name":curProduct.name, "items":curNumProduct, "price":(curProduct.price * curNumProduct).toFixed(1)}]
            
            
            console.log('1: ',cartLists)
            console.log('2: ',orderItems)
            
            console.log('tmpCargLists : ', tmpCartLists)
            changeCartList(
                dispatch, 
                cartIds + 1,
                totalPrice + (curProduct.price * curNumProduct), 
                totalItems + curNumProduct, 
                orderItems
            )
            closeHandler();
        }
    }
    const controlCartLists = () => {
        setCollapseOpen(!collapseOpen);
    }
    const controlTotalCartLists = (dispatch, e) => {
        console.log(e)        
        changeCartList(
            dispatch, 
            cartIds + 1,
            totalPrice - e.price, 
            totalItems - e.items, 
            cartLists.filter(item => item.id !== e.id)
        )
        console.log('cartLists', cartLists)
    }

    console.log('cartLists', cartLists)

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if(totalItems===0) setCollapseOpen(false);
    }, [totalItems])

    useEffect(()=>{
        listCategories(dispatch); 
    }, [dispatch])

    useEffect(()=>{
        listProducts(dispatch, categoryName)
    }, [categoryName])
    
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

    function changeCancel(dispatch) {
        changeCartList(dispatch, 0, 0.0, 0, [])
        navigate('/')
    }
    function changeDone() {
        if(totalItems !== 0) navigate('/review')
    }

    return (
        <Box>
            <Box className={[styles.space]}>
                My Order - {location} | Total: $ {totalPrice.toFixed(1)} | Items: {totalItems} | &nbsp;&nbsp;
                <span>
                <Button onClick={()=>changeDone()} variant="contained" color="secondary" style={{width:"15%"}}>Done</Button>&nbsp;&nbsp;
                <Button onClick={()=>changeCancel(dispatch)} variant="contained" style={{width:"15%"}}>Cancel</Button>
                </span>
            </Box>
            {cartLists.length !==0? (<ArrowForwardIosIcon style={{cursor:"pointer"}} onClick={()=>controlCartLists()}/>):(<></>)}
            <Collapse in={collapseOpen} timeout="auto" unmounOnExit>
                {cartLists.map((item, index)=>(
                    <span>
                        name: {item.name} | price: $ {item.price} | num: {item.items} | 
                        <DeleteForeverIcon onClick={()=>controlTotalCartLists(dispatch, item)}
                            style={{cursor:"pointer"}}
                        />
                        <br/>                        
                    </span>
                )
                )}
            </Collapse>
        <Box className={styles.order}>
            <Dialog
                maxWidth="sm"
                fullWidth={true}
                open={isOpen}
                onClose={closeHandler}
            >
                <DialogTitle className={styles.center}>
                    Add <span style={{color:"red"}}>
                        {curProduct.name} &nbsp;
                        ($ {curProduct.price})
                    </span>
                </DialogTitle>
                <DialogContent className={styles.center}>
                    <AddCircleIcon 
                        onClick={()=>controlNumProduct(1)} 
                        style={{cursor:"pointer",fontSize:"200%", color:"green"}}
                    />
                    <span style={{width:"50%"}}>
                        &nbsp;
                        total price: ${(curProduct.price * (curNumProduct)).toFixed(1)}  / &nbsp;
                        total item: {curNumProduct}
                        &nbsp;
                    </span>
                    <RemoveCircleIcon 
                        onClick={()=>controlNumProduct(-1)} 
                        style={{cursor:"pointer",fontSize:"200%", color:"blue"}}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>addOrders(dispatch)}>Add to Cart</Button>
                    <Button onClick={()=>closeHandler()}>Cancel</Button>
                </DialogActions>

            </Dialog>
            <Box className={styles.orderSub} style={{width:"22%"}}>
                <img onClick={()=>{navigate('/')}} className={styles.imageList} style={{cursor:'pointer'}} src='/images/logo.png' alt={styles.category} />
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
            </Box>
        </Box>
        </Box>
        

    )
}

export default Order
