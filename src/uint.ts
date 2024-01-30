import {
  ADD_CARRY,
  CompareMap,
  DIGIT,
  DecimalAddMap,
  DecimalSubtractMap,
  EQUAL,
  GREATER_THAN,
  LESS_THAN,
  MultiplicationMap,
} from "./maps";

/**
 * Implements:
 * - Addition
 * - Subtraction
 * - Multiplication
 * - Division
 * - Modulo
 * - Power
 * - SquareRoot
 * - IsEven
 * - IsOdd
 * - Compare
 *  - Nth-Root
 * -
 */
//Note: Strings could be more performant than arrays, but I'm not sure
/**
 * Special numbers as NaN and Infinity were added to the type system
 * All types with the prefix "__" are internal types and are the core calculations WITHOUT any special cases
 * The Special cases are handled in the public/exported types
 *
 */
export namespace UInt {
  export type Type = DIGIT[];

  // prettier-ignore
  type __FilterLeadingZeros<T extends Type> = 
    T extends [0, ...infer Rest extends Type]
        ? __FilterLeadingZeros<Rest>
        : T extends [] ? [0] : T;

  // prettier-ignore
  export type Parse<T extends string, I extends Type = []> = 
    T extends `${infer Fst extends DIGIT}${infer Rest}`
        ?  Parse<Rest, [...I, Fst]> : I;

  // prettier-ignore
  export type Print<T, Num extends string = ""> = 
    T extends [infer Fst extends DIGIT,...infer Rest] 
        ? Print<Rest, `${Num}${Fst}`>
        : Num extends "" ? "0" : Num;

  export type IsZero<T extends Type> = __FilterLeadingZeros<T> extends [0]
    ? true
    : false;

  export type IsEven<A extends Type> = A extends [...any[], 0 | 2 | 4 | 6 | 8]
    ? true
    : false;

  export type IsOdd<A extends Type> = A extends [...any[], 1 | 3 | 5 | 7 | 9]
    ? true
    : false;

  /**
   *
   * @param A - Internal number e.g: [1, 1, 2, 3]
   * @param B - Internal number e.g: [9, 8, 7]
   * @param Carry - Carry from the previous addition, Defaults to 0
   * @param Sum - Aggregator for the sum, Defaults to []
   *
   * @returns The sum of A and B
   *
   * @example
   * type X = Adder<InternalNumber<"1123">, InternalNumber<"987">>;
   * //-> X = InternalNumber<"2110">
   * @description
   * Wokrs like this:
   *
   * First iteration: A: [1, 1, 2, 3]; B = [9, 8, 7]; Carry = 0; Sum = []
   * Case 1
   * -> ALast = 3, BLast = 7
   * -> DecimalAddMap[3][7][0] = {sum: 0, carry: 1}
   *
   * Second iteration: A: [1, 1, 2] B = [9, 8]; Carry = 1; Sum = [0]
   * Case 1
   * -> ALast = 2, BLast = 8
   * -> DecimalAddMap[2][8][1] = {sum: 1, carry: 1}
   *
   * Third iteration: A: [1, 1] B = [9]; Carry = 1; Sum = [1, 0]
   * Case 1
   * -> ALast = 1, BLast = 9
   * -> DecimalAddMap[1][9][1] = {sum: 1, carry: 1}
   *
   * Fourth iteration: A: [1] B = []; Carry = 1; Sum = [1, 1, 0]
   * Case 2
   * -> ALast = 1, BLast = 0
   * -> DecimalAddMap[1][0][1] = {sum: 2, carry: 0}
   *
   * Fifth iteration: A: [] B = []; Carry = 0; Sum = [2, 1, 1, 0]
   * Case 3
   */
  // prettier-ignore
  export type Add<A extends Type, B extends Type, Carry extends ADD_CARRY = 0, Sum extends Type = []> = 
    A extends [...infer AInit extends Type, infer ALast extends DIGIT] 
        ? B extends [...infer BInit extends Type, infer BLast extends DIGIT] 
/*case: 1*/ ? Add<AInit, BInit, DecimalAddMap[ALast][BLast][Carry]["carry"], [DecimalAddMap[ALast][BLast][Carry]["sum"], ...Sum]> 
/*case: 2*/ : Add<AInit, [], DecimalAddMap[ALast][0][Carry]["carry"], [DecimalAddMap[ALast][0][Carry]["sum"], ...Sum]>            
        : Carry extends 0  // If A is empty and the carry is zero then we can just return B
/*case: 3*/ ? [...B, ...Sum] // the commeted lines are just an optimization, but it's not necessary                                 
            : B extends [...infer Init1 extends Type, infer Last1 extends DIGIT]                               
/*case: 4*/     ? Add<Init1, [], DecimalAddMap[Last1][0][Carry]["carry"], [DecimalAddMap[Last1][0][Carry]["sum"], ...Sum]>        
/*case: 5*/     : Carry extends 1 ? [1, ...Sum] : Sum;

