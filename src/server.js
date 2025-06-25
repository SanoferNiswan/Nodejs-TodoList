import express from "express"
import path, {dirname} from "path"
import { fileURLToPath } from "url";
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'

const PORT = process.env.PORT || 3000;

const app = express();

// get directory name from url to current module
const __filename = fileURLToPath(import.meta.url);

// get directory name from file path
const __dirname = dirname(__filename);
console.log(__dirname,"?dir");


// middleware

app.use(express.static(path.join(__dirname,"../public"))) // Serve files in public

app.use(express.json()); // Allow to accept json

// Serve html file 
app.get(`/`,(req,res)=>{
    res.sendFile(path.join(__dirname,'../public','index.html'))
})

app.use('/auth',authRoutes);

app.use('/todos',todoRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})
