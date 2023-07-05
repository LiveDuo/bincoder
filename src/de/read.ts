export interface Reader {
  read(buf: ArrayBuffer): void;
}

export class SliceReader implements Reader {
  slice: ArrayBuffer;

  constructor(slice: ArrayBuffer) {
    this.slice = slice;
  }

  read(buf: ArrayBuffer): void {
    if (buf.byteLength > this.slice.byteLength) {
      let addtional = buf.byteLength;
      this.slice.byteLength;
      throw new Error(`UnexpectedEnd: additional = ${addtional}`);
    }

    const bufArray = new Uint8Array(buf);
    const sliceArray = new Uint8Array(this.slice);
    bufArray.set(sliceArray.slice(0, buf.byteLength));

    let remainArray = sliceArray.slice(buf.byteLength);
    this.slice = remainArray.buffer;
  }
}