  /**
   * @param A - Internal number e.g: [2, 3]
   * @param Digit - Internal digit e.g: 9
   * @param Carry - Carry from the previous multiplication, Defaults to 0
   * @param Product - Aggregator for the product, Defaults to [[AggProduct:INTERNAL_NUMBER], [AggCarry:INTERNAL_NUMBER]]
   *
   * @returns The product of A and Digit
   *
   * @example
   * type X = MultiplyWithDigit<InternalNumber<"23">, 9>;
   * // -> X = InternalNumber<"207">
   * @description
   *
   * First iteration: A: [2, 3]; Digit = 9; Carry = 0; Product = [[], []]
   * Case 1
   * -> ALast = 3, Digit = 9
   * -> MultiplicationMap[3][9] = {product: 7, carry: 2}
   *
   * Second iteration: A: [2]; Digit = 9; Carry = 2; Product = [[7], [0]]
   * Case 1
   * -> ALast = 2, Digit = 9
   * -> MultiplicationMap[2][9] = {product: 8, carry: 1}
   *
   * Third iteration: A: []; Digit = 9; Carry = 2; Product = [[8, 7], [2, 0]]
   * Case 3
   * -> Appends Carry to the AggProduct
   * Product = [[1, 8, 7], [2, 0]]
   * -> Sum<Product> = [2, 0, 7]
   *
   */
  // prettier-ignore
  export type __MultiplyWithDigit<A extends Type, Digit extends DIGIT, Carry extends DIGIT = 0, Product extends [Type,Type] = [[], []]> =
    A extends [...infer Init extends Type, infer Last extends DIGIT] 
/*case: 1*/ ? __MultiplyWithDigit<Init, Digit, MultiplicationMap[Last][Digit]["carry"], [[MultiplicationMap[Last][Digit]["product"], ...Product[0]], [Carry, ...Product[1]]]>
            : Carry extends 0 
/*case: 2*/     ? Sum<Product> 
/*case: 3*/     : Sum<[[Carry, ...Product[0]], Product[1]]>;

