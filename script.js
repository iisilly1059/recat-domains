let currentGrade = '';
let currentSubject = '';
let currentTopic = '';
let currentQuestion = 0;
let selectedOption = null;
let answered = false;
let correctAnswers = 0;
let streak = 0;
let bestStreak = 0;
let points = 0;
let questionsPerSession = 5;
let currentQuestionPool = [];

let soundEnabled = true;
let animationsEnabled = true;

const grades = [
    'Kindergarten', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5',
    'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'
];

const subjects = {
    math: {
        name: 'Mathematics',
        icon: 'math',
        color: 'math',
        desc: 'Numbers, algebra, geometry, calculus & more',
        topics: ['Numbers & Counting', 'Addition & Subtraction', 'Multiplication', 'Fractions', 'Decimals', 'Algebra Basics', 'Geometry', 'Statistics', 'Functions', 'Calculus Intro']
    },
    ela: {
        name: 'English Language Arts',
        icon: 'ela',
        color: 'ela',
        desc: 'Reading, writing, grammar & literature',
        topics: ['Phonics & Letters', 'Sight Words', 'Reading Comprehension', 'Grammar Basics', 'Sentence Writing', 'Paragraphs', 'Literary Elements', 'Essay Writing', 'Research Skills', 'Rhetoric & Analysis']
    },
    science: {
        name: 'Science',
        icon: 'science',
        color: 'science',
        desc: 'Biology, physics, chemistry & earth science',
        topics: ['Animals & Plants', 'Weather & Seasons', 'Matter & Energy', 'Forces & Motion', 'Earth & Space', 'Human Body', 'Ecosystems', 'Chemistry Basics', 'Physics Laws', 'Scientific Method']
    },
    social: {
        name: 'Social Studies',
        icon: 'social',
        color: 'social',
        desc: 'History, geography, civics & economics',
        topics: ['Community & Families', 'Maps & Directions', 'Native Peoples', 'Explorers & Colonies', 'American Revolution', 'U.S. Government', 'World Cultures', 'Economics Basics', 'Modern History', 'Global Issues']
    }
};

const icons = {
    math: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    ela: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
    science: '<path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/>',
    social: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>'
};

const gradeSVGs = [
    '<circle cx="12" cy="12" r="10"/><circle cx="8" cy="8" r="3"/><circle cx="16" cy="8" r="3"/><circle cx="8" cy="16" r="3"/><circle cx="16" cy="16" r="3"/>',
    '<text x="12" y="17" font-size="20" text-anchor="middle" dominant-baseline="middle">1</text>',
    '<path d="M12 2c-4 0-7 3-7 7 0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z"/><circle cx="12" cy="9" r="2"/>',
    '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
    '<path d="M17 3a2.8 2.8 0 0 1 4 0l1 1a2.8 2.8 0 0 1 0 4L9 21H3v-6z"/>',
    '<path d="M4 22h16M4 4h16v16H4z"/><path d="M8 8h8v8H8z"/>',
    '<rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/>',
    '<path d="M3 21h18M3 3v18M21 3v18"/><path d="M12 3v18M3 12h18"/>',
    '<path d="M3 17c3-8 6-10 9-10s6 2 9 10"/>',
    '<path d="M3 12c3-6 6-6 9 0s6 6 9 0"/>',
    '<path d="M4 20h16M12 4v16"/><path d="M8 16c2-4 4-4 6 0s4 4 6 0"/>',
    '<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
    '<path d="M12 2v20M2 12h20"/><circle cx="12" cy="12" r="10"/>'
];

const questions = {
    math: [
        { q: "What is 2 + 3?", options: ["4", "5", "6", "7"], correct: 1, gradeMin: 0, gradeMax: 2 },
        { q: "Which number comes after 8?", options: ["7", "9", "10", "11"], correct: 1, gradeMin: 0, gradeMax: 2 },
        { q: "How many sides does a square have?", options: ["3", "4", "5", "6"], correct: 1, gradeMin: 0, gradeMax: 2 },
        { q: "What is 7 × 6?", options: ["36", "42", "48", "54"], correct: 1, gradeMin: 3, gradeMax: 5 },
        { q: "What is 3/4 of 12?", options: ["6", "9", "8", "10"], correct: 1, gradeMin: 3, gradeMax: 5 },
        { q: "What is 0.75 as a fraction?", options: ["3/4", "1/2", "2/3", "1/4"], correct: 0, gradeMin: 3, gradeMax: 5 },
        { q: "Solve: 4x - 12 = 8", options: ["x = 5", "x = 6", "x = 4", "x = 8"], correct: 0, gradeMin: 6, gradeMax: 8 },
        { q: "What is the perimeter of a rectangle 5 by 9?", options: ["28", "45", "14", "32"], correct: 0, gradeMin: 6, gradeMax: 8 },
        { q: "What is 15% of 200?", options: ["20", "30", "25", "35"], correct: 1, gradeMin: 6, gradeMax: 8 },
        { q: "Factor x² - 25", options: ["(x-5)(x+5)", "(x-25)(x+1)", "(x-5)^2", "x(x-25)"], correct: 0, gradeMin: 9 },
        { q: "What is the derivative of 5x^4?", options: ["20x^3", "15x^3", "5x^3", "20x^4"], correct: 0, gradeMin: 11 },
        { q: "Solve the system: x + y = 7, x - y = 3", options: ["x=5, y=2", "x=4, y=3", "x=6, y=1", "x=7, y=0"], correct: 0, gradeMin: 9 }
    ],
    ela: [
        { q: "What is a noun?", options: ["Action word", "Person, place or thing", "Describing word", "Connecting word"], correct: 1, gradeMin: 0, gradeMax: 3 },
        { q: "Which word rhymes with cat?", options: ["Dog", "Hat", "Car", "Book"], correct: 1, gradeMin: 0, gradeMax: 2 },
        { q: "What is the main idea of a story?", options: ["The title", "What the story is mostly about", "The pictures", "The last sentence"], correct: 1, gradeMin: 3, gradeMax: 5 },
        { q: "What does a comma do in a sentence?", options: ["Ends it", "Pauses or separates ideas", "Makes it louder", "Changes the meaning"], correct: 1, gradeMin: 4, gradeMax: 7 },
        { q: "What is a metaphor?", options: ["Direct comparison using like or as", "Comparison saying something IS something else", "Exaggeration", "Repetition of sounds"], correct: 1, gradeMin: 8 }
    ],
    science: [
        { q: "What do plants need to grow?", options: ["Darkness", "Sunlight and water", "Candy", "Toys"], correct: 1, gradeMin: 0, gradeMax: 3 },
        { q: "What is the boiling point of water?", options: ["0°C", "50°C", "100°C", "200°C"], correct: 2, gradeMin: 4, gradeMax: 6 },
        { q: "What force pulls objects toward Earth?", options: ["Magnetism", "Gravity", "Friction", "Electricity"], correct: 1, gradeMin: 5, gradeMax: 8 },
        { q: "What gas do plants take in during photosynthesis?", options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"], correct: 1, gradeMin: 7 }
    ],
    social: [
        { q: "Who helps keep our community safe?", options: ["Firefighters and police", "Chefs", "Teachers only", "Doctors only"], correct: 0, gradeMin: 0, gradeMax: 3 },
        { q: "What do we call a drawing of the Earth?", options: ["Map", "Book", "Toy", "Song"], correct: 0, gradeMin: 2, gradeMax: 5 },
        { q: "What is the capital of the United States?", options: ["New York", "California", "Washington, D.C.", "Florida"], correct: 2, gradeMin: 4, gradeMax: 7 },
        { q: "What document starts with 'We the People'?", options: ["Declaration of Independence", "U.S. Constitution", "Bill of Rights", "Gettysburg Address"], correct: 1, gradeMin: 8 }
    ]
};

function init() {
    renderGrades();
    initCounters();
    initSettings();
}

function initCounters() {
    document.querySelectorAll('.counter').forEach(el => {
        const target = parseInt(el.dataset.target, 10);
        let count = 0;
        const increment = target / 60;
        const interval = setInterval(() => {
            count += increment;
            if (count >= target) {
                el.textContent = target + (target === 100 ? '%' : '+');
                clearInterval(interval);
            } else {
                el.textContent = Math.floor(count) + (target === 100 ? '%' : '+');
            }
        }, 35);
    });
}

function initSettings() {
    document.getElementById('questions-slider').addEventListener('input', e => {
        questionsPerSession = +e.target.value;
        document.getElementById('questions-value').textContent = questionsPerSession;
    });

    document.getElementById('sound-toggle').addEventListener('change', e => soundEnabled = e.target.checked);
    document.getElementById('animations-toggle').addEventListener('change', e => {
        animationsEnabled = e.target.checked;
        document.body.style.setProperty('--animation-state', animationsEnabled ? 'running' : 'paused');
    });
}

function toggleSettings() {
    const panel = document.getElementById('settings-panel');
    panel.classList.toggle('active');
}

// Optional: Close the panel if the user clicks outside of it
window.onclick = function(event) {
    const panel = document.getElementById('settings-panel');
    const settingsBtn = document.querySelector('.settings-btn');
    if (!panel.contains(event.target) && !settingsBtn.contains(event.target) && panel.classList.contains('active')) {
        panel.classList.remove('active');
    }
}

function renderGrades() {
    const grid = document.getElementById('grade-grid');
    grid.innerHTML = grades.map((grade, i) => `
        <div class="grade-card" onclick="selectGrade('${grade}')">
            <svg class="grade-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                ${gradeSVGs[i]}
            </svg>
            <div class="grade-name">${grade}</div>
            <svg class="grade-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"/>
            </svg>
        </div>
    `).join('');

    const filter = document.getElementById('grade-filter');
    if (filter) {
        filter.addEventListener('input', e => {
            const term = e.target.value.toLowerCase();
            [...grid.children].forEach(card => {
                card.style.display = card.textContent.toLowerCase().includes(term) ? '' : 'none';
            });
        });
    }
}

function renderSubjects() {
    const grid = document.getElementById('subjects-grid');
    grid.innerHTML = Object.entries(subjects).map(([key, sub]) => `
        <div class="subject-card" onclick="selectSubject('${key}')">
            <div class="subject-icon-wrapper ${sub.color}">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    ${icons[sub.icon]}
                </svg>
            </div>
            <h3>${sub.name}</h3>
            <p class="subject-desc">${sub.desc}</p>
            <div class="subject-footer">
                <span class="topic-count">${sub.topics.length} topics</span>
                <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="9 18 15 12 9 6"/>
                </svg>
            </div>
        </div>
    `).join('');
}

function renderTopics() {
    const sub = subjects[currentSubject];
    document.getElementById('subject-title').textContent = sub.name;
    document.getElementById('subject-desc').textContent = sub.desc;

    document.getElementById('topic-icon').innerHTML = `
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            ${icons[sub.icon]}
        </svg>
    `;
    document.getElementById('topic-icon').className = `topic-icon-large ${sub.color}`;

    const list = document.getElementById('topics-list');
    list.innerHTML = sub.topics.map((topic, i) => `
        <div class="topic-item" onclick="startPractice('${topic}')">
            <div class="topic-item-content">
                <div class="topic-number">${i+1}</div>
                <span>${topic}</span>
            </div>
            <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"/>
            </svg>
        </div>
    `).join('');
}

function renderQuestion() {
    if (currentQuestion >= currentQuestionPool.length) {
        showResults();
        return;
    }

    const q = currentQuestionPool[currentQuestion];

    document.getElementById('question-counter').textContent = `${currentQuestion + 1} / ${currentQuestionPool.length}`;
    document.getElementById('question-number').textContent = `Question ${currentQuestion + 1}`;
    document.getElementById('topic-name').textContent = currentTopic;
    document.getElementById('question-text').textContent = q.q;

    const answeredSoFar = currentQuestion + (answered ? 1 : 0);
    const accuracy = answeredSoFar === 0 ? 0 : Math.round((correctAnswers / answeredSoFar) * 100);
    document.getElementById('accuracy').textContent = accuracy + '%';

    document.getElementById('points-display').textContent = points;

    document.getElementById('streak-display').style.display = streak > 0 ? 'flex' : 'none';
    if (streak > 0) document.getElementById('streak-value').textContent = streak + '🔥';

    const progress = (currentQuestion / currentQuestionPool.length) * 100;
    document.getElementById('progress-bar').style.width = progress + '%';
    document.getElementById('progress-label').textContent = Math.round(progress) + '% Complete';

    const container = document.getElementById('options-container');
    container.innerHTML = q.options.map((opt, i) => `
        <button class="option-btn" onclick="selectOption(${i})">
            ${opt}
        </button>
    `).join('');

    document.getElementById('submit-btn').disabled = true;
    document.getElementById('feedback').classList.remove('show', 'correct', 'incorrect');
}

function selectOption(index) {
    if (answered) return;
    selectedOption = index;

    document.querySelectorAll('.option-btn').forEach((btn, i) => {
        btn.classList.toggle('selected', i === index);
    });

    document.getElementById('submit-btn').disabled = false;
}

function checkAnswer() {
    if (selectedOption === null || answered) return;
    answered = true;

    const q = currentQuestionPool[currentQuestion];
    const buttons = document.querySelectorAll('.option-btn');

    buttons.forEach(b => b.disabled = true);

    if (selectedOption === q.correct) {
        buttons[selectedOption].classList.add('correct');
        correctAnswers++;
        streak++;
        bestStreak = Math.max(bestStreak, streak);
        points += 10 + (streak * 5);
        document.getElementById('feedback').textContent = 'Correct!';
        document.getElementById('feedback').classList.add('show', 'correct');
    } else {
        buttons[selectedOption].classList.add('incorrect');
        buttons[q.correct].classList.add('correct');
        streak = 0;
        document.getElementById('feedback').textContent = 'Incorrect';
        document.getElementById('feedback').classList.add('show', 'incorrect');
    }

    document.getElementById('accuracy').textContent =
        Math.round((correctAnswers / (currentQuestion + 1)) * 100) + '%';

    document.getElementById('points-display').textContent = points;

    if (streak > 0) {
        document.getElementById('streak-display').style.display = 'flex';
        document.getElementById('streak-value').textContent = streak + '🔥';
    }

    setTimeout(() => {
        currentQuestion++;
        selectedOption = null;
        answered = false;
        renderQuestion();
    }, 2200);
}

function startPractice(topic) {
    currentTopic = topic;
    currentQuestion = 0;
    selectedOption = null;
    answered = false;
    correctAnswers = 0;
    streak = 0;
    bestStreak = 0;
    points = 0;

    const gradeIdx = grades.indexOf(currentGrade);

    currentQuestionPool = questions[currentSubject]
        .filter(q => (q.gradeMin === undefined || gradeIdx >= q.gradeMin) &&
                     (q.gradeMax === undefined || gradeIdx <= q.gradeMax))
        .sort(() => Math.random() - 0.5)
        .slice(0, questionsPerSession);

    if (currentQuestionPool.length === 0) {
        alert("No questions available for this grade/subject yet.");
        showTopics();
        return;
    }

    renderQuestion();
    showPractice();
}

function retryPractice() {
    startPractice(currentTopic);
}

function showHome() {
    hideAllViews();
    document.getElementById('home-view').style.display = 'block';
}

function showSubjects() {
    hideAllViews();
    document.getElementById('subjects-view').style.display = 'block';
}

function showTopics() {
    hideAllViews();
    document.getElementById('topics-view').style.display = 'block';
}

function showPractice() {
    hideAllViews();
    document.getElementById('practice-view').style.display = 'block';
}

function showResults() {
    const score = Math.round((correctAnswers / currentQuestionPool.length) * 100);
    document.getElementById('final-score').textContent = score + '%';
    document.getElementById('results-text').textContent = `You answered ${correctAnswers} out of ${currentQuestionPool.length} correctly`;
    document.getElementById('correct-count').textContent = correctAnswers;
    document.getElementById('incorrect-count').textContent = currentQuestionPool.length - correctAnswers;
    document.getElementById('best-streak').textContent = bestStreak;

    hideAllViews();
    document.getElementById('results-view').style.display = 'block';
}

function hideAllViews() {
    document.querySelectorAll('.container[id$="-view"]').forEach(el => {
        el.style.display = 'none';
    });
}

function selectGrade(grade) {
    currentGrade = grade;
    document.getElementById('grade-title').textContent = grade;
    renderSubjects();
    showSubjects();
}

function selectSubject(subjectKey) {
    currentSubject = subjectKey;
    renderTopics();
    showTopics();
}

init();
function toggleSettings() {
    const panel = document.getElementById('settings-panel');
    panel.classList.toggle('active');
}

const questionSlider = document.getElementById('questions-slider');
const questionValueDisplay = document.getElementById('questions-value');

if (questionSlider) {
    questionSlider.addEventListener('input', (e) => {
        questionValueDisplay.textContent = e.target.value;
    });
}

const darkModeToggle = document.getElementById('dark-mode-toggle');

darkModeToggle.addEventListener('change', () => {
    if (darkModeToggle.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.body.style.backgroundColor = "var(--bg-primary)";
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
});

document.addEventListener('click', (e) => {
    const panel = document.getElementById('settings-panel');
    const settingsBtn = document.querySelector('.settings-btn');
    
    if (panel.classList.contains('active') && 
        !panel.contains(e.target) && 
        !settingsBtn.contains(e.target)) {
        toggleSettings();
    }
});
function toggleSettings() {
    const panel = document.getElementById('settings-panel');
    panel.classList.toggle('active');
}

const questionsSlider = document.getElementById('questions-slider');
const questionsValue = document.getElementById('questions-value');

if (questionsSlider) {
    questionsSlider.addEventListener('input', (e) => {
        questionsValue.textContent = e.target.value;
    });
}

document.addEventListener('click', (e) => {
    const panel = document.getElementById('settings-panel');
    const settingsBtn = document.querySelector('.settings-btn');
    if (panel.classList.contains('active') && 
        !panel.contains(e.target) && 
        !settingsBtn.contains(e.target)) {
        panel.classList.remove('active');
    }
});

document.getElementById('dark-mode-toggle').addEventListener('change', (e) => {
    if (e.target.checked) {
        document.body.classList.add('dark-theme');
        console.log("Dark Mode Enabled");
    } else {
        document.body.classList.remove('dark-theme');
        console.log("Light Mode Enabled");
    }
});
const questionBank = {
    "math-g5-fractions": [
        { q: "What is 1/2 + 1/4?", options: ["2/6", "3/4", "1/6", "2/4"], correct: 1 },
        { q: "Convert 0.75 to a fraction.", options: ["1/2", "2/3", "3/4", "4/5"], correct: 2 },
        { q: "What is 3/5 of 25?", options: ["10", "15", "20", "5"], correct: 1 },
        { q: "Which fraction is equivalent to 1/3?", options: ["2/6", "3/10", "4/15", "5/20"], correct: 0 },
        { q: "What is 1 - 2/7?", options: ["5/7", "4/7", "3/7", "6/7"], correct: 0 },
        { q: "What is 2/3 x 3/4?", options: ["6/12", "1/2", "5/7", "6/7"], correct: 1 },
        { q: "Simplify 12/16.", options: ["6/8", "3/4", "2/3", "4/5"], correct: 1 },
        { q: "Compare: 1/2 [?] 1/3", options: [">", "<", "=", "None"], correct: 0 },
        { q: "What is 5/8 + 1/8?", options: ["6/16", "3/4", "1/2", "6/8"], correct: 1 },
        { q: "What is 1/10 as a decimal?", options: ["0.1", "0.01", "1.0", "0.11"], correct: 0 }
    ]
};

function toggleSettings() {
    const panel = document.getElementById('settings-panel');
    panel.classList.toggle('active');
}
const slider = document.getElementById('questions-slider');
const sliderValue = document.getElementById('questions-value');

if (slider) {
    slider.addEventListener('input', () => {
        sliderValue.textContent = slider.value;
    });
}
window.onclick = function(event) {
    const panel = document.getElementById('settings-panel');
    if (event.target == panel) {
        toggleSettings();
    }
}
let currentQuestionIndex = 0;
let score = 0;

function startLesson(topicId) {
    const questions = questionBank[topicId];
    const limit = parseInt(document.getElementById('questions-slider').value);
    const sessionQuestions = questions.slice(0, limit);
    console.log("Starting lesson with " + sessionQuestions.length + " questions");
}