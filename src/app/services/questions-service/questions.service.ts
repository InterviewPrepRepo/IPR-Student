import { Injectable } from '@angular/core';
import { Question } from 'src/models/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  javaQuestions: Question[] = [
    {
      question: "What is the output of the following Java code?\nint x = 5;\nSystem.out.println(x++);",
      options: ["5", "6", "Compiler error", "Runtime error"],
      answer: "5",
    },
    {
      question: "Which keyword is used to allocate memory to an object in Java?",
      options: ["create", "new", "allocate", "object"],
      answer: "create",
    },
    {
      question: "What is the correct way to declare a constant variable in Java?",
      options: ["constant int MAX_VALUE = 10", "int constant MAX_VALUE = 10", "static final int MAX_VALUE = 10", "final int MAX_VALUE = 10"],
      answer: "static final int MAX_VALUE = 10",
    },
    {
      question: "Which of the following is not a valid data type in Java?",
      options: ["float", "double", "decimal", "long"],
      answer: "decimal",
    },
    {
      question: "What is the correct syntax to create an array in Java?",
      options: ["int[] myArray = new int[5]", "int myArray = new int[5]", "int myArray[5]", "myArray = new int[5]"],
      answer: "int[] myArray = new int[5]",
    },
    {
      question: 'What is the result of the expression "Hello" + 5 + 3 in Java?',
      options: ["Hello53", "Hello8", "Compiler error", "Runtime error"],
      answer: "Hello53",
    },
    {
      question: "Which keyword is used to inherit a class in Java?",
      options: ["super", "parent", "extends", "inherit"],
      answer: "extends",
    },
    {
      question: "What is the output of the following Java code?\nint i = 0;\ndo {\n  System.out.print(i);\n  i++;\n} while (i < 5);",
      options: ["01234", "12345", "1234", "012345"],
      answer: "01234",
    },
    {
      question: "What is the default value of an uninitialized variable of type int in Java?",
      options: ["0", "1", "-1", "Compiler error"],
      answer: "0",
    },
    {
      question: "Which operator is used to compare two values for equality in Java?",
      options: ["==", "=", "!=", ">"],
      answer: "==",
    },
    {
      question: "What is the correct way to write a comment in Java?",
      options: ["/* This is a comment */", "// This is a comment", "<!-- This is a comment -->", "** This is a comment **"],
      answer: "// This is a comment",
    },
    {
      question: "What is the output of the following Java code?\nint x = 10;\nint y = 5;\nSystem.out.println(x % y);",
      options: ["2", "1", "0", "5"],
      answer: "0",
    },
    {
      question: "Which of the following is a reserved keyword in Java?",
      options: ["var", "type", "class", "value"],
      answer: "var",
    },
    {
      question: "What is the correct way to exit a loop in Java?",
      options: ["stop", "exit", "break", "return"],
      answer: "break",
    },
    {
      question: "What is the output of the following Java code?\nString str = \"Java\";\nSystem.out.println(str.length());",
      options: ["3", "4", "5", "Compiler error"],
      answer: "4",
    },
    {
      question: "Which of the following is not a primitive data type in Java?",
      options: ["int", "boolean", "char", "string"],
      answer: "string",
    }
  ]
  constructor() { }

  getQuestions(): Question[] {
    let randomQuestions: Question[] = [];
    for (let i = 0; i < 5; i++) {
      let randomIndex = Math.floor(Math.random() * 16);
      randomQuestions.push(this.javaQuestions[randomIndex]);
    }
    return randomQuestions;
  }
}
