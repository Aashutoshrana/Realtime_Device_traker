const express=require('express');
const app=express();
const path=require('path');
const http=require('http');

const socketio=require("socket.io");
const server=http.createServer(app);
const io=socketio(server);
app.set("view engine","ejs");
 app.use(express.static(path.join(__dirname,"public")));
 io.on("connection",(socket)=>{
    console.log("New user Connection")
    socket.on("send-location",(data)=>{
       io.emit("receive-location",{id:socket.id,...data});
    });
socket.on("disconneted",()=>{
     io.emit("user-disconnected".socket.id);
     console.log(`User disconnected :${socket.id}`);
});
 });

 app.get("/",(req,res)=>{
   res.render("new");
 });
 server.listen(8000,()=>{
    console.log("server id running on http://localhost:8000");
 });