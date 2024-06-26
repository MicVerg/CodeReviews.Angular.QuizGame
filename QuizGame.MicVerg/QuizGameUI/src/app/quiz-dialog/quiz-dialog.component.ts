import { Component } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
  MatDialogConfig
} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Question } from '../question.model';
import { QuizServiceService } from '../quiz-service.service';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-quiz-dialog',
  standalone: true,
  imports: [MatDialogModule, CommonModule, MatButtonModule, MatPaginatorModule],
  templateUrl: './quiz-dialog.component.html',
  styleUrl: './quiz-dialog.component.css'
})
export class QuizDialogComponent {
  paginatedQuestions: Question[] = [];
  currentPageIndex = 0;
  constructor(@Inject(MAT_DIALOG_DATA) public questions: Question[]) {this.updatePaginatedQuestions(this.currentPageIndex, 3);}

  selectAnswer(questionId: number, answerId: number) {
    console.log("selectAnswer triggered, questionid: " + questionId + " answerId: " + answerId);
    const question = this.questions.find(q => q.id === questionId);

    if (!question) {
      console.error('Question not found');
      return;
    }

    question.isAnswerGiven = true;
    question.selectedAnswerId = answerId;
    
    //this.questions[questionId].isAnswerGiven = true;

    const isCorrect = answerId === question.correctAnswer;
    question.selectedAnswerIsCorrect = isCorrect;
  }

  onPageChange(event: PageEvent) {
    this.updatePaginatedQuestions(event.pageIndex, event.pageSize);
  }

  updatePaginatedQuestions(pageIndex: number, pageSize: number) {
    const startIdx = pageIndex * pageSize;
    const endIdx = startIdx + pageSize;
    this.paginatedQuestions = this.questions.slice(startIdx, endIdx);
  }
}


