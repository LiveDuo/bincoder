import { Decoder } from "../de/decoder";
import { Encoder } from "../enc/encoder";
import { Base } from "./base";

export class Int8 extends Base {
  v: number;
  size: number = 1;

  constructor(v: number = 0) {
    super();
    this.v = v;
  }

  encode(encoder: Encoder) {
    const buffer = new ArrayBuffer(this.size);
    const view = new DataView(buffer);
    view.setInt8(0, this.v);
    encoder.writer().write(buffer);
  }

  decode(decoder: Decoder): this {
    const buffer = new ArrayBuffer(this.size);
    decoder.reader().read(buffer);
    const view = new DataView(buffer);
    this.v = view.getInt8(0);
    return this;
  }
}

export class Int16 extends Base {
  v: number;
  size: number = 2;

  constructor(v: number = 0) {
    super();
    this.v = v;
  }

  encode(encoder: Encoder) {
    const buffer = new ArrayBuffer(this.size);
    const view = new DataView(buffer);
    view.setInt16(0, this.v, encoder.config().littleEndian);
    encoder.writer().write(buffer);
  }

  decode(decoder: Decoder): this {
    const buffer = new ArrayBuffer(this.size);
    decoder.reader().read(buffer);
    const view = new DataView(buffer);
    this.v = view.getInt16(0, decoder.config().littleEndian);
    return this;
  }
}

export class Int32 extends Base {
  v: number;
  size: number = 4;

  constructor(v: number = 0) {
    super();
    this.v = v;
  }

  encode(encoder: Encoder) {
    const buffer = new ArrayBuffer(this.size);
    const view = new DataView(buffer);
    view.setInt32(0, this.v, encoder.config().littleEndian);
    encoder.writer().write(buffer);
  }

  decode(decoder: Decoder): this {
    const buffer = new ArrayBuffer(this.size);
    decoder.reader().read(buffer);
    const view = new DataView(buffer);
    this.v = view.getInt32(0, decoder.config().littleEndian);
    return this;
  }
}

export class Int64 extends Base {
  v: bigint;
  size: number = 8;

  constructor(v: bigint = 0n) {
    super();
    this.v = v;
  }

  encode(encoder: Encoder) {
    const buffer = new ArrayBuffer(this.size);
    const view = new DataView(buffer);
    view.setBigInt64(0, this.v, encoder.config().littleEndian);
    encoder.writer().write(buffer);
  }

  decode(decoder: Decoder): this {
    const buffer = new ArrayBuffer(this.size);
    decoder.reader().read(buffer);
    const view = new DataView(buffer);
    this.v = view.getBigInt64(0, decoder.config().littleEndian);
    return this;
  }
}

const I128_MIN = 0n - BigInt(2) ** BigInt(127);
const I128_MAX = BigInt(2) ** BigInt(127) - BigInt(1);

export class Int128 extends Base {
  v: bigint;
  size: number = 16;

  constructor(v: bigint = 0n) {
    super();
    this.v = v;
  }

  encode(encoder: Encoder) {
    if (this.v < I128_MIN) {
      throw new Error(`i128 ${this.v} too small`);
    }
    if (this.v > I128_MAX) {
      throw new Error(`i128 ${this.v} too large`);
    }

    const buffer = new ArrayBuffer(this.size);
    const view = new DataView(buffer);

    if (encoder.config().littleEndian) {
      view.setBigInt64(0, this.v & BigInt("0xFFFFFFFFFFFFFFFF"), true);
      view.setBigInt64(8, this.v >> BigInt(64), true);
    } else {
      view.setBigInt64(0, this.v >> BigInt(64), false);
      view.setBigInt64(8, this.v & BigInt("0xFFFFFFFFFFFFFFFF"), false);
    }

    encoder.writer().write(buffer);
  }

  decode(decoder: Decoder): this {
    const buffer = new ArrayBuffer(this.size);
    decoder.reader().read(buffer);
    const view = new DataView(buffer);

    if (decoder.config().littleEndian) {
      let v = view.getBigInt64(0, true);
      let v1 = view.getBigInt64(8, true);
      this.v = v | (v1 << BigInt(64));
    } else {
      let v = view.getBigInt64(0, false);
      let v1 = view.getBigInt64(8, false);
      this.v = (v << BigInt(64)) | v1;
    }
    return this;
  }
}
