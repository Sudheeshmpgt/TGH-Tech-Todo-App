const TodoModel = require("../model/todoSchema");

const createTodo = async (req, res) => {
  try {
    const newTodo = new TodoModel({
      text: req.body.text,
      priority: req.body.priority,
      status: req.body.status,
    });
    const todo = await newTodo.save();
    res.status(201).send({ message: "Todo created successfully", todo: todo });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const updateTodoStatus = async (req, res) => {
  try {
    const updateStatus = await TodoModel.updateOne({_id: req.body.todoId},{status: req.body.status});
    if(updateStatus.modifiedCount > 0){
        res.status(200).send({message:"Todo status updated successfully"})
    }else{
        res.status(500).send({error:"Todo status updation failed"})
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getAllTodos = async (req, res) => {
    try {
        let todos = await TodoModel.find().sort({priority:1})
        if(todos){
            res.status(200).send({todos:todos})
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

const deleteTodo = async (req, res) => {
    try {
        let todo = await TodoModel.findByIdAndDelete(req.params.id)
        res.status(200).send({todo: todo, message:"Todo deleted successfully"})
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

const countTodo = async (req, res) => {
  try {
    let pending = await TodoModel.find({status:'Pending'}).count();
    let completed = await TodoModel.find({status:'Completed'}).count();
    let cancelled = await TodoModel.find({status:'Cancelled'}).count();
    res.status(200).send({pending:pending, completed:completed, cancelled:cancelled})
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

const todoListByStatus = async (req, res) => {
  try {
    let pending = await TodoModel.find({status:'Pending'}).sort({priority:1});
    let completed = await TodoModel.find({status:'Completed'}).sort({priority:1});
    let cancelled = await TodoModel.find({status:'Cancelled'}).sort({priority:1});
    res.status(200).send({pending:pending, completed:completed, cancelled:cancelled})
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}
module.exports = { createTodo, updateTodoStatus, getAllTodos, deleteTodo, countTodo, todoListByStatus };
