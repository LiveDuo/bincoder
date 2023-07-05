import { Decoder } from "../de/decoder";
import { Encoder } from "../enc/encoder";
import { Uint64 } from "./uint";
import { Base } from "./base";

export class String extends Base {
  v: string;
  size: number;

  constructor(v: string = "") {
    super();
    this.v = v;
    this.size = v.length;
  }

  encode(encoder: Encoder) {
    new Uint64(BigInt(this.v.length)).encode(encoder);

    let utf8Encode = new TextEncoder();
    let bytes = utf8Encode.encode(this.v);
    encoder.writer().write(bytes);
  }

  decode(decoder: Decoder): this {
    this.size = Number(new Uint64().decode(decoder).v);

    const buffer = new ArrayBuffer(this.size);
    decoder.reader().read(buffer);
    this.v = new TextDecoder().decode(buffer);
    return this;
  }
}
