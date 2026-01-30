# SidGautamScript FileUtils Library

## Properties
### File.currentDir
This property returns the current absolute directory where the script was compiled and/or ran.

```python
import "FileUtils";

print(File.currentDir); # Prints the current script's directory
```
```javascript
"D:\stuff\SidGautamScript\testFiles"
```

<br>

## Methods
### File.joinPath(pathList)
This method joins multiple paths together, and returns the joined path.

```python
import "FileUtils";

var randomFile = File.joinPath({File.currentDir, "./importables/imports.sidg"}); # Joins the absolute path of the script directory with a file path
print(randomFile); # Prints the joined path, relative to the current directory
```
```javascript
"D:\stuff\SidGautamScript\testFiles\importables\imports.sidg"
```

<br>

### File.getName(filePath)
This method returns the filename, and only the name, of the specified file.

```python
import "FileUtils";

var randomFile = "./modules/Math.sidg";
print(File.getName(randomFile)); # Prints the name of the file without the extension
```
```javascript
"math"
```

<br>

### File.getExt(filePath)
This method returns the extension, and only the extension, of the specified file.

```python
import "FileUtils";

var randomFile = "./modules/Math.sidg";
print(File.getExt(randomFile)); # Prints the extension of the file without the name
```
```javascript
".sidg"
```

<br>

### File.toAbsolute(path)
This method returns the absolute path of a specified path.

```python
import "FileUtils";

var randomFile = "../modules/Math.sidg"; # Declare and instantiate a relative file path from the script directory
print(File.toAbsolute(randomFile)); # Prints the absolute path of the file
```
```javascript
"D:\stuff\SidGautamScript\modules\Math.sidg"
```

<br>

### File.read(filePath)
This method reads the contents of a specified file, and returns it as a string.

```python
import "FileUtils";

var testFile = "./test.txt"; # This script and the test file share a directory

var fileContent = File.read(testFile); # Reads the content of the testFile

print(fileContent); # Prints the content of the test file
```
```javascript
"Hello World!"
```

<br>

### File.append(filePath, content)
This method appends the specified content to the end of the specified file, creating the file if it does not exist.

```python
import "FileUtils";

var testFile = "./test.txt"; # This script and the test file share a directory

File.append(testFile, "\nNew line added to the file."); # Appends a new line to the test file

var fileContent = File.read(testFile); # Reads the content of the test file

print(fileContent); # Prints the content of the test file
```
```javascript
"Hello World!"
"New line added to the file."
```

<br>

### File.write(filePath, content)
This method writes the specified content to the specified file, creating the file if it does not exist and overwriting any existing content. 

```python
import "FileUtils";

var testFile = "./test.txt"; # This script and the test file share a directory

File.write(testFile, "Imma overwrite this real quick."); # Overwrites the test file

var fileContent = File.read(testFile); # Reads the content of the test file

print(fileContent); # Prints the content of the test file
```
```javascript
"Imma overwrite this real quick."
```

<br>

### File.exists(filePath)
This method returns a boolean indicating if the passed file/directory exists. 

```python
import "FileUtils";

var newFile = "../test.txt"; # File that may or may not exist

unless (File.exists(newFile)) { # Unless this file doesn't exist, create it and write a string to it
    File.write(newFile, "Hello World");
}

print(File.read(newFile)); # Prints the contents of the file
```
```javascript
"Hello World"
```

<br>

### File.createDir(dirPath)
This method creates the specified directory if it does not already exist. 

```python
import "FileUtils";

var newDir = "../testDir/";

File.createDir(newDir); # Create a new directory

print(File.exists(newDir)); # Prints true if the directory exists
```
```javascript
true
```

<br>
You can even recurse directories:

```python
import "FileUtils";

var newDir = "../testDir/test/";

File.createDir(newDir); # Create the new directories

print(File.exists(newDir)); # Prints true if the directories exists
```
```javascript
true
```
