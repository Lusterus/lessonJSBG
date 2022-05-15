import {writeFile, readFile} from 'fs/promises';
import express, { json } from 'express';
import cors from 'cors';

const URL ='./static/date.json';
const serverApp = express();


function getdate() {
    return readFile(URL,'utf-8').then(dat => {
        json.parse(dat);
    });
}
serverApp.use(express.json());
serverApp.use(express.urlencoded({extended: true}));
serverApp.use(cors());

serverApp.get('/',(res,req) => {
    getdate().then(d => {
        console.log(d)
    req.send(d);
    })
})

serverApp.listen('8000',() =>{
    console.log('server start')
})