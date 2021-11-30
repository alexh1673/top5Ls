import { useContext } from 'react';
import AuthContext from '../auth';
import Button from '@mui/material/Button';
import Modal  from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom'
import Stack from '@mui/material/Stack';
import { GlobalStoreContext } from '../store'

export default function SplashScreen() {

    const style1 = {
        position: 'absolute',
        top: '60%',
        left: '15%',
        width: 200,
        bgcolor: 'background.paper',
        p: 4,
      };

      const style2 = {
        position: 'absolute',
        top: '60%',
        left: '45%',
        width: 200,
        bgcolor: 'background.paper',
        p: 4,
      };

      const style3 = {
        position: 'absolute',
        top: '60%',
        left: '75%',
        width: 200,
        bgcolor: 'background.paper',
        p: 4,
      };

    return (
        <div id="splash-screen">
            The Top 5<br />
            Lister
            <Box style = {style1}>
                <Link to='/login/'>
                    <Button style={{backgroundColor:"white", width:"100%"}}>Sign in</Button>
                </Link>
            </Box>

            <Box style = {style2}>
                <Link to='/register/'>
                    <Button style={{backgroundColor:"white", width:"100%"}}> Create New Account</Button>
                </Link>
            </Box>

            <Box style = {style3}>
                <Button style={{backgroundColor:"white", width:"100%"}}>Continue as guest</Button>
            </Box>
            <div style = {{fontSize : '12px'}} >
                Developed by Alex Huang
            </div>

        </div>
    )
}