  /**
   * @param A - Internal number e.g: [2, 3]
   * @param B - Internal number e.g: [9, 8]
   * @param Filler - Filler for the multiplication, Defaults to []
   * @param Product - Aggregator for the product, Defaults to []
   * @returns The product of A and B
   * @example
   * type X = Multiply<InternalNumber<"23">, InternalNumber<"98">>;
   * //-> X = InternalNumber<"2254">
   * @description
   *
   * First iteration: A: [2, 3]; B = [9, 8]; Filler = []; Product = []
   * Multiply<[2,3], [9, 8], [], []>
   * Results in -> Case 1
   * NextA -> [2, 3]; NextB = [9]; NextFiller = [0]; NextProduct = [[1, 8, 7,...(Filler=[])],...(Product=[])]
   *
   * Multiply<[2,3], [9], [0], [[1, 8, 7]]>
   * Second iteration: A: [2, 3]; B = [9]; Filler = [0]; Product = [[1, 8, 7]]
   * -> Case 1
   * NextA -> [2]; NextB = []; NextFiller = [0, 0]; NextProduct = [[2, 0, 7,...(Filler=[0])],...(Product=[[1, 8, 7]])]
   *
   * Multiply<[2, 3], [], [0, 0], [[2, 0, 7, 0], [1, 8, 7]]>
   * Third iteration: A: [2]; B = []; Filler = [0, 0]; Product = [[2, 0, 7, 0], [1, 8, 7]]
   * -> Case 3
   * -> Sum<Product> = [2, 2, 5, 4]
   */
  // prettier-ignore
  export type Multiply<A extends Type, B extends Type, Filler extends Type = [], Product extends Type[] = []> = 
    B extends [...infer Init extends Type, infer Last extends DIGIT] 
        ? Last extends 0 
            ? Multiply<A, Init, [0, ...Filler], Product>
            : Multiply<A, Init, [0, ...Filler], [[...__MultiplyWithDigit<A, Last>, ...Filler], ...Product]>
        : __FilterLeadingZeros<Sum<Product>>;

  /**
   * @warning If B is bigger than A, the result will be incorrect
   *
   * @param A - Internal number e.g: [2, 3]
   * @param B - Internal number e.g: [1, 8]
   * @param Borrow - Borrow from the previous subtraction, Defaults to 0
   * @param Difference - Aggregator for the difference, Defaults to []
   * @returns The difference of A and B
   *
   * @example
   * type X = Subtract<InternalNumber<"23">, InternalNumber<"18">>
   * // -> X = InternalNumber<"5">
   * @description
   * First iteration: A: [2, 3]; B = [1, 8]; Borrow = 0; Difference = []
   * -> ALast = 3, BLast = 8
   * -> DecimalSubtractMap[3][8][0] = {difference: 5, borrow: 1}
   * -> Subtract<[2], [1], 1, [5]>
   * Second iteration: A: [2]; B = [1]; Borrow = 1; Difference = [5]
   * -> ALast = 2, BLast = 1
   * -> DecimalSubtractMap[2][1][1] = {difference: 0, borrow: 0}
   * -> Subtract<[], [], 0, [0, 5]>
   * Third iteration: A: []; B = []; Borrow = 0; Difference = [0, 5]
   * -> Borrow = 0
   * -> FilterLeadingZeros<[0, 5]> = [0, 5]
   * -> [5]
   *
   */
  // prettier-ignore
  export type Subtract<A extends Type, B extends Type, Borrow extends ADD_CARRY = 0, Difference extends Type = []> = 
    A extends [...infer AInit extends Type, infer ALast extends DIGIT] 
        ? B extends [...infer BInit extends Type, infer BLast extends DIGIT] 
/*case: 1*/ ? Subtract<AInit, BInit, DecimalSubtractMap[ALast][BLast][Borrow]["borrow"], [DecimalSubtractMap[ALast][BLast][Borrow]["difference"], ...Difference]> 
/*case: 2*/ : Subtract<AInit, [], DecimalSubtractMap[ALast][0][Borrow]["borrow"], [DecimalSubtractMap[ALast][0][Borrow]["difference"], ...Difference]>            
        : Borrow extends 0  // If A is empty and the carry is zero then we can just return B
/*case: 3*/ ? __FilterLeadingZeros<[...B, ...Difference]> // the commeted lines are just an optimization, but it's not necessary                                 
            : B extends [...infer Init1 extends Type, infer Last1 extends DIGIT]                               
/*case: 4*/     ? Subtract<Init1, [], DecimalSubtractMap[Last1][0][Borrow]["borrow"], [DecimalSubtractMap[Last1][0][Borrow]["difference"], ...Difference]>        
/*case: 5*/     : Borrow extends 1 ? [0] : __FilterLeadingZeros<Difference>;

