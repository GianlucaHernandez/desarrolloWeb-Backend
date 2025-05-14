var express = require('express');
const  route  = require('.');
var router = express.Router();

let goals = [
    {
        id: 1,
        name: 'Goal 1',
        description: 'Description for Goal 1'
    },
    {
        id: 2,
        name: 'Goal 2',
        description: 'Description for Goal 2'
    }
]
router.get('/getGoals', function(req, res, next) {

    res.json(goals);
})
 
router.delete('/deleteGoal/:id', function(req, res, next) {
    const goalId = parseInt(req.params.id);
    const goal = goals.find(goal => goal.id === goalId);
    if(!goal){
        return res.status(400).json({message: 'Goal not found'});
    }else{
        goals = goals.filter(goal => goal.id !== goalId);
        res.json({ message: 'Goal deleted successfully' });
    }
});

router.post('/addGoal', function(req, res, next) {
    const {name, description} = req.body;
    if( !name || !description){
         return res.status(400).json({ message: 'Incorrect parameters sent' });
    }else{
    const newGoal = {
        id: goals.length + 1,
        name,
        description
    };
    goals.push(newGoal);
    res.json({ message: 'Goal added successfully', goal: newGoal });
    }
});

module.exports = router;