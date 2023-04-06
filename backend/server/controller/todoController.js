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

module.exports = { createTodo, updateTodoStatus, getAllTodos };
