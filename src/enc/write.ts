export interface Writer {
  write(buf: ArrayBuffer): void;
}

export class SizeWriter implements Writer {
  bytesWritten: number = 0;

  write(buf: ArrayBuffer) {
    this.bytesWritten += buf.byteLength;
  }
}

export class VecWriter implements Writer {
  vec: Array<ArrayBuffer> = [];

  write(buf: ArrayBuffer) {
    this.vec.push(buf);
  }
}
