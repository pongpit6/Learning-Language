// ==========================================================================
// 1. การตั้งค่าและจัดการข้อมูล (Data & Configuration)
// ==========================================================================

const allDictionaries = {
    ENG: typeof wordsEN !== 'undefined' ? wordsEN : [],
    JAP: typeof wordsJP !== 'undefined' ? wordsJP : [],
    CHN: typeof wordsCN !== 'undefined' ? wordsCN : [],
    KOR: typeof wordsKR !== 'undefined' ? wordsKR : []
};

// ดึงข้อมูลประโยค (รองรับชื่อตัวแปรหลายรูปแบบกันพลาด)
const allSentences = {
    ENG: typeof vocabEN !== 'undefined' ? vocabEN : [],
    JAP: typeof vocabJA !== 'undefined' ? vocabJA : (typeof vocabJP !== 'undefined' ? vocabJP : []),
    CHN: typeof vocabZH !== 'undefined' ? vocabZH : (typeof vocabCN !== 'undefined' ? vocabCN : []),
    KOR: typeof vocabKO !== 'undefined' ? vocabKO : (typeof vocabKR !== 'undefined' ? vocabKR : [])
};

let userStats = {
    ENG: { words: 0, timeSec: 0 },
    JAP: { words: 0, timeSec: 0 },
    CHN: { words: 0, timeSec: 0 },
    KOR: { words: 0, timeSec: 0 }
};

// ==========================================================================
// 2. ระบบ LocalStorage และการอัปเดตหน้าแรก (Stats + Progress Bar)
// ==========================================================================

function loadStats() {
    const saved = localStorage.getItem('polyglotStats');
    if (saved) {
        userStats = JSON.parse(saved);
    }
    updateHomeUI();
}

function saveStats() {
    localStorage.setItem('polyglotStats', JSON.stringify(userStats));
    updateHomeUI();
}

function formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
}

function updateHomeUI() {
    const langs = ['ENG', 'JAP', 'CHN', 'KOR'];
    const maxWords = 1000;

    langs.forEach(lang => {
        const currentWords = userStats[lang].words;
        
        // อัปเดตตัวหนังสือ
        const wordEl = document.getElementById(`stat-${lang.toLowerCase()}-words`);
        if (wordEl) wordEl.innerText = currentWords;
        
        const timeEl = document.getElementById(`stat-${lang.toLowerCase()}-time`);
        if (timeEl) timeEl.innerText = formatTime(userStats[lang].timeSec);

        // อัปเดต Progress Bar
        const progressEl = document.getElementById(`progress-${lang.toLowerCase()}`);
        if (progressEl) {
            let percent = (currentWords / maxWords) * 100;
            if (percent > 100) percent = 100;
            progressEl.style.width = `${percent}%`;
        }
    });
}

// ==========================================================================
// 3. ระบบนำทาง (Navigation)
// ==========================================================================

const navItems = document.querySelectorAll('.nav-item');
const pages = document.querySelectorAll('.page');

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        navItems.forEach(nav => nav.classList.remove('active'));
        pages.forEach(page => page.classList.remove('active'));
        
        item.classList.add('active');
        const targetPage = item.getAttribute('data-target');
        document.getElementById(targetPage).classList.add('active');

        if (targetPage !== 'page-listen') {
            pauseListening();
        }
    });
});

// ==========================================================================
// 4. ระบบทายคำศัพท์ (Quiz Mode)
// ==========================================================================

let quizLang = null;
let currentQuizWords = [];
let currentQuestionIndex = 0;
let quizScore = 0;

const langBtns = document.querySelectorAll('.lang-btn');
const startQuizBtn = document.getElementById('start-quiz-btn');
const quizSetup = document.getElementById('quiz-setup');
const quizPlayboard = document.getElementById('quiz-playboard');

langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        langBtns.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        quizLang = btn.getAttribute('data-lang');
        startQuizBtn.disabled = false;
    });
});

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

