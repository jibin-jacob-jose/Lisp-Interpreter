
/*----------------------------------------------------------------------
LISP Interpreter in javaScript by jacob
Based on lisp interpreter in python found in 'python for fun.com'



inlin specifies the input lisp code
-----------------------------------------------------------------------*/

//inlin=[" (+ (+ 6 44) 50)","(+ 2 4)","( + 11 9)"]
//inlin=["( def a 6)","alist","a"]
//inlin=["(def sq (lamda (x) (+ x x)))","( sq 30)"]
inlin=["(eq 1 1)"]
//inlin=["(car '(a b c))"]
//inlin=["(cdr '(a b c))"]
//inlin=["(cons 'a '(b c))"]
//inlin=["(cond ((eq 1 22)(+ 2 3 ))(t 3333))"]


function putSexp(s){
 if ( typeof(s) == typeof([])){
   var j=s.map(putSexp)
   return "("+String(j) +")"
 }
else
 return String(s)
}


function getSexp(i){
 var a=getToken(i);
 if (a=="'"){
   return ["quote",getSexp(i)]
 }
 else if(a!="("){
    return a;
 }
 a=[]
 while(1){
  b=getSexp(i)
  if(b==")"){
    return a;
  }
  a.push(b)
 } 
}


function getToken(i){
  while ( nextChar(i) ==" "){
    getChar(i);
  }
  a=getChar(i)
  if(a=="(")
    return a
  if(a=="'")
    return a
  while(nextChar(i)!=" " &&  nextChar(i)!="(" & nextChar(i)!=")" && nextChar(i)!=""){
    a=a+getChar(i)
 }
  if(isNaN(a)){
    return a
  }
  else{
    b=parseFloat(a);
    return a
  }
}

  
function nextChar(i){
  return inlin[i].slice(0,1);
}

function getChar(i){
  c=nextChar(i)
  inlin[i]=inlin[i].slice(1,inlin[i].length)
  return c
}


var Alist=[]


function isSymboll(x){ 
 return typeof(x) == typeof(" ")
}


function isNumber(x){
 if(isNaN(x))
   return false
 else
   return true
}


function pairlis(x,y,alist){
  if(x==false)
    return alist;
  else{
    return [[x[0],y[0]]].concat(pairlis(x.slice(1,x.length),y.slice(1,y.length),alist))
  }
}


function assoc(x,alist){
  if(alist==false)
    console.log("error in assoc")
  else if ( alist[0][0] ==x)
    return alist[0][1];
  else
    return assoc(x,alist.slice(1,alist.length))
}


function apply(fn,args,alist){
 //console.log("fn=",fn,"args=",args,"alist=",alist)
 if (isSymboll(fn)){
  if (fn=="atom")
    return [[],"t"][typeof(args[0]) != typeof([])]
  else if (fn=="car")
    return args[0][0]
  else if(fn=="cdr")
    return args[0].slice(1,args[0].length)
  else if(fn == "+"){
    r=Number(args[0])+Number(args[1]);
    return  r
  }
  else if(fn == "*")
    return Number.args[0]*Number.args[1];
  else if(fn == "eq"){   
    if(args[0]==args[1])
      return true
    else
      return false
  }  
  else if(fn =="not")
    return [[],"t"[args[0] ==[]]]
  else if(fn == "cons"){
    if (typeof(args[1])!=typeof([]))
       args[1]=[args[1]]
    return [args[0]].concat(args[1])
  }
  else
    return (apply(eval(fn,alist),args,alist))
 }
 else if(fn[0]=="lamda")
    return eval(fn[2],pairlis(fn[1],args,alist))
 else
   console.log("error in apply")
}


function eval(exp,alist){
  if( exp=="t")
    return "t";
  else if(exp=="nil")
    return []
  else if(exp=="alist")
    return Alist;
  else if( isNumber(exp))
    return exp;
  else if(isSymboll(exp))
    return assoc(exp,alist)
  else{
    if(exp[0] == "quote")
      return exp[1]
    else if(exp[0]=="def"){
      var alsit=Alist=pairlis([exp[1]],[exp[2]],alist)
      return exp[1]
    }
    else if(exp[0]=="cond")
      return evcon(exp.slice(1,exp.length),alist)
    else{
      x=evlis(exp.slice(1,exp.length),alist)
      return apply(exp[0],x,alist)
    }
  }
}


function evcon(c,alist){
  if(c.length==0)
    return []
  else if (eval(c[0][0],alist))
    return eval(c[0][1],alist)
  else
    return evcon(c.slice(1,c.length,alist))
 }


function evlis(l,alist){
  if (l==false)
    return []
  else{
    p=[eval(l[0],alist)]
    q=evlis(l.slice(1,l.length),alist)
    return [eval(l[0],alist)].concat(evlis(l.slice(1,l.length),alist))
  } 
}


function my_main(){
  for(i=0;i<inlin.length;i++){
    s=getSexp(i)
    d=eval(s,Alist)
    f=putSexp(d)
    console.log("Lisp input as list=",s)
    console.log("After execution :",f)
   }
}


my_main()
