// const fs=require('fs');
// // fs.copyFileSync('text.txt','dest.txt')

// fs.copyFile('text.txt','newtext.txt', (err) =>{
//     if(err){
//         console.log("error while file is copied",err)
//     }
//     else{
//         console.log("file is copied successfully")
//     }
// })

// // fs.copyFileSync('urgent.txt','dest.txt')
// // console.log("file is copied")

// fs.unlink('dest.txt',(err)=>{
//     if(err){
//         console.log("error while deleting file",err,err)
//     }
//     else{
//         console.log("file is deleted")
//     }
// })

const fs = require('fs');
fs.mkdir('newDirectory' , (err) => {
    if(err){
        console.log("Directory is created");
    }
});
fs.mkdir("folders/folder1/folder2", {recursive: true}, (err) => {
    if(err){
        console.log(err);
        return;
    }
    console.log("directory is created");
})

// now directory is created 


// we want to remove that directory
fs.rmdir('newdirectory', (err) => {
    if(err){
        console.log(err);
        return;
    }
    console.log("directory is removed");
});

fs.rm("newDirectory", (err) => {
    if(err){
        console.log(err);
        return;
    }
    console.log("directory is removed");
});
