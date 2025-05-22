var express = require('express');
const  route  = require('.');
var router = express.Router();
const mongoose = require('mongoose');


const taskInit = mongoose.model('tasks', {
    name:String,
    description:String,
    dueDate:String
},'tasks');

router.get('/getTasks', function(req, res, next) {
    taskInit.find().then (
        (response)=> res.status(200).json(response))
        .catch(err=>{
            console.log(err);
            res.status(500).json({});
        });
});

router.delete('/deleteTask/:id', function(req, res, next) {
    console.log(req.params.id);
    if(req.params.id && req.params.id){
        let id = req.params.id;
        taskInit.deleteOne({_id:new mongoose.Types.ObjectId(id)}).then((response)=>{
            res.status(200).json (response);
        }).catch((err)=> {
            return res.status(400).json({message: 'task not found'});
        })
    }else{
        res.status(400).json({})
    }
});

router.post('/addTask', function(req, res, next) {
    let timestamp = Date.now() + Math.random();
    if(req.body && req.body.name && req.body.description && req.body.dueDate){
        const task = new taskInit(req.body);
        task.save().then(
            () => res.status(200).json({message: 'Added task'})
        ).catch(
            (err) => res.status(400).json(err)
        );
    }else{
        res.status(400).json({});
    }
});

module.exports = router;