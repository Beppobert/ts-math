# ts-math

Typelevel math library for TypeScript. This project is a work in progress and it's seperated in three parts:

- uint
- int
- float (wip)

The basic idea is to precalculate the digit operations for add, subtract and multiply with their borrows and carry and store them in a map. This way we can do typelevel math operations on numbers up to 1000(actually I tested it with just 500+ digits...) digits long.

There are detailed comments in the [code](https://github.com/Beppobert/ts-math/src/uint.ts).

## uint

Unsigned integer type.
Notes:

- Division is always floored.
- The root is an approximation. it can vary by a large number. It depends on the seed.

```typescript
// Import the UInt type from the "uint" module
import { UInt } from "./uint";

// Define some type aliases using the UInt type
type Ten = UInt.Parse<"10">;
type Five = UInt.Parse<"5">;
type Zero = UInt.Parse<"0">;

// Perform various operations using the UInt type
type IsZero = UInt.IsZero<Zero>; // true

type Even = UInt.Print<UInt.IsEven<Ten>>; // true
type Odd = UInt.Print<UInt.IsOdd<Ten>>; // false

type Add = UInt.Print<UInt.Add<Ten, Five>>; // "15"
type Multiply = UInt.Print<UInt.Multiply<Ten, Five>>; // "50"
type Subtract = UInt.Print<UInt.Subtract<Ten, Five>>; // "5"
type Divide = UInt.Print<UInt.Divide<Ten, Five>>; // "2"
type Modulo = UInt.Print<UInt.Modulo<Ten, Five>>; // "0"
type Power = UInt.Print<UInt.Power<Ten, Five>>; // "100000"
type Fac = UInt.Print<UInt.Factorial<Ten>>; // "3628800"

type Compare = UInt.Compare<Ten, Five>; // "GREATER_THAN"
type GT = UInt.GT<Ten, Five>; // "true"
type LT = UInt.LT<Ten, Five>; // "false"
type EQ = UInt.EQ<Ten, Five>; // "false"
type GTE = UInt.GTE<Ten, Five>; // "true"
type LTE = UInt.LTE<Ten, Five>; // "false"

type Increment = UInt.Print<UInt.Increment<Ten>>; // "11"
type Decrement = UInt.Print<UInt.Decrement<Ten>>; // "9"

type Sum = UInt.Print<UInt.Sum<[Ten, Five]>>; // "15"
type Product = UInt.Print<UInt.Product<[Ten, Five]>>; // "50"

type Min = UInt.Print<UInt.Min<[Ten, Five], UInt.Power<Ten, Five>>>; // "5"
type Max = UInt.Print<UInt.Max<[Ten, Five]>>; // "10"

type SquareRoot = UInt.Print<UInt.SquareRoot<Ten>>; // "3"
```

## int

Signed integer type. It supports all the operations that the uint type supports but it also supports negative numbers.

## float(wip)

Floating point type. It supports all the operations that the uint type supports but it also supports decimal numbers. With a precision of 4 decimal places.
If you fork this repositiory you can change the precision by changing the `PRECISION` constant in the `float.ts` file. It was configurable before but I removed it because it had huge performance implications. I'm currently investigation a performant way easy to handle type-wise.

## Thoughts:

### Adding better floats:

- Each Int gets a precision property. It's empty by default.
- The precision will hold a tuple. it's length will be the precision.
- If we add or subtract two ints we need to check which precision is bigger and align the smaller one to the bigger one.
- If we multiply two ints we need to add the precision of both ints.
- If we divide...TODO

This will have a huge performance impact. I'm not sure if it's worth it. I'll have to do some benchmarks. Also typelevel float operations would also be just for fun. I don't think they would be useful in any way. Even if Int operations aren't useful either. But they are fun to implement.

### Adding and subtract

Adding and subtract are the only operations that could be used in a real world scenario, to access a tuple index for example. But for that it would be better if we just have a type like:

```typescript
// the max recursion depth is 1000
// for a million lines of code this would cover 99.99% of all cases
// it should be performant
type increment = {
  0: 1;
  1: 2;
  2: 3;
  /*...*/
  999: never;
};
type decrement = {
  0: never;
  1: 0;
  2: 1;
  /*...*/
  1000: 999;
};
```
