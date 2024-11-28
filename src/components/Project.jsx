import { Card, CardContent, CardMedia, Divider, Grid, Rating, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import React from 'react';
import { Link } from 'react-router-dom';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
function Project({product}) {
  const navi = useNavigate();
  return (
    <Grid item md={4} xs={12} sx={{mb:3}} >
        <Card sx={{maxHeight:'500px',maxWidth:'350px', minWidth:'350px',minHeight:'500px',mr:3,ml:3}} elevation={4}>
        <CardMedia 
      onClick={()=>(navi(`/project/${product._id}`))}
        component="img"
        height="200"
        image={`https://tech-treasury-backend.vercel.app/${product.image}`}
        alt={product.name}
      />
      <CardContent>
        <Link  style={{textDecoration:"none"}} to={`/project/${product._id}`} >
        <Typography color={'text.primary'}  id='productNameLink' gutterBottom variant="h4" component="div">
          {product.name}
        </Typography>
        </Link>
        <Rating value={product?.ratings} precision={0.5} readOnly sx={{mt:1}}/>
        <Divider/>
        <Typography variant="h6" fontSize={'1.6rem'} color="text.secondary" sx={{mt:2}}>
         {product.domain}
        </Typography>
        <Typography variant="h5" fontSize={'1.5rem'} color="text.secondary" sx={{mt:2}}>
          <CurrencyRupeeIcon/> {product.price}
        </Typography>
      </CardContent>
    </Card>
    </Grid>
  )
}

export default Project;