startQuizBtn.addEventListener('click', () => {
    if (!quizLang) return;

    let pool = [];
    if (quizLang === 'MIX') {
        pool = [...allDictionaries.ENG, ...allDictionaries.JAP, ...allDictionaries.CHN, ...allDictionaries.KOR];
    } else {
        pool = [...allDictionaries[quizLang]];
    }

    if (pool.length === 0) {
        alert('ไม่พบคำศัพท์ กรุณาตรวจสอบไฟล์ข้อมูล!');
        return;
    }

    shuffle(pool);
    currentQuizWords = pool.slice(0, 50); // สุ่มมา 50 คำ
    currentQuestionIndex = 0;
    quizScore = 0;
    
    quizSetup.classList.add('hidden');
    quizPlayboard.classList.remove('hidden');
    
    loadQuestion();
});

function loadQuestion() {
    if (currentQuestionIndex >= currentQuizWords.length) {
        endQuiz();
        return;
    }

    const currentWord = currentQuizWords[currentQuestionIndex];
    document.getElementById('quiz-counter').innerText = `ข้อที่ ${currentQuestionIndex + 1} / ${currentQuizWords.length}`;
    document.getElementById('quiz-score').innerText = `คะแนน: ${quizScore}`;
    document.getElementById('question-text').innerText = currentWord.thai;

    let options = [currentWord];
    let pool = quizLang === 'MIX' ? 
        [...allDictionaries.ENG, ...allDictionaries.JAP, ...allDictionaries.CHN, ...allDictionaries.KOR] : 
        allDictionaries[quizLang];

    while (options.length < 4) {
        let randomWrong = pool[Math.floor(Math.random() * pool.length)];
        if (!options.some(opt => opt.target === randomWrong.target)) {
            options.push(randomWrong);
        }
    }

    shuffle(options);
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerHTML = `
            <span class="target-word">${opt.target}</span>
            <span class="reading-word">(${opt.reading})</span>
        `;
        btn.onclick = () => checkAnswer(opt, currentWord);
        optionsContainer.appendChild(btn);
    });
}

function checkAnswer(selected, correct) {
    if (selected.target === correct.target) {
        quizScore++;
        let langKey = 'ENG';
        if (correct.lang === 'ja-JP') langKey = 'JAP';
        if (correct.lang === 'zh-CN') langKey = 'CHN';
        if (correct.lang === 'ko-KR') langKey = 'KOR';
        
        userStats[langKey].words++;
        saveStats();
    }
    
    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
    }, 200);
}

function endQuiz() {
    alert(`จบเกม! คุณได้คะแนน ${quizScore} / ${currentQuizWords.length} 🎉`);
    quizPlayboard.classList.add('hidden');
    quizSetup.classList.remove('hidden');
    document.querySelector('[data-target="page-home"]').click(); 
}

// ==========================================================================
// 5. ระบบฟังเสียง (Listening Mode) - แก้ไขบั๊กประโยคเรียบร้อย
// ==========================================================================

let listenPool = [];
let listenIndex = 0;
let isPlaying = false;
let listenTimer = null;
let currentSessionSec = 0;
let listenLangKey = null;
let listenMode = 'word'; // ค่าเริ่มต้นคือหมวดคำศัพท์

const synth = window.speechSynthesis;
const listenLangSelect = document.getElementById('listen-lang-select');
const listenModeSelect = document.getElementById('listen-mode-select'); // ตัวแปรที่หายไป!
const listenTargetText = document.getElementById('listen-target-text');
const listenReadingText = document.getElementById('listen-reading-text');
const listenThaiText = document.getElementById('listen-thai-text');
const btnPlayPause = document.getElementById('btn-play-pause');
const btnNext = document.getElementById('btn-next');
const btnPrev = document.getElementById('btn-prev');
const currentSessionTimeDisplay = document.getElementById('current-session-time');

// อัปเดตเมื่อเปลี่ยนภาษา
listenLangSelect.addEventListener('change', (e) => {
    listenLangKey = e.target.value;
    updateListenPool();
});

// อัปเดตเมื่อเปลี่ยนโหมด (คำศัพท์ / ประโยค)
listenModeSelect.addEventListener('change', (e) => {
    listenMode = e.target.value;
    if (listenLangKey) {
        updateListenPool();
    }
});