  //prettier-ignore
  type CountPossibleSubtractions<A extends Type, B extends Type> =
      Compare<A, B>                 extends "LESS_THAN" ? 0 
    : Compare<A, Multiply<B, [2]>>  extends "LESS_THAN" ? 1 
    : Compare<A, Multiply<B, [3]>>  extends "LESS_THAN" ? 2 
    : Compare<A, Multiply<B, [4]>>  extends "LESS_THAN" ? 3 
    : Compare<A, Multiply<B, [5]>>  extends "LESS_THAN" ? 4 
    : Compare<A, Multiply<B, [6]>>  extends "LESS_THAN" ? 5 
    : Compare<A, Multiply<B, [7]>>  extends "LESS_THAN" ? 6 
    : Compare<A, Multiply<B, [8]>>  extends "LESS_THAN" ? 7 
    : Compare<A, Multiply<B, [9]>>  extends "LESS_THAN" ? 8 
    : 9

  /**
   * @warning Floor division
   * @param A - Internal number e.g: [2, 3]
   * @param B - Internal number e.g: [1, 8]
   * @param Divided - Aggregator for the division, Defaults to []
   *
   * @returns The division of A and B
   *
   * @example
   * type X = Divide<InternalNumber<"23">, InternalNumber<"18">>
   * // -> X = InternalNumber<"1">
   * @description
   * Implements long division algorithm
   * https://en.wikipedia.org/wiki/Long_division#:~:text=In%20arithmetic%2C%20long%20division%20is,a%20series%20of%20easier%20steps.
   * First iteration: A: [2, 3]; B = [1, 8]; Divided = [], CurrentNum = []
   * -> Head = 2, Tail = [3], CountPossibleSubtractions<CurrentNum, B> = 0
   * -> Divide<[3], [1, 8], [...[], 0], [...Subtract<[], Multiply<B, [0]>>, 2]>
   * -> Divide<[3], [1, 8], [0],        [...Subtract<[], Multiply<B, [0]>>, 2]>
   * -> Divide<[3], [1, 8], [0],        [...Subtract<[], [0]>,              2]>
   * -> Divide<[3], [1, 8], [0],        [...[0],                            2]>
   * -> Divide<[3], [1, 8], [0],        [0, 2]>
   *
   * Second iteration: A: [3]; B = [1, 8]; Divided = [0], CurrentNum = [2]
   * -> Head = 3, Tail = []
   * -> CountPossibleSubtractions<CurrentNum, B> = 0
   *
   * -> Divide<[], [1, 8], [...[0], 0], [...Subtract<[2], Multiply<B, [0]>>, 3]>
   * -> Divide<[], [1, 8], [0, 0],      [...Subtract<[2], Multiply<B, [0]>>, 3]>
   * -> Divide<[], [1, 8], [0, 0],      [...Subtract<[2], [0]>, 3]>
   * -> Divide<[], [1, 8], [0, 0],      [...[2], 3]>
   * -> Divide<[], [1, 8], [0, 0],      [2, 3]>
   *
   * Third iteration: A: []; B = [1, 8]; Divided = [0, 0], CurrentNum = [2, 3]
   * -> FilterLeadingZeros<[...Divided, CountPossibleSubtractions<CurrentNum, B>]>
   * -> FilterLeadingZeros<[...[0, 0],  CountPossibleSubtractions<[2, 3], [1, 8]>]>
   * -> FilterLeadingZeros<[...[0, 0],  1]>
   * -> FilterLeadingZeros<[0, 0, 1]> = [1]
   *
   */
  //prettier-ignore
  export type Divide<
  A extends Type,
  B extends Type,
  Divided extends Type = [],
  CurrentNum extends Type = []
> = A extends [infer Head extends DIGIT, ...infer Tail extends Type]
  ? Divide<Tail, B, 
                [...Divided, CountPossibleSubtractions<CurrentNum, B>],
                [...Subtract<CurrentNum, Multiply<B, [CountPossibleSubtractions<CurrentNum, B>]>>, Head]>
  : __FilterLeadingZeros<[...Divided, CountPossibleSubtractions<CurrentNum, B>]>;

