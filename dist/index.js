"use strict";
/**
 * @class NumericRange
 * @description The class containing a numeric range limited by two bounds.
 * */
class NumericRange {
    /**
     * @constructor
     * @param min {number} The lower bound of the range
     * @param max {number} The upper bound of the range
     * */
    constructor(min, max) {
        this.min = min;
        this.max = max;
    }
    /**
     * @private
     * @method _boundCheck
     * @description Checks whether the bound has the right value. If not, throws an error. Should not be used directly.
     * @param bound {number} The numerical value of the bound.
     * @param type Determines whether the bound is upper or lower.
     * @returns void
     * */
    _boundCheck(bound, type) {
        if (typeof bound !== `number` || Number.isNaN(bound)) {
            throw new Error(`The ${type}imal value of the range must be a numerical value`);
        }
        if (type === `min` ? bound < this._max : this._min > bound) {
            throw new Error(`The maximal value cannot be smaller than the minimal value`);
        }
    }
    /**
     * @private
     * @method _boundParse
     * @description Parses the bound to the number type.
     * @param bound {*} The value of the bound.
     * @param type Determines whether the bound is upper or lower.
     * @returns number
     * */
    _boundParse(bound, type) {
        /** Bound parsed as a number. */
        const boundParsed = Number(bound);
        this._boundCheck(boundParsed, type);
        return boundParsed;
    }
    /**
     * @public
     * @method enumerate
     * @description The method returns an array of contained numbers inside the range including the bounds, step indicates the difference of two adjacent numbers of the
     * returned array.
     * @param [step=1] {number} The size of a step.
     * @returns number[];
     * */
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
    /**
     * @public
     * @method includes
     * @description Determines whether the number to check is contained in the range. If the search number is equal to either bound, the method returns true.
     * @param numberToCheck {number} The number to check whether is contained in the range.
     * @returns boolean
     * */
    includes(numberToCheck) {
        if (typeof numberToCheck !== `number`) {
            throw new Error(`The search number must be a number`);
        }
        return numberToCheck >= this._min && numberToCheck <= this._max;
    }
    /**
     * @public
     * @method incorporate
     * @description Incorporates the number given in the argument to the range, if the number is greater than the upper bound the number is set to the upper bound in the case
     * of the number.
     * being lower than the lower bound, the number is set to the value of the lower bound, in the case of the number being in the range, the number itself is returned.
     * @param numberToIncorporate {number} The number to incorporate to the range.
     * @returns number
     *  */
    incorporate(numberToIncorporate) {
        if (typeof numberToIncorporate !== `number`) {
            throw new Error(`The number to incorporate must be a number`);
        }
        return Math.min(Math.max(this._min, numberToIncorporate), this._max);
    }
    /**
     * @public
     * @property max
     * @description The upper bound of the range. The value itself is included in the range.
     * */
    get max() {
        return this._max;
    }
    set max(max) {
        this._max = this._boundParse(max, `max`);
    }
    /**
     * @public
     * @property min
     * @description The lower bound of the range. The value itself is included in the range.
     * */
    get min() {
        return this._min;
    }
    set min(min) {
        this._min = this._boundParse(min, `min`);
    }
}
module.exports = NumericRange;
//# sourceMappingURL=index.js.map