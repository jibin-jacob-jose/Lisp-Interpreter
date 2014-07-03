// lisp in javascript

inlin=" (car '(a b))"

function getSexp(){
 var a=getToken();
 if (a=="'"){
//    console.log("aaa");
    return ["quote",getSexp()]
 }
 else if(a!="("){
  //  console.log(a)
    return a;
 }
 a=[]
 while(1){
  b=getSexp()
 // console.log(b);
  if(b==")"){
    return a;
  }
  a.push(b)
  console.log(a);
 } 
}

i=0
function getToken(){
 // i=i+1
 // console.log("iam in gettoken",i);
  while ( nextChar() ==" "){
    getChar();
  }
  a=getChar()
//  if(a==")")
  //  {console.log("probel");}
//  console.log("gets=",a) 
  if(a=="(")
  //  console.log("aaa");
    return a
//  console.log("ddd",nextChar())
  while(nextChar()!=" " &&  nextChar()!="(" & nextChar()!=")" && nextChar()!=""){
//    console.log("aaa",a)
    a=a+getChar()
//   console.log("bbb",a);
  }
  if(isNaN(a)){
   // console.log("in isnan",a);
    return a
  }
  else{
   // console.log("getting=",a);
  //  console.log("1=",typeof(a));
    b=parseFloat(a);
    //console.log("2",typeof(b));    
   // console.log(b);
    return a
 }
}
  

  
function nextChar(){
 // i=i+1
//  console.log("i am in nextchar",i);
//  if(inlin==""){
 // inlin=" (12 b ";
//  console.log(i)
//  }
 // console.log("in next=",inlin.slice(0,1));
  return inlin.slice(0,1);
}

function getChar(){
 // i=i+1
 // console.log("i am in getchar",i);
  c=nextChar()
  inlin=inlin.slice(1,inlin.length)
//  console.log("c=",c,"inlin=",inlin);
  return c
}
var j=0
while(inlin!=""){

//console.log("in main=",inlin)
//var a=getToken();
var c=getSexp();
console.log(c)
j=j+1;
}

