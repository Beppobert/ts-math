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
