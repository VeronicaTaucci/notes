# leave notes command + /


# ------------------data types-------------
# !string
# "any text here"
# !Integer
# a whole number (0, 42, 8675309)
# ! Float
# a number with a decimal point (3.14159, 6.626068, 1.21)
# ! Boolean
# True or False
# ! List
# a sequence of values ([1, 2, 3, 4], ["milk", "butter", "eggs"])
# ! Dictionary
# a sequence of labeled values ({ "name": "Galahad", "quest": "Seek the Grail", "favorite_color": "Blue"})

# ! literal
# Developers use the term "literal" to refer to a value that is not in a variable. For example, "Hello World" is a String literal, and 42 is a Number literal.

# !Concatenation
# #is the process of merging two strings into a single object which is done by using the “+” operator.

# ! escape characters:
# \b	backspace
# \t	horizontal tab
# \v	vertical tab
# \n	newline

# ! Operators
# "+"	Addition
# "-"	Subtraction
# "*"	Multiplication
# "/"	   Division
# "//"  division    w/o    decimal
# "%" modulus/remainder
# "**"  exponentiation

# ! Expressions
# syntax that return a value

# ! String Formatting!!!!!!!!!!!!
# * By argument:
# "Hello {} {}".format(first_name, last_name)
# * By index
# "Hello {0} {1}, again {0}".format(first_name, last_name)
# * By keyword
# "Hello {first} {last}, again {first}".format(first=first_name, last=last_name)
# * f string
# f'some string {variable}'
# * older way:
# name = "Eric"
# age = 74
# "Hello, %s. You are %s." % (name, age)
# 'Hello Eric. You are 74.'

# ! Built in functions---------

# !type()
# method returns class type of the argument(object) passed as parameter.
# !isinstance()
# function returns True if the specified object is of the specified type, otherwise False.
# ! print()
# causes output to appear on your terminal screen.
# ! input()
# waits for the user to type some input and press return. It then gets whatever was typed.
# ! int()
# Converts a string to a number

# ! conditions-------------------

# * sintax for if, elif, els:
# if condition :
# write statement here
# elif condition 2:
# write statement here
# else:
# write statement here

# x = 5         --> sets variable  x  to  5
# x += 3     --> increment    x    by  3
# x -= 2   --> decrement    x    by    2
# x *= 5  -->   x = x * 5
# x /= 5  -->   x = x / 5
# x %= 5  -->   x = x % 5 returns the remainder when the first operand is divided by the second
# x //= 5  -->   x = x // 5  divides the first operand by the second
# x **= 5  -->   x = x ** 5 Returns first raised to power second
# x &= 5  -->   x = x & 5 Sets each bit to 1 if both bits are 1
# x |= 5  -->   x = x | 5 Sets each bit to 1 if one of two bits is 1
# x ^= 5  -->   x = x ^ 5 Sets each bit to 1 if only one of two bits is 1
# x >>= 5  -->   x = x >> 5 hift right by pushing copies of the leftmost bit in from the left, and let the rightmost bits fall off
# x <<= 5  --> Shift left by pushing zeros in from the right and let the leftmost bits fall off

# ! Sequence?
# In Python, a sequence is a data type that can store multiple, individual values

# ! List-----------
# A list is the idea of multiple values but all contained in one named variable x=["a","b","c"]
# ! add items to a list:
# .append() add individual items, modifies the list
# You can concatenate two lists together (" "+ " "). Concatenation produces a new List.
# You can .extend() a list using elements from another list, modifies the list

# ! len()
# Get the number of elements in a sequence.
# ! del variable[]
# delets an item

# ! List Slicing
# variable[0:2] --> slice from 0 to 2 not including 2, return new list

# ! list.insert(3, item)
# - inserts item at specified location
# ! list.pop()
# - removes an item from the end of the list
# ! list.index(item)
# - returns the index of the item in the list
# ! list.sort()
# - sorts the list, sorts the original list
# ! list.copy()
# - returns a new copy of the list
# ! list.clear()
# - removes all items from the list


# !Matrix
# matrix = [[1,2,3],
#           [4,5,6],
#           [7,8,9],
#           [9,10,11]
#         ]
# access matrix:
# print(matrix[0]) -- [1, 2, 3]
# print(matrix[1][1]) -- 5

# text = "hello"
# index = 0
# while len(text) > index:
#     index -= 1
#     print(text[index])

# ! ----range---
