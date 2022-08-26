const fs = require('fs'); //allows us to write and read to file system

//! fs.unlink() //delete a file
//! fs.writeFile()//writes data to file

let fileName = 'sample.txt'

//! create file
fs.writeFile(fileName, 'I love node', (error) => { //arg1 = fileName, arg2=content, arg3= cb (error)
    if (error) {
        console.log(error.message)
    }
    console.log(`file saved at ${fileName}`)
})

//! delete file
fs.unlink(fileName, (err) => {
    if (err) throw err;
    console.log(`successfully deleted ${fileName}`);
});

//! read file
fs.readFile(fileName, (error, buffer) => { //buffer =
    if (error) {
        console.error(error.message);
        return;
    }
    console.log('File Data: ', buffer.toString());
});




