const startingScore = {
  player1: 0,
  player2: 0,
  currentQuestion: {},
  which: true
};
const $question = $('#question');
const $A = $('#A');
const $B = $('#B');
const $C = $('#C');
const $D = $('#D');
const $player1Score = $('#player1 h4');
const $player2Score = $('#player2 h4');
console.log($player1Score, $player2Score);


const chosenAnswer = (event, question) => {
    console.log(event);
    if(event.target.innerText === question.answer){
        if(startingScore.which){
            startingScore.player1++;
            startingScore.which = !startingScore.which;
        }else{
            startingScore.player2++;
            startingScore.which = !startingScore.which;

        }
        settingTheBoard(questions);
    }else{
      // console.log("incorrect")
        settingTheBoard(questions);
         startingScore.which = !startingScore.which;

    }
};
const settingTheBoard = (q) => {
  const $randIndex = Math.floor(Math.random() * q.length);
  const $randQuestion = q[$randIndex];
  $question.text($randQuestion.question);
  $A.text($randQuestion.a);
  $B.text($randQuestion.b);
  $C.text($randQuestion.c);
  $D.text($randQuestion.d);

  $player1Score.text(startingScore.player1);
  $player2Score.text(startingScore.player2);

  $("li").off();
  $("li").on("click", (event) => {
      chosenAnswer(event, $randQuestion);
  });
}

const URL ='https://cdn.contentful.com/spaces/qkkrrddxra5l/environments/master/entries?access_token=Sf8n-O63Czjc3mfUMksBzSIqt1CaiMxLwERL8GWYU_M&content_type=TriviaQ'
$.ajax(URL)
.then((data) => {
  questions = data.items.map((q) => q.fields);
  console.log(data);
  console.log(questions);

  settingTheBoard(questions);
});
