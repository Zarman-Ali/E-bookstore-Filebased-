const fs=require('fs');


const requestHandler=(req,res)=>{

const url=req.url;
const method=req.method 
if(url==='/'){
res.write('<html>');
res.write('<head>"Hello"</head>');
res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
res.write('</html>');
return res.end();
}
if(url==='/message' && method==='POST'){
    const body=[];
    req.on('data',chunk=>{
        body.push(chunk);
    });
    return req.on('end',()=>{
        const parsed=Buffer.concat(body).toString();
        console.log(parsed);
        const message=parsed.split('=')[1];
        fs.writeFile('message.txt',message,err=>{
           // console.log(err);
            res.statusCode=302;
            res.setHeader('Location','/');
            return res.end();
        });
  
    })
   
}

};

module.exports=requestHandler;