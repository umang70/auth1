const express=require("express");
const jwt=require("jsonwebtoken");
const app=express();
app.use(express.json());
const jwtsecret="umangrandom";
const PORT=9597;

const users=[]
app.get("/",(req,res)=>{
    res.sendFile(__dirname+ "/public/index.html");

})

app.post("/signup",(req,res)=>{
   const username=req.body.username;
   const password=req.body.password;
   users.push({
    username:username,
    password:password
})
res.json({
    message:"you are signed in"
})

})
app.post("/signin",(req,res)=>{
   const username=req.body.username;
   const password=req.body.password;
   let found=null;
   for(let i=0;i<users.length;i++){
    if(users[i].username===username && users[i].password===password){
        found=users[i];
    }
   }
   if(!found){
    res.json({
        message:"credentions are incoorecet"
    })
    return
   

    }
    else{
        const token=jwt.sign({username },jwtsecret);
        res.json({
            token:token
        })

   }

})
function auth(req ,res,next){
    const token =req.headers.token;
    const decodeData=jwt.verify(token,jwtsecret);
    if(decodeData.username){
        req.username=decodeData.username;
        next();

    }
    else{
        res.json({
            message:"logged in"

        })

    }

}

app.get("/me", auth, (req, res) => {
    const foundUser = users.find(user => user.username === req.username);
    res.json({
        username: foundUser.username,
        password: foundUser.password
    });
});

// app.get("/todo",auth,(req,res)=>{

// })
// app.post("/todos",auth,(req,res)=>{
    
// })
// app.delete("/todos",auth,(req,res)=>{
    
// })


app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);

})
