# lispio rewritten by me
import string, sys

inputter=None
inlin=""


#def putSexp(s):
# if type(s)==


def getSexp():
# print "i am "
 a=getToken()
# print a
 if a == "'":
#   print  "aaaaaaa"
   return ['quote',getSexp()]
 elif a !='(':
#   print a
   return a
 a=[]
 while 1:
  b=getSexp()
#  print b
  if b == ')':
    #print a
    return a
  a.append(b)
  print a


def getToken() :
  while nextChar() <=' ':
    getChar()
  a=getChar()
  if a in ['(',')',"'"] :
    return a
  while nextChar()>' ' and nextChar() not in ['(',')']:
    a=a+getChar()
  try:
#   print a
   return float(a)
  except:
   return a



def nextChar():
  global inlin,inputter
  #if not inputter:
   # inputter=InputString()
  if inlin=="":
    inlin=raw_input("Lisp>")+"\n"
    if inlin=="":
      raise "EOF error"
  return inlin[0:1]


def getChar():
  global inlin
  c=nextChar()
  inlin=inlin[1:]
  return c

def main():
 # a=getToken()
 # print a
 # global inlin
  #print inlin
  c=getSexp()
#  print c

if __name__=="__main__":
 main()
