import { Decoder } from "../de/decoder";
import { Encoder } from "../enc/encoder";
import { Type } from "./type";
import { Uint32 } from "./uint";
import { Base } from "./base";

export class Enum extends Base {
  i: number;
  t: Record<number, Type> = {};

  constructor(i: number = 0) {
    super();
    this.i = i;
    this.set();
  }

  init() {
    let t: Record<number, Type> = {};
    return t;
  }

  set() {
    this.t = this.init();
  }

  encode(encoder: Encoder) {
    new Uint32(this.i).encode(encoder);
    this.t[this.i].encode(encoder);
  }

  decode(decoder: Decoder): this {
    this.i = new Uint32().decode(decoder).v;
    this.t[this.i] = this.init()[this.i].decode(decoder) as Type;
    return this;
  }
}
