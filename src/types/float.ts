import { Decoder } from "../de/decoder";
import { Encoder } from "../enc/encoder";
import { Base } from "./base";

export class Float32 extends Base {
  v: number;
  size: number = 4;

  constructor(v: number = 0) {
    super();
    this.v = v;
  }

  encode(encoder: Encoder) {
    const buffer = new ArrayBuffer(this.size);
    const view = new DataView(buffer);
    view.setFloat32(0, this.v);
    encoder.writer().write(buffer);
  }

  decode(decoder: Decoder): this {
    const buffer = new ArrayBuffer(this.size);
    decoder.reader().read(buffer);
    const view = new DataView(buffer);
    this.v = view.getFloat32(0);
    return this;
  }
}

export class Float64 extends Base {
  v: number;
  size: number = 8;

  constructor(v: number = 0) {
    super();
    this.v = v;
  }

  encode(encoder: Encoder) {
    const buffer = new ArrayBuffer(this.size);
    const view = new DataView(buffer);
    view.setFloat64(0, this.v);
    encoder.writer().write(buffer);
  }

  decode(decoder: Decoder): this {
    const buffer = new ArrayBuffer(this.size);
    decoder.reader().read(buffer);
    const view = new DataView(buffer);
    this.v = view.getFloat64(0);
    return this;
  }
}
