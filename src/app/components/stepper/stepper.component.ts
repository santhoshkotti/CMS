import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
})
export class StepperComponent implements OnInit {
  steps: Stepp[] = [
    {
      title: 'Step 1',
      iconViewBox: '0 0 18 20',
      iconPath:
        'M12 4.5v4.379a1.5 1.5 0 001.5 1.5h4.379M15 2.25H6a2.25 2.25 0 00-2.25 2.25v15A2.25 2.25 0 006 21.75h12a2.25 2.25 0 002.25-2.25V8.25L15 2.25z  ',
    },
    {
      title: 'Step 2',
      iconViewBox: '0 0 20 14',
      iconPath:
        'M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z ',
    },
    {
      title: 'Step 3',
      iconViewBox: '0 0 20 14',
      iconPath:
        'M18 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM2 12V6h16v6H2Z ',
    },
    {
      title: 'Step 4',
      iconViewBox: '0 0 22 22',
      iconPath:
        'M2.25 6.75A2.25 2.25 0 014.5 4.5h5.25a2.25 2.25 0 011.125.293l1.125.707a2.25 2.25 0 001.125.293h4.5a2.25 2.25 0 012.25 2.25v9.75a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75z ',
    },
    {
      title: 'Step 5',
      iconViewBox: '0 0 24 24',
      iconPath:
        'M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z  ',
    },

    {
      title: 'Info Symbol',
      iconViewBox: '0 0 24 24',
      iconPath:
        'M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10zm-1-14h2v2h-2zm0 4h2v6h-2z',
    },
  ];

  additionalFieldStep = 5;
  displayedSteps: Stepp[] = [];
  ngOnInit() {
    // this.displayedSteps = this.steps.slice(0, this.stepperField);
    this.updatedStepChanges();
  }

  ngOnChanges() {
    this.updatedStepChanges();
  }

  updatedStepChanges() {
    this.displayedSteps = this.steps.slice(0, this.stepperField);
  }

  nextStep() {
    if (this.currentStep < this.steps.length) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  @Input() currentStep: number = 0;
  @Input() stepperField: number = 5;
  // @Input() steps: string[] = [];
  // @Input() currentStep: number = 0;
}
interface Stepp {
  title: string;
  iconViewBox: string;
  iconPath: string;
}