  //prettier-ignore
  /**
   * @param A - Internal number e.g: [5, 0]
   * @param B - Internal number e.g: [2]
   *
   * @returns The modulo of A and B
   *
   * @example
   * type X = Modulo<InternalNumber<"50">, InternalNumber<"2">>
   * // -> X = InternalNumber<"0">
   * @description
   * Work like Division but instead of returning the quotient, it returns the remainder.
   */
  export type Modulo<
  A extends Type,
  B extends Type,
  CurrentNum extends Type = []
> = A extends [infer Head extends DIGIT, ...infer Tail extends Type]
  ? Modulo<Tail, B, 
            [...Subtract<CurrentNum, Multiply<B, [CountPossibleSubtractions<CurrentNum, B>]>>, Head]>
  : __FilterLeadingZeros<Subtract<CurrentNum, Multiply<B, [CountPossibleSubtractions<CurrentNum, B>]>>>;

  /**
   * @param A - Internal number e.g: [2, 3]
   * @param B - Internal number e.g: [1, 8]
   * @param Agg - Aggregator for the power, Defaults to [1]
   * @returns The power of A and B
   * @example
   * type X = Power<InternalNumber<"2">, InternalNumber<"3">>
   * // -> X = InternalNumber<"8">
   */
  //prettier-ignore
  export type Power<A extends Type, B extends Type, Agg extends Type = [1]> = 
  B extends [0]
    ? Agg
    : Power<A, Subtract<B, [1]>, Multiply<Agg, A>>;

  export type Factorial<T extends Type, Agg extends Type = [1]> = T extends [0]
    ? Agg
    : Factorial<Decrement<T>, Multiply<Agg, T>>;

  /**
   * @param A - Internal number e.g: [2, 3]
   * @param B - Internal number e.g: [1, 8]
   * @param Compared - Aggregator for the comparison, Defaults to []
   * @returns The comparison of A and B
   * @example
   * type X = Compare<InternalNumber<"23">, InternalNumber<"18">>
   * // -> X = "GREATER_THAN"
   * @description
   * First iteration: A: [1, 2, 3]; B = [2, 3]; Compared = []
   * -> ALast = 3, BLast = 3, AInit = [1, 2], BInit = [2]
   * -> CompareMap[3][3] = "EQUAL"
   * -> Compare<[1, 2], [2], ["EQUAL"]>
   *
   * Second iteration: A: [1, 2]; B = [2]; Compared = ["EQUAL"]
   * -> ALast = 2, BLast = 2, AInit = [1], BInit = []
   * -> CompareMap[2][2] = "EQUAL"
   * -> Compare<[1], [], ["EQUAL", "EQUAL"]>
   *
   * Third iteration: A: [1]; B = []; Compared = ["EQUAL", "EQUAL"]
   * -> ALast = 1, BLast = never, AInit = [], BInit = []
   * -> CompareMap[1][0] = "GREATER_THAN"
   * -> Compare<[], [], ["GREATER_THAN", "EQUAL", "EQUAL"]>
   *
   * Fourth iteration: A: []; B = []; Compared = ["GREATER_THAN", "EQUAL", "EQUAL"]
   * -> ALast = never, BLast = never, AInit = [], BInit = []
   * -> ResolveCompare<["GREATER_THAN", "EQUAL", "EQUAL"]> = "GREATER_THAN"
   * -> "GREATER_THAN"
   *
   */
  // prettier-ignore
  export type Compare<A extends Type, B extends Type, Compared extends (GREATER_THAN | LESS_THAN | EQUAL)[] = []> = 
    A extends [...infer AInit extends Type, infer ALast extends DIGIT] 
        ? B extends [...infer BInit extends Type, infer BLast extends DIGIT]
            ? Compare<AInit, BInit, [CompareMap[ALast][BLast], ...Compared]>
            : Compare<AInit, [], [CompareMap[ALast][0], ...Compared]>
        : B extends [...infer BInit extends Type, infer BLast extends DIGIT]
            ? Compare<[], BInit, [CompareMap[0][BLast], ...Compared]>
            : __ResolveCompare<Compared>

