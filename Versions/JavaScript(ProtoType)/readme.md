# Documentation

## First Things First, You Will Need To Import The Script: Add This to The Bottom of Your Body Element, Before Any Other Scripts: 
_<script src="ht<span>tps://raw.githack.</span>com/GautamBatta73/SidGautam/main/Versions/JavaScript(ProtoType)/SidGaut_[Version].js"></script>_
### OR
_<script src="ht<span>tps://raw.githack.</span>com/GautamBatta73/SidGautam/main/Versions/JavaScript(ProtoType)/Minfied/SidGaut_[Version].min.js"></script>_

<br>

## 1. Label class and labelInst.createLabel(Function)
Instanciate a Label object to create a label (See [goto(LabelInstance)](https://github.com/GautamBatta73/SidGautam/tree/main/Versions/JavaScript(ProtoType)#3-gotolabelinstance) for use). Then create a label with 'labelInst'.createLabel(Function).

**SidGautam: let 'labelInst' = new Label()<br>**
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**'labelInst'.createLabel(click())**

**JavaScript: _N/A_**

## 2. Label class and labelInst.createLabel(Function) **_Combined_**
Instanciate a Label object and create a label (See [goto(LabelInstance)](https://github.com/GautamBatta73/SidGautam/tree/main/Versions/JavaScript(ProtoType)#3-gotolabelinstance) for use) in one line, using the Label class' constructor.

**SidGautam: let 'labelInst' = new Label(click())**

**JavaScript: _N/A_**

## 3. goto(LabelInstance)
It calls the block of code that was created using createLabel(Function), with an instance of Label as the parameter.

**SidGautam: 'labelInst'.createLabel(click())<br>**
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**goto('labelInst')**

**JavaScript: _N/A_**

## 4. though(bool, Function)
It executes the code in 'Fuction', while 'bool' is false. It is a whileNot. **It must return a boolean, else it will crash your web page.**

**SidGautam: though(false, () => {<br>**
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**click()**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**return true**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**})**

**JavaScript: while(x) {<br>**
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**click()**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**x = false**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**}**

## 5. doThough(Function, bool)
It executes the code in 'Fuction' once, then continues while 'bool' is false. It is a do{...}whileNot. **It must return a boolean, else it will crash your web page.**

**SidGautam: doThough(() => {<br>**
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**click()**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**return true**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**}, false)**

**JavaScript: do {<br>**
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**click()**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**x = false**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**} while(x)**

## 6. until(start, end, increment, Function)
It executes the code in 'Fuction', until 'start' becomes 'end', by incrementing 'start' by 'increment'. It is a basically a for.

**SidGautam: until(0, 5, 1, click())**

**JavaScript: for(let i = 0; i < 5; i += 1) {click()}**

## 7. doUntil(start, end, increment)
It executes the code in 'Fuction' once, then continues until 'start' becomes 'end', by incrementing 'start' by 'increment'. It is a basically a do{...}while, but a do{...}for.

**SidGautam: until(click(), 0, 5, 1)**

**JavaScript: let i = 0 <br>**
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**do {**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**click()**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**i += 1**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**} while(i < 5)**

## 8. repeat(number, Function)
It executes the code in 'Fuction' a certain amount of times (determined by 'number'). It is like a for.

**SidGautam: repeat(10, click())**

**JavaScript: for(let i = 0; i < 10; i += 1) {click()}**

## 9. showln(x)
It prints the value of 'x', regardless of what it is, to the web-page in an existing \<p>. Then it creates a new \<p> to write to. If no parameter is put (showln()), it will add a line-break (\<br>). It works like System.out.println(x) in Java.

**SidGautam: showln("Hello World!")**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**showln()**

**JavaScript: _N/A_**
  
## 10. show(x)
It appends the value of 'x', regardless of what it is, to the web-page in an existing \<p>. It works like System.out.print(x) in Java.

**SidGautam: show("Hello ")**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**show("World!")**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**showln()**

**JavaScript: _N/A_**

## 11. showErr(x)
Same as [showln(x)](https://github.com/GautamBatta73/SidGautam/edit/main/Versions/JavaScript(ProtoType)#9-showlnx), except the printed \<p> is red. **You must have a value in 'x'!**

**SidGautam: showErr("Error!")**

**JavaScript: _N/A_**

## 12. print(x)
Prints value of 'x' in the console. It is console.log(x).

**SidGautam: print("Hello World!")**

**JavaScript: console.log("Hello World!")**

## 13. printErr(x)
Prints value of 'x' in the console, as an error. It is console.error(x).

**SidGautam: printErr("Error!")**

**JavaScript: console.error(Error!")**

## 15. getEl(element, index)
This function allows for the manipulation of the styles of 'element'. 'element' is a string containg the name of a HTML element; 'index' (starts from 0) is an optional parameter if there are multiple of the same element, and a specific one is to be selected. If there are multiple of the same element, and no index is put, it will select all the same elements. It is like document.querySelector(element) and document.querySelectorAll(element).

**SidGautam: getEL("p") (All \<p> elements)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**getEL("p", 0) (The first \<p> element)**

**JavaScript: document.querySelectorAll("p") (All \<p> elements)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**document.querySelector("p") (The first \<p> element)**

## 15. element.css(property, value)
'element' is a selected element. This function allows for the manipulation of the styles of 'element'. 'property' is the name of the CSS property; 'value' is the value of the CSS property.

**SidGautam: getEL("p", 0).css("color", "black")**

**JavaScript: document.querySelector("p").style.color = "black"**
