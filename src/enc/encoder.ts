import { Config } from "../config";
import { Writer } from "./write";

export interface Encoder {
  writer(): Writer;
  config(): Config;
}

export class EncoderImpl implements Encoder {
  w: Writer;
  c: Config;

  constructor(writer: Writer, config: Config) {
    this.w = writer;
    this.c = config;
  }

  writer(): Writer {
    return this.w;
  }

  config(): Config {
    return this.c;
  }
}

export interface Encode {
  encode(encoder: Encoder): void;
}
