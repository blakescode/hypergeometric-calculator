import { Injectable } from '@angular/core';
import { HypergeometricParameters } from 'src/app/shared/models/hypergeometricParameters';
import { combinations } from 'mathjs';
import { HypergeometricResults } from 'src/app/shared/models/hypergeometricResults';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  public probabilities = new Map<number, number>(); // map probabilities for each integer value 0 -> sampleSize for use in cumulative probabilities
  public sampleSize = 0; 
  public sampleSuccesses = 0;

  constructor() { }

  public getHypergeometricDistribution(params: HypergeometricParameters): HypergeometricResults {
    this.sampleSize = params.sampleSize;
    this.sampleSuccesses = params.sampleSuccesses;
    this.probabilities.clear();
    for (let i = 0; i <= params.sampleSize; i++ ) {
      params.sampleSuccesses = i;
      this.probabilities.set(i, this.hypergeometricProbability(params));
    }
    return {
      equal: this.probabilities.get(this.sampleSuccesses)! * 100,
      lessThan: this.hyperLessThan(),
      lessThanOrEqual: this.hyperLessThanOrEqual(),
      greaterThan: this.hyperGreaterThan(),
      greaterThanOrEqual: this.hyperGreaterThanOrEqual()
    }

    // return in table format for display purposes?
    // or.. build tableService to construct data?
  }

  public hypergeometricProbability(params: HypergeometricParameters): number {
    /*
      from https://stattrek.com/probability-distributions/hypergeometric.aspx?tutorial=prob
      Suppose a population consists of N items, k of which are successes. 
      And a random sample drawn from that population consists of n items, x of which are successes.
      Then the hypergeometric probability is:
      h(x; N, n, k) = [ kCx ] [ (N-k)C(n-x) ] / [ NCn ]
      h(x; N, n, k) = sample * extra / population
    */
    /*
    N = PopulationSize
    k = PopulationSuccesses
    n = SampleSize
    x = SampleSuccesses

    */
    const kCx = combinations(params.populationSuccesses, params.sampleSuccesses);
    const NkCnx = combinations((params.populationSize - params.populationSuccesses), (params.sampleSize - params.sampleSuccesses));
    const NCn = combinations(params.populationSize, params.sampleSize);

    return (kCx * NkCnx) / NCn;
  }

  public hyperLessThan(): number {
    let result = 0;
    for (let i = 0; i < this.sampleSuccesses; i++ ) {
      result += this.probabilities.get(i)!;
    }
    return result * 100;
  }

  public hyperLessThanOrEqual(): number {
    let result = 0;
    for (let i = 0; i <= this.sampleSuccesses; i++ ) {
      result += this.probabilities.get(i)!;
    }
    return result * 100;
  }

  public hyperGreaterThan(): number {
    let result = 0;
    for (let i = (this.sampleSuccesses + 1); i <= this.sampleSize; i++ ) {
      result += this.probabilities.get(i)!;
    }
    return result * 100;
  }

  public hyperGreaterThanOrEqual(): number {
    let result = 0;
    for (let i = this.sampleSuccesses; i <= this.sampleSize; i++ ) {
      result += this.probabilities.get(i)!;
    }
    return result * 100;
  }
}
