export const RestURL = "http://localhost:9000/api"
export let RestService = {
    async signup(body) {
        let headers = { 'Content-Type': 'application/json'}
        return fetch(RestURL + "/user/new", {
            method: "POST", 
            headers,
            body: JSON.stringify(body)
        }).then(res => res.json())
    },
    async login(body) {
        let headers = { 'Content-Type': 'application/json'}
        return fetch(RestURL + "/user/login", {
            method: "POST", 
            headers,
            body: JSON.stringify(body)
        }).then(res => res.json())
    },
    async createTodo(body, token) {
        let headers = { 'Content-Type': 'application/json', 'access-token':token }
        return fetch(RestURL + "/todo/new", {
            method: "POST", 
            headers,
            body: JSON.stringify(body)
        }).then(res => res.json())
    },
    async getAllTodo( token) {
        let headers = { 'Content-Type': 'application/json', 'access-token':token }
        return fetch(RestURL + "/todo/get-all", {
            method: "GET", 
            headers,
        }).then(res => res.json())
    },
    async updateTodoStatus(body, token) {
        let headers = { 'Content-Type': 'application/json', 'access-token':token }
        return fetch(RestURL + "/todo/status", {
            method: "PUT", 
            headers,
            body: JSON.stringify(body)
        }).then(res => res.json())
    },
    async deleteTodo(todoId, token) {
        let headers = { 'Content-Type': 'application/json', 'access-token':token }
        return fetch(RestURL + `/todo/delete/${todoId}`, {
            method: "DELETE", 
            headers,
        }).then(res => res.json())
    },
    async countTodo(token) {
        let headers = { 'Content-Type': 'application/json', 'access-token':token }
        return fetch(RestURL + `/todo/count/`, {
            method: "GET", 
            headers,
        }).then(res => res.json())
    },
    async todoListByStatus(token) {
        let headers = { 'Content-Type': 'application/json', 'access-token':token }
        return fetch(RestURL + `/todo/list-by-status`, {
            method: "GET", 
            headers,
        }).then(res => res.json())
    },
    
}