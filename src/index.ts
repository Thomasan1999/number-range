type BoundaryType = 'min' | 'max';

export = class NumberRange
{
    private _max: number;
    private _min: number;

    constructor(min: number, max: number)
    {
        this.min = min;
        this.max = max;
    }

    private _boundaryCheck(boundary: number, type: BoundaryType): void
    {
        if (typeof boundary !== `number` || Number.isNaN(boundary))
        {
            throw new Error(`The ${type}imal value of the range must be a numerical value`);
        }

        if (type === `min` ? boundary >= this._max : this._min >= boundary)
        {
            throw new Error(`The maximal value must be larger than the minimal value`);
        }
    }

    private _boundaryParse(boundary: any, type: BoundaryType): number
    {
        const boundaryParsed: number = Number(boundary);

        this._boundaryCheck(boundaryParsed, type);

        return boundaryParsed;
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

        return Array.from({length: Math.floor((this._max - this._min + step) / step)}, (_, index) =>
        {
            const nonFixedValue: number = this._min + (index * step);

            return decimalsCount > 0 ? Number(nonFixedValue.toFixed(decimalsCount)) : nonFixedValue;
        });
    }

    public includes(searchNumber: number): boolean
    {
        if (typeof searchNumber !== `number`)
        {
            throw new Error(`The search number must be a number`);
        }

        return searchNumber >= this._min && searchNumber <= this._max;
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
        this._max = this._boundaryParse(max, `max`);
    }

    public get min(): number
    {
        return this._min;
    }

    public set min(min: number)
    {
        this._min = this._boundaryParse(min, `min`);
    }
}
