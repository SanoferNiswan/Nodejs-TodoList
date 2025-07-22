import express from 'express'
import db from '../db.js'

const router = express.Router();

router.get(`/`,(req,res)=>{
    console.log("userid:",req.userId);
    
    const query = db.prepare(`select * from todos where user_id=?`);
    const todos = query.all(req.userId);
    res.json(todos);
})

router.post(`/`,(req,res)=>{
    const {task} = req.body;
    const insertTodo = db.prepare(`insert into todos (user_id,task) values(?,?)`);
    const result = insertTodo.run(req.userId,task);
    console.log("res:",result);
    
    res.status(201).json({id:result.lastInsertRowid,task,completed:0})
})

router.put(`/:id`,(req,res)=>{
    const {id} = req.params;
    const {completed} = req.body;
    
    const updateTodo = db.prepare(`update todos set completed=? where id=?`);
    const result = updateTodo.run(completed,id)

    console.log("result:",result);
    res.status(200).json({message:"todo updated successfully"})
    
})

router.delete(`/:id`,(req,res)=>{
    const {id} = req.params;

    const deleteTodo = db.prepare(`delete from todos where id=?`);
    deleteTodo.run(id);

    res.status(200).json({message:"Todo deleted successfully"})
})

export default router;