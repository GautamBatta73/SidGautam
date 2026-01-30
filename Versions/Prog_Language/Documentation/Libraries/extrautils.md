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

<br>

### exec(command, args)
This function executes the command with the list of arguments in the shell terminal, and then returns the result.
<br>
Note: It runs commands based on your current directory, NOT THE SCRIPT'S DIRECTORY.

<br>

```python
import "ExtraUtils";

var echoed = exec("echo", {"Hello World!"}); # Executes ' echo "Hello World!" ' in a terminal and returns the result

print("Echoed Output: " + echoed); # Prints the result
```
```javascript
"Echoed Output: Hello World!"
```

<br>

```python
import "ExtraUtils";

var cmd = exec("dir", {"/B"}); # Executes "dir /B" in a terminal and returns the result

print("Directory listing:");
print(cmd); # Prints the result
```
```javascript
"Directory listing:"
imports.sidg
imports.sidgc
test1.sidg
test1.sidgc
test2.sidg
test2.sidgc
```

<br>
You can only execute the commands from the user's OS, i.e. "ls" doesn't work on Windows:

```python
import "ExtraUtils";

var cmd = exec("ls", {"-lh"}); # Tries to execute ls, but I am currently on Windows

print("Directory listing:");
print(cmd); # Will not print as error was thrown
```
```javascript
Error: 'ls' is not recognized as an internal or external command,
operable program or batch file.
, at line: 16 and column: 12
```

<br>

### getOS()
This function returns the current Operating System type of the user.
<br>
If on Windows: "Windows"
If on Linux: "Linux"

<br>

```python
import "ExtraUtils";

print(getOS()); # Prints the operating system name
```
```javascript
"Windows"
```
