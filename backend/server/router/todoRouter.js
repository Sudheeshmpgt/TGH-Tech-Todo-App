const route = require('express').Router()
const {createTodo, updateTodoStatus, getAllTodos} = require('../controller/todoController')
const verifyAuth = require('../middleware/authenticate')

route.post('/', verifyAuth, createTodo);
route.put('/', verifyAuth, updateTodoStatus);
route.get('/', verifyAuth, getAllTodos)

module.exports = route;