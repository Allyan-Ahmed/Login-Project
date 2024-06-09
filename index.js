import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bodyParser from "body-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

// Set up static file serving
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

let signUpName, signUpEmail, signUpPassword, loginEmail, loginPassword;

function loginMiddleware(req,res, next){
  loginEmail=req.body.email;
  loginPassword=req.body.password;
  next();
}
app.use(loginMiddleware)
// Define route for serving HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

function validation(){
  if(loginEmail===signUpEmail && loginPassword===signUpPassword){
    return true;
  }
  return false;
}


app.post('/signup',(req,res)=>{
  signUpName=req.body.name;
  signUpEmail=req.body.email;
  signUpPassword=req.body.password;
  console.log(req);
  console.log(res);
  res.redirect("/");
});

app.post('/login',(req,res)=>{
 
  if(validation()){
    res.redirect(`/home?name=${signUpName}`);
     // Redirect to home.html with signUpName as a query parameter
    //  res.redirect(`/home?name=${encodeURIComponent(signUpName)}`);
  }else{
    console.log('invalid email or password')
    res.redirect(`/`);
  }
});

app.get('/home',(req,res)=>{
  res.sendFile(path.join(__dirname, 'public/home.html'));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
