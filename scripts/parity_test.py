def even_or_odd(x,y):
    res = ""
    if x%2 == 1:
        res += "X is odd, "
    else:
        res += "X is even, "
    if y%2 == 1:
        res += "and Y is odd!"
    else:
        res += "and Y is even!"
    
    return res