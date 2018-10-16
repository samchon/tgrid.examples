import { 
	ICalculator, 
	INormal, IScientific, IStatistics
} from "./ICalculator";

export class Calculator implements ICalculator
{
	public normal = new Normal();
	public scientific = new Scientific();
	public statistics = new Statistics();
}

class Normal implements INormal
{
	public plus(x: number, y: number): number
	{
		return x + y;
	}
	public minus(x: number, y: number): number
	{
		return x - y;
	}
	public multiplies(x: number, y: number): number
	{
		return x * y;
	}
	public divides(x: number, y: number): number
	{
		return x / y;
	}
}

class Scientific implements IScientific
{
	public pow(x: number, y: number): number
	{
		return Math.pow(x, y);
	}
	public log(x: number, y: number): number
	{
		return Math.log(y) / Math.log(x);
	}
	public sqrt(x: number): number
	{
		return Math.sqrt(x);
	}
}

class Statistics implements IStatistics
{
	public mean(...elems: number[]): number
	{
		let ret: number = 0;
		for (let val of elems)
			ret += val;
		return ret / elems.length;
	}

	public stdev(...elems: number[]): number
	{
		let mean: number = this.mean(...elems);
		let ret: number = 0;

		for (let val of elems)
			ret += Math.pow(val - mean, 2);

		return Math.sqrt(ret / elems.length);
	}
}