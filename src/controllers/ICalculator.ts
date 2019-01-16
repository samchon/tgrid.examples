export interface ICompositeCalculator extends ISimple
{
    scientific: IScientific;
    statistics: IStatistics;
}

export interface ISimple
{
    plus(x: number, y: number): number;
    minus(x: number, y: number): number;
    multiplies(x: number, y: number): number;
    divides(x: number, y: number): number;
}
export interface IScientific
{
    pow(x: number, y: number): number;
    sqrt(x: number): number;
    log(x: number, y: number): number;
}
export interface IStatistics
{
    mean(...elems: number[]): number;
    stdev(...elems: number[]): number;
}