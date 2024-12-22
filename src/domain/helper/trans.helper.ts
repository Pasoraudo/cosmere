import { without } from "lodash-es";

export const TRANSLATE_SEPARATOR = ".";
export const buildTranslationKey = (...elements: string[]): string =>
	without(elements, "").join(TRANSLATE_SEPARATOR);
