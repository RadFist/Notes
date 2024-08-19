import express from 'express'
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
let notes = [];

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended : true }));

// object 
function data (title,note){
    this.title =  title,
    this.note = note,
    this.time = timeFormated()
}

//time formated
function timeFormated(){
    const date = new Date();
    const formattedDate = date.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
    return formattedDate.replaceAll("/","-");
}

function addNote(title,note){
    notes.push(new data(title,note));
}



app.get('/',(req,res)=>{
    res.render('index.ejs', { notes: notes });
    
})
app.get('/note',(req,res)=>{
    res.render('note.ejs')
})
app.get('/update',(req,res)=>{
    const { id } = req.query
    res.render("note.ejs",{ id : id, notes:notes })

})
app.post('/update',(req,res)=>{
   const { id } = req.body;
   const { title } = req.body;
   const { note } = req.body;
   // update 
   notes.splice(id,1, new data(title,note) )
   console.log(notes[id]);
   res.redirect("/");
})
app.get('/delete',(req,res)=>{
    const { id } = req.query;
    notes.splice(id,1);
    res.redirect('/');
    
})

app.post("/submit",(req,res)=>{
    const {title} = req.body;
    const {note} = req.body;
    addNote(title,note);
    res.redirect('/')
})
app.listen(port,(req,res)=>{
    addNote('19 agustus',"udah ambil surat tinggal ajuin nanti");
    addNote('not done yet',"selesaikan desain mu kawan");
    console.log("server's ready running on http://localhost:"+port);
})


