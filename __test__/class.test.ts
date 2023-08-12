import { Arr, Base, Uint16, Uint32, Vec } from "../src/types";

describe("class", () => {
  it("simple class", () => {
    let t = new Test(new Uint16(1), new Uint32(2));

    let encoded = t.pack();
    console.log(encoded);

    let [decoded, size] = new Test().unpack(encoded);
    console.log(decoded, " ", size);

    expect((decoded as Test).a).toEqual(t.a);
    expect((decoded as Test).b).toEqual(t.b);

    t.b = new Uint32(3);

    let encoded1 = t.pack();
    console.log(encoded1);

    let [decoded1, size1] = new Test().unpack(encoded1);
    console.log(decoded1, " ", size1);

    expect((decoded1 as Test).b).toEqual(t.b);
  });

  it("class with simple vec", () => {
    let t = new SimpleVecTest(
      new Uint16(1),
      new Vec(Uint32, [new Uint32(2), new Uint32(3)])
    );

    let encoded = t.pack();
    console.log("encoded: ", encoded);

    let [decoded, size] = new SimpleVecTest().unpack(encoded);
    let decodedObj = decoded as SimpleVecTest;
    console.log("decodedObj.b.v: ", decodedObj.b.v, "size: ", size);

    expect(decodedObj.a).toEqual(t.a);
    expect(decodedObj.b.v).toEqual(t.b.v);
  });

  it("class with simple array", () => {
    let t = new SimpleArrTest(
      new Arr(Uint32, 2, [new Uint16(2), new Uint16(3)])
    );

    let encoded = t.pack();
    console.log("encoded: ", encoded);

    let [decoded, size] = new SimpleArrTest().unpack(encoded);
    let decodedObj = decoded as SimpleArrTest;
    console.log("decodedObj.b.v: ", decodedObj.a.v, "size: ", size);

    expect(decodedObj.a.v).toEqual(t.a.v);
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

    expect((decoded as NestedTest).a).toEqual(t.a);
    expect((decoded as NestedTest).b.a).toEqual(t.b.a);
    expect((decoded as NestedTest).b.b).toEqual(t.b.b);
  });

  it("complicated class", () => {
    let t = new ComplicatedTest(
      new Uint16(1),
      new Vec(NestedTest, [
        new NestedTest(new Uint16(1), new Test(new Uint16(2), new Uint32(3))),
        new NestedTest(new Uint16(4), new Test(new Uint16(5), new Uint32(6))),
      ]),
      new Arr(NestedTest, 1, [
        new NestedTest(new Uint16(1), new Test(new Uint16(2), new Uint32(3))),
      ])
    );

    let encoded = t.pack();
    console.log("encoded: ", encoded);

    let [decoded, size] = new ComplicatedTest().unpack(encoded);
    let decodedObj = decoded as ComplicatedTest;
    console.log("decodedObj.b.v: ", decodedObj.b.v, "size: ", size);

    expect(decodedObj.a).toEqual(t.a);
    expect(decodedObj.b.v).toEqual(t.b.v);
    expect(decodedObj.c.v).toEqual(t.c.v);
  });

  it("class with nested class vec * 2", () => {
    let t = new Test2(
      new Vec(Test1, [
        new Test1(
          new Vec(Uint16, [new Uint16(1), new Uint16(2)]),
          new Arr(Uint16, 1, [new Uint16(2)])
        ),
        new Test1(
          new Vec(Uint16, [new Uint16(3), new Uint16(4)]),
          new Arr(Uint16, 1, [new Uint16(2)])
        ),
      ]),
      new Arr(Test1, 1, [
        new Test1(
          new Vec(Uint16, [new Uint16(1), new Uint16(2)]),
          new Arr(Uint16, 1, [new Uint16(2)])
        ),
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

    for (let i = 0; i < decodedObj.b.v.length; i++) {
      console.log("item: ", decodedObj.b.v[i].a);
      expect(decodedObj.b.v[i].a).toEqual(t.b.v[i].a);
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

class SimpleVecTest extends Base {
  a: Uint16;
  b: Vec<Uint32>;

  constructor(a: Uint16 = new Uint16(), b: Vec<Uint32> = new Vec(Uint32)) {
    super();
    this.a = a;
    this.b = b;
  }
}

class SimpleArrTest extends Base {
  a: Arr<Uint16, 2>;

  constructor(a: Arr<Uint16, 2> = new Arr(Uint16, 2)) {
    super();
    this.a = a;
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
  c: Arr<NestedTest, 1>;

  constructor(
    a: Uint16 = new Uint16(),
    b: Vec<NestedTest> = new Vec(NestedTest),
    c: Arr<NestedTest, 1> = new Arr(NestedTest, 1)
  ) {
    super();
    this.a = a;
    this.b = b;
    this.c = c;
  }
}

class Test1 extends Base {
  a: Vec<Uint16>;
  b: Arr<Uint16, 1>;

  constructor(
    a: Vec<Uint16> = new Vec(Uint16),
    b: Arr<Uint16, 1> = new Arr(Uint16, 1)
  ) {
    super();
    this.a = a;
    this.b = b;
  }
}

class Test2 extends Base {
  a: Vec<Test1>;
  b: Arr<Test1, 1>;

  constructor(
    a: Vec<Test1> = new Vec(Test1),
    b: Arr<Test1, 1> = new Arr(Test1, 1)
  ) {
    super();
    this.a = a;
    this.b = b;
  }
}
