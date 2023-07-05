import { Config } from "../config";
import { Reader } from "./read";

export interface Decoder {
  reader(): Reader;
  config(): Config;
}

export class DecoderImpl implements Decoder {
  r: Reader;
  c: Config;
  bytes_read: number;

  constructor(reader: Reader, config: Config) {
    this.r = reader;
    this.c = config;
    this.bytes_read = 0;
  }

  reader(): Reader {
    return this.r;
  }

  config(): Config {
    return this.c;
  }
}

export interface Decode {
  decode(decoder: Decoder): Decode;
}