  //prettier-ignore
  export type __ResolveCompare<Zip extends (GREATER_THAN | LESS_THAN | EQUAL)[] = []> =
    Zip extends [infer Fst, ...infer Rest extends (GREATER_THAN | LESS_THAN | EQUAL)[]]
        ? Fst extends EQUAL
            ? __ResolveCompare<Rest>
            : Fst
        : EQUAL;

  //prettier-ignore
  export type GT<A extends Type, B extends Type> = Compare<A, B> extends "GREATER_THAN" ? true : false;
  //prettier-ignore
  export type LT<A extends Type, B extends Type> =  Compare<A, B> extends "LESS_THAN" ? true : false;
  //prettier-ignore
  export type EQ<A extends Type, B extends Type> =  Compare<A, B> extends "EQUAL" ? true : false;
  //prettier-ignore
  export type GTE<A extends Type, B extends Type> =  EQ<A, B> extends true ? true : GT<A, B>;
  //prettier-ignore
  export type LTE<A extends Type, B extends Type> =  EQ<A, B> extends true ? true : LT<A, B>;

  export type Increment<T extends Type> = Add<T, [1]>;
  export type Decrement<T extends Type> = Subtract<T, [1]>;
  // prettier-ignore
  /**
   * @param Uints - Internal numbers e.g: [[1, 1, 2, 3], [9, 8, 7]]
   * @param Agg - Aggregator for the sum, Defaults to []
   * @returns The sum of all numbers in Uints
   *
   */
  export type Sum<UInts extends Type[], Agg extends Type=[]> = 
    UInts extends [infer Fst extends Type, ...infer Rest extends Type[]] 
        ? Sum<Rest, Add<Agg, Fst>>
        : Agg;

  // prettier-ignore
  export type Product<A extends Type[], Agg extends Type = [1]> = 
    A extends [infer Fst extends Type, ...infer Rest extends Type[]] 
        ? Product<Rest, Multiply<Agg, Fst>>
        : Agg;

  //prettier-ignore
  export type Min<A extends Type[], Agg extends Type> = 
    A extends [infer Fst extends Type, ...infer Rest extends Type[]]
      ? Min<Rest, LT<Fst, Agg> extends true ? Fst : Agg>
      : Agg;

  //prettier-ignore
  export type Max<A extends Type[], Agg extends Type = [0]> = 
    A extends [infer Fst extends Type, ...infer Rest extends Type[]]
      ? Max<Rest, GT<Fst, Agg> extends true ? Fst : Agg>
      : Agg;

  //prettier-ignore
  /**
   * https://en.wikipedia.org/wiki/Newton%27s_method
   */
  type __Newton_Method_Sqt< A extends Type, Approximation extends Type, IterationCount extends number = 4, Count extends any[] = []> = 
    Count["length"] extends IterationCount  
    ? Approximation 
    : __Newton_Method_Sqt<A, Divide<Add<Approximation, Divide<A, Approximation>>, [2]>, IterationCount, [...Count, unknown]>;

  type __EducatedGuess<
    A extends Type,
    Return extends any[] = [],
    Count extends any[] = []
  > = A extends [infer H extends DIGIT, ...infer Tail extends Type]
    ? Count extends [...Tail, ...any[]]
      ? Return
      : __EducatedGuess<Tail, [...Return, H], [...Count, any]>
    : Return;

  type __SquareRoot<A extends Type> = __Newton_Method_Sqt<
    A,
    Divide<A, __EducatedGuess<A>>,
    5
  >;
  export type SquareRoot<A extends Type> = A extends DIGIT[]
    ? A extends [0] | [1]
      ? A
      : __SquareRoot<A>
    : A;
}
