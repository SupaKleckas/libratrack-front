import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import '../index.css'
import Menu from '@mui/material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Link as RouterLink} from 'react-router-dom'
import Logout from '../utils/Logout'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { getJwtToken, tokenValid } from "../utils/Auth";

export default function Navbar() {
   const [isLoggedIn, setLoggedIn] = useState(false)
   const [anchorEl, setAnchorEl] = useState(null)
   const iconButtonRef = useRef(null)


   const handleMenuClick = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const handleMenuClose = () => {
      setAnchorEl(null);
   };

   const handleLogoutAndMenu = () => {
      setAnchorEl(null);
      Logout();
   }

   useEffect(() => {
      setInterval(() => {
         if (!tokenValid()) {
            setLoggedIn(false)
            
         } else {
            setLoggedIn(true)
         }
      }, [])
   });

   return (
      <Box sx={{ flexGrow: 1 }}>
         <AppBar position="static" sx={{ bgcolor: "#907163", mb: 8 }}>
            <Toolbar>
               <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: 'Open Sans, sans-serif' }}>
                  LibraTrack
               </Typography>
               <Button component={RouterLink} to="/" color="inherit" sx={{ fontFamily: 'Open Sans, sans-serif', display: { xs: 'none', sm: 'inline' }}}>Home</Button>


               <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleMenuClick}
                  ref={iconButtonRef}
                  sx={{ display: { xs: 'block', sm: 'none' } }}
               >
                  <MenuIcon />
               </IconButton>

               {/* Menu for big screens */}
               {isLoggedIn ? (
                  <div>
                     <Button component={RouterLink} to="/libraries" color="inherit" sx={{ fontFamily: 'Open Sans, sans-serif', display: { xs: 'none', sm: 'inline' } }}>View libraries</Button>
                     <Button onClick={Logout} component={RouterLink} to="/" color="inherit" sx={{ fontFamily: 'Open Sans, sans-serif', display: { xs: 'none', sm: 'inline' } }}>Logout</Button>
                  </div>
               ) : (
                  <div>
                     <Button component={RouterLink} to="/register" color="inherit" sx={{ fontFamily: 'Open Sans, sans-serif', display: { xs: 'none', sm: 'inline' } }}>Register</Button>
                     <Button component={RouterLink} to="/login" color="inherit" sx={{ fontFamily: 'Open Sans, sans-serif', display: { xs: 'none', sm: 'inline' } }}>Login</Button>
                  </div>
               )}

               {/* Menu for small screens */}
               <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
               >
                  <MenuItem component={RouterLink} to="/" onClick={handleMenuClose} color="inherit" sx={{ fontFamily: 'Open Sans, sans-serif'}}>Home</MenuItem>
                  {isLoggedIn ? (
                     <div>
                        <MenuItem component={RouterLink} to="/libraries" onClick={handleMenuClose} color="inherit" sx={{ fontFamily: 'Open Sans, sans-serif' }}>View Libraries</MenuItem>
                        <MenuItem component={RouterLink} to="/" onClick={handleLogoutAndMenu} color="inherit" sx={{ fontFamily: 'Open Sans, sans-serif' }}>Logout</MenuItem>
                     </div>

                  ) : (
                     <div>
                        <MenuItem component={RouterLink} to="/register" onClick={handleMenuClose} sx={{ fontFamily: 'Open Sans, sans-serif' }}>Register</MenuItem>
                        <MenuItem component={RouterLink} to="/login" onClick={handleMenuClose} sx={{ fontFamily: 'Open Sans, sans-serif' }}>Login</MenuItem>
                     </div>
                  )}

               </Menu>
            </Toolbar>
         </AppBar>
      </Box>
   );
}

