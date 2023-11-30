/* eslint-disable @typescript-eslint/no-explicit-any */
import { encodeBase58BTC } from "./basetools";

const cidTypeResolver = 0x25;
const cidTypeRaw = 0x26;
const mhashBlake3Default = 0x1f;

/**
 * Encode a Content Identifier (CID).
 * @param {Uint8Array} hash - The hash to encode.
 * @param {number} size - The size of the content.
 * @param {number} [type] - The CID type (optional, defaults to cidTypeRaw).
 * @param {number} [hashType] - The hash type (optional, defaults to mhashBlake3Default).
 * @returns {string} The encoded CID.
 * @throws {Error} If the hash is not a Uint8Array or if size is missing.
 */
export function encodeCid(
  hash: Uint8Array,
  size: number,
  type = cidTypeRaw,
  hashType = mhashBlake3Default,
) {
  if (!(hash instanceof Uint8Array)) {
    throw new Error();
  }

  if (size === undefined || size === null) {
    throw new Error("size required");
  }

  const sizeBG = BigInt(size);

  const sizeBytes = new Uint8Array(8);
  const sizeView = new DataView(sizeBytes.buffer);
  sizeView.setBigInt64(0, sizeBG, true);
  
  let prefixedHash

  if (type === cidTypeResolver) {
  const sizeBytes0 = new Uint8Array(0);
    prefixedHash = Uint8Array.from([type, hashType, ...hash, ...sizeBytes0]);
  } else {
    prefixedHash = Uint8Array.from([type, hashType, ...hash, ...sizeBytes]);
  }

  return encodeBase58BTC(prefixedHash);
}

/**
 * Parses a JSON string and revives functions if found.
 * @param jsonString - The JSON string to parse.
 * @returns Parsed object with revived functions if present.
 */
export function JSONparse(jsonString: string): object {
  const obj = JSON.parse(jsonString);
  if (Object.values(obj).some(value => typeof value === 'string' && (/\b\w+\s*\(.*\)\s*{/).test(value))) {
    const reviveFunctions = (key: string, value: string): unknown =>
      typeof value === 'string' && (/\b\w+\s*\(.*\)\s*{/).test(value as string) ? new Function('return ' + value)() : value;

    return JSON.parse(jsonString, reviveFunctions);
  }
  return obj;
}

/**
 * Converts an object to a JSON string, including function string representations.
 * @param obj - The object to be converted.
 * @returns A JSON string representation of the object.
 */
export function JSONstringify(obj: { [key: string]: any }): string {
  if (Object.values(obj).some((value) => (/\b\w+\s*\(.*\)\s*{/).test(value))) {
    for (const key in obj) if (typeof obj[key] === 'function') obj[key] = obj[key].toString();
    return JSON.stringify(obj);
  }
  return JSON.stringify(obj);
}

/**
 * Downloads an MP3 file from the URL and returns its binary data as Uint8Array.
 * @param {string} url - MP3 file URL.
 * @returns {Promise<Uint8Array | null>} - Resolves to binary data or null on error.
 */
export async function downloadAndCreateUint8Array(url: string): Promise<Uint8Array | null> {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to download.`);
        return new Uint8Array(await response.arrayBuffer());
    } catch (error) {
        console.error('Error downloading:', error);
        return null;
    }
}

/**
 * Compares two Uint8Array objects for equality.
 * @param {Uint8Array} b1 - The first Uint8Array to compare.
 * @param {Uint8Array} b2 - The second Uint8Array to compare.
 * @returns {boolean} True if the Uint8Arrays are equal, false otherwise.
 */
export function equalBytes(b1: Uint8Array, b2: Uint8Array) {
  if (b1.length !== b2.length) return false;
  for (let i = 0; i < b1.length; i++) if (b1[i] !== b2[i]) return false;
  return true;
}

