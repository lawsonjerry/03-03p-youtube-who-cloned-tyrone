import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Box, Stack, Typography } from '@mui/material';
import {SearchBar, VideoDetails, VideoList, Sidebar, SearchPage} from "./index"
import youtube from "../api/youtube";
const apiKey = process.env.REACT_APP_API_KEY;

function LandingPage() {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('Popular')
  const [selectedVideo, setSelectedVideo] = useState(null);
 
  const handleVideoClick = ({videoId}) => {
    navigate(`/video/${videoId}`); 
  };


  useEffect(() => {

    const fetchPopularVideos = async () => {
      try {
        const response = await youtube.get("search", {
          params: {
            part: "snippet",
            maxResults: 12, 
            q: `${selectedCategory}`,//this is suppose to change the based on selected category
            key: apiKey,
          },
        });
        setVideos(response.data.items);
       
      
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    fetchPopularVideos();
  }, [selectedCategory]);

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
 <Box sx={{ height: { sx: "auto", md: "92vh" }, borderRight: "1px solid #3d3d3d", px: { sx: 0, md: 2 } }}>
<Sidebar 
selectedCategory=
{selectedCategory}
setSelectedCategory=
{setSelectedCategory}
/>
 <Typography className="copyright" variant="body2" sx={{ mt: 1.5, color: "#fff", }}>
        Copyright © 2024 Will Do Industries
      </Typography>
 </Box>

 <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
          {selectedCategory}
          <span style={{ color: "#FC1503" }}>Videos</span>
        </Typography>

         <VideoList videos={videos} onVideoClick={handleVideoClick} /> 

         {/* <Grid item xs={8}>
        <VideoDetails video={selectedVideo} />
      </Grid>
        */}
      </Box>
      
      
      {/* <VideoList videos={videos} onVideoClick={handleVideoClick}  /> */}

    </Stack>
    
       
     
  )     
    
}

export default LandingPage;