const Task = require('../models/task')

const taskController = {}

taskController.list = (req, res) => {
    Task.find( {userId: req.user._Id })
      .then((tasks) => {
         res.json(tasks)
      })
      .catch((err)=> {
        res.json(err)
      })
}

taskController.create = (req, res) => {
    const body = req.body
    const task = new Task(body)
    task.userId = req.user._Id
    task.save()
        .then((tasks) => {
            res.json({tasks,  "message": "Task created." })
        })
        .catch((err)=> {
           res.json(err)
        })
}

taskController.show = (req, res) => {
    const id = req.params.id
    Task.findOne ({ _id:id, userId: req.user._Id}) 
        .then((tasks) => {
            res.json(tasks)
        })
        .catch((err)=> {
           res.json(err)
        })
}

taskController.update =(req, res ) => {
    const id  = req.params.id
    const body = req.body 
    Task.findOneAndUpdate( {_id:id, userId: req.user._Id }, body, {new:true, runValidators:true})
    .then((tasks) => {
        res.json({tasks, "message": "Task updated"})
    })
    .catch((err)=> {
       res.json(err)
    })
}

taskController.destroy = (req, res) => {
    const id = req.params.id
    Task.findOneAndRemove({_id: id, userId:req.user._Id})
    .then((tasks) => {
        res.json({tasks, "message": "Task deleted"})
    })
    .catch((err)=> {
       res.json(err)
    })
}



module.exports = taskController
