# SidGautamScript Documentation

## DataTypes
A datatype is the kind of data that a variable stores. It also tells the program how to interpret a value, so that it knows the operations allowed, such as arithmetic on numbers versus concatenation on text.
<br>
Understanding datatypes is important in any programming language. 

[How To Get a Variable's Datatype](https://github.com/GautamBatta73/SidGautam/edit/main/Versions/Prog_Language/Documentation/readme.md#datatypearg)
<br>

### StringLiterals

### NumberLiterals

### ListLiterals

### ObjectLiterals

### Booleans

### FunctionObjects

### NULL

<br>

## Statements
### import \<module\>
Imports the functions and variables of compiled files into the current script.

<br>
The following snippet imports the Math library, packaged with the files.

```python
import "Math";
```
  
<br>
The following snippet imports a compiled sidgc file from the same directory as the current script.

```python
import "./functions";
```

<br>

[More Info on Built-in Libraries](https://github.com/GautamBatta73/SidGautam/tree/main/Versions/Prog_Language/Documentation/Libraries)

<br>

### until (\<initialization\>, \<condition\>, \<afterthought\>)
An until loop repeats until a specified condition evaluates to false. It is similar to the JavaScript for loop.

<br>
Example 1:

```python
until (var i = 0, i < 5, i = i + 1) { # Declares i as 0, declares ending condition as when i < 5, then increments i by 1 every pass
  print(i); # Prints i after each iteration.
}
```
```javascript
0
1
2
3
4
```
  
<br>
Example 2:

```python
var list  = {1, 2, 3, 4, 5}; # Declare and instantiate list
var x = NULL; # Declare x

until (x = 0, x < len(list), x = x + 1) { # Instantiates x and sets it to 0, declares ending condition as when x < length of list, then increments x by 1 every pass
  print(list[x]); # Prints the element of list at index x after each iteration.
}

print("Final:", x); # Prints the final value of x
}
```
```javascript
1
2
3
4
5
"Final:" 5
```

<br>

### though (\<condition\>)
A though statement executes its statements as long as a specified condition evaluates to false.

<br>
Example 1:

```python
var n = 0; # Declare and instantiate n to 0
var x = 0; # Declare and instantiate x to 0

though (n >= 3) { # Sets the ending condition to be if n IS more than or equal to 3
  n = n + 1; # Increments n by 1
  x = x + n; # Increments x by n
}

print(n); # Prints final value of n
print(x); # Prints final value of x
```
```javascript
3
6
```
  
<br>
Example 2:

```python
though (false) { # Sets the ending condition to false. i.e. It will never end
  print("INFINITE POWER!"); # Prints "INFINITE POWER!" until your terminal times out
}
```
```javascript
"INFINITE POWER!"
"INFINITE POWER!"
"INFINITE POWER!"
"INFINITE POWER!"
"INFINITE POWER!"
"INFINITE POWER!"
...
```

<br>

### unless (\<condition\>) orElse
The unless...orElse statement executes a statement if a specified condition is false. If the condition is false, another statement in the optional orElse clause will be executed.

<br>
Example 1:

```python
var b = true; # Declare and instantiate b to true

unless (b == false) { # Sets the starting condition to 'unless b is false, don't the following.'
  print("This is true"); # Since b is the literal opposite of false, this should print
}
```
```javascript
"This is true"
```
  
<br>
Example 2:

```python
var x = 10; # Declare and instantiate x to 10

unless (x > 11) { # Sets the starting condition to 'unless x is more than 11, don't the following.'
  print("x is less than 11"); # Since x is not more than 11, this should print
} orElse {
  print("x is more than or equal to 11"); # If x was more than or equal to 11, this would print
}
```
```javascript
"x is less than 11"
```

<br>

### var \<name\> = \<expression>
The var declaration declares re-assignable, block-scoped local variables, initializing each to a value of a datatype.

<br>
Example 1:

```python
var x = NULL; # Declare and instantiate x to NULL

print(x); # Prints the value of x
```
```javascript
null
```
  
<br>
Example 2:

```python
var string = "hello " + "world"; # Declare and instantiate string to "hello world"

print(string); # Prints the value of string
```
```javascript
"hello world"
```

<br>

### final \<name\> = \<expression>
The final declaration declares block-scoped constant local variables. The value of a constant can't be reassigned, and even if a constant is an object or list, its properties/elements can't be added, updated, or removed. If you try, an error will be thrown on compile and/or execution.

<br>
Example 1:

```python
final x = NULL; # Declare and instantiate x to NULL

print(x); # Prints the value of x
```
```javascript
null
```
  
<br>
Example 2:

```python
final string = "hello " + "world"; # Declare and instantiate string to "hello world"

string = "Hello World"; # Try to change it, but an error is thrown during compilation

print(string); # Tries to print the value of string
```
```javascript
Error: string is a constant.
Do not reassign, at line: 2 and column: 2
```

<br>

### func \<name\>(\<parameters\>)
Functions are a fundamental building block in any programming language. A function is essentially a set of statements that performs a task or calculates a value, and it should take some input and return an output.
<br>
To use a function, you must define it somewhere in the scope from which you wish to call it. Either with the full syntax or as a lambda expression.

<br>
Example 1 (Full Syntax):

```python
func printNum(number) { # Defines a function that takes in one parameter
  print(number); # Prints said parameter
}

printNum(69); # Calls the function with a passed parameter
```
```javascript
69
```
  
<br>
Example 2 (Lambda Syntax):

```python
var printNum = (number) -> print(number); # Defines a function that takes in one parameter, which prints said parameter

printNum(69); # Calls the function with a passed parameter
```
```javascript
69
```

<br>
Example 3 (Full Syntax):

```python
var x = 8; # Declare and instantiate x to 8

func incrementX() { # Defines a function called incrementX
  x = x + 1; # increments the x variable
}

incrementX(); # Executes the code in the function
incrementX(); # Executes the code in the function, again

print(x); # Prints the value of x
```
```javascript
10
```
  
<br>
Example 4 (Lambda Syntax):

```python
var x = 8; # Declare and instantiate x to 8

final incrementX = () -> { # Defines a lambda function called incrementX
  x = x + 1; # increments the x variable
};

incrementX(); # Executes the code in the function
incrementX(); # Executes the code in the function, again

print(x); # Prints the value of x
```
```javascript
10
```

<br>

### pass \<expression\>
The pass statement ends function execution and specifies a value to be returned to the function caller.

<br>
Example 1:

```python
func getRectArea(width, height) { # Defines a function that takes 2 parameters, which are assumed to be numbers
  unless (!(width > 0 && height > 0)) { # Checks if the parameters are more than 0
    pass width * height; # Passes the product of the parameter back to the caller, then ends the call
  }
  pass 0; # Passes 0 back to the caller, given the function call has not ended by now
}

print(getRectArea(3, 4)); # Calls the function with parameters more than 0
print(getRectArea(-3, 4)); # Calls the function with parameters less than 0
```
```javascript
12
0
```
  
<br>
Example 2 (Returning a function):

```python
func magic() { # Defines a function that takes no parameters
  pass ((x) -> x * 2); # Passes a lambda function, which takes a parameter assumed to be a number, back to the caller
}

var answer = magic(); # Calls the function that returns a function, and gets passed the inner function, which is stored in a variable

print(answer(15)); # Calls the variable function with a parameter
```
```javascript
30
```

<br>

## Native Variables and Functions
### dataType(\<arg\>)
Returns a string indicating the type of the arg's value. 
<br>
This is the best way to check for NULL.

[More Info on Datatypes](https://github.com/GautamBatta73/SidGautam/edit/main/Versions/Prog_Language/Documentation/readme.md#datatypes)

<br>
Example 1:

```python
var add = (x, y) -> {
  unless (dataType(x) == "null" || dataType(y) == "null") {
    pass x + y;
  } orElse {
    pass 0;
  }
};

print(add());
print(add(7));
```
```javascript
0
0
```

Since the compiler and executor are in JS, both say that x and/or y are *undefined*, but such a thing does not exist in SidGautamScript.
Checking for NULL, checks for any falsy values that are not numbers, strings, objects, booleans, or lists.
  
<br>
Example 2:

```python
func someFunction() {
  pass -1;
}

print(someFunction)
```
```javascript
"Function"
```

You can use functions are normal variables, without calling them, if you omit the brackets.
