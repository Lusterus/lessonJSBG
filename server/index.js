import {writeFile, readFile} from 'fs/promises';
import express from 'express';
import cors from 'cors';



const URL ='./static/goods.json';
const URLBasket ='./static/goodsBasket.json';
const serverApp = express();


function getdate() {
        return readFile(URL,'utf-8').then((dat) => {
             return JSON.parse(dat);
             });
}
function getdateCatalog() {
    return readFile(URLBasket,'utf-8').then((dat) => {
         return JSON.parse(dat);
         });
}

serverApp.use(express.json());
serverApp.use(express.urlencoded({extended: true}));
serverApp.use(cors());

serverApp.get('/goodsBasket',(res,req) => {
    getdateCatalog().then(d => {
        req.send(JSON.stringify(d)); 
    })

})
serverApp.get('/goods',(res,req) => {
    Promise.all ([
        getdate(),
        getdateCatalog() 
    ]).then(([basket, catalog]) =>{
        console.log(basket);
        console.log(catalog);
        const result = basket.map((basketItem)=>{
            const catalogItemfilter =  catalog.find(({id_product}) => id_product === basketItem.id_product)
            return {
                ...basketItem,
                data: catalogItemfilter,
                total: catalogItemfilter.price * basketItem.count
            }
            
        })
        console.log(result);
    req.send(JSON.stringify(result));
    })
})

serverApp.post('/goods',(res,req) => {
    console.log(res.body);
    let fl = false;
    getdate().then(d => {
        let newObj = d.map((ddata) => {
            if (ddata.id_product === res.body.id) {
                fl = true;
                return {
                    ...ddata,
                    count: ddata.count + 1 
                }
            } 
            return ddata;
            
        })
        if (!fl) {
            newObj.push({
                id_product:res.body.id,
                count: 1
            }) 
        }
        console.log(newObj); 
        const dJson = JSON.stringify(newObj); 
        writeFile(URL, dJson).then(() => {
            req.send(dJson);
        })
    })
    
})

serverApp.listen('8000',() =>{
    console.log('server start')
})

