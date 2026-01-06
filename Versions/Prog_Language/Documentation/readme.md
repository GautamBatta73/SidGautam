# SidGautamScript Documentation

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
