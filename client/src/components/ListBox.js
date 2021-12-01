import { useContext } from 'react'
import Top5Item from './Top5Item.js'
import List from '@mui/material/List';
import { Typography } from '@mui/material'
import { GlobalStoreContext } from '../store/index.js'
import ListItem from '@mui/material/ListItem';
import { Box } from '@mui/system';

function ListBox(props) {
    const {store} = useContext(GlobalStoreContext);
    let counter = 1;
    let editItems = "";
    if(props.idNamePair){
        editItems = 
            <List sx={{ width: '100%',height : "275px", bgcolor: 'white' }}>
                {
                    props.idNamePair.items.map((item) => (
                        <Box style={{
                            fontSize: '48pt',
                            width: '100%',
                            height: '55px'
                        }}>
                           {counter++} . {item}
                        </Box>
                    ))
                }
            </List>;
    }
    return (
        <div id="top5-ListBox">
                {editItems}
        </div>
    )
}

export default ListBox;