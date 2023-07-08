import { Base, Uint16, Uint32, Vec } from "../src/types";

describe("class", () => {
  it("simple class", () => {
    let t = new Test(new Uint16(1), new Uint32(2));

    let encoded = t.pack();
    console.log(encoded);

    let [decoded, size] = new Test().unpack(encoded);
    console.log(decoded, " ", size);

    expect(decoded).toEqual(t);

    t.b = new Uint32(3);

    let encoded1 = t.pack();
    console.log(encoded1);

    let [decoded1, size1] = new Test().unpack(encoded1);
    console.log(decoded1, " ", size1);

    expect(decoded1).toEqual(t);
  });

  it("class with simple array", () => {
    let t = new SimpleArrayTest(
      new Uint16(1),
      new Vec(Uint32, [new Uint32(2), new Uint32(3)])
    );

    let encoded = t.pack();
    console.log("encoded: ", encoded);

    let [decoded, size] = new SimpleArrayTest().unpack(encoded);
    let decodedObj = decoded as SimpleArrayTest;
    console.log("decodedObj.b.v: ", decodedObj.b.v, "size: ", size);

    expect(decodedObj.a).toEqual(t.a);
    expect(decodedObj.b.v).toEqual(t.b.v);
  });

  it("nested class", () => {
    let t = new NestedTest(
      new Uint16(1),
      new Test(new Uint16(2), new Uint32(3))
    );

    let encoded = t.pack();
    console.log(encoded);

    let [decoded, size] = new NestedTest().unpack(encoded);
    console.log(decoded, " ", size);

    expect(decoded).toEqual(t);
  });

  it("complicated class", () => {
    let t = new ComplicatedTest(
      new Uint16(1),
      new Vec(NestedTest, [
        new NestedTest(new Uint16(1), new Test(new Uint16(2), new Uint32(3))),
        new NestedTest(new Uint16(4), new Test(new Uint16(5), new Uint32(6))),
      ])
    );

    let encoded = t.pack();
    console.log("encoded: ", encoded);

    let [decoded, size] = new ComplicatedTest().unpack(encoded);
    let decodedObj = decoded as ComplicatedTest;
    console.log("decodedObj.b.v: ", decodedObj.b.v, "size: ", size);

    expect(decodedObj.a).toEqual(t.a);
    expect(decodedObj.b.v).toEqual(t.b.v);
  });

  it("class with nested class array", () => {
    let t = new ComplicatedTest(
      new Uint16(1),
      new Vec(NestedTest, [
        new NestedTest(new Uint16(1), new Test(new Uint16(2), new Uint32(3))),
        new NestedTest(new Uint16(4), new Test(new Uint16(5), new Uint32(6))),
      ])
    );

    let encoded = t.pack();
    console.log("encoded: ", encoded);

    let [decoded, size] = new ComplicatedTest().unpack(encoded);
    let decodedObj = decoded as ComplicatedTest;
    console.log("decodedObj.b.v: ", decodedObj.b.v, "size: ", size);

    expect(decodedObj.a).toEqual(t.a);
    expect(decodedObj.b.v).toEqual(t.b.v);
  });

  it("class with nested class array * 2", () => {
    let t = new Test2(
      new Vec(Test1, [
        new Test1(new Vec(Uint16, [new Uint16(1), new Uint16(2)])),
        new Test1(new Vec(Uint16, [new Uint16(3), new Uint16(4)])),
      ])
    );

    let encoded = t.pack();
    console.log("encoded: ", encoded);

    let [decoded, _size] = new Test2().unpack(encoded);
    let decodedObj = decoded as Test2;
    for (let i = 0; i < decodedObj.a.v.length; i++) {
      console.log("item: ", decodedObj.a.v[i].a);
      expect(decodedObj.a.v[i].a).toEqual(t.a.v[i].a);
    }
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

class SimpleArrayTest extends Base {
  a: Uint16;
  b: Vec<Uint32>;

  constructor(a: Uint16 = new Uint16(), b: Vec<Uint32> = new Vec(Uint32)) {
    super();
    this.a = a;
    this.b = b;
  }
}

class NestedTest extends Base {
  a: Uint16;
  b: Test;

  constructor(a: Uint16 = new Uint16(), b: Test = new Test()) {
    super();
    this.a = a;
    this.b = b;
  }
}

class ComplicatedTest extends Base {
  a: Uint16;
  b: Vec<NestedTest>;

  constructor(
    a: Uint16 = new Uint16(),
    b: Vec<NestedTest> = new Vec(NestedTest)
  ) {
    super();
    this.a = a;
    this.b = b;
  }
}

class Test1 extends Base {
  a: Vec<Uint16>;

  constructor(a: Vec<Uint16> = new Vec(Uint16)) {
    super();
    this.a = a;
  }
}

class Test2 extends Base {
  a: Vec<Test1>;

  constructor(a: Vec<Test1> = new Vec(Test1)) {
    super();
    this.a = a;
  }
}
