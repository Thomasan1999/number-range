/** The class containing a numeric range limited by two bounds. */
declare class NumericRange
{
    /**
     * @param min The lower bound of the range
     * @param max The upper bound of the range
     * */
    constructor(min: number, max: number);
    /**
     * @description The method returns an array of contained numbers inside the range including the bounds, step indicates the difference of two adjacent numbers of the
     * returned array.
     * @param [step=1] The size of a step.
     * */
    public enumerate(step?: number): number[];
    /**
     * @description Determines whether the number to check is contained in the range. If the search number is equal to either bound, the method returns true.
     * @param numberToCheck The number to check whether is contained in the range.
     * */
    public includes(numberToCheck: number): boolean;
    /**
     * @description Incorporates the number given in the argument to the range, if the number is greater than the upper bound the number is set to the upper bound in the case
     * of the number being lower than the lower bound, the number is set to the value of the lower bound, in the case of the number being in the range, the number itself is
     * returned.
     * @param numberToIncorporate The number to incorporate to the range.
     *  */
    public incorporate(numberToIncorporate: number): number;
    /** The upper bound of the range. The value itself is included in the range. */
    public max: number;
    /** The lower bound of the range. The value itself is included in the range. */
    public min: number;
}

export default NumericRange;
