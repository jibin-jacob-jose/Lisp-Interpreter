#!/usr/local/bin/python
#
#  u s e r I n p u t . p y
#
#  Copyright 2001 by Chris Meyers. 
#
#  General class to input string. Support of indirect files and ability to
#  comment input. 
#
import sys, string

class InputString :
    # class variable. used by all instances. Currently open @files
    filStack = []

    def __init__ (self, Echo=0) :
        # if true echo prompts and inputs from @files to screen
        self.echo = Echo
        return

    def get (self, prompt) :
        while 1 :
            # If inside an indirect file
            if self.filStack :
                # get next line out of file
                lin = self.filStack[-1].readline()
                # Oops. If at the end
                if lin == "" :
                    # close and pop file off the stack
                    self.filStack[-1].close()
                    self.filStack = self.filStack[0:-1] 
                    # go again to get user some input!
                    continue
                # Otherwise echo, if user wants that
                if self.echo : print prompt, lin,
            # No more indirect files. Go to user
            else :
                # User herself types the line in
                try   : lin = raw_input(prompt)+"\n"
                # quick end if user gives end of file
                except: return ""
            # A comment skip this. get real input!
            if lin[0] == '#' : continue
            # invoking indirect file?
            elif lin[0] == '@' :
                # open it for reading
                fil = open (lin[1:-1])
                # push it on the stack
                self.filStack.append(fil)
                # go get the user some input!
                continue
            # finally. Real input
            else : return lin

class InputWord (InputString) :
    def __init__ (self, Echo=0) :
        InputString.__init__ (self, Echo)
        self.words = []

    def get (self, prompt) :
        while 1 :
            if self.words :                    # leftovers from earlier read ?
                word = self.words[0]           # I'll return this one
                self.words = self.words[1:]    # clip 1st off the list
                return word                    # and return it
            lin = InputString.get(self,prompt) # go get a line from where ever
            if lin == "" : return ""           # end of file. thats a return
            self.words = string.split(lin)     # split up line into words

class InputNumber (InputWord) :
    def __init__ (self, Echo=0) :
        InputWord.__init__ (self, Echo)

    def get (self, prompt) :
        number = InputWord.get(self,prompt)
        if number == "" : return ""
        return string.atoi(number)
