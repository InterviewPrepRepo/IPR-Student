import { ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent {
  chosenQuiz: string = '';
  availableQuizzes: string[] = ['Core Java', 'Angular', 'Docker', 'AWS foundations']

  constructor(private cdr: ChangeDetectorRef) { }

  onTakeQuiz(index: number) {
    if (index !== -1) {
      this.chosenQuiz = this.availableQuizzes[index];
      this.cdr.detectChanges();
    }
  }
}
