const Top5List = require('../models/top5list-model');

createTop5List = (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Top 5 List',
        })
    }

    const top5List = new Top5List(body);
    console.log(top5List);
    console.log("creating top5List: " + JSON.stringify(top5List));
    if (!top5List) {
        return res.status(400).json({ success: false, error: err })
    }

    top5List
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                top5List: top5List,
                message: 'Top 5 List Created!'
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Top 5 List Not Created!'
            })
        })
}

updateTop5List = async (req, res) => {
    const body = req.body
    console.log(body)
    console.log("updateTop5List: " + JSON.stringify(body));
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Top5List.findOne({ _id: req.params.id }, (err, top5List) => {
        console.log("top5List found: " + JSON.stringify(top5List));
        if (err) {
            return res.status(404).json({
                err,
                message: 'Top 5 List not found!',
            })
        }

        top5List.name = body.name
        top5List.items = body.items
        top5List.comments = body.comments
        top5List.likes = body.likes
        top5List.dislikes = body.dislikes
        top5List.published = body.published
        top5List.likedBy = body.likedBy
        top5List.dislikedBy = body.dislikedBy
        top5List.views = body.views
        top5List.publishDate = body.publishDate

        top5List.save()
            .then(() => {
                console.log("SUCCESS!!!");
                return res.status(200).json({
                    success: true,
                    id: top5List._id,
                    message: 'Top 5 List updated!',
                })
            })
            .catch(error => {
                console.log("FAILURE: " + JSON.stringify(error));
                return res.status(404).json({
                    error,
                    message: 'Top 5 List not updated!',
                })
            })
    })
}

deleteTop5List = async (req, res) => {
    Top5List.findById({ _id: req.params.id }, (err, top5List) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Top 5 List not found!',
            })
        }
        Top5List.findOneAndDelete({ _id: req.params.id }, () => {
            return res.status(200).json({ success: true, data: top5List })
        }).catch(err => console.log(err))
    })
}

getTop5ListById = async (req, res) => {
    await Top5List.findById({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        return res.status(200).json({ success: true, top5List: list })
    }).catch(err => console.log(err))
}
getTop5Lists = async (req, res) => {
    await Top5List.find({}, (err, top5Lists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!top5Lists.length) {
            return res
                .status(404)
                .json({ success: false, error: `Top 5 Lists not found` })
        }
        return res.status(200).json({ success: true, data: top5Lists })
    }).catch(err => console.log(err))
}
getTop5ListPairs = async (req, res) => {
        await Top5List.find({ }, (err, top5Lists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!top5Lists) {
            console.log("!top5Lists.length");
            return res
                .status(404)
                .json({ success: false, error: 'Top 5 Lists not found' })
        }
        else {
            // PUT ALL THE LISTS INTO ID, NAME PAIRS
            let pairs = [];

            for (let key in top5Lists) {
                let list = top5Lists[key];
                let pair = {
                    _id: list._id,
                    name: list.name
                };
                if(req.params.id === list.ownerEmail){
                    pairs.push(pair);
                }
            }
            return res.status(200).json({ success: true, idNamePairs: pairs })
        }
    }).catch(err => console.log(err))
}

updateCommunityLists = async (req, res) =>{
    console.log(" Not supercalifragilisticexpialidocious");
    console.log(req.params.id);
    await Top5List.find({name: req.params.id, published: true}, (err, top5Lists) => {

        console.log(top5Lists[0]+" supercalifragilisticexpialidocious");
        if (err) {
            return res.status(404).json({ success: false, error: err });
        }
        
        if (!top5Lists){
            return;
        }

        if(top5Lists.length === 1 && top5Lists[0].ownerEmail === "Community"){
            Top5List.findOneAndDelete({ _id: top5Lists[0]._id }, (err, top5list) => {
                return;
            }).catch(err => console.log(err))
            return; 
        }
        let itemVotePairs = {}; 
        let communityList = null;
        for (let key in top5Lists) {
            let list = top5Lists[key];
            if(list.userName === "Community"){
                communityList = list
                continue; 
            }
            list.items.forEach((item, index) => {
                if(!itemVotePairs[item]){
                    itemVotePairs[item] = 5-index;
                }
                else{
                    itemVotePairs[item] += 5-index;
                }
            });
        }
        let pairs = Object.entries(itemVotePairs);
        let items = []
        let votes = [] 
        items.push(pairs[0][0])
        votes.push(pairs[0][1])
        pairs.shift(); 
        for (let key in pairs){
            pair = pairs[key]
            if(pair[1] < votes[votes.length-1]){
                votes.push(pair[1]);
                items.push(pair[0]);
            }
            else{
                for (let i = 0; i < votes.length; i++){
                    if(pair[1] >= votes[i]){
                        if(i === 0){
                            votes.unshift(pair[1]);
                            items.unshift(pair[0]);
                            break;
                        }
                        else{
                            votes.splice(i, 0, pair[1]); 
                            items.splice(i, 0, pair[0]);
                            break; 
                        }
                    }
                }
            }
            if(votes.length > 5){
                votes.pop();
                items.pop();
            }
        }
        
        if(communityList){
            communityList.items = items;
            communityList.votes = votes; 
            communityList.save();  
        } else {
            const top5List = new Top5List({name: req.params.id, items: items, ownedBy: "Community",comments:[],
             views: 0,likes:0,dislikes:0,published:true, ownerEmail:"community@top5lister.com",
            likedBy:[], dislikedBy:[], publishDate: "N/A", published: true, votes: votes}); 
            top5List.save(); 
        }
    }).catch(err => console.log(err));
}

module.exports = {
    createTop5List,
    updateTop5List,
    deleteTop5List,
    getTop5Lists,
    getTop5ListPairs,
    getTop5ListById,
    updateCommunityLists
}