declare enum ImageMode {
    ICF_TRUE_COLOR_ARGB8332 = 0,
    ICF_TRUE_COLOR_ARGB8565 = 1,
    ICF_TRUE_COLOR_ARGB8565_RBSWAP = 2,
    ICF_TRUE_COLOR_ARGB8888 = 3,
    CF_ALPHA_1_BIT = 4,
    CF_ALPHA_2_BIT = 5,
    CF_ALPHA_4_BIT = 6,
    CF_ALPHA_8_BIT = 7,
    CF_INDEXED_1_BIT = 8,
    CF_INDEXED_2_BIT = 9,
    CF_INDEXED_4_BIT = 10,
    CF_INDEXED_8_BIT = 11,
    CF_RAW = 12,
    CF_RAW_CHROMA = 12,
    CF_RAW_ALPHA = 13,
    CF_TRUE_COLOR = 14,
    CF_TRUE_COLOR_ALPHA = 15,
    CF_TRUE_COLOR_CHROMA = 16,
    CF_RGB565A8 = 17
}
declare class ImageModeUtil {
    static isTrueColor(mode: string | ImageMode): boolean;
}
declare enum OutputMode {
    C = 0,
    BIN = 1
}
declare const BINARY_FORMAT_PREFIX = "ICF_TRUE_COLOR_";
export { ImageMode, ImageModeUtil, OutputMode, BINARY_FORMAT_PREFIX };
