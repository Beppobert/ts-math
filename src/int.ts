import { Bool } from "./boolean";
import { LESS_THAN } from "./maps";
import { UInt } from "./uint";

export namespace Int {
  export type Type = {
    sign: boolean;
    digits: UInt.Type;
  };

  export type Parse<T extends string> = T extends `-${infer Rest}`
    ? { sign: false; digits: UInt.Parse<Rest> }
    : { sign: true; digits: UInt.Parse<T> };

  export type Print<T extends Type> = `${T["sign"] extends true
    ? ""
    : "-"}${UInt.Print<T["digits"]>}`;

  export type UIntToInt<A extends UInt.Type> = {
    sign: true;
    digits: A;
  };

  //prettier-ignore
  export type Add<A extends Type, B extends Type> = 
     A["sign"] extends true 
        ? B["sign"] extends true 
            ? { sign: true, digits: UInt.Add<A["digits"], B["digits"]> }
            : UInt.Compare<A["digits"], B["digits"]> extends LESS_THAN
                ? { sign: false, digits: UInt.Subtract<B["digits"], A["digits"]> }
                : { sign: true, digits: UInt.Subtract<A["digits"], B["digits"]> }
        : B["sign"] extends true
            ?  UInt.Compare<A["digits"], B["digits"]> extends LESS_THAN 
                ? { sign: false, digits: UInt.Subtract<B["digits"], A["digits"]> }
                : { sign: true, digits: UInt.Subtract<A["digits"], B["digits"]> }
            : { sign: false, digits: UInt.Add<A["digits"], B["digits"]> };

  //prettier-ignore
  export type Subtract<A extends Type, B extends Type> =
     A["sign"] extends true 
        ? B["sign"] extends true 
            ? UInt.Compare<A["digits"], B["digits"]> extends LESS_THAN 
                ? { sign: false, digits: UInt.Subtract<B["digits"], A["digits"]> }
                : { sign: true,  digits: UInt.Subtract<A["digits"], B["digits"]> }
            :  { sign: true, digits: UInt.Add<A["digits"], B["digits"]> }
        : B["sign"] extends true
            ? { sign: false, digits: UInt.Add<A["digits"], B["digits"]> }
            : UInt.Compare<A["digits"], B["digits"]> extends LESS_THAN 
                ? { sign: false, digits: UInt.Subtract<B["digits"], A["digits"]> }
                : { sign: true,  digits: UInt.Subtract<A["digits"], B["digits"]> }

  //prettier-ignore
  export type Sum<A extends Type[], Agg extends Type = Parse<"0">> = 
    A extends [infer Head extends Type, ...infer Tail extends Type[]]
      ? Sum<Tail, Add<Head, Agg>>
      : Agg;
  //prettier-ignore
  export type Multiply<A extends Type, B extends Type> =
    { sign: Bool.XNOR<A["sign"], B["sign"]>, digits: UInt.Multiply<A["digits"], B["digits"]> };

  //prettier-ignore
  export type Product<A extends Type[], Agg extends Type = Parse<"1">> = 
    A extends [infer Head extends Type, ...infer Tail extends Type[]]
      ? Product<Tail, Multiply<Head, Agg>>
      : Agg;

  //prettier-ignore
  export type Divide<A extends Type, B extends Type> =
    { sign: Bool.XNOR<A["sign"], B["sign"]>, digits: UInt.Divide<A["digits"], B["digits"]> };

  export type Modulo<A extends Type, B extends Type> = {
    sign: A["sign"];
    digits: UInt.Modulo<A["digits"], B["digits"]>;
  };

  export type IsEven<A extends Type> = UInt.IsEven<A["digits"]>;
  export type IsOdd<A extends Type> = UInt.IsOdd<A["digits"]>;

  export type Power<A extends Type, B extends UInt.Type> = {
    sign: UInt.IsEven<B> extends true ? true : A["sign"];
    digits: UInt.Power<A["digits"], B>;
  };

  //prettier-ignore
  export type Compare<A extends Type, B extends Type> = 
    A["sign"] extends true
      ? B["sign"] extends true
        ? UInt.Compare<A["digits"], B["digits"]>
        : "LESS_THAN"
      : B["sign"] extends true
          ? "GREATER_THAN"
          : UInt.Compare<B["digits"], A["digits"]>;
  //prettier-ignore
  export type GT<A extends Type, B extends Type> = 
    A["sign"] extends true
      ? B["sign"] extends true
        ? UInt.GT<A["digits"], B["digits"]>
        : true
      : B["sign"] extends true
        ? false
        : UInt.LT<B["digits"], A["digits"]>;
  //prettier-ignore
  export type LT<A extends Type, B extends Type> = 
    A["sign"] extends true
      ? B["sign"] extends true
        ? UInt.LT<A["digits"], B["digits"]>
        : false
      : B["sign"] extends true
        ? true
        : UInt.GT<B["digits"], A["digits"]>;
  //prettier-ignore
  export type EQ<A extends Type, B extends Type> = 
    A["sign"] extends true
      ? B["sign"] extends true
        ? UInt.EQ<A["digits"], B["digits"]>
        : false
      : B["sign"] extends true ? false : UInt.EQ<B["digits"], A["digits"]>
  //prettier-ignore
  export type GTE<A extends Type, B extends Type> =  EQ<A, B> extends true ? true : GT<A, B>;
  //prettier-ignore
  export type LTE<A extends Type, B extends Type> =  EQ<A, B> extends true ? true : LT<A, B>;

  //prettier-ignore
  export type Min<A extends Type[], B extends Type> =
    A extends [infer Head extends Type, ...infer Tail extends Type[]]
      ? Min<Tail, LT<Head, B> extends true ? Head : B>
      : B;

  //prettier-ignore
  export type Max<A extends Type[], B extends Type> =
    A extends [infer Head extends Type, ...infer Tail extends Type[]]
      ? Max<Tail, GT<Head, B> extends true ? Head : B>
      : B;

  export type IsPositive<A extends Type> = A["sign"];
  export type IsNegative<A extends Type> = Bool.Not<A["sign"]>;

  export type IsZero<A extends Type> = UInt.IsZero<A["digits"]>;
  export type Abs<A extends Type> = { sign: true; digits: A["digits"] };

  export type SquareRoot<A extends Type> = {
    sign: true;
    digits: UInt.SquareRoot<A["digits"]>;
  };

  //prettier-ignore
  /**
   * https://en.wikipedia.org/wiki/Newton%27s_method
   */
  type Newton_Method_N<
    Base extends Type,
    N extends UInt.Type,
    Previous extends Type
  > = Subtract<
        Previous,
        Divide<
          Subtract<Power<Previous, N>, Base>,
          Multiply<UIntToInt<N>, Power<Previous, UInt.Subtract<N, [1]>>>
        >
      >;

  export type __Root<
    A extends Type,
    B extends UInt.Type,
    Approximation extends Type,
    IterationCount extends number = 4,
    Count extends any[] = []
  > = Count["length"] extends IterationCount
    ? Approximation
    : __Root<
        A,
        B,
        Newton_Method_N<A, B, Approximation>,
        IterationCount,
        [...Count, unknown]
      >;

  /**
   * @warning This is a very slow operation. Use with caution. It's also just an approximation
   */
  //prettier-ignore
  export type Root<
    A extends Type,
    B extends UInt.Type,
    Approximation extends Type
  > = 
     { sign: true; digits: __Root<A, B, Approximation>["digits"] };

  export type Factorial<T extends Type> = {
    sign: true;
    digits: UInt.Factorial<T["digits"]>;
  };
}
