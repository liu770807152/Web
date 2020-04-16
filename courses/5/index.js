//1. var和let的區別，以後只用let和const
var a = 0; 
if(true){ 
    a = 1; 
    function a(){} a = 21; 
    console.log("里面",a); 
}
console.log("外部",a); 

let b = 0; 
if(true){ 
    b = 1; 
    function b(){} b = 21; 
    console.log("里面",b); 
}
console.log("外部",b);

let c = 0; 
if(true){ 
    c = 1; 
    function b(){} c = 21; 
    console.log("里面",c); 
}
console.log("外部",c);


//2.