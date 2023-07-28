import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/models/question';
import { QuestionsService } from 'src/app/services/questions-service/questions.service';

@Component({
  selector: 'app-question-carousel',
  templateUrl: './question-carousel.component.html',
  styleUrls: ['./question-carousel.component.scss']
})
export class QuestionCarouselComponent implements OnInit {
  currentSlide: number = 0;
  warning: string = 'warning';
  striped: any = 'striped';
  next: number = 0;
  ngOnInit(): void {
    this.sampleQuestions = this.questions.getQuestions();
  }
  constructor(private questions: QuestionsService) { }
  sampleQuestions: Question[] = []

  onPreviousClick() {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.currentSlide : previous;
  }

  onNextClick() {
    this.next = this.currentSlide + 1;
    this.currentSlide = this.next === this.sampleQuestions.length ? this.currentSlide : this.next;

  }
}

