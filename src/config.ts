export class Config {
  littleEndian: boolean;
  limit?: number;

  constructor(littleEndian: boolean = true, limit?: number) {
    this.littleEndian = littleEndian;
    this.limit = limit;
  }
}
