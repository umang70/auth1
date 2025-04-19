const express=require("express");
const jwt=require("jsonwebtoken");
const app=express();
app.use(express.json());
const jwtsecret="umangrandom";
const PORT=9057;

const users=[]

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
app.get("/me", (req, res) => {
    const token = req.headers.token;
    const decodeData = jwt.verify(token, jwtsecret);
  
    const foundUser = users.find(user => user.username === decodeData.username);
  
    res.json({
      username: foundUser.username,
      password: foundUser.password
    });
  });
  


app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);

})
