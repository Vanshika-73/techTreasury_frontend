import {Button, Divider, Grid, Link, ListItem, MenuItem, Select, Stack, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { deleteCartItem } from '../slices/CartSlice';
function CartItem({item}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {userInfo} = useSelector(state=>state.user)
    const {_id,name,image,price}= item; 
    const { all_projects } = useSelector((state) => state.project);
    const product = all_projects?.find((v) => v._id === _id);
    const handleRemove = ()=>{
        let data = {
            user:userInfo._id,
            _id
        }
        console.log("dta",data);
        dispatch(deleteCartItem(data));
    }
    
  return (
    <>
     <ListItem>
    <Grid container>
        <Grid item md={2} xs={5}>
        <Stack sx={{height:"100%"}}
            justifyContent={"center"}
            alignItems={"center"}>
            <img style={{width:"100%",borderRadius:6}} src={`https://tech-treasury-backend.vercel.app/${image}`} alt={name} />
            </Stack>
        </Grid>
        <Grid item md={5} xs={7}>
        <Stack sx={{height:"100%"}}
            justifyContent={"center"}
            alignItems={"center"}>
            <Link underline='hover' sx={{cursor:"pointer"}} onClick={()=>navigate(`/product/${_id}`)}>
            <Typography variant='h6'>
                {name}
            </Typography>
            </Link>
            </Stack>
        </Grid>
        <Grid item md={2}>
        </Grid>
        <Grid item md={2}>
        <Stack sx={{height:"100%"}}
            justifyContent={"center"}
            alignItems={"center"}>
            <Typography sx={{display:'flex',alignItems:'center'}}>Price: <CurrencyRupeeIcon/>{price}</Typography>
            </Stack>
        </Grid>
        <Grid item md={1}>
            <Stack sx={{height:"100%"}}
            justifyContent={"center"}
            alignItems={"center"}>
            <Button onClick={handleRemove}><DeleteIcon/></Button>
            </Stack>
        </Grid>
    </Grid>
   </ListItem>
    <Divider/>
    </>
  )
}

export default CartItem;