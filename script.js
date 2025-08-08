const questions = [
    {question: "Wofür steht „CEM I“ auf einem Zementsack?", options: ["Portlandkompositzement", "Reiner Portlandzement", "Weißzement", "Hochofenzement"], answer: 1},
    {question: "Was bedeutet die Zahl 42,5 bei „CEM I 42,5 R“?", options: ["Rohstoffanteil in %", "Festigkeitsklasse in MPa", "Wassergehalt", "Zementfeinheit"], answer: 1},
    {question: "Wofür steht das „R“ bei „CEM I 42,5 R“?", options: ["Rückverfestigung", "Schnell erhärtend", "Rostschutz", "Resistenz gegen Frost"], answer: 1},
    {question: "Was bedeutet „C 12/15“ bei Beton?", options: ["Chloridgehalt", "Druckfestigkeit in MPa", "Zementanteil", "Körnung"], answer: 1},
    {question: "Die Abkürzung „XC4“ steht für:", options: ["Beton mit hohem Wasseranteil", "Expositionsklasse bei Wechsel von Nass/Trocken", "Beton für Innenräume", "Frostbeständiger Leichtbeton"], answer: 1},
    {question: "In welchem Fall ist Bewehrung im Beton nötig?", options: ["Bei Biegebeanspruchung", "Bei geringer Last", "Bei reiner Druckbelastung", "Bei Dekorbeton"], answer: 0},
    {question: "Worauf muss beim Einbau der Bewehrung geachtet werden?", options: ["Richtige Lage und Abstände", "Farbe der Stäbe", "Kein Beton auf der Bewehrung", "Dünne Betondeckung"], answer: 0},
    {question: "Ein Vorteil von Fertigbeton ist:", options: ["Schwankende Qualität", "Konstante Qualität", "Unabhängig vom Transport", "Günstiger als Baustellenmischung"], answer: 1},
    {question: "Ein Nachteil von Baustellenmischung ist:", options: ["Unabhängig vom Transport", "Qualität kann schwanken", "Billige Herstellung", "Schneller Einbau"], answer: 1},
    {question: "Bei Hitze sollte frischer Beton:", options: ["Sofort abgebrochen werden", "Abgedeckt und feucht gehalten werden", "Gefroren werden", "Lackiert werden"], answer: 1},
    {question: "Die Sieblinie beschreibt:", options: ["Die Wasseraufnahme des Betons", "Die Korngrößenverteilung der Zuschläge", "Die Zementfeinheit", "Die Betonfarbe"], answer: 1},
    {question: "Wofür steht F3 in C3/F3?", options: ["Frostwiderstandsklasse", "Festigkeitsklasse", "Feuchtigkeitsklasse", "Formklasse"], answer: 0},
    {question: "Welche Konsistenzklasse beschreibt erdfeuchten Beton?", options: ["F6", "E", "C", "F1"], answer: 1},
    {question: "Der Wasserzementwert beschreibt:", options: ["Verhältnis Zement/Sand", "Verhältnis Wasser/Zement", "Verhältnis Wasser/Kies", "Verhältnis Zement/Kies"], answer: 1},
    {question: "Was passiert bei zu geringem Wasserzementwert?", options: ["Beton trocknet schneller", "Schlechtere Erhärtung", "Höhere Festigkeit", "Mehr Luftporen"], answer: 1}
];

let currentQuestionIndex = 0;
let score = 0;
let shuffledQuestions = [];

const quizElement = document.getElementById('quiz');
const nextButton = document.getElementById('next-btn');
const resultElement = document.getElementById('result');
const progressBar = document.getElementById('progress-bar');

function startQuiz() {
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;
    nextButton.classList.add('hidden');
    resultElement.classList.add('hidden');
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = shuffledQuestions[currentQuestionIndex];
    let questionElement = document.createElement('h2');
    questionElement.innerText = currentQuestion.question;
    quizElement.appendChild(questionElement);

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('div');
        button.innerText = option;
        button.classList.add('option');
        button.addEventListener('click', () => selectAnswer(index));
        quizElement.appendChild(button);
    });

    updateProgress();
}

function resetState() {
    quizElement.innerHTML = '';
}

function selectAnswer(index) {
    let correct = shuffledQuestions[currentQuestionIndex].answer;
    const options = document.querySelectorAll('.option');
    options.forEach((option, i) => {
        if (i === correct) {
            option.classList.add('correct');
        } else if (i === index) {
            option.classList.add('wrong');
        }
        option.style.pointerEvents = 'none';
    });
    if (index === correct) {
        score++;
    }
    nextButton.classList.remove('hidden');
}

function updateProgress() {
    const progress = ((currentQuestionIndex) / shuffledQuestions.length) * 100;
    progressBar.style.width = progress + '%';
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    resetState();
    resultElement.classList.remove('hidden');
    resultElement.innerHTML = `<h2>Du hast ${score} von ${shuffledQuestions.length} Punkten erreicht.</h2>`;
    nextButton.innerText = 'Nochmal spielen';
    nextButton.onclick = startQuiz;
}

startQuiz();
