import { Decoder } from "../de/decoder";
import { Encoder } from "../enc/encoder";
import { Type } from "./type";
import { Base } from "./base";

export class Uint8 extends Base {
  v: number;
  size: number = 1;

  constructor(v: number = 0) {
    super();
    this.v = v;
  }

  encode(encoder: Encoder) {
    const buffer = new ArrayBuffer(this.size);
    const view = new DataView(buffer);
    view.setUint8(0, this.v);
    encoder.writer().write(buffer);
  }

  decode(decoder: Decoder): this {
    const buffer = new ArrayBuffer(this.size);
    decoder.reader().read(buffer);
    const view = new DataView(buffer);
    this.v = view.getUint8(0);
    return this;
  }
}

export class Uint16 extends Base {
  v: number;
  size: number = 2;

  constructor(v: number = 0) {
    super();
    this.v = v;
  }

  encode(encoder: Encoder) {
    const buffer = new ArrayBuffer(this.size);
    const view = new DataView(buffer);
    view.setUint16(0, this.v, encoder.config().littleEndian);
    encoder.writer().write(buffer);
  }

  decode(decoder: Decoder): this {
    const buffer = new ArrayBuffer(this.size);
    decoder.reader().read(buffer);
    const view = new DataView(buffer);
    this.v = view.getUint16(0, decoder.config().littleEndian);
    return this;
  }
}

export class Uint32 extends Base {
  v: number;
  size: number = 4;

  constructor(v: number = 0) {
    super();
    this.v = v;
  }

  encode(encoder: Encoder) {
    const buffer = new ArrayBuffer(this.size);
    const view = new DataView(buffer);
    view.setUint32(0, this.v, encoder.config().littleEndian);
    encoder.writer().write(buffer);
  }

  decode(decoder: Decoder): this {
    const buffer = new ArrayBuffer(this.size);
    decoder.reader().read(buffer);
    const view = new DataView(buffer);
    this.v = view.getUint32(0, decoder.config().littleEndian);
    return this;
  }
}

export class Uint64 extends Base {
  v: bigint;
  size: number = 8;

  constructor(v: bigint = 0n) {
    super();
    this.v = v;
  }

  encode(encoder: Encoder) {
    const buffer = new ArrayBuffer(this.size);
    const view = new DataView(buffer);
    view.setBigUint64(0, this.v, encoder.config().littleEndian);
    encoder.writer().write(buffer);
  }

  decode(decoder: Decoder): this {
    const buffer = new ArrayBuffer(this.size);
    decoder.reader().read(buffer);
    const view = new DataView(buffer);
    this.v = view.getBigUint64(0, decoder.config().littleEndian);
    return this;
  }
}

const U128_MIN = BigInt(0);
const U128_MAX = BigInt(2) ** BigInt(128) - BigInt(1);

export class Uint128 extends Base {
  v: bigint;
  size: number = 16;

  constructor(v: bigint = 0n) {
    super();
    this.v = v;
  }

  encode(encoder: Encoder) {
    if (this.v < U128_MIN) {
      throw new Error(`u128 ${this.v} too small`);
    }
    if (this.v > U128_MAX) {
      throw new Error(`u128 ${this.v} too large`);
    }

    const buffer = new ArrayBuffer(this.size);
    const view = new DataView(buffer);

    if (encoder.config().littleEndian) {
      view.setBigUint64(0, this.v & BigInt("0xFFFFFFFFFFFFFFFF"), true);
      view.setBigUint64(8, this.v >> BigInt(64), true);
    } else {
      view.setBigUint64(0, this.v >> BigInt(64), false);
      view.setBigUint64(8, this.v & BigInt("0xFFFFFFFFFFFFFFFF"), false);
    }

    encoder.writer().write(buffer);
  }

  decode(decoder: Decoder): Uint128 {
    const buffer = new ArrayBuffer(this.size);
    decoder.reader().read(buffer);
    const view = new DataView(buffer);

    if (decoder.config().littleEndian) {
      let v = view.getBigUint64(0, true);
      let v1 = view.getBigUint64(8, true);
      this.v = v | (v1 << BigInt(64));
    } else {
      let v = view.getBigUint64(0, false);
      let v1 = view.getBigUint64(8, false);
      this.v = (v << BigInt(64)) | v1;
    }
    return this;
  }
}
