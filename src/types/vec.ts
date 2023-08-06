import { Decoder } from "../de/decoder";
import { Encoder } from "../enc/encoder";
import { Type } from "./type";
import { Uint64 } from "./uint";
import { Base } from "./base";

export class Vec<T extends Type> extends Base {
  v: Array<T>;
  size: number;
  itemType: new (...args: any[]) => T;

  constructor(itemType: new (...args: any[]) => T, v: Array<T> = new Array()) {
    super();
    this.v = v;
    this.itemType = itemType;
    this.size = 8 + new itemType().size * v.length;
  }

  encode(encoder: Encoder) {
    new Uint64(BigInt(this.v.length)).encode(encoder);

    for (let i = 0; i < this.v.length; i++) {
      this.v[i].encode(encoder);
    }
  }

  decode(decoder: Decoder): this {
    let len = Number(new Uint64().decode(decoder).v);
    this.size = 8 + new this.itemType().size * len;
    this.v = new Array<T>();

    for (let i = 0; i < len; i++) {
      let decoded = new this.itemType().decode(decoder) as T;
      this.v.push(decoded);
    }

    return this;
  }
}
