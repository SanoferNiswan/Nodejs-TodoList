import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../db.js'

const router = express.Router();

router.post(`/register`,(req,res)=>{
     const {username,password} = req.body;
     const hashedPassword = bcrypt.hashSync(password,8);
     
     try{
        // create user
        const insertUser = db.prepare(`INSERT INTO users(username,password) VALUES (?,?)`)
        const result = insertUser.run(username,password);
        console.log("Register successful:",result);

        // add default todo
        const defaultTodo = "Hello! Add Your first todo:)"
        const insertTodo = db.prepare(`INSERT INTO todos(user_id,task) VALUES (?,?)`)
        insertTodo.run(result.lastInsertRowid,defaultTodo);

        // create a token
        const token = jwt.sign({id:result.lastInsertRowid},process.env.JWT_SECRET,{expiresIn:'24h'});
        res.json({token})
     }catch(err){
        console.log("error in register:",err);
        res.sendStatus(503);
     }  
})

router.post(`/login`,(req,res)=>{

})

export default router;