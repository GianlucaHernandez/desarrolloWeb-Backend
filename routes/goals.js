var express = require('express');
const  route  = require('.');
var router = express.Router();
const mongoose = require('mongoose');

const goalInit = mongoose.model('goals',{
    name:String,
    description:String,
    dueDate:String
},'goals');

router.get('/getGoals', function(req, res, next) {
    goalInit.find().then (
        (response) => res.status(200).json(response)
    ).catch(err => {
        console.log(err);
        res.status(500).json({});
    });
});
 
router.delete('/deleteGoal/:id', function(req, res, next) {
    console.log(req.params.id);
    if(req.params.id && req.params.id){
        let id = req.params.id;
        goalInit.deleteOne({_id:new mongoose.Types.ObjectId(id)}).then((response)=>{
            res.status(200).json (response);
        }).catch((err)=>{
            return res.status(400).json({message: 'goal not found'});
        })
    }
});

router.post('/addGoal', function(req, res, next) {
   let timestamp = Date.now() + Math.random();
    if(req.body && req.body.name && req.body.description && req.body.dueDate){
        const goal = new goalInit(req.body);
        goal.save().then(
            () => res.status(200).json({message: 'Added goal'})
        ).catch(
            (err) => res.status(400).json(err)
        );
    }else{
        res.status(400).json({});
    }
});

module.exports = router;