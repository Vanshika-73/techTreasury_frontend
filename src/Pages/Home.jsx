import React, { useEffect, useState } from "react";
import { home1 } from "../assets";
import './styles/home.css';
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProjects } from "../slices/ProjectSlice";
import { Alert, Button, Grid, Typography } from "@mui/material";
import Project from "../components/Project";


const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [category,setCategory] = useState('');
  const [domain,setDomain] = useState('');
  const { all_Projects,error } = useSelector((state) => state.project);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [filterProjects, setFilterProjects] = useState(all_Projects);
  const [heading,setHeading] = useState(null);
    useEffect(() => {
      let user = localStorage.getItem("userInfo")
      if(!user){navigate('/login')}
      dispatch(fetchAllProjects())
    }, []);
  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  }
  const handleDomainChange = (e) => {
    setDomain(e.target.value);
  }
  const handleFilterClear = () => {
    setDomain('');
    setFilterProjects(all_Projects);
    setCategory('');
    setHeading('');
  }
  const categoryOptions = ['School Student','Collegeate','Working Professional'];
  const domainOptionsSchool = ['Physics','Chemistry','Maths'];
  const domainOptions = ['Cloud Computing','Cyber Security','Machine Learning','Data Science','Web Development'];
  const handleFilter = () => {
    const filteredProjects = (!category && !domain)
      ? all_Projects // If no filter is selected, return the entire array
      : all_Projects.filter(project =>
          (domain ? project.domain === domain : true) &&
          (category ? project.category === category : true)
      );
      setFilterProjects(filteredProjects);
      setHeading(`${category} & ${domain}`);
  }
  
    return (
        <>
        {/*  */}
        <div className='body-div1'>
        <div className='body-div1-content'>
          <div>
            {screenWidth<=600 && 
              <div className='body-div1-image-mob'>
                <img src={imagePath} />
              </div>
            }
            <h1>Explore, Buy, Use</h1>
            <p>Access projects with comprehensive reports and supporting materials.</p>
          </div>
          {/* { domains && topics &&  */}
          <form>
            <div className='dropdown'>
              <select className='dropdown-box' value={category} onChange={handleCategoryChange}>
                <option value=''>Select Category</option>
                {categoryOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            {(category=='School Student') ? ( <div className='dropdown'>
              <select className={`dropdown-box`}  value={domain} onChange={handleDomainChange} >
                <option value=''>Select Domain</option>
                {domainOptionsSchool.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>) : (
               <div className='dropdown'>
               <select className={`dropdown-box`}  value={domain} onChange={handleDomainChange}>
                 <option value=''>Select Domain</option>
                 {domainOptions.map((option) => (
                   <option key={option} value={option}>
                     {option}
                   </option>
                 ))}
               </select>
             </div>
            ) }
            <Button variant="contained" onClick={handleFilter}>Search Projects</Button>
          </form>
        </div>
        <div className='body-div1-image'>
          <img src={home1} />
        </div>
      </div>
        {/*  */}
       
        {/* {loading && <Loading />} */}
      {(error) && <Alert severity="error">{error}</Alert>}
      <Button sx={{mt:7}} onClick={handleFilterClear} variant='contained'>Explore all Projects</Button> 
      {(heading) && <Typography variant="h3" sx={{mt:2}}>{heading}</Typography>}
      <Grid container wrap="wrap" justifyContent={"space-around"} spacing={3} sx={{mt:3}}>
       {(filterProjects) ?  filterProjects?.map((item) => (
          <Project product={item} key={item._id}/>
        )) : all_Projects?.map((item) => (
          <Project product={item} key={item._id}/>
        ))}  
        {/* */}
      </Grid>
        {/*  */}
        {/*  */}
        </>
    )
}

export default Home;