let problems = [];
let currentProblemIndex = 0;

function generateMultiplicationProblem(num1, num2) {
    return { num1, num2, answer: num1 * num2 };
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function generateProblems(table1, table2) {
    problems = [];
    for (let i = 1; i <= 10; i++) {
        problems.push(generateMultiplicationProblem(table1, i));
        problems.push(generateMultiplicationProblem(table2, i));
    }
    shuffle(problems);
}

function showQuestion() {
    if (currentProblemIndex < problems.length) {
        const problem = problems[currentProblemIndex];
        document.getElementById('question').textContent =
            `What is ${problem.num1} x ${problem.num2}?`;
        currentProblemIndex++;
        setTimeout(showQuestion, 4000);
    } else {
        showResults();
    }
}

function showResults() {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '<h2>Answers:</h2><ol>';
    problems.forEach(problem => {
        resultsContainer.innerHTML +=
            `<li>${problem.num1} x ${problem.num2} = ${problem.answer}</li>`;
    });
    resultsContainer.innerHTML += '</ol>';
    document.getElementById('question').textContent = 'Quiz completed!';
    document.getElementById('startButton').style.display = 'block';
}

function startQuiz() {
    const table1 = parseInt(document.getElementById('table1').value);
    const table2 = parseInt(document.getElementById('table2').value);
    if (isNaN(table1) || isNaN(table2)) {
        alert("Please enter valid times tables.");
        return;
    }
    generateProblems(table1, table2);
    currentProblemIndex = 0;
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('results').innerHTML = '';
    showQuestion();
}

document.getElementById('startButton').addEventListener('click', startQuiz);