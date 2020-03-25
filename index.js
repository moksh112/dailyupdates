const axios =require("axios");
const cheerio=require("cheerio");
const express = require('express');
const router = express.Router()
const bodyParser = require('body-parser')




router.use(bodyParser())
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

router.get('/', (req, res)=>{
    
axios.get('https://www.mohfw.gov.in/').then((res)=>{
    const $=cheerio.load(res.data)
    var list=$('tbody').eq(-1).html();
    var a= list.split("<tr>")
    const tdata=[]
    for(k=1;k<=a.length;k++){
    b=a[k].split("</td>")
    console.log(a)
    const r=[]
    for(i=0;i<b.length;i++){
        c=b[i].split(">")
      //  console.log(c)
       // console.log("*******************************")
        if(i!=b.length-1)
        r[i]=c[1]

    }
    console.log(r)
    console.log("*******************%%%%%%%%%%%******************************")
    if(r[0]!=String(k) )
        {break}
    tdata[k-1]=r;
}
console.log(tdata)
    //     $(list +' > tbody .tr').each((index,Element)=>{
//         console.log('*****************************************')
//         console.log(Element)
//     })
//  // console.log(list)

res.send(tdata)
 
})

}).catch(err=>console.log(err))

module.exports = router