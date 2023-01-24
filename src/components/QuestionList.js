import React from "react";
import { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch(" http://localhost:4000/questions")
    .then((res) => res.json())
    .then((questions) => { setQuestions(questions);
  });
 }, []);
   console.log(questions);
// render the return value of the map to the component

function handleDelete(id){
  fetch(`http://localhost:4000/questions/${id}`, {
  method: "DELETE",
  })
  .then((res) => res.json())
  .then(() =>{
    
    const updatedQuizes = questions.filter((quiz) => quiz.id !==id);
    setQuestions(updatedQuizes);
  });
}

  function answerChange(id, correctIndex){
    fetch(`http://localhost:4000/questions/${id}`,{
      method:"PATCH",
      headers:{
        "Content-Type" : "application/json"
      },
      body:JSON.stringify({correctIndex}),
      })
      .then((res) =>res.json())
      .then((updatedQuiz) => {
        const updatedQuizes = questions.map((quiz) =>{
          if(quiz.id === updatedQuiz.id)
          return updatedQuiz;
          return quiz;
        });
        setQuestions(updatedQuizes);
      });
    
  }

  const questionItem =questions.map((quiz)=>(
    <QuestionItem 
    key={quiz.id}
    question={quiz}
    deleteQuiz={handleDelete}
    onAnswerChange={answerChange}
    
    />
  ));


  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{ questionItem}</ul>
    </section>
  );
}

export default QuestionList;