import {
  Bool,
  Int8,
  Int16,
  Int32,
  Int64,
  Int128,
  Option,
  Uint8,
  Uint16,
  Uint32,
  Uint64,
  Uint128,
  Vec,
  String,
} from "../src/types";

describe("basic types", () => {
  it("Bool", () => {
    let a = new Bool(true);

    let encoded = a.pack();
    console.log(encoded);

    let [decoded, size] = new Bool().unpack(encoded);
    console.log(decoded, " ", size);

    expect(decoded).toEqual(a);
  });

  it("Int8", () => {
    let a = new Int8(3);

    let encoded = a.pack();
    console.log(encoded);

    let [decoded, size] = new Int8().unpack(encoded);
    console.log(decoded, " ", size);

    expect(decoded).toEqual(a);
  });

  it("Int16", () => {
    let a = new Int16(3);

    let encoded = a.pack();
    console.log(encoded);

    let [decoded, size] = new Int16().unpack(encoded);
    console.log(decoded, " ", size);

    expect(decoded).toEqual(a);
  });

  it("Int32", () => {
    let a = new Int32(3);

    let encoded = a.pack();
    console.log(encoded);

    let [decoded, size] = new Int32().unpack(encoded);
    console.log(decoded, " ", size);

    expect(decoded).toEqual(a);
  });

  it("Int64", () => {
    let a = new Int64(3n);

    let encoded = a.pack();
    console.log(encoded);

    let [decoded, size] = new Int64().unpack(encoded);
    console.log(decoded, " ", size);

    expect(decoded).toEqual(a);
  });

  it("Int128", () => {
    let a = new Int128(-3n);

    let encoded = a.pack();
    console.log(encoded);

    let [decoded, size] = new Int128().unpack(encoded);
    console.log(decoded, " ", size);

    expect(decoded).toEqual(a);
  });

  it("Uint8", () => {
    let a = new Uint8(3);

    let encoded = a.pack();
    console.log(encoded);

    let [decoded, size] = new Uint8().unpack(encoded);
    console.log(decoded, " ", size);

    expect(decoded).toEqual(a);
  });

  it("Uint16", () => {
    let a = new Uint16(3);

    let encoded = a.pack();
    console.log(encoded);

    let [decoded, size] = new Uint16().unpack(encoded);
    console.log(decoded, " ", size);

    expect(decoded).toEqual(a);
  });

  it("Uint32", () => {
    let a = new Uint32(3);

    let encoded = a.pack();
    console.log(encoded);

    let [decoded, size] = new Uint32().unpack(encoded);
    console.log(decoded, " ", size);

    expect(decoded).toEqual(a);
  });

  it("Uint64", () => {
    let a = new Uint64(3n);

    let encoded = a.pack();
    console.log(encoded);

    let [decoded, size] = new Uint64().unpack(encoded);
    console.log(decoded, " ", size);

    expect(decoded).toEqual(a);
  });

  it("Uint128", () => {
    let a = new Uint128(3n);

    let encoded = a.pack();
    console.log(encoded);

    let [decoded, size] = new Uint128().unpack(encoded);
    console.log(decoded, " ", size);

    expect(decoded).toEqual(a);
  });

  it("Option", () => {
    let a = new Option(new Uint16(1));

    let encoded = a.pack();
    console.log(encoded);

    let [decoded, size] = new Option(new Uint16()).unpack(encoded);
    console.log(decoded, " ", size);

    expect(decoded).toEqual(a);

    let b = new Option();

    let encoded1 = b.pack();
    console.log(encoded1);

    let [decoded1, size1] = new Option(new Uint16()).unpack(encoded1);
    console.log(decoded1, " ", size1);

    expect(decoded1).toEqual(b);
  });

  it("Vec", () => {
    let a = new Vec(Uint64, [new Uint64(1n), new Uint64(2n)]);

    let encoded = a.pack();
    console.log("encoded: ", encoded);

    let [decoded, size] = new Vec(Uint64).unpack(encoded);
    console.log("decoded: ", decoded, " ", size);

    expect(decoded).toEqual(a);
  });

  it("String", () => {
    let a = new String("hello");

    let encoded = a.pack();
    console.log(encoded);

    let [decoded, size] = new String().unpack(encoded);
    console.log(decoded, " ", size);

    expect(decoded).toEqual(a);
  });
});
