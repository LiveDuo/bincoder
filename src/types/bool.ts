import { Decoder } from "../de/decoder";
import { Encoder } from "../enc/encoder";
import { Base } from "./base";

export class Bool extends Base {
  v: boolean;
  size: number = 1;

  constructor(v: boolean = false) {
    super();
    this.v = v;
  }

  encode(encoder: Encoder) {
    const buffer = new ArrayBuffer(this.size);
    const view = new DataView(buffer);
    view.setUint8(0, this.v ? 1 : 0);
    encoder.writer().write(buffer);
  }

  decode(decoder: Decoder): this {
    const buffer = new ArrayBuffer(this.size);
    decoder.reader().read(buffer);
    const view = new DataView(buffer);
    this.v = view.getUint8(0) == 1 ? true : false;
    return this;
  }
}
