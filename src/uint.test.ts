// import { Test } from "./test";
// import { UInt } from "./uint";
// //prettier-ignore
// {
//   type T00 = Test.Assert<Test.Equal<UInt.Add<UInt.Parse<"1">, UInt.Parse<"3">>, UInt.Parse<"4">>>;
//   type T01 = Test.Assert<Test.Equal<UInt.Add<UInt.Parse<"0">, UInt.Parse<"0">>, UInt.Parse<"0">>>;
//   type T02 = Test.Assert<Test.Equal<UInt.Add<UInt.Parse<"999">, UInt.Parse<"1">>, UInt.Parse<"1000">>>;
//   type T03 = Test.Assert<Test.Equal<UInt.Subtract<UInt.Parse<"5">, UInt.Parse<"3">>, UInt.Parse<"2">>>;
//   type T04 = Test.Assert<Test.Equal<UInt.Subtract<UInt.Parse<"10">, UInt.Parse<"20">>, UInt.Parse<"0">>>;
//   type T05 = Test.Assert<Test.Equal<UInt.Subtract<UInt.Parse<"100">, UInt.Parse<"50">>, UInt.Parse<"50">>>;
//   type T06 = Test.Assert<Test.Equal<UInt.Multiply<UInt.Parse<"5">, UInt.Parse<"3">>, UInt.Parse<"15">>>;
//   type T07 = Test.Assert<Test.Equal<UInt.Multiply<UInt.Parse<"0">, UInt.Parse<"999">>, UInt.Parse<"0">>>;
//   type T08 = Test.Assert<Test.Equal<UInt.Multiply<UInt.Parse<"8">, UInt.Parse<"8">>, UInt.Parse<"64">>>;
//   type T09 = Test.Assert<Test.Equal<UInt.Divide<UInt.Parse<"15">, UInt.Parse<"5">>, UInt.Parse<"3">>>;
//   type T10 = Test.Assert<Test.Equal<UInt.Divide<UInt.Parse<"16">, UInt.Parse<"5">>, UInt.Parse<"3">>>;
//   type T12 = Test.Assert<Test.Equal<UInt.Divide<UInt.Parse<"25">, UInt.Parse<"5">>, UInt.Parse<"5">>>;
//   type T13 = Test.Assert<Test.Equal<UInt.SquareRoot<UInt.Parse<"16">>, UInt.Parse<"4">>>;
//   type T14 = Test.Assert<Test.Equal<UInt.SquareRoot<UInt.Parse<"81">>, UInt.Parse<"9">>>;
//   type T15 = Test.Assert<Test.Equal<UInt.SquareRoot<UInt.Parse<"25">>, UInt.Parse<"5">>>;
//   type T16 = Test.Assert<Test.Equal<UInt.Min<[UInt.Parse<"5">, UInt.Parse<"3">], UInt.Parse<"1000">>, UInt.Parse<"3">>>;
//   type T17 = Test.Assert<Test.Equal<UInt.Min<[UInt.Parse<"10">, UInt.Parse<"20">], UInt.Parse<"1000">>, UInt.Parse<"10">>>;
//   type T18 = Test.Assert<Test.Equal<UInt.Min<[UInt.Parse<"100">, UInt.Parse<"50">], UInt.Parse<"1000">>, UInt.Parse<"50">>>;
//   type T19 = Test.Assert<Test.Equal<UInt.Max<[UInt.Parse<"5">, UInt.Parse<"3">]>, UInt.Parse<"5">>>;
//   type T20 = Test.Assert<Test.Equal<UInt.Max<[UInt.Parse<"10">, UInt.Parse<"20">]>, UInt.Parse<"20">>>;
//   type T21 = Test.Assert<Test.Equal<UInt.Max<[UInt.Parse<"100">, UInt.Parse<"50">]>, UInt.Parse<"100">>>;
//   type T22 = Test.Assert<Test.Equal<UInt.Sum<[UInt.Parse<"5">, UInt.Parse<"3">]>, UInt.Parse<"8">>>;
//   type T23 = Test.Assert<Test.Equal<UInt.Sum<[UInt.Parse<"10">, UInt.Parse<"20">]>, UInt.Parse<"30">>>;
//   type T24 = Test.Assert<Test.Equal<UInt.Sum<[UInt.Parse<"100">, UInt.Parse<"50">]>, UInt.Parse<"150">>>;
//   type T25 = Test.Assert<Test.Equal<UInt.Product<[UInt.Parse<"5">, UInt.Parse<"3">]>, UInt.Parse<"15">>>;
//   type T26 = Test.Assert<Test.Equal<UInt.Product<[UInt.Parse<"10">, UInt.Parse<"20">]>, UInt.Parse<"200">>>;
//   type T27 = Test.Assert<Test.Equal<UInt.Product<[UInt.Parse<"100">, UInt.Parse<"50">]>, UInt.Parse<"5000">>>;
//   type T28 = Test.Assert<Test.Equal<UInt.Product<[UInt.Parse<"100">, UInt.Parse<"0">]>, UInt.Parse<"0">>>;
//   type T29 = Test.Assert<Test.Equal<UInt.Power<UInt.Parse<"2">, UInt.Parse<"3">>, UInt.Parse<"8">>>;
//   type T30 = Test.Assert<Test.Equal<UInt.Power<UInt.Parse<"3">, UInt.Parse<"3">>, UInt.Parse<"27">>>;
//   type T31 = Test.Assert<Test.Equal<UInt.Power<UInt.Parse<"4">, UInt.Parse<"3">>, UInt.Parse<"64">>>;
//   type T32 = Test.Assert<Test.Equal<UInt.Power<UInt.Parse<"5">, UInt.Parse<"0">>, UInt.Parse<"1">>>;
//   type T33 = Test.Assert<Test.Equal<UInt.Modulo<UInt.Parse<"5">, UInt.Parse<"3">>, UInt.Parse<"2">>>;
//   type T34 = Test.Assert<Test.Equal<UInt.Modulo<UInt.Parse<"10">, UInt.Parse<"20">>, UInt.Parse<"10">>>;
//   type T35 = Test.Assert<Test.Equal<UInt.Modulo<UInt.Parse<"100">, UInt.Parse<"50">>, UInt.Parse<"0">>>;
//   type T38 = Test.Assert<Test.Equal<UInt.Modulo<UInt.Parse<"0">, UInt.Parse<"100">>, UInt.Parse<"0">>>;
//   type T39 = Test.Assert<Test.Equal<UInt.Max<[]>, UInt.Parse<"0">>>;
//   type T40 = Test.Assert<Test.Equal<UInt.Min<[],UInt.Parse<"10">>, UInt.Parse<"10">>>;
//   type T41 = Test.Assert<Test.Equal<UInt.IsEven<UInt.Parse<"0">>, true>>;
//   type T42 = Test.Assert<Test.Equal<UInt.IsEven<UInt.Parse<"1">>, false>>;
//   type T43 = Test.Assert<Test.Equal<UInt.IsEven<UInt.Parse<"2">>, true>>;
//   // some modulo tests
//   type T47 = Test.Assert<Test.Equal<UInt.Modulo<UInt.Parse<"5">, UInt.Parse<"Infinity">>, UInt.Parse<"5">>>;
//   //less than tests
//   type T52 = Test.Assert<Test.Equal<UInt.LT<UInt.Parse<"5">, UInt.Parse<"5">>, false>>;
//   type T53 = Test.Assert<Test.Equal<UInt.LT<UInt.Parse<"5">, UInt.Parse<"4">>, false>>;
//   type T54 = Test.Assert<Test.Equal<UInt.LT<UInt.Parse<"4">, UInt.Parse<"5">>, true>>;
//   //greater than tests
//   type T58 = Test.Assert<Test.Equal<UInt.GT<UInt.Parse<"5">, UInt.Parse<"5">>, false>>;
//   type T59 = Test.Assert<Test.Equal<UInt.GT<UInt.Parse<"5">, UInt.Parse<"4">>, true>>;
//   type T60 = Test.Assert<Test.Equal<UInt.GT<UInt.Parse<"4">, UInt.Parse<"5">>, false>>;
//   //equal tests
//   type T64 = Test.Assert<Test.Equal<UInt.EQ<UInt.Parse<"5">, UInt.Parse<"5">>, true>>;
//   type T65 = Test.Assert<Test.Equal<UInt.EQ<UInt.Parse<"5">, UInt.Parse<"4">>, false>>;
//   type T66 = Test.Assert<Test.Equal<UInt.EQ<UInt.Parse<"4">, UInt.Parse<"5">>, false>>;
//   type T67 = Test.Assert<Test.Equal<UInt.Factorial<UInt.Parse<"50">>,UInt.Parse<"30414093201713378043612608166064768844377641568960512000000000000">>>;
// }
