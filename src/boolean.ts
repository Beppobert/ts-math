export namespace Bool {
  export type XNOR<A extends boolean, B extends boolean> = A extends B
    ? true
    : false;
  export type Not<A extends boolean> = A extends true ? false : true;
}
