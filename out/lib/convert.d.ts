import { Image } from './canvas';
import { ImageMode, OutputMode } from './enums';
export interface ConverterOptions {
    dith?: boolean;
    cf: ImageMode;
    outputFormat: OutputMode;
    binaryFormat: ImageMode;
    swapEndian: boolean;
    outName: string;
    useLegacyFooterOrder?: boolean;
    use565A8alpha?: boolean;
    overrideWidth?: number;
    overrideHeight?: number;
}
declare class Converter {
    w: number;
    h: number;
    raw_len: number;
    cf: ImageMode;
    outputFormat: OutputMode;
    alpha: boolean;
    chroma: boolean;
    d_out: Array<number>;
    imageData: Array<number> | Uint8Array;
    options: ConverterOptions;
    r_act: number;
    b_act: number;
    g_act: number;
    r_earr: Array<number>;
    g_earr: Array<number>;
    b_earr: Array<number>;
    r_nerr: number;
    g_nerr: number;
    b_nerr: number;
    pass: number;
    constructor(w: number, h: number, imageData: any, alpha: boolean, options: Partial<ConverterOptions>);
    /**
     * Get the number of passes being made over an image to output it.
     */
    getNumPasses(): 1 | 2;
    convert(): Promise<string | ArrayBuffer>;
    get_c_header(out_name: string): string;
    static imagemode_to_enum_name($cf: ImageMode): string;
    get_c_footer($cf: any, out_name: any): any;
    private conv_px;
    dith_reset(): void;
    dith_next(r: any, g: any, b: any, x: any): void;
    classify_pixel(value: any, bits: any): number;
    format_to_c_array(): string;
}
export declare function isNotRaw(options: {
    cf: ImageMode;
}): boolean;
declare function convertImageBlob(img: Image | Uint8Array, options: Partial<ConverterOptions>): Promise<string | ArrayBuffer>;
export { convertImageBlob, Converter };
