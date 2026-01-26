# SidGautamScript ExtraUtils Library

## Methods
### prompt()
This function allows a user to input a string into the program. The inputted string is returned.

```python
import "ExtraUtils";

print("Enter your name:"); # Prompt the user for input

var name = prompt(); # Call the prompt function to get user input

print("\nHello, " + name + "!"); # Greet the user with their inputted name
```
```javascript
"Enter your name:"
> Gautam

"Hello, Gautam!"
```

<br>
If the user inputs nothing and just presses enter, an empty string is returned.

```javascript
"Enter your name:"
> 

"Hello, !"
```

<br>
If the user inturrupts the prompt (SIGINT) by pressing Ctrl + C, or any other way, NULL is returned.

```javascript
"Enter your name:"
> ^C

"Hello, null!"
```

<br>

### wait(seconds)
This function pauses the execution of the script for the specified number of seconds.

```python
import "ExtraUtils";

print("Hello"); # Prints "Hello"

wait(2); # Waits for 2 seconds

print("World"); # Prints "World"
```
```javascript
"Hello"
"World"
```