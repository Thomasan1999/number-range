"use strict";
class NumericRange {
    constructor(min, max) {
        this.min = min;
        this.max = max;
    }
    _boundCheck(bound, type) {
        if (typeof bound !== `number` || Number.isNaN(bound)) {
            throw new Error(`The ${type}imal value of the range must be a numerical value`);
        }
        if (type === `min` ? bound < this._max : this._min > bound) {
            throw new Error(`The maximal value cannot be smaller than the minimal value`);
        }
    }
    _boundParse(bound, type) {
        /** Bound parsed as a number. */
        const boundParsed = Number(bound);
        this._boundCheck(boundParsed, type);
        return boundParsed;
    }
    enumerate(step = 1) {
        if (typeof step !== `number`) {
            throw new Error(`The step must be a number`);
        }
        if (step <= 0) {
            throw new Error(`The step must be a positive number`);
        }
        const decimalsString = step.toString().split(`.`)[1];
        const decimalsCount = decimalsString ? decimalsString.length : 0;
        const roundingFactor = 10 ** decimalsCount;
        return Array.from({ length: Math.floor((this._max - this._min + step) / step) }, (_, index) => {
            const nonFixedValue = this._min + (index * step);
            return decimalsCount > 0 ? Math.round(nonFixedValue * roundingFactor) / roundingFactor : nonFixedValue;
        });
    }
    includes(numberToCheck) {
        if (typeof numberToCheck !== `number`) {
            throw new Error(`The search number must be a number`);
        }
        return numberToCheck >= this._min && numberToCheck <= this._max;
    }
    incorporate(numberToIncorporate) {
        if (typeof numberToIncorporate !== `number`) {
            throw new Error(`The number to incorporate must be a number`);
        }
        return Math.min(Math.max(this._min, numberToIncorporate), this._max);
    }
    get max() {
        return this._max;
    }
    set max(max) {
        this._max = this._boundParse(max, `max`);
    }
    get min() {
        return this._min;
    }
    set min(min) {
        this._min = this._boundParse(min, `min`);
    }
}
module.exports = NumericRange;
//# sourceMappingURL=index.js.map