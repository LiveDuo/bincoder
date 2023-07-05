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
import { Bool } from 'bincoder/types';

it("Bool", () => {
  let a = new Bool(true);

  let encoded = a.pack();
  console.log(encoded);

  let [decoded, size] = a.unpack(encoded);
  let [decoded1, _size] = new Bool().unpack(encoded);
  console.log(decoded, " ", size);

  expect(decoded).toEqual(a);
  expect(decoded1).toEqual(a);
});
```

## Class
```
import { Decoder } from 'bincoder/de';
import { Encoder } from 'bincoder/enc';
import { Base, Uint16, Uint32, Vec } from 'bincoder/types';

it("class with simple array", () => {
  let t = new SimpleArrayTest(
    new Uint16(1),
    new Vec(Uint32, [new Uint32(2), new Uint32(3)])
  );

  let encoded = t.pack();
  console.log("encoded: ", encoded);

  let [decoded, size] = t.unpack(encoded);
  let decodedObj = decoded as SimpleArrayTest;
  console.log("decodedObj.b.v: ", decodedObj.b.v, "size: ", size);

  expect(decodedObj.a).toEqual(t.a);
  expect(decodedObj.b.v).toEqual(t.b.v);
});

class SimpleArrayTest extends Base {
  a: Uint16;
  b: Vec<Uint32>;
  size: number;

  // must support parameterless constructor
  constructor(a: Uint16 = new Uint16(), b: Vec<Uint32> = new Vec(Uint32)) {
    this.a = a;
    this.b = b;
    this.size = this.a.size + this.b.size;
  }

  // must add encode method
  encode(encoder: Encoder) {
    this.a.encode(encoder);
    this.b.encode(encoder);
  }

  // must add decode method
  decode(decoder: Decoder): this {
    this.a = this.a.decode(decoder);
    this.b = this.b.decode(decoder);
    return this;
  }
}
```

More examples: `./__test__/*.test.ts`
