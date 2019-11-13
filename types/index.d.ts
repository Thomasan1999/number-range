declare class NumberRange
{
    constructor(min: number, max: number);
    public enumerate(step?: number): number[];
    public includes(searchNumber: number): boolean;
    public incorporate(numberToIncorporate: number): number;
    public max: number;
    public min: number;
}

export default NumberRange;
