type BoundType = 'min' | 'max';

class NumericRange
{
    private _max: number;
    private _min: number;

    constructor(min: number, max: number)
    {
        this.min = min;
        this.max = max;
    }

    private _boundCheck(bound: number, type: BoundType): void
    {
        if (typeof bound !== `number` || Number.isNaN(bound))
        {
            throw new Error(`The ${type}imal value of the range must be a numerical value`);
        }

        if (type === `min` ? bound < this._max : this._min > bound)
        {
            throw new Error(`The maximal value cannot be smaller than the minimal value`);
        }
    }

    private _boundParse(bound: any, type: BoundType): number
    {
        /** Bound parsed as a number. */
        const boundParsed: number = Number(bound);

        this._boundCheck(boundParsed, type);

        return boundParsed;
    }

    public enumerate(step: number = 1): number[]
    {
        if (typeof step !== `number`)
        {
            throw new Error(`The step must be a number`);
        }

        if (step <= 0)
        {
            throw new Error(`The step must be a positive number`);
        }

        const decimalsString: string = step.toString().split(`.`)[1];
        const decimalsCount: number = decimalsString ? decimalsString.length : 0;

        const roundingFactor: number = 10 ** decimalsCount;

        return Array.from({length: Math.floor((this._max - this._min + step) / step)}, (_, index) =>
        {
            const nonFixedValue: number = this._min + (index * step);

            return decimalsCount > 0 ? Math.round(nonFixedValue * roundingFactor) / roundingFactor : nonFixedValue;
        });
    }

    public includes(numberToCheck: number): boolean
    {
        if (typeof numberToCheck !== `number`)
        {
            throw new Error(`The search number must be a number`);
        }

        return numberToCheck >= this._min && numberToCheck <= this._max;
    }

    public incorporate(numberToIncorporate: number): number
    {
        if (typeof numberToIncorporate !== `number`)
        {
            throw new Error(`The number to incorporate must be a number`);
        }

        return Math.min(Math.max(this._min, numberToIncorporate), this._max);
    }

    public get max(): number
    {
        return this._max;
    }

    public set max(max: number)
    {
        this._max = this._boundParse(max, `max`);
    }

    public get min(): number
    {
        return this._min;
    }

    public set min(min: number)
    {
        this._min = this._boundParse(min, `min`);
    }
}

export = NumericRange;
