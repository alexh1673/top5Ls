import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import { Fab, TextField, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';
import  AuthContext  from '../auth';
import DeleteModal from './DeleteModal'
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import FunctionsIcon from '@mui/icons-material/Functions';
import { useState } from 'react';
import { MenuList } from '@mui/material';


/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [text, setText] = useState("1");

    useEffect(() => {
        store.loadIdNamePairs(auth.email);
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }

    function funct1(){
        store.viewMode = 1;
        setText("1");
        console.log(store)
    }
    function funct2(){
        store.viewMode = 2;
        setText("2");
        console.log(store)
    }
    function funct3(){
        store.viewMode = 3;
        setText("3");
        console.log(store)
    }
    function funct4(){
        store.viewMode = 4;
        setText("4");
        console.log(store)
    }
    
    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ marginTop:"5%", width: '90%', left: '5%', bgcolor: 'background.paper' }}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                        viewMode={text}
                    />
                ))
            }
            </List>;
    }
    return (
        <div id="top5-list-selector">
            <Button onClick = {funct1}><HomeIcon/></Button>
            <Button onClick = {funct2}><GroupIcon/></Button>
            <Button onClick = {funct3}><PersonIcon/></Button>
            <Button onClick = {funct4}><FunctionsIcon/></Button>
            <TextField label = "Search" style = {{width : "40%"}}></TextField>
            <MenuList>rhee</MenuList>
            <div id="list-selector-list">
                {
                    listCard
                }
            </div>
            <div id="list-selector-heading">
            <Fab 
                color="primary" 
                aria-label="add"
                id="add-list-button"
                onClick={handleCreateNewList}
                style = {{marginTop : "17%" ,zIndex: "999"}}
            >
                <AddIcon />
            </Fab>
                <Typography variant="h2" marginTop = "17%" zIndex = "999">{text}</Typography>
            </div>
            <DeleteModal/>
        </div>);
}

export default HomeScreen;