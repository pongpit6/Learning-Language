// ==========================================================================
// 1. นำเข้าและจัดการข้อมูล Data Sources
// ==========================================================================
const allDictionaries = {
    ENG: typeof wordsEN !== 'undefined' ? wordsEN : [],
    JAP: typeof wordsJP !== 'undefined' ? wordsJP : [],
    CHN: typeof wordsCN !== 'undefined' ? wordsCN : [],
    KOR: typeof wordsKR !== 'undefined' ? wordsKR : []
};

const allSentences = {
    ENG: typeof vocabEN !== 'undefined' ? vocabEN : [],
    JAP: typeof vocabJA !== 'undefined' ? vocabJA : (typeof vocabJP !== 'undefined' ? vocabJP : []),
    CHN: typeof vocabZH !== 'undefined' ? vocabZH : (typeof vocabCN !== 'undefined' ? vocabCN : []),
    KOR: typeof vocabKO !== 'undefined' ? vocabKO : (typeof vocabKR !== 'undefined' ? vocabKR : [])
};

// ==========================================================================
// 2. State & LocalStorage + Pet Config
// ==========================================================================
let userStats = {
    ENG: { words: 0, timeSec: 0, mastery: {} },
    JAP: { words: 0, timeSec: 0, mastery: {} },
    CHN: { words: 0, timeSec: 0, mastery: {} },
    KOR: { words: 0, timeSec: 0, mastery: {} },
    lastActive: null,
    streak: 0
};

// สัตว์เลี้ยง 4 สัญชาติ
const petStages = {
    ENG: [
        { exp: 0, icon: "🥚", name: "ไข่ (Lv.1)" },
        { exp: 100, icon: "🐥", name: "ลูกเจี๊ยบ (Lv.2)" },
        { exp: 500, icon: "🦉", name: "นกฮูกนักปราชญ์ (Lv.3)" },
        { exp: 1500, icon: "🦅", name: "พญาอินทรี (Max)" }
    ],
    JAP: [
        { exp: 0, icon: "🥚", name: "ไข่ (Lv.1)" },
        { exp: 100, icon: "🍡", name: "ดังโงะ (Lv.2)" },
        { exp: 500, icon: "🦊", name: "จิ้งจอกอินาริ (Lv.3)" },
        { exp: 1500, icon: "🐉", name: "มังกรเซียน (Max)" }
    ],
    CHN: [
        { exp: 0, icon: "🥚", name: "ไข่ (Lv.1)" },
        { exp: 100, icon: "🥟", name: "ติ่มซำ (Lv.2)" },
        { exp: 500, icon: "🐼", name: "แพนด้า (Lv.3)" },
        { exp: 1500, icon: "🐲", name: "กิเลนทองคำ (Max)" }
    ],
    KOR: [
        { exp: 0, icon: "🥚", name: "ไข่ (Lv.1)" },
        { exp: 100, icon: "🐾", name: "ลูกหมี (Lv.2)" },
        { exp: 500, icon: "🐯", name: "เสือโคร่ง (Lv.3)" },
        { exp: 1500, icon: "🦁", name: "แฮแทศักดิ์สิทธิ์ (Max)" }
    ]
};

function loadStats() {
    const saved = localStorage.getItem('polyglotCoachData');
    if (saved) {
        let parsed = JSON.parse(saved);
        // ตรวจสอบความสมบูรณ์ของโครงสร้างข้อมูลเดิม
        ['ENG','JAP','CHN','KOR'].forEach(l => {
            if (!parsed[l]) parsed[l] = { words: 0, timeSec: 0, mastery: {} };
            if (!parsed[l].mastery) parsed[l].mastery = {};
        });
        userStats = parsed;
    }
    checkStreak();
    updateHomeUI();
}

function saveStats() {
    localStorage.setItem('polyglotCoachData', JSON.stringify(userStats));
    updateHomeUI();
}

function checkStreak() {
    const today = new Date().toDateString();
    if (userStats.lastActive !== today) {
        if (userStats.lastActive) {
            const lastDate = new Date(userStats.lastActive);
            const diff = (new Date() - lastDate) / (1000 * 60 * 60 * 24);
            if (diff <= 1.5) userStats.streak++;
            else userStats.streak = 1;
        } else {
            userStats.streak = 1;
        }
        userStats.lastActive = today;
        saveStats();
    }
}

