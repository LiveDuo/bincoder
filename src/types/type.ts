import { Decode } from "../de/decoder";
import { Encode } from "../enc/encoder";

export interface Type extends Encode, Decode {
  size: number;
}
