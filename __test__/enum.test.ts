import { Base, Bool, Enum, Uint16, Uint32, Vec } from "../src/types";

describe("enum", () => {
  it("bool", () => {
    let a = new Test2(Test2Enum.A);
    a.t[Test2Enum.A] = new Bool(true);
    let encoded = a.pack();
    console.log(encoded);

    let b = new Test2();
    let [decoded, size] = b.unpack(encoded);
    let i = (decoded as Test2).i;
    console.log(i, " ", decoded, " ", size);

    expect(b.t[Test2Enum.A]).toEqual(a.t[Test2Enum.A]);
  });

  it("uint32", () => {
    let a = new Test2(Test2Enum.B);
    a.t[Test2Enum.B] = new Uint32(6);
    let encoded = a.pack();
    console.log(encoded);

    let b = new Test2();
    let [decoded, size] = b.unpack(encoded);
    let i = (decoded as Test2).i;
    console.log(i, " ", decoded, " ", size);

    expect(b.t[Test2Enum.B]).toEqual(a.t[Test2Enum.B]);
  });

  it("class in enum", () => {
    let a = new Test2(Test2Enum.C);
    a.t[Test2Enum.C] = new Test(new Uint16(1), new Uint32(2));
    let encoded = a.pack();
    console.log(encoded);

    let b = new Test2();
    let [decoded, size] = b.unpack(encoded);
    let i = (decoded as Test2).i;
    console.log(i, " ", decoded, " ", size);

    expect(b.t[Test2Enum.C]).toEqual(a.t[Test2Enum.C]);
  });

  it("enum in class", () => {
    let a = new Test3(new Test2(Test2Enum.C));
    a.a.t[Test2Enum.C] = new Test(new Uint16(1), new Uint32(2));
    let encoded = a.pack();
    console.log(encoded);

    let b = new Test3();
    let [decoded, size] = b.unpack(encoded);
    console.log(" ", decoded, " ", size);

    expect(b.a.t[Test2Enum.C]).toEqual(a.a.t[Test2Enum.C]);
  });

  it("vec in enum", () => {
    let a = new Test2(Test2Enum.D);
    a.t[Test2Enum.D] = new Vec(Bool, [new Bool(true)]);
    let encoded = a.pack();
    console.log(encoded);

    let b = new Test2();
    let [decoded, size] = b.unpack(encoded);
    console.log(decoded, " ", size);

    expect(b.t[Test2Enum.D]).toEqual(a.t[Test2Enum.D]);
  });

  it("enum in vec", () => {
    let a = new Vec(Test, [new Test(new Uint16(1), new Uint32(2))]);
    let encoded = a.pack();
    console.log(encoded);

    let b = new Vec(Test);
    let [decoded, size] = b.unpack(encoded);
    console.log(decoded, " ", size);

    expect(b.v[0].a).toEqual(a.v[0].a);
  });
});

class Test extends Base {
  a: Uint16;
  b: Uint32;

  constructor(a: Uint16 = new Uint16(), b: Uint32 = new Uint32()) {
    super();
    this.a = a;
    this.b = b;
  }
}

enum Test2Enum {
  A,
  B,
  C,
  D,
}

class Test2 extends Enum {
  init() {
    return {
      [Test2Enum.A]: new Bool(),
      [Test2Enum.B]: new Uint32(),
      [Test2Enum.C]: new Test(),
      [Test2Enum.D]: new Vec(Bool),
    };
  }
}

class Test3 extends Base {
  a: Test2;

  constructor(a: Test2 = new Test2()) {
    super();
    this.a = a;
  }
}
