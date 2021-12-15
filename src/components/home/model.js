const labelMap = {
    1:{name:'Ako', color:'blue'},
    2:{name:'Ano', color:'yellow'},
    3:{name:'Araw', color:'white'},
    4:{name:'Ayos lang', color:'red'},
    5:{name:'Baka', color:'blue'},
    6:{name:'Bukas', color:'yellow'},
    7:{name:'Gabi', color:'white'},
    8:{name:'Hapon', color:'red'},
    9:{name:'Hi', color:'blue'},
    10:{name:'Hindi', color:'yellow'},
    11:{name:'Hintay', color:'white'},
    12:{name:'Ikinagagalak', color:'red'},
    13:{name:'Kamusta', color:'blue'},
    14:{name:'Ka o Mo o Ikaw', color:'yellow'},
    15:{name:'Mabagal', color:'white'},
    16:{name:'Magandang', color:'red'},
    17:{name:'Magkita', color:'blue'},
    18:{name:'Mahal kita', color:'yellow'},
    19:{name:'Makilala', color:'white'},
    20:{name:'Mamaya', color:'red'},
    21:{name:'Ngayon', color:'blue'},
    22:{name:'Oo', color:'yellow'},
    23:{name:'Oras na', color:'white'},
    24:{name:'Paalam', color:'red'},
    25:{name:'Pakiulit', color:'blue'},
    26:{name:'Pakiusap', color:'yellow'},
    27:{name:'Pangalan', color:'white'},
    28:{name:'Paumanhin', color:'red'},
    29:{name:'Salamat', color:'blue'},
    30:{name:'Tayo', color:'yellow'},
    31:{name:'Umaga', color:'white'},
    32:{name:'Walang anuman', color:'red'},
  
}

//Tensorflowjs Library and react drawRect
export const drawRect = (boxes, classes, scores, threshold, imgWidth, imgHeight, ctx)=>{
    for(let i=0; i<=boxes.length; i++){
        if(boxes[i] && classes[i] && scores[i]>threshold){
         
            const [y,x,height,width] = boxes[i]
            const text = classes[i]
            
            
            ctx.strokeStyle = labelMap[text]['color']
            ctx.lineWidth = 5
            ctx.fillStyle = 'white'
            ctx.font = '30px Arial'         
            
            
            ctx.beginPath()
            ctx.fillText(labelMap[text]['name'] + ' - ' + Math.round(scores[i]*100)+'%', x*imgWidth, y*imgHeight-10)
            ctx.rect(x*imgWidth, y*imgHeight, width*imgWidth/2, height*imgHeight/1.5);
            ctx.stroke()
        }
    }
}