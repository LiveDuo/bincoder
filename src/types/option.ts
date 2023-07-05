import { Decoder } from "../de/decoder";
import { Encoder } from "../enc/encoder";
import { Type } from "./type";
import { Uint8 } from "./uint";
import { Base } from "./base";

export class Option<T extends Type> extends Base {
  v?: T;

  constructor(v?: T) {
    super();
    this.v = v;
  }

  encode(encoder: Encoder) {
    if (this.v === undefined || this.v == null) {
      new Uint8(0).encode(encoder);
    } else {
      new Uint8(1).encode(encoder);
      this.v!.encode(encoder);
    }
  }

  decode(decoder: Decoder): this {
    let exist = new Uint8().decode(decoder);
    if (exist.v == 1) {
      this.v = this.v!.decode(decoder) as T;
    } else {
      this.v = undefined;
    }
    return this;
  }
}
