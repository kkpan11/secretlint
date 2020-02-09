import * as assert from "assert";
import StructuredSource from "structured-source";
import {
    SecretLintSourceCode,
    SecretLintSourceNodeLocation,
    SecretLintSourceNodePosition,
    SecretLintSourceNodeRange
} from "@secretlint/types";

/**
 * This class represent of source code.
 */
export class SecretLintSourceCodeImpl implements SecretLintSourceCode {
    readonly hasBOM: boolean;
    readonly content: string;
    readonly filePath: string | undefined;
    readonly ext: string;
    private structuredSource: StructuredSource;

    constructor({ content = "", ext, filePath }: { content: string; ext: string; filePath: string }) {
        assert.ok(ext || filePath, "should be set either of fileExt or filePath.");
        this.hasBOM = content.charCodeAt(0) === 0xfeff;
        this.content = this.hasBOM ? content.slice(1) : content;
        this.structuredSource = new StructuredSource(this.content);
        this.filePath = filePath;
        this.ext = ext;
    }

    /**
     * get filePath
     * @returns {string|undefined}
     */
    getFilePath() {
        return this.filePath;
    }

    /**
     * @param {SecretLintSourceNodeLocation} loc - location indicator.
     * @return {[ number, number ]} range.
     */
    locationToRange(loc: SecretLintSourceNodeLocation): SecretLintSourceNodeRange {
        return this.structuredSource.locationToRange(loc);
    }

    /**
     * @param {[ number, number ]} range - pair of indice.
     * @return {SecretLintSourceNodeLocation} location.
     */
    rangeToLocation(range: SecretLintSourceNodeRange): SecretLintSourceNodeLocation {
        return this.structuredSource.rangeToLocation(range as [number, number]);
    }

    /**
     * @param {Position} pos - position indicator.
     * @return {number} index.
     */
    positionToIndex(pos: SecretLintSourceNodePosition): number {
        return this.structuredSource.positionToIndex(pos);
    }

    /**
     * @param {number} index - index to the source code.
     * @return {Position} position.
     */
    indexToPosition(index: number): SecretLintSourceNodePosition {
        return this.structuredSource.indexToPosition(index);
    }
}
