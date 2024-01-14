//Home.js
import { Container, Typography} from "@mui/material"

const Home = () => {
   return (
      <Container>
         <Typography variant='h2' sx={{fontFamily:'Open Sans, sans-serif', alignContent:'center', textAlign: 'center'}}> LibraTrack</Typography>
         <Typography variant='h4' sx={{fontFamily:'Open Sans, sans-serif', alignContent:'center', textAlign: 'center'}}> Library management system</Typography>
      </Container>
   );
};

export default Home;
