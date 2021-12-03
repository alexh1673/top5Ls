import { useContext, useState } from 'react'
import Top5Item from './Top5Item.js'
import List from '@mui/material/List';
import { Typography } from '@mui/material'
import { GlobalStoreContext } from '../store/index.js'
import { Box } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);
    const [text, setText] = useState(store.currentList.name);


    function handleChange(e) {
        setText(e.target.value)
    }

    function handlePublish(event)
    {
        event.stopPropagation();
        console.log(store.currentList);
        let list;
        for(let i = 0;i<store.idNamePairs.length;i++)
        {
            if(store.idNamePairs[i]._id == store.currentList._id){
                list = store.idNamePairs[i];
                break;
            }
        }
        list.published = true;
        store.updateListPairs(store.currentList._id);
        store.closeCurrentList();
    }

    function keyPress(event)
    {
        event.stopPropagation();
        if(event.code == "Enter")
        {
            store.changeListName(store.currentList._id,text);
            event.target.blur()
        }
    }

    function saveList(event)
    {
        event.stopPropagation()
        store.updateCurrentList();
    }

    let editItems = "";
    if (store.currentList) {
        editItems = 
            <List id="edit-items" sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {
                    store.currentList.items.map((item, index) => (
                        <Top5Item 
                            key={'top5-item-' + (index+1)}
                            text={item}
                            index={index} 
                        />
                    ))
                }
            </List>;
    }
    return (
        <div id="top5-workspace" style={{backgroundColor:"white"}}>
            <input type = "text" value = {text} onChange = {handleChange} onKeyDown = {keyPress} style = {{width : "60%"}}></input>
            <div id="workspace-edit">
                <div id="edit-numbering">
                    <div className="item-number"><Typography variant="h3">1.</Typography></div>
                    <div className="item-number"><Typography variant="h3">2.</Typography></div>
                    <div className="item-number"><Typography variant="h3">3.</Typography></div>
                    <div className="item-number"><Typography variant="h3">4.</Typography></div>
                    <div className="item-number"><Typography variant="h3">5.</Typography></div>
                </div>
                {editItems}
            </div>
            <div><Button style={{marginTop: "45%",zIndex:"999",backgroundColor:"black"}} onClick = {saveList}>save</Button>
                <Button style={{marginTop: "45%",zIndex:"999",backgroundColor:"black"}} onClick = {handlePublish}>publish</Button>
            </div>
        </div>
    )
}

export default WorkspaceScreen;