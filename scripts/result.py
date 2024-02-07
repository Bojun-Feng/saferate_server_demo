import sys
from parity_test import even_or_odd

if sys.argv[1][-1].isdigit() and sys.argv[2][-1].isdigit():
    res = even_or_odd(int(sys.argv[1][-1]), int(sys.argv[2][-1]))
    print(res, end ="")
else:
    print("Error: Input not positive integer", end ="")