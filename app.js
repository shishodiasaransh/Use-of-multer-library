import express from "express"
import ejs from "ejs"
import path from 'path'
import multer from 'multer'


const app = express()
const port = 9000

app.use(express.urlencoded({extended:false}))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
  })
  
  const upload = multer({ storage: storage })

app.set("view engine","ejs");
app.set('views',path.resolve("./views"))

app.get('/',(req,res)=>{
    res.render('form.ejs')
})

app.post('/uploads',upload.single('photo'),(req,res)=>{
    console.log(req.body)
    console.log(req.file)
    res.send("uploded")
})

app.listen(port,(req,res)=>{
    console.log("Server running")
})