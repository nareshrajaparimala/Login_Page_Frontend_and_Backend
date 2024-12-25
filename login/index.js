const express =require('express');
const app=express();
const path=require('path');
const PORT =process.env.PORT ||4000;
app.use(express.json());
app.use(express.json())
// const fs =require('fs');
const functionfile= require(path.join(__dirname,'frount','function.js'));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frount', 'index.html'));
});
//for linkins the style.css file
app.use(express.static(path.join(__dirname, 'frount')));
app.get("/register",(req,res)=>{
    return res.send("hi i am naresh From HOME page"+req.body.name);
});
app.get('/get-data', (req, res) => {
    return res.sendFile(path.join(__dirname, 'frount', 'login.html'));     
});



// --------------------------login----------------------------------------
// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: true })); // Parse form data
// app.use(express.static(path.join(__dirname, 'public'))); // Serve static files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.post("/main_login",async (req,res)=>{
    const main_user=await req.body.main_user1;
    const t_pass=await req.body.main_pass1;
    const main_pass= await functionfile.hashpass(t_pass);
    console.log(main_pass);
    const gotData=await functionfile.fetchData(main_user);
if (gotData && gotData.length > 1) 
{
    if(main_user===gotData[0] && main_pass===gotData[1])
    {
        console.log("The data is present in database ");
        try 
        {
            return res.redirect('/get-data'); // Ensure only one response is sent
        } catch (error) 
        {
            console.log("error by naresh");
        }
        res.redirect('/');
    }
    else
    {
        console.log("! incorrect username and password")
    }
} 
else 
{
    console.log("Error: gotData is null or does not contain the expected data.");
}
   
});

//-------------------------login end-------------------------------------



// -------------------------register---------------------------------
app.post("/register",async (req,res)=>{
    const user_name =await req.body.user_name;
    const pass =await req.body.pass;
    console.log("pass");
    res.send("Login credentials received!");
    if(user_name===" "){
        console.log(" => user already exist");
        return ;
    }
    else{
       
            await functionfile.insertData(user_name , pass);
       console.log(await functionfile.fetchDataAll());
      
       
    }
});

// ------------------------- end  register---------------------------








app.listen(PORT,()=>{ console.log(`server is running on the port : ${PORT}`);})