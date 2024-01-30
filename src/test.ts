export namespace Test {
  export type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <
    T
  >() => T extends B ? 1 : 2
    ? true
    : [A, "should be", B];

  export type Assert<T extends true> = T;
}
