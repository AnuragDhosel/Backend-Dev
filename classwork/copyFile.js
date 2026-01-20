const fs=require('fs');
// fs.copyFileSync('text.txt','dest.txt')

fs.copyFile('text.txt','newtext.txt', (err) =>{
    if(err){
        console.log("error while file is copied",err)
    }
    else{
        console.log("file is copied successfully")
    }
})

// fs.copyFileSync('urgent.txt','dest.txt')
// console.log("file is copied")

fs.unlink('dest.txt',(err)=>{
    if(err){
        console.log("error while deleting file",err,err)
    }
    else{
        console.log("file is deleted")
    }
})