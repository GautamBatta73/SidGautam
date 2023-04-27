# Documentation

## First Things First, You Will Need To Import The Script: Add This to The Bottom of Your Body Element, Before Any Other Scripts: 
_<script src="ht<span>tps://raw.githack.</span>com/GautamBatta73/SidGautam/main/Versions/JavaScript(ProtoType)/SidGaut_[Version].js"></script>_

## 1. Label class and labelInst.createLabel(Function)
Instanciate a Label object to create a label (See [goto(LabelInstance)](https://github.com/GautamBatta73/SidGautam/tree/main/Versions/JavaScript(ProtoType)#2-gotolabelinstance) for use). Then create a label with 'labelInst'.createLabel(Function).

**SidGautam: let 'labelInst' = new Label()<br>**
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**'labelInst'.createLabel(click())**

**JavaScript: _N/A_**

## 2. goto(LabelInstance)
It calls the block of code that was created using createLabel, with an instance of Label as the parameter.

**SidGautam: 'labelInst'.createLabel(click())<br>**
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**goto('labelInst')**

**JavaScript: _N/A_**

## 3. though(bool, Function)
It executes the code in 'Fuction', while 'bool' is false. It is a whileNot.

**SidGautam: though(false, click())**

**JavaScript: while(true) {click()}**

## 4. doThough(Function, bool)
It executes the code in 'Fuction' once, then continues while 'bool' is false. It is a do{...}whileNot.

**SidGautam: doThough(click(), false)**

**JavaScript: do {click()} while(true)**

## 5. until(start, end, increment, Function)
It executes the code in 'Fuction', until 'start' becomes 'end', by incrementing 'start' by 'increment'. It is a basically a for.

**SidGautam: until(0, 5, 1, click())**

**JavaScript: for(let i = 0; i < 5; i += 1) {click()}**
