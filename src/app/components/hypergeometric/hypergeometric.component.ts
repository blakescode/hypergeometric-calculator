import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalculatorService } from 'src/app/services/calculator/calculator.service';
import { HypergeometricParameters } from 'src/app/shared/models/hypergeometricParameters';
import { HypergeometricResults } from 'src/app/shared/models/hypergeometricResults';
import { TableEntry } from 'src/app/shared/models/tableEntry';

@Component({
  selector: 'app-hypergeometric',
  templateUrl: './hypergeometric.component.html',
  styleUrls: ['./hypergeometric.component.scss']
})
export class HypergeometricComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private calculatorService: CalculatorService
  ) { }

  public hgForm!: FormGroup;
  public submitted: boolean = false;
  public sampleSuccessesToDisplay!: number;
  public results!: HypergeometricResults;
  public tableData!: TableEntry[];

  public ngOnInit(): void {
    this.hgForm = this.formBuilder.group({
      populationSize: [null, Validators.required],
      populationSuccesses: [null, Validators.required],
      sampleSize: [null, Validators.required],
      sampleSuccesses: [null, Validators.required]
    });
  }

  public onSubmit(): void {
    this.submitted = true;
    const params = this.mapFormToParams();
    this.sampleSuccessesToDisplay = params.sampleSuccesses;
    this.results = this.calculatorService.getHypergeometricDistribution(params);
  }

  private mapFormToParams(): HypergeometricParameters {
    return {
      populationSize: this.hgForm.controls.populationSize.value,
      populationSuccesses: this.hgForm.controls.populationSuccesses.value,
      sampleSize: this.hgForm.controls.sampleSize.value,
      sampleSuccesses: this.hgForm.controls.sampleSuccesses.value
    };
  }
}
