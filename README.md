A binary encoder / decoder implementation in Typescript.

The repo is heavily inspired by [bincode](https://github.com/bincode-org/bincode).

# Test
```
cd bincoder
yarn
yarn run test
```

# Install

```
yarn add bincoder
```

# Example
## Basic Type
```
import { Bool } from 'bincoder';

it("Bool", () => {
  let a = new Bool(true);

  let encoded = a.pack();
  console.log(encoded);

  let [decoded, size] = new Bool().unpack(encoded);
  console.log(decoded, " ", size);

  expect(decoded).toEqual(a);
});
```

## Class
```
import { Base, Uint16, Uint32, Vec } from 'bincoder';

class SimpleArrayTest extends Base {
  a: Uint16;
  b: Vec<Uint32>;

  constructor(a: Uint16 = new Uint16(), b: Vec<Uint32> = new Vec(Uint32)) {
    super();
    this.a = a;
    this.b = b;
  }
}

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
```

More examples: `./__test__/*.test.ts`
