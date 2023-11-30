/**
 * Encode a Content Identifier (CID).
 * @param {Uint8Array} hash - The hash to encode.
 * @param {number} size - The size of the content.
 * @param {number} [type] - The CID type (optional, defaults to cidTypeRaw).
 * @param {number} [hashType] - The hash type (optional, defaults to mhashBlake3Default).
 * @returns {string} The encoded CID.
 * @throws {Error} If the hash is not a Uint8Array or if size is missing.
 */
export declare function encodeCid(hash: Uint8Array, size: number, type?: number, hashType?: number): string;
/**
 * Parses a JSON string and revives functions if found.
 * @param jsonString - The JSON string to parse.
 * @returns Parsed object with revived functions if present.
 */
export declare function JSONparse(jsonString: string): object;
/**
 * Converts an object to a JSON string, including function string representations.
 * @param obj - The object to be converted.
 * @returns A JSON string representation of the object.
 */
export declare function JSONstringify(obj: {
    [key: string]: any;
}): string;
/**
 * Downloads an MP3 file from the URL and returns its binary data as Uint8Array.
 * @param {string} url - MP3 file URL.
 * @returns {Promise<Uint8Array | null>} - Resolves to binary data or null on error.
 */
export declare function downloadAndCreateUint8Array(url: string): Promise<Uint8Array | null>;
/**
 * Compares two Uint8Array objects for equality.
 * @param {Uint8Array} b1 - The first Uint8Array to compare.
 * @param {Uint8Array} b2 - The second Uint8Array to compare.
 * @returns {boolean} True if the Uint8Arrays are equal, false otherwise.
 */
export declare function equalBytes(b1: Uint8Array, b2: Uint8Array): boolean;
//# sourceMappingURL=browserTestTools.d.ts.map