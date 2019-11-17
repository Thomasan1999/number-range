"use strict";
module.exports = class NumericRange {
    constructor(min, max) {
        this.min = min;
        this.max = max;
    }
    _boundCheck(bound, type) {
        if (typeof bound !== `number` || Number.isNaN(bound)) {
            throw new Error(`The ${type}imal value of the range must be a numerical value`);
        }
        if (type === `min` ? bound >= this._max : this._min >= bound) {
            throw new Error(`The maximal value must be larger than the minimal value`);
        }
    }
    _boundParse(boundary, type) {
        const boundaryParsed = Number(boundary);
        this._boundCheck(boundaryParsed, type);
        return boundaryParsed;
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
        return Array.from({ length: Math.floor((this._max - this._min + step) / step) }, (_, index) => {
            const nonFixedValue = this._min + (index * step);
            return decimalsCount > 0 ? Number(nonFixedValue.toFixed(decimalsCount)) : nonFixedValue;
        });
    }
    includes(searchNumber) {
        if (typeof searchNumber !== `number`) {
            throw new Error(`The search number must be a number`);
        }
        return searchNumber >= this._min && searchNumber <= this._max;
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
};
//# sourceMappingURL=index.js.map