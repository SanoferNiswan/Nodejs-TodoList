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
    
})

router.put(`/:id`,(req,res)=>{})

router.delete(`/:id`,(req,res)=>{})

export default router;