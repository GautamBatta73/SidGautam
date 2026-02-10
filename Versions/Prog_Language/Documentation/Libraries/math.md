# SidGautamScript Math Library

## Properties
### Math.PI
Do you really need all the infinite digits of pi?
I doubt it, so this var only returns 3.14159

```python
import "Math";

print(Math.PI); # Prints pi
```
```javascript
3.14159
```

<br>

## Methods
### Math.rnd(num, decPoints)
This method returns the value of num rounded to 'decPoints' decimal points.

<br>

```python
import "Math";

var num = 7.99998675; # Declare and instantiate num as a decimal number

print(Math.rnd(num)); # Prints num rounded to (default) 0 decimal points
```
```javascript
8
```

<br>

```python
import "Math";

var num = 7.9193189; # Declare and instantiate num as a decimal number

print(Math.rnd(num, 2)); # Prints num rounded to 2 decimal points
```
```javascript
7.92
```

<br>

### Math.pow(base, exp)
This method returns the value of base raised to the power of exp.
<br>
Math.pow(x, y) = x<sup> y</sup>

```python
import "Math";

print(Math.pow(7, 3)); # Prints (7 * 7 * 7)
```
```javascript
343
```

<br>

### Math.root(base, xroot)
This method returns the x root of a number.
<br>
Math.root(x, y) = x<sup> 1/y</sup>

```python
import "Math";

print("Square Root:", Math.root(9, 2)); # Prints a string, and the square root of 9

print("Cube Root:", Math.root(64, 3)); # Prints a string, and the cube root of 64
```
```javascript
"Square Root:" 3
"Cube Root:" 3.9999999999999996
```

<br>

### Math.random(min, max)
This method returns a pseudo-random decimal or integer number, depending on the parameters given.

<br>
If no parameters are given, it returns a decimal number between 0 and 1 (exclusive), rounded to the hundred-thousandths (eg -> 0.44532).

```python
import "Math";

print(Math.random()); # Generates a decimal number from 0 to 1 (exclusive)
```
```javascript
0.72092
```

<br>
If a single parameter is given, it returns an integer number between 1 and min (inclusive).

```python
import "Math";

print(Math.random(5)); # Generates integer number from 1 to 5 (inclusive)
```
```javascript
2
```

<br>
If both parameters are given, it returns an integer number between min and max (inclusive).

```python
import "Math";

print(Math.random(10, 20)); # Generates integer number from 10 to 20 (inclusive)
```
```javascript
19
```

<br>
