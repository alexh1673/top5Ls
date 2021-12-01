import Top5Item from './Top5Item.js'
import List from '@mui/material/List';
import { Typography } from '@mui/material'
import { GlobalStoreContext } from '../store/index.js'
import ListItem from '@mui/material/ListItem';
import { Box } from '@mui/system';
import { TextField } from '@mui/material';
import AuthContext from '../auth';
import { React, useContext, useState } from "react";

function CommentBox(props) {
    const {store} = useContext(GlobalStoreContext);
    const {auth} = useContext(AuthContext);
    let editItems = "";

    function addComment(event)
    {
        if (event.code === "Enter") {
            let text = event.target.value;
            let comment = [];
            comment.push(auth.user.firstName+" "+auth.user.lastName)
            comment.push(text)
            props.idNamePair.comments.push(comment)
            store.updateListPairs(props.idNamePair._id)
            event.target.blur()
        }
    }

    if(props.idNamePair){
        editItems = 
            <List sx={{ width: '99%',height : "225px", bgcolor: 'white', overflowY:"auto"}}>
                {
                    props.idNamePair.comments.map((item) => (
                        <Box style = {{fontSize: '12pt',
                        width: '100%',
                        height: '45px',
                        back: 'black',
                        fontWeight:"bold"}}>
                            {item[0]}
                            <Box style={{
                                fontSize: '10pt',
                                width: '100%',
                                height: '35px',
                                back: 'black',
                                bgcolor: 'yellow',
                                fontWeight:"normal"
                            }}>
                                {item[1]}
                            </Box>
                        </Box>
                    ))
                }
            </List>;
    }

    return(
        <div id="top5-CommentBox">
            {editItems}
            <input placeholder = "Add Comment" 
            style = {{width : "100%",height: "52px"}} 
            type = "text"
            onKeyDown = {addComment}
            />
        </div>
    )
}

export default CommentBox;