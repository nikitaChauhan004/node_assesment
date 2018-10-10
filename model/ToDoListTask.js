  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  var ObjectId = mongoose.Types.ObjectId;
  var async = require("async");


  var taskSchema = new Schema({
      createdAt : {type: 'date'},
      userId :  { type: Schema.ObjectId , required : true}, // the Id of the User whose to do list is created
      userName : { type  : 'string'}, // the Name of the User whose to do list is created
      dayOfWeek : {type : 'number', required : true}, // 0-6 where 0 is Sunday and 6 is Saturday
      listOfTasks : {
          type: [{
              taskName: { type: 'string', required: true },
              time : {type : 'string', default : null}, //should be in 24 hour format
          }],
          defaultsTo: []
      },

  });


  taskSchema.statics.listAllTask = function(taskData ,callback){
    let finalData = [];
    async.forEach(taskData, (task, call) => {
      let dayOfWeek = HelperFunction.getDayOfWeekName(task.dayOfWeek);
      let userObj = {
        taskDay : 'To Do list for '+dayOfWeek+'',
        listOfTasks : task.listOfTasks
      }
      finalData.push(userObj);
      call();
    }, err => {
        callback(false , finalData);
    })
  };



  var Task = mongoose.model('task', taskSchema);

  module.exports = Task;