// ==========================================================================
// 3. UI อัปเดตหน้าแรก (คำนวณ EXP และวิวัฒนาการสัตว์เลี้ยง)
// ==========================================================================
function updateHomeUI() {
    const langs = ['ENG', 'JAP', 'CHN', 'KOR'];
    
    langs.forEach(lang => {
        const stats = userStats[lang];
        // 1 ทายถูก = 10 EXP, ฟัง 1 นาที = 5 EXP
        const exp = (stats.words * 10) + (Math.floor(stats.timeSec / 60) * 5);
        
        // อัปเดตตัวเลข
        const wordEl = document.getElementById(`stat-${lang.toLowerCase()}-words`);
        if (wordEl) wordEl.innerText = stats.words;
        
        const timeEl = document.getElementById(`stat-${lang.toLowerCase()}-time`);
        const h = Math.floor(stats.timeSec / 3600);
        const m = Math.floor((stats.timeSec % 3600) / 60);
        if (timeEl) timeEl.innerText = `${h}h ${m}m`;

        // อัปเดตแถบ Progress (อิงเป้าหมายที่ 1000 คำ = 10,000 EXP โดยประมาณ)
        const progressEl = document.getElementById(`progress-${lang.toLowerCase()}`);
        if (progressEl) {
            let percent = (stats.words / 1000) * 100;
            progressEl.style.width = `${Math.min(percent, 100)}%`;
        }

        // วิวัฒนาการสัตว์เลี้ยง + ยิงพลุฉลอง
        const petAvatar = document.getElementById(`pet-avatar-${lang.toLowerCase()}`);
        const petName = document.getElementById(`pet-name-${lang.toLowerCase()}`);
        if (petAvatar && petName) {
            let currentStage = petStages[lang][0];
            let previousStageName = petName.innerText; // เก็บชื่อร่างเดิมไว้เช็คการอัปเวล

            petStages[lang].forEach(s => { if (exp >= s.exp) currentStage = s; });
            
            petAvatar.innerText = currentStage.icon;
            petName.innerText = currentStage.name;

            // เอฟเฟกต์ฉลองถ้าร่างเปลี่ยน (และไม่ใช่สถานะกำลังโหลดแอปครั้งแรก)
            if (previousStageName !== "กำลังฟัก..." && previousStageName !== currentStage.name) {
                if (typeof confetti === 'function') {
                    confetti({
                        particleCount: 150,
                        spread: 80,
                        origin: { y: 0.6 },
                        colors: ['#6366f1', '#a855f7', '#3b82f6', '#22c55e'],
                        zIndex: 10000
                    });
                }
            }
        }
    });

    const streakEl = document.getElementById('streak-count');
    if (streakEl) streakEl.innerText = userStats.streak;
}

// ==========================================================================
// 4. ระบบนำทาง (Navigation)
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

        if (targetPage !== 'page-listen') pauseListening();
    });
});

// ==========================================================================
// 5. ระบบควิซ 50 ข้อ + อัลกอริทึม SRS + เอฟเฟกต์ Game Feel
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
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
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

    if (pool.length === 0) { alert('ไม่พบคำศัพท์!'); return; }

    // --- อัลกอริทึม SRS ---
    pool.sort((a, b) => {
        let langA = getLangKeyFromLocale(a.lang);
        let langB = getLangKeyFromLocale(b.lang);
        let scoreA = userStats[langA].mastery[a.target] || 0;
        let scoreB = userStats[langB].mastery[b.target] || 0;
        return scoreA - scoreB;
    });

    let focusPool = pool.slice(0, 100);
    shuffle(focusPool);
    
    currentQuizWords = focusPool.slice(0, 50); 
    currentQuestionIndex = 0;
    quizScore = 0;
    
    quizSetup.classList.add('hidden');
    quizPlayboard.classList.remove('hidden');
    loadQuestion();
});

function getLangKeyFromLocale(locale) {
    if (locale === 'ja-JP') return 'JAP';
    if (locale === 'zh-CN') return 'CHN';
    if (locale === 'ko-KR') return 'KOR';
    return 'ENG';
}

function loadQuestion() {
    if (currentQuestionIndex >= currentQuizWords.length) { endQuiz(); return; }

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
        if (!options.some(opt => opt.target === randomWrong.target)) options.push(randomWrong);
    }
    shuffle(options);
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerHTML = `<span class="target-word">${opt.target}</span><span class="reading-word">(${opt.reading})</span>`;
        btn.onclick = () => checkAnswer(opt, currentWord, btn, optionsContainer);
        optionsContainer.appendChild(btn);
    });
}

// ----------------------------------------------------
// ฟังก์ชันเสริม: สร้างตัวเลขลอย (Floating EXP)
// ----------------------------------------------------
function showFloatingExp(element, amount) {
    const rect = element.getBoundingClientRect();
    const floatEl = document.createElement('div');
    floatEl.className = 'floating-exp';
    floatEl.innerText = `+${amount} EXP`;
    
    // ตั้งค่าให้อยู่ตรงกลางปุ่มที่กด
    floatEl.style.left = `${rect.left + (rect.width / 2) - 35}px`;
    floatEl.style.top = `${rect.top}px`;
    document.body.appendChild(floatEl);
    
    // ลบออกจาก DOM หลังแอนิเมชันจบ (1 วิ)
    setTimeout(() => floatEl.remove(), 1000);
}
// ----------------------------------------------------

