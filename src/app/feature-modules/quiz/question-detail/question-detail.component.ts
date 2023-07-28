import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Question } from 'src/app/models/question';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.scss']
})
export class QuestionDetailComponent {
  @Input() question: Question = {
    question: '',
    options: [],
    answer: ''
  };

  questionForm = new FormGroup({
    answer: new FormControl(this.question.options[0])
  }
  );
  submitted: boolean = false;
  result: string = '';
  onSubmit(): void {
    // check if the option is the same as the answer
    if (this.question.answer === this.questionForm.value.answer) {
      this.result = 'Correct!';
    } else {
      this.result = "Sorry your answer wasn't correct.";
    }
    this.submitted = true;
  }
  setColor(option: string): string {
    if (!this.submitted) return '';
    if (this.submitted && option == this.question.answer) return 'green';
    else return 'red';
  }
}
