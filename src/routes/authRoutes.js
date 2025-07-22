import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../db.js'

const router = express.Router();

router.post(`/register`,(req,res)=>{
     const {username,password} = req.body;
     const hashedPassword = bcrypt.hashSync(password,parseInt(process.env.SALT_ROUNDS));
     
     try{
        // create user
        const insertUser = db.prepare(`INSERT INTO users(username,password) VALUES (?,?)`)
        const result = insertUser.run(username,hashedPassword);
        console.log("Register successful:",result);

        // add default todo
        const defaultTodo = "Hello! Add Your first todo:)"
        const insertTodo = db.prepare(`INSERT INTO todos(user_id,task) VALUES (?,?)`)
        const x = insertTodo.run(result.lastInsertRowid,defaultTodo);

        // create a token
        const token = jwt.sign({id:result.lastInsertRowid},process.env.JWT_SECRET,{expiresIn:'24h'});
        res.json({token})
     }catch(err){
        console.log("error in register:",err);
        res.sendStatus(503);
     }  
})

router.post(`/login`,(req,res)=>{
    const {username,password} = req.body;
    
    try{
        const getUser = db.prepare(`select * from users where username==?`);
        const user = getUser.get(username);

        if(!user){
        console.log("user not found");
        res.status(404).send({message:"User not found"});
        return;
        }

        const isValidPassword = bcrypt.compareSync(password,user.password)
        
        if(!isValidPassword){
            return res.status(401).send({message:"Invalid password"});
        }

        const token = jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:'24h'});

        res.json({token});
    
    }catch(err){
        console.log("error occured while signin:",err);
        res.sendStatus(503);        
    }
})

export default router;