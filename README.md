# TGH-Tech-Todo-App
<p>TGH-Tech-Todo-App is a MERN stack Todo application for adding todo with priority.</p>
<p>Features of Todo App<p>
<ul>
<li>Adding todos with priority</li>
<li>Mark as completed</li>
<li>Mark as cancelled</li>
<li>Count of completed, cancelled and pending todos</li>
<li>Displaying todos by sorting according to completed, cancelled and pending</li> 
<li>Delete Todo</li>
</ul>
<a href="https://tgh-todo-app.netlify.app/">URL to access frontend</a>
<a href="https://todo-app-api-f3vp.onrender.com">URL to access the APIs</a>
<br/>
<h3><u>Backend code explanation</u></h3>
<p>The backend/apis are done using Nodejs with Expressjs and used Mongodb for database.<p>
<p>To start the backend run the command 'npm start' on the terminal inside backend directory.<p>
<br/>
<h3><u>Frontend code explanation</u></h3>
<p>The frondend are done using Reactjs</p>
<p>To start the frontend run the command 'npm start' on the terminal inside frontend directory.<p>
<br/>
<h3>API Explanations</h3>
<h4>Login<h4>
<p>Login to app using the URL "https://todo-app-api-f3vp.onrender.com/api/user/login"</p>
<p>It is a POST method, use your registered email id and password as the payload for login</p>
<img src="https://user-images.githubusercontent.com/99382795/230726472-fdb7dfc1-9c92-4e93-8710-a048771817a0.png"></img>
<br/>
<h4>Signup<h4>
<p>Signup to app using the URL "https://todo-app-api-f3vp.onrender.com/api/user/new"</p>
<p>It is POST method, use your name,email id and password as the payload for signup</p>
<img src="https://user-images.githubusercontent.com/99382795/230726814-ce50d4f3-bcab-41ae-a7ab-9481cf400c3e.png"</mg>
<br/>
<h4>Home page<h4>
<p>You will reach the home page after successfull login</p>
<img src="https://user-images.githubusercontent.com/99382795/230727082-637b4d99-e163-4f35-9a78-4b83bce8bf58.png"</mg>
<br/>
<h4>Todo creation<h4>
<p>Create Todos using the URL "https://todo-app-api-f3vp.onrender.com/api/todo/new"</p>
<p>It is a post method, use task text and priority as the payload</p>
<p>Pass the JWT token in the header 'access-token'</p>
<img src="https://user-images.githubusercontent.com/99382795/230727335-b7974626-b652-46ae-896f-2c54beedf319.png"</mg>
<br/>
<h4>Todo status updation<h4>
<p>Update Todo status using the URL "https://todo-app-api-f3vp.onrender.com/api/todo/status"</p>
<p>It is a PUT method, update the todao status (completed, cancelled) by passing the status text as the payload</p>
<p>Pass the JWT token in the header 'access-token'</p>
<img src="https://user-images.githubusercontent.com/99382795/230727564-58b49e20-4ebe-4f24-9492-2c57e005022b.png"</mg>
<h4>Todo Listing updation<h4>
<p>Get all Todos using the URL "https://todo-app-api-f3vp.onrender.com/api/todo/get-all"</p>
<p>It is a GET method</p>
<p>Pass the JWT token in the header as 'access-token'</p>
<img src="https://user-images.githubusercontent.com/99382795/230727564-58b49e20-4ebe-4f24-9492-2c57e005022b.png"</mg>
<br/>
<h4>Todo count<h4>
<p>Get the count of Todos using the URL "https://todo-app-api-f3vp.onrender.com/api/todo/count"</p>
<p>It is a GET method</p>
<p>Pass the JWT token in the header as 'access-token'</p>
<img src="https://user-images.githubusercontent.com/99382795/230727929-7c684da3-48b7-4e51-a7a1-43b9f28cbbf5.png"</mg>
<br/>
<h4>Todo listing by count<h4>
<p>Display the Todos by status using the URL "https://todo-app-api-f3vp.onrender.com/api/todo/list-by-status"</p>
<p>It is a GET method</p>
<p>Pass the JWT token in the header as 'access-token'</p>
<img src="https://user-images.githubusercontent.com/99382795/230728044-ae7d7c48-fa0f-4e0f-8ce4-ba590c814e6d.png"</mg>
<h4>Delete a Todo<h4>
<p>Delete Todos using the URL "https://todo-app-api-f3vp.onrender.com/api/todo/delete/:id"</p>
<p>It is a DELETE method, pass the todoId as params</p>
<p>Pass the JWT token in the header as 'access-token'</p>
<br/>

