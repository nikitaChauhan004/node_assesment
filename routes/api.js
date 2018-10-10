'use strict';

var express = require('express');
var router = express.Router();

/* Validate Password on Login*/

router.post('/login' , function(req, res){

      let password = req.body.password;
      let minNumberofChars = 8;
      let maxNumberofChars = 16;
      let validate = HelperFunction.validatePassword(password , minNumberofChars , maxNumberofChars);
      res.json(CreateResponseObj.response(validate.error, validate.message));
});

/* To Do List - Create Task for user abc (sample data)*/
router.post('/createUser', function(req, res){
    User.create({userName : "abc"} , function (err, userCreated){
        if(err){
          res.json(CreateResponseObj.response(false, 'Oops there is some error'));
        }else{
          res.json(CreateResponseObj.response(false, taskList));
        }
    });
});


/* To Do List - Create Task for user abc (sample data)*/
router.post('/createTaskForUser', function(req, res){
    let createData = {  //sample data
        userId : "5bbde7737c376c21a4a38248",
        userName : "abc",
        dayOfWeek : 1,
        listOfTasks :[
          {taskName : "Weekly Call at 8 AM" , time : "8"},
          {taskName : "Team meeting at 10 AM" , time : "10"},
          {taskName : "Follow up meeting with the clients" , time : "10"},
          {taskName : "Weekly Sales call at 6:30 PM" , time : "18:30"} ]
      };
    Task.create(createData , function (err, createdTask) {
        if(err){
          res.json(CreateResponseObj.response(false, 'Oops there is some error'));
        }else{
          res.json(CreateResponseObj.response(false, 'Task for '+createData.userName+' Created Successfully'));
        }
    })
});

/* To Do List - List Of Tasks*/

router.get('/todo', function(req, res){
  //if list is to made according to the user userId param can be passed in the query of find
    Task.find({} , function (err, allTask){
      Task.listAllTask(allTask , function(err , taskList){
        if(err){
          res.json(CreateResponseObj.response(false, 'Oops there is some error'));
        }else{
          res.json(CreateResponseObj.response(false, taskList));
        }
      });
    })
});


/* To Do List - Add a Task*/

router.put('/todo/add', function(req, res){
      /* Sample Data
      {
      	"taskName" : "Request for Bank StateMent at 6 PM" ,
      	"time" : "6"
      }
    */
  let updateObj = {$push : {listOfTasks : {taskName : req.body.taskName , time : req.body.time}}}
  let findQuery = {};
  if(req.body.userId) findQuery = {userId: req.body.userId}
    Task.update(findQuery, updateObj , function (err, taskAdded){
        if(err){
          res.json(CreateResponseObj.response(false, 'Oops there is some error'));
        }else{
          res.json(CreateResponseObj.response(false, "Task Added Successfully"));
        }
    })
});




/* To Do List - Remove a Task*/

router.put('/todo/deleteTask', function(req, res){
    /* Sample data
      {"taskId" : "5bbdf28640217a10bc96db80"}
    */
  let findQuery = {};
  let removeTask = {$pull : {listOfTasks : {_id : req.body.taskId}}}
  if(req.body.userId) findQuery = {userId: req.body.userId}
    Task.update(findQuery, removeTask , function (err, taskRemoved){
        if(err){
          res.json(CreateResponseObj.response(false, 'Oops there is some error'));
        }else{
          res.json(CreateResponseObj.response(false, "Task Removed Successfully"));
        }
    })
});



/* To Do List - Remove a Task of User*/

router.delete('/todo/delete', function(req, res){
    /* Sample data
      {"userId" : "5bbde7737c376c21a4a38248"}
    */
  let removeQuery = {};
  if(req.body.userId) removeQuery = {userId: req.body.userId}
    Task.remove(removeQuery , function (err, userRemoved){
        if(err){
          res.json(CreateResponseObj.response(false, 'Oops there is some error'));
        }else{
          res.json(CreateResponseObj.response(false, "User Removed Successfully"));
        }
    })
});

module.exports = router;
