import { Box, Button, Card, CardActionArea, CardContent, Container, Dialog, DialogActions, DialogContent, DialogTitle, Fab, Grid, Toolbar, Typography, useScrollTrigger, Zoom } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { useStyles } from "../styles";
import AddBoxIcon from '@material-ui/icons/AddBox';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import axios from "axios";

const Review = () => {

  const dispatch = useDispatch();

  const {location, categoryList, productList, carts} = useSelector(state=>state)
  const {cartIds, cartLists, totalPrice, totalItems} = carts;
  const navigate = useNavigate();

  const [curProduct, setCurProduct] = useState({});
  const [curItems, setCurItems] = useState(0);
  const [checkChange, setCheckChange] = useState(false);
  const styles = useStyles();

  const [open, setOpen] = useState(false);
  function handleOpen(x) {
    setOpen(true);
    setCurProduct(x);
    setCurItems(x.items);
    setCheckChange(false);
  }
  const handleClose = () => {
    setOpen(false);
    setCurItems(curProduct.items);
    if (checkChange) {
      setCurItems(curProduct.items);

      setCheckChange(false);
    }
  }
  function addItems(e) {
    console.log('addItems')
    if (e !== -1 | curProduct.items !== 0) {
      curProduct.price = (Number(curProduct.price)/curProduct.items * (curProduct.items + e)).toFixed(1)
      curProduct.items += e
      setCurProduct(curProduct);
      setCurItems(curProduct.items);
      setCheckChange(true);
    }
  }
  
  return (
    <Box className={[styles.root, styles.navy]}>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth={true}
      >
        <DialogTitle style={{textAlign:"center"}}>
          <Typography variant="h4"> Add {curProduct.name}</Typography>
        </DialogTitle>
        <DialogContent style={{display:"flex", justifyContent:"center", textAlign:"center"}}>
          <AddBoxIcon onClick={()=> addItems(1)} color="primary" fontSize="large" style={{cursor:"pointer"}} /> &emsp;
          <Typography variant="h4">{curItems}</Typography> &emsp;
          <IndeterminateCheckBoxIcon onClick={()=> addItems(-1)} fontSize="large" style={{cursor:"pointer"}}/>
        </DialogContent>
        <DialogActions style={{display:"flex", textAlign:"center", justifyContent:"center"}}>
            <Button style={{width:"40%"}}  variant="contained" color="default">
              Remove From Order
            </Button>
            <Button style={{width:"40%"}} variant="contained" color="secondary">
              Add to Order
            </Button>
        </DialogActions>
      </Dialog>
      <Box className={[styles.main, styles.center]} style={{height:"30%", overflow:"hidden"}}>
        <Logo large></Logo>
        <Typography
          variant="h4"
          component="h4"
          className={styles.center}
          gutterBottom
        >
          Review my Eat in order
        </Typography>
      </Box>
      <Toolbar id="back-to-top-anchor" />
      <Box style={{height:"50%",overflow:"auto"}}>
        {cartLists.map((x) => (
          <Grid>
            <Card
              className={styles.card}
            >
              <CardActionArea>
                <CardContent style={{display:"flex",}}>
                  <Box style={{width:"50%"}}>
                    <Typography variant="h5">
                      {x.name}
                    </Typography>
                  </Box>
                  <Box style={{width:"50%", display:"flex", flexDirection:"column", justifyContent:"center",}}>
                    <Box style={{textAlign:"center", marginBottom:"3%"}}>
                      {/* <Button onClick={()=>handleOpen(x)} variant="contained" color="default" style={{width:"50%"}}>
                        Edit
                      </Button> */}
                    </Box>
                    <Box style={{textAlign:"center", width:"100%"}}>
                      $ {x.price} | {x.items===0? 
                      (<>{x.items} x ${x.price} per {x.name}</>):
                      (<>{x.items} x ${(x.price / x.items).toFixed(1)} per {x.name}</>)}
                      {/* {x.items===0 ? (x.items  x.price per x.name) : */}
                      {/* (x.items X $ (x.price / x.items).toFixed(1) per x.name)} */}
                    </Box>
                  </Box>
                </CardContent>
              </CardActionArea>

            </Card>
          </Grid>
        ))}
      </Box>
      <Box style={{paddingTop:"1%", paddingLeft:"2%", paddingRight:"2%"}}>
        <Box style={{border: "2px solid white", padding:"1%", borderRadius:"6px", display:"flex"}}>
          <Typography style={{color:"white"}}>
            My Order - {location} | Total : $ {totalPrice} | Items : {totalItems}
          
          </Typography>

        </Box>
      </Box>
      <Box style={{padding:"2%"}}>
        <Button onClick={()=>navigate('/order')} variant="contained" color="brown" style={{width:"50%"}}>
          Back
        </Button>
        <Button variant="contained" color="secondary" style={{width:"50%"}}>
          Preed To Checkout
        </Button>
      </Box>
    </Box>
  );
};

export default Review;