// ฟังก์ชันโหลดข้อมูลใหม่ตามภาษาและโหมด
function updateListenPool() {
    if (!listenLangKey) return;

    if (listenMode === 'word') {
        listenPool = [...allDictionaries[listenLangKey]];
    } else {
        listenPool = [...allSentences[listenLangKey]];
    }

    if (listenPool.length === 0) {
        alert(`ไม่มีข้อมูล${listenMode === 'word' ? 'คำศัพท์' : 'ประโยค'} สำหรับภาษานี้ครับ`);
        listenTargetText.innerText = "ไม่พบข้อมูล";
        return;
    }

    shuffle(listenPool); 
    listenIndex = 0;
    pauseListening();
    updateListenUI();
}

function updateListenUI() {
    if (listenPool.length === 0) return;
    
    const currentWord = listenPool[listenIndex];
    listenTargetText.innerText = currentWord.target;
    listenReadingText.innerText = `(${currentWord.reading})`;
    listenThaiText.innerText = currentWord.thai;
}

// ฟังก์ชันอ่านแปลไทย
function speakCurrentWord() {
    if (listenPool.length === 0) return;
    
    const currentWord = listenPool[listenIndex];
    
    const utteranceTarget = new SpeechSynthesisUtterance(currentWord.target);
    utteranceTarget.lang = currentWord.lang;
    utteranceTarget.rate = 0.85; 
    
    const utteranceThai = new SpeechSynthesisUtterance(currentWord.thai);
    utteranceThai.lang = 'th-TH'; 
    utteranceThai.rate = 0.95; 
    
    utteranceTarget.onend = () => {
        if (isPlaying) {
            setTimeout(() => {
                if (isPlaying) synth.speak(utteranceThai);
            }, 500); 
        }
    };

    utteranceThai.onend = () => {
        if (isPlaying) {
            setTimeout(() => {
                if (isPlaying) nextListen();
            }, 1500); 
        }
    };

    synth.cancel(); 
    synth.speak(utteranceTarget); 
}

function togglePlay() {
    if (!listenLangKey) {
        alert("กรุณาเลือกภาษาก่อนครับ!");
        return;
    }
    if (listenPool.length === 0) return;

    if (isPlaying) {
        pauseListening();
    } else {
        isPlaying = true;
        btnPlayPause.innerHTML = '<i class="fa-solid fa-pause"></i>';
        startTimer();
        speakCurrentWord();
    }
}

function pauseListening() {
    isPlaying = false;
    synth.cancel();
    btnPlayPause.innerHTML = '<i class="fa-solid fa-play"></i>';
    stopTimer();
}

function nextListen() {
    if (listenPool.length === 0) return;
    listenIndex++;
    if (listenIndex >= listenPool.length) {
        listenIndex = 0; 
        shuffle(listenPool); 
    }
    updateListenUI();
    if (isPlaying) speakCurrentWord();
}

function prevListen() {
    if (listenPool.length === 0) return;
    listenIndex--;
    if (listenIndex < 0) listenIndex = listenPool.length - 1;
    updateListenUI();
    if (isPlaying) speakCurrentWord();
}

btnPlayPause.addEventListener('click', togglePlay);
btnNext.addEventListener('click', nextListen);
btnPrev.addEventListener('click', prevListen);

// ระบบจับเวลา
function startTimer() {
    if (listenTimer) clearInterval(listenTimer);
    listenTimer = setInterval(() => {
        currentSessionSec++;
        userStats[listenLangKey].timeSec++;
        
        const m = Math.floor(currentSessionSec / 60).toString().padStart(2, '0');
        const s = (currentSessionSec % 60).toString().padStart(2, '0');
        currentSessionTimeDisplay.innerText = `${m}:${s}`;
        
        if (currentSessionSec % 5 === 0) saveStats();
    }, 1000);
}

function stopTimer() {
    if (listenTimer) {
        clearInterval(listenTimer);
        listenTimer = null;
        saveStats(); 
    }
}

// ==========================================================================
// 6. การเริ่มทำงาน (Initialization)
// ==========================================================================
window.onload = () => {
    loadStats();
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => synth.getVoices();
    }
};