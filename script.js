let quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
let currentQuiz = [];
let currentQuizIndex = 0;
let score = 0;
let qIndex = 0;

function showSection(id) {
    document.querySelectorAll(".section").forEach(sec => sec.classList.add("hidden"));
    document.getElementById(id).classList.remove("hidden");
    if (id === "list") loadQuizList();
}

function addQuestion() {
    const q = document.getElementById("question").value;
    const opts = [
        opt1.value, opt2.value, opt3.value, opt4.value
    ];
    const ans = answer.value;

    if (!q || opts.includes("") || ans === "") {
        alert("Fill all fields");
        return;
    }

    currentQuiz.push({ q, opts, ans });
    document.getElementById("msg").innerText = "Question Added";

    question.value = opt1.value = opt2.value = opt3.value = opt4.value = "";
}

function saveQuiz() {
    const title = quizTitle.value;
    if (!title || currentQuiz.length === 0) {
        alert("Add quiz title & questions");
        return;
    }

    quizzes.push({ title, questions: currentQuiz });
    localStorage.setItem("quizzes", JSON.stringify(quizzes));

    currentQuiz = [];
    quizTitle.value = "";
    document.getElementById("msg").innerText = "Quiz Saved Successfully!";
}

function loadQuizList() {
    const list = document.getElementById("quizList");
    list.innerHTML = "";

    quizzes.forEach((q, i) => {
        const li = document.createElement("li");
        li.innerText = q.title;
        li.onclick = () => startQuiz(i);
        list.appendChild(li);
    });
}

function startQuiz(index) {
    currentQuizIndex = index;
    qIndex = 0;
    score = 0;
    showSection("take");
    loadQuestion();
}

function loadQuestion() {
    const quiz = quizzes[currentQuizIndex];
    const q = quiz.questions[qIndex];

    takeTitle.innerText = quiz.title;
    takeQuestion.innerText = q.q;
    options.innerHTML = "";

    q.opts.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.innerText = opt;
        btn.onclick = () => {
            if (i == q.ans) score++;
            nextQuestion();
        };
        options.appendChild(btn);
    });
}

function nextQuestion() {
    qIndex++;
    if (qIndex < quizzes[currentQuizIndex].questions.length) {
        loadQuestion();
    } else {
        showSection("result");
        score.innerText = `Your Score: ${score}`;
    }
}
