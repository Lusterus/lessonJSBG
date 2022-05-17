import {writeFile, readFile} from 'fs/promises';
import express from 'express';
import cors from 'cors';



const URL ='./static/goods.json';
const serverApp = express();


function getdate() {
        return readFile(URL,'utf-8').then((dat) => {
             return JSON.parse(dat);
             });
}

serverApp.use(express.json());
serverApp.use(express.urlencoded({extended: true}));
serverApp.use(cors());

serverApp.get('/goods',(res,req) => {
    getdate().then(d => {
        req.send(JSON.stringify(d)); 
    })

})


serverApp.listen('8000',() =>{
    console.log('server start')
})