function checkAnswer(selected, correct, clickedBtn, container) {
    let langKey = getLangKeyFromLocale(correct.lang);
    if (!userStats[langKey].mastery[correct.target]) userStats[langKey].mastery[correct.target] = 0;

    const allBtns = container.querySelectorAll('.option-btn');
    allBtns.forEach(b => b.disabled = true);

    if (selected.target === correct.target) {
        // --- ทายถูก ---
        quizScore++;
        userStats[langKey].words++;
        userStats[langKey].mastery[correct.target] += 1; 
        
        clickedBtn.style.borderColor = "#22c55e";
        clickedBtn.style.backgroundColor = "#dcfce7";
        
        // แสดกตัวเลขลอย +10 EXP
        showFloatingExp(clickedBtn, 10);
        
    } else {
        // --- ทายผิด ---
        userStats[langKey].mastery[correct.target] -= 1; 
        
        clickedBtn.style.borderColor = "#ef4444";
        clickedBtn.style.backgroundColor = "#fee2e2";
        
        // สั่งให้ปุ่มสั่น
        clickedBtn.classList.add('shake-anim');
        
        // เฉลยข้อถูกให้เห็น
        allBtns.forEach(b => {
            if (b.innerHTML.includes(correct.target)) {
                b.style.borderColor = "#22c55e";
                b.style.backgroundColor = "#dcfce7";
            }
        });
    }
    
    saveStats();
    setTimeout(() => { currentQuestionIndex++; loadQuestion(); }, 1200); // หน่วงเวลาเพิ่มนิดนึงให้ดูเอฟเฟกต์ทัน
}

function endQuiz() {
    alert(`จบเกม! คุณได้คะแนน ${quizScore} / ${currentQuizWords.length} 🎉`);
    quizPlayboard.classList.add('hidden');
    quizSetup.classList.remove('hidden');
    document.querySelector('[data-target="page-home"]').click(); 
}

// ==========================================================================
// 6. ระบบฟังเสียง (Listening Mode)
// ==========================================================================
let listenPool = [];
let listenIndex = 0;
let isPlaying = false;
let listenTimer = null;
let currentSessionSec = 0;
let listenLangKey = null;
let listenMode = 'word';

const synth = window.speechSynthesis;
const listenLangSelect = document.getElementById('listen-lang-select');
const listenModeSelect = document.getElementById('listen-mode-select');
const listenTargetText = document.getElementById('listen-target-text');
const listenReadingText = document.getElementById('listen-reading-text');
const listenThaiText = document.getElementById('listen-thai-text');
const btnPlayPause = document.getElementById('btn-play-pause');
const btnNext = document.getElementById('btn-next');
const btnPrev = document.getElementById('btn-prev');
const currentSessionTimeDisplay = document.getElementById('current-session-time');

listenLangSelect.addEventListener('change', (e) => { listenLangKey = e.target.value; updateListenPool(); });
listenModeSelect.addEventListener('change', (e) => { listenMode = e.target.value; if (listenLangKey) updateListenPool(); });

function updateListenPool() {
    if (!listenLangKey) return;
    listenPool = listenMode === 'word' ? [...allDictionaries[listenLangKey]] : [...allSentences[listenLangKey]];
    
    if (listenPool.length === 0) {
        alert("ไม่พบข้อมูล");
        listenTargetText.innerText = "-";
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
        if (isPlaying) setTimeout(() => { if (isPlaying) synth.speak(utteranceThai); }, 500); 
    };
    utteranceThai.onend = () => {
        if (isPlaying) setTimeout(() => { if (isPlaying) nextListen(); }, 1500); 
    };

    synth.cancel(); 
    synth.speak(utteranceTarget); 
}

function togglePlay() {
    if (!listenLangKey || listenPool.length === 0) { alert("กรุณาเลือกภาษาและโหมดที่มีข้อมูลครับ"); return; }
    if (isPlaying) pauseListening();
    else {
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
    if (listenIndex >= listenPool.length) { listenIndex = 0; shuffle(listenPool); }
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
    if (listenTimer) { clearInterval(listenTimer); listenTimer = null; saveStats(); }
}

// ==========================================================================
// 7. Initialization
// ==========================================================================
window.onload = () => {
    loadStats();
    if (speechSynthesis.onvoiceschanged !== undefined) speechSynthesis.onvoiceschanged = () => synth.getVoices();
};
