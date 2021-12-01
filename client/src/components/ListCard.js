import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import DropBox from './DropBox';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import AuthContext from '../auth';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { idNamePair } = props;
    const [dropped, setdropActive] = useState(false);
    const {auth} = useContext(AuthContext);
    const [liked, setLike] = useState(idNamePair.likedBy.includes(auth.user.email)?true:false);
    const [disliked, setDislike] = useState(idNamePair.dislikedBy.includes(auth.user.email)?true:false);

    function handleLoadList(event, id) {
        if (!event.target.disabled) {
            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        store.markListForDeletion(id);
    }

    async function open(event){
        event.stopPropagation();
        console.log(idNamePair)
        if(!dropped){
            idNamePair.views +=1;
            store.updateListPairs(idNamePair._id);
        }
        let newDrop = !dropped;
        setdropActive(newDrop)
    }

    function like(event)
    {
        event.stopPropagation();
        if(!liked)
        {
            idNamePair.likes +=1;
            idNamePair.likedBy.push(auth.user.email);
            store.updateListPairs(idNamePair._id);
        }
        else
        {
            idNamePair.likes -=1;
            const index = idNamePair.likedBy.indexOf(auth.user.email);
                if (index > -1) {
                idNamePair.likedBy.splice(index, 1);
                }
            store.updateListPairs(idNamePair._id);
        }
        setLike(!liked);
    }

    function dislike(event)
    {
        event.stopPropagation();
        if(!disliked)
        {
            idNamePair.dislikes +=1;
            idNamePair.dislikedBy.push(auth.user.email);
            store.updateListPairs(idNamePair._id);
        }
        else
        {
            idNamePair.dislikes -=1;
            const index = idNamePair.dislikedBy.indexOf(auth.user.email);
                if (index > -1) {
                idNamePair.dislikedBy.splice(index, 1);
                }
            store.updateListPairs(idNamePair._id);
        }
        setDislike(!disliked);
    }

    let likeComponent = 
            <Box>
                <Box>
                <Button onClick = {like} style  = {liked?{opacity:1}:{opacity:0.3}}>
                        <ThumbUpIcon/>
                </Button>
                    <Box fontSize = "12px" textAlign = "center">{idNamePair.likes}</Box>
                </Box>
            </Box>

    let dislikeComponent = 
            <Box>
                 <Box>
                    <Button onClick = {dislike} style  = {disliked?{opacity:1}:{opacity:0.3}}>
                        <ThumbDownIcon/>
                    </Button>
                    <Box fontSize = "12px" textAlign = "center">{idNamePair.dislikes}</Box>
                </Box>
            </Box>

    let cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ marginTop: '15px', display: 'flex', p: 1 }}
            style={{
                fontSize: '48pt',
                width: '100%'
            }}
        >

                <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}
                    <Box fontSize = "15px">By: {idNamePair.ownedBy}</Box>
                </Box>
                <Box fontSize = "15px">views {idNamePair.views}</Box>
                <Button   onClick={(event) => {handleLoadList(event, idNamePair._id)}} fontSize = "15px" >
                        edit
                </Button>
                {(idNamePair.published && store.viewMode != "1")?likeComponent:<Box></Box>}
                {idNamePair.published?dislikeComponent:<Box></Box>}
                <Box sx={{ p: 1 }}>
                    <IconButton onClick={(event) => {
                        handleDeleteList(event, idNamePair._id)
                    }} aria-label='delete'>
                        <DeleteIcon style={{fontSize:'48pt'}} />
                    </IconButton>
                </Box>
                <Box>
                    {dropped?<Button onClick = {(event) => open(event)}><ArrowDropUpIcon/></Button>:<Button onClick = {(event) => open(event)}><ArrowDropDownIcon/></Button>}
                </Box>
        </ListItem>
        
    return (
        <div>
            {cardElement}
            <Box>
                {dropped?<DropBox
                    idNamePair = {idNamePair}
                />:<div></div>}
            </Box>
        </div>
    );
}

export default ListCard;