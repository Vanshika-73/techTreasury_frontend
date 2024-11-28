import { Alert, Box, Button, Divider, Grid, Link, List, ListItem, Paper, Rating, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
// import Loading from '../components/Loading';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

// import { updateUserCart } from '../slices/CartSlice';
// import { createReveiw, fetchSinglesingle_project } from '../slices/Singlesingle_projectSlice';
import { createReveiw, fetchSingleProject } from '../slices/SingleProject';
import { updateUserCart } from '../slices/CartSlice';
function SingleProject() {
  const [num,setNum]=(useState(1));
  const [rating,setRating] = useState(0);
  const [comment,setComment] = useState("");
  const {userInfo} = useSelector(state=>state.user);
  const dispatch = useDispatch();
  const {single_project,loading,error} = useSelector((state)=>state.singleProject)
    const {_id} = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        console.log("id",_id);
      dispatch(fetchSingleProject(_id));
    }, [])
    const handleCart = ()=>{
      if(!userInfo){
        navigate('/cart')
      return;
      };
      let addCartItem = {

        single_project
      }
      dispatch(updateUserCart({user:userInfo._id,item:{single_project:addCartItem}}));
      setTimeout(() => {
        navigate('/cart');
      }, 400);
    }
    const handleComment = () => {
      const data = {
        user:userInfo?._id,
        name:userInfo?.name,
        rating,
        comment
      }
      dispatch(createReveiw({id:single_project._id,data}));
      setComment(" ");
      setRating(0);
    }
  return (
    
    <Stack>
      <Button sx={{width:'10vw',mt:2,mb:3}} variant='contained' onClick={()=>navigate(-1)} >Go Back</Button>
      {/* {(loading)  && (<Loading/>)} */}
      {(error) && (<Alert severity="error">{error}</Alert>)} 
      {
        (single_project) && 
        <>
      <Grid container sx={{mt:4}}>
        <Grid item xs={12} md={4}>
          <img style={{width:"100%",height:"60vh"}} src={`https://tech-treasury-backend.vercel.app/${single_project.image}`} alt={single_project?.price} />
        </Grid>
        <Grid item xs={12} md={4} sx={{ml:3}}>
          <List>
            <ListItem>
              <Typography variant='h4' sx={{fonstWeight:800}}>{single_project.name}</Typography>
            </ListItem>
            <Divider/>
            <ListItem>
            <Rating name="read-only" readOnly value={single_project.ratings} precision={0.5} />
            <Typography sx={{mt:0,ml:1}} variant='subtitle1'>{`${single_project.numReviews} reviews`} </Typography>
            </ListItem>
            <Divider/>
            <ListItem>
              <Typography variant='h6' sx={{fonstWeight:800}}>{single_project.description}</Typography>
            </ListItem>
            <Divider/>
            {userInfo &&  (
              <>
              <ListItem>
              <Box sx={{mt:1}}>
              <Rating onChange={(e,v)=>{setRating(v)}} precision={0.5} value={rating}/>
              <Stack direction={'row'}>
              <TextField size='small' placeholder='Please enter you review!' value={comment} onChange={(e)=>setComment(e.target.value)}/>
              <Button sx={{ml:2}} onClick={handleComment} variant='contained' size='small '>POST</Button>
              </Stack>
              </Box>
              </ListItem>
              {single_project.reviews.length!==0 && <>
                <Typography variant='h6'>Comments</Typography>
                <Divider/>
              </>}
              {
                single_project?.reviews.map(review=>(
                  review.comment !=="" && 
                <ListItem key={review._id}>
                    <Box>
                   <Stack direction={'row'} gap={2}>
                   <Typography variant='body1'>{review.name}</Typography>
                    <Rating size='small' value={review.rating} precision={0.5} /> 
                   </Stack>
                    <Typography variant='body1'>{review.comment}</Typography>
                  </Box>
                </ListItem>
                ))
              }
              </>
            )}
          </List>
        </Grid>
        <Grid item xs={12}md={3} sx={{ml:4}}>
          <Paper elevation={3}>
            <List>
              <ListItem>
              <Typography variant='h5'>Price:</Typography>
                <Typography variant='h6' sx={{ml:1,display:'flex',alignItems:'center'}}><CurrencyRupeeIcon/> {single_project.price}</Typography>
              </ListItem>
              <Divider/>
             {/* <ListItem>
              <Typography variant='h5'>Contact Project Owner:</Typography> <br />
                <Typography variant='h6'><Link  href={`mailto:${single_project}`}>{single_project.projectOwner.email}</Link></Typography>
              </ListItem> */}
              <Divider/>
              {userInfo.role=='Buyer' &&( <ListItem>
                <Button variant='contained' fullWidth sx={{mt:2, mb:1 }} 
                onClick={handleCart}>Add to Cart</Button>
              </ListItem>)}
            </List>
          </Paper>
        </Grid>
      </Grid>
        </>
      }
    </Stack>
  )
}

export default SingleProject;