# What do the things do?

## 1. goto(Function)
It simply calls whatever function you put in the parameters.

**SidGautam: goto(click())**

**JavaScript: click()**

## 2. though(bool, Function)
It executes the code in 'Fuction', while 'bool' is false. It is a whileNot.

**SidGautam: though(false, click())**

**JavaScript: while(true) {click()}**

## 3. doThough(Function, bool)
It executes the code in 'Fuction' once, then continues while 'bool' is false. It is a do{...}whileNot.

**SidGautam: doThough(click(), false)**

**JavaScript: do {click()} while(true)**

## 4. until(start, end, increment, Function)
It executes the code in 'Fuction', until 'start' becomes 'end', by incrementing 'start' by 'increment'. It is a basically a for.

**SidGautam: until(0, 5, 1, click())**

**JavaScript: for(let i = 0; i < 5; i += 1) {click()}**
