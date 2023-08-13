import { Config } from "../config";
import { Decode, Decoder, DecoderImpl, SliceReader } from "../de";
import { Encoder, EncoderImpl, SizeWriter, VecWriter } from "../enc";
import { Type } from "./type";

export class Base implements Type {
  size: number = 0;

  pack(config: Config = new Config()): ArrayBuffer {
    let size_writer = new SizeWriter();
    let size_encoder = new EncoderImpl(size_writer, config);
    this.encode(size_encoder);
    let size = size_writer.bytesWritten;

    let writer = new VecWriter();
    let encoder = new EncoderImpl(writer, config);
    this.encode(encoder);

    let buffer = new ArrayBuffer(size);
    const array = new Uint8Array(buffer);
    let offset = 0;

    for (let i = 0; i < writer.vec.length; i++) {
      array.set(new Uint8Array(writer.vec[i]), offset);
      offset += writer.vec[i].byteLength;
    }

    if (this.size === 0) {
      this.size = size;
    }
    return buffer;
  }

  unpack(buffer: ArrayBuffer, config: Config = new Config()): [Decode, number] {
    let reader = new SliceReader(buffer);
    let decoder = new DecoderImpl(reader, config);
    let result = this.decode(decoder);
    let bytes_read = buffer.byteLength - reader.slice.byteLength;
    return [result, bytes_read];
  }

  encode(encoder: Encoder) {
    for (const prop of Object.values(this)) {
      if (prop instanceof Base) {
        prop.encode(encoder);
      }
    }
  }

  decode(decoder: Decoder): this {
    for (let prop of Object.values(this)) {
      if (prop instanceof Base) {
        prop = prop.decode(decoder);
      }
    }
    return this;
  }
}
