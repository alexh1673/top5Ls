import { useContext } from 'react'
import Top5Item from './Top5Item.js'
import List from '@mui/material/List';
import { Typography } from '@mui/material'
import { GlobalStoreContext } from '../store/index.js'
import { Box } from '@mui/system';
import ListBox from './ListBox.js';
import CommentBox from './CommentBox.js';

function DropBox(props) {

    const style = {
        marginTop: "30px",
        width: "100%",
        height:"300px",
    };

    return(<Box style = {style}>
        <ListBox
            idNamePair = {props.idNamePair}
        />
        <CommentBox
            idNamePair = {props.idNamePair}
        />
    </Box>)
}

export default DropBox; 