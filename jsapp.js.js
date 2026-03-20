// ── Navigation ──
function goTo(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
  window.scrollTo(0, 0);
}

function showDashTab(tabId, btn) {
  document.querySelectorAll('.dash-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(b => b.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
  btn.classList.add('active');
}

// ── Lessons Data ──
const LESSONS = [
  { day:1,  emoji:'🏫', theme:'Classroom: Hello World',       grammar:'Pronouns + is/am/are',        status:'completed' },
  { day:2,  emoji:'🏠', theme:'Home: This Is My World',       grammar:'Articles + Singular/Plural',  status:'completed' },
  { day:3,  emoji:'🌿', theme:'Garden: Action Begins',        grammar:'Simple present tense',        status:'completed' },
  { day:4,  emoji:'🏖️', theme:'Beach: Asking Questions',      grammar:'Do/Does questions',           status:'completed' },
  { day:5,  emoji:'🛒', theme:'Market: Real Shopping Talk',   grammar:'How much / How many',         status:'current'   },
  { day:6,  emoji:'🏢', theme:'Office: First Day',            grammar:'Introductions + requests',    status:'locked'    },
  { day:7,  emoji:'📱', theme:'Phone Call: Do Not Panic',     grammar:'Asking for information',      status:'locked'    },
  { day:8,  emoji:'🍽️', theme:'Restaurant: Food & Manners',  grammar:'Would like / I\'ll have',     status:'locked'    },
  { day:9,  emoji:'🚌', theme:'Travel: On the Move',          grammar:'Directions + prepositions',   status:'locked'    },
  { day:10, emoji:'🏆', theme:'Week 1 Test & Celebration',    grammar:'Full Week 1 review',          status:'locked'    },
  { day:11, emoji:'📖', theme:'Library: What Happened?',      grammar:'Simple past tense',           status:'locked'    },
  { day:12, emoji:'🌅', theme:'Tomorrow: Future Dreams',      grammar:'Will / Going to',             status:'locked'    },
  { day:13, emoji:'💬', theme:'Chai Break: Real Conversation',grammar:'Present continuous',          status:'locked'    },
  { day:14, emoji:'🤝', theme:'Meeting Room: Speak Up',       grammar:'Modal verbs',                 status:'locked'    },
  { day:15, emoji:'✉️', theme:'Email: Professional Writing',  grammar:'Formal vs informal language', status:'locked'    },
  { day:16, emoji:'📊', theme:'Presentation Day',             grammar:'Linking words + transitions', status:'locked'    },
  { day:17, emoji:'🎯', theme:'Interview: Get the Job',       grammar:'Self-description',            status:'locked'    },
  { day:18, emoji:'🔧', theme:'Problem Solving: Fix It',      grammar:'Conditionals',                status:'locked'    },
  { day:19, emoji:'🌟', theme:'Real World: All Combined',     grammar:'Full mixed revision',         status:'locked'    },
  { day:20, emoji:'🎓', theme:'Graduation Day',               grammar:'Final fluency test',          status:'locked'    }
];

function buildLessonsGrid() {
  const grid = document.getElementById('lessons-grid');
  if (!grid) return;
  grid.innerHTML = LESSONS.map(l => `
    <div class="lesson-item ${l.status}" onclick="${l.status !== 'locked' ? "goTo('screen-lesson')" : "alert('Complete previous days to unlock this lesson!')"}">
      <div class="li-top">
        <span class="li-num">DAY ${l.day}</span>
        <span class="li-emoji">${l.emoji}</span>
      </div>
      <div class="li-title">${l.theme}</div>
      <div class="li-grammar">${l.grammar}</div>
      <div class="li-status ${l.status}">
        ${l.status === 'completed' ? '✓ Completed' : l.status === 'current' ? '▶ In progress' : '🔒 Locked'}
      </div>
    </div>
  `).join('');
}

// ── Vocabulary Data ──
const VOCAB = [
  { word:'Introduce',  mean:'to tell someone your name for the first time',           ex:'"Let me introduce myself. I am Anita."' },
  { word:'Colleague',  mean:'a person you work with',                                 ex:'"She is my colleague at the office."' },
  { word:'Negotiate',  mean:'to discuss something to reach an agreement',             ex:'"We negotiated the price and saved 10%."' },
  { word:'Agenda',     mean:'a list of topics to discuss in a meeting',               ex:'"Can you share the agenda before the call?"' },
  { word:'Deadline',   mean:'the last date by which something must be done',          ex:'"The deadline for this project is Friday."' },
  { word:'Confident',  mean:'feeling sure and strong about yourself',                 ex:'"He spoke in a confident voice at the meeting."' },
  { word:'Clarify',    mean:'to make something clearer and easier to understand',     ex:'"Can you clarify what you mean by that?"' },
  { word:'Fluent',     mean:'able to speak a language easily and naturally',          ex:'"After 20 days, she became fluent in English."' }
];

let vocabIndex = 0;
let vocabFlipped = false;

function flipVocab() {
  vocabFlipped = !vocabFlipped;
  const detail = document.getElementById('vdetail');
  const btn = document.getElementById('vbtn');
  if (detail && btn) {
    document.getElementById('vmean').textContent = VOCAB[vocabIndex].mean;
    document.getElementById('vex').textContent = VOCAB[vocabIndex].ex;
    detail.style.display = vocabFlipped ? 'block' : 'none';
    btn.textContent = vocabFlipped ? 'Hide meaning' : 'Show meaning';
  }
}

function nextVocab(dir) {
  vocabIndex = (vocabIndex + dir + VOCAB.length) % VOCAB.length;
  vocabFlipped = false;
  const word = document.getElementById('vword');
  const detail = document.getElementById('vdetail');
  const btn = document.getElementById('vbtn');
  const ctr = document.getElementById('vctr');
  if (word) word.textContent = VOCAB[vocabIndex].word;
  if (detail) detail.style.display = 'none';
  if (btn) btn.textContent = 'Show meaning';
  if (ctr) ctr.textContent = (vocabIndex + 1) + ' / ' + VOCAB.length;
}

// ── Lesson Segments (Day 1) ──
let currentSegment = 0;

const SEGMENTS = [
  {
    num: '1 of 7', title: 'Grammar — Pronouns and Be Verbs', time: '5 min',
    render: () => `
      <p class="seg-intro">Every English sentence needs a subject and a verb. These are the most important ones you will use every single day:</p>
      <div class="rule-box">
        I → <strong>am</strong> &nbsp;&nbsp;|&nbsp;&nbsp; He / She / It → <strong>is</strong> &nbsp;&nbsp;|&nbsp;&nbsp; You / We / They → <strong>are</strong>
      </div>
      <div class="ex-row">I am Ravi. I am from Ahmedabad.<div class="ex-hint">Talking about yourself — always use "am"</div></div>
      <div class="ex-row">She is my sister. She is a teacher.<div class="ex-hint">Talking about one person (he/she/it) — always use "is"</div></div>
      <div class="ex-row">You are smart. You are welcome here.<div class="ex-hint">Talking to someone — always use "are"</div></div>
      <div class="ex-row">We are a team. They are my friends.<div class="ex-hint">Talking about a group — always use "are"</div></div>
    `
  },
  {
    num: '2 of 7', title: 'Fill in the Blanks', time: '5 min',
    render: () => `
      <p class="seg-intro">Type the correct word — <em>am</em>, <em>is</em>, or <em>are</em> — in each blank. Then click Check.</p>
      <div class="fill-row">She <input class="blank" id="b1" placeholder="___"> a doctor.<button class="check-btn" onclick="checkBlank('b1','is','r1')">Check</button><span id="r1"></span></div>
      <div class="fill-row">I <input class="blank" id="b2" placeholder="___"> happy today.<button class="check-btn" onclick="checkBlank('b2','am','r2')">Check</button><span id="r2"></span></div>
      <div class="fill-row">They <input class="blank" id="b3" placeholder="___"> from the same city.<button class="check-btn" onclick="checkBlank('b3','are','r3')">Check</button><span id="r3"></span></div>
      <div class="fill-row">He <input class="blank" id="b4" placeholder="___"> a good manager.<button class="check-btn" onclick="checkBlank('b4','is','r4')">Check</button><span id="r4"></span></div>
    `
  },
  {
    num: '3 of 7', title: 'Quiz — Choose the Right Answer', time: '5 min',
    render: () => `
      <p class="quiz-q">Which sentence is correct?</p>
      <button class="quiz-opt" onclick="quizAnswer(this,false,'fb1')">A. She am a student.</button>
      <button class="quiz-opt" onclick="quizAnswer(this,true,'fb1')">B. She is a student.</button>
      <button class="quiz-opt" onclick="quizAnswer(this,false,'fb1')">C. She are a student.</button>
      <div class="feedback-box" id="fb1"></div>
    `
  },
  {
    num: '4 of 7', title: 'Speak Aloud Practice', time: '5 min',
    render: () => `
      <div class="speak-box">
        <p class="speak-label">Say this sentence out loud — 3 times, clearly and confidently:</p>
        <p class="speak-sentence">"My name is ___. I am from ___. I am a ___."</p>
        <p class="speak-note">Fill in your own name, city, and job or role. Say it until it feels easy and natural.</p>
        <button class="btn-speak" id="speak-btn" onclick="markSpoken()">I said it out loud ✓</button>
      </div>
    `
  },
  {
    num: '5 of 7', title: 'Mini Conversation', time: '5 min',
    render: () => `
      <p class="seg-intro">Read both parts. Then say the whole conversation out loud, playing both roles yourself.</p>
      <div class="convo-wrap">
        <div class="bubble-group"><div class="bubble-name">Rahul</div><div class="bubble left">Hi! I am Rahul. What is your name?</div></div>
        <div class="bubble-group"><div class="bubble-name right">Priya</div><div class="bubble right">Hi Rahul! I am Priya. I am a software engineer.</div></div>
        <div class="bubble-group"><div class="bubble-name">Rahul</div><div class="bubble left">Nice to meet you, Priya. Are you from Ahmedabad?</div></div>
        <div class="bubble-group"><div class="bubble-name right">Priya</div><div class="bubble right">Yes, I am! It is a great city. Where are you from?</div></div>
        <div class="bubble-group"><div class="bubble-name">Rahul</div><div class="bubble left">I am from Surat. I am an accountant. It is nice to meet you!</div></div>
      </div>
    `
  },
  {
    num: '6 of 7', title: 'Vocabulary — 5 New Words', time: '5 min',
    render: () => `
      <div class="vocab-list">
        <div class="voc-row"><span class="voc-word">Introduce</span><div class="voc-right"><div class="voc-mean">to tell someone your name for the first time</div><div class="voc-ex">"Let me introduce myself. I am Anita."</div></div></div>
        <div class="voc-row"><span class="voc-word">Profession</span><div class="voc-right"><div class="voc-mean">your job or career</div><div class="voc-ex">"My profession is accounting."</div></div></div>
        <div class="voc-row"><span class="voc-word">Colleague</span><div class="voc-right"><div class="voc-mean">a person you work with</div><div class="voc-ex">"She is my colleague at the office."</div></div></div>
        <div class="voc-row"><span class="voc-word">Pleased</span><div class="voc-right"><div class="voc-mean">happy and satisfied</div><div class="voc-ex">"I am pleased to meet you."</div></div></div>
        <div class="voc-row"><span class="voc-word">Confident</span><div class="voc-right"><div class="voc-mean">feeling sure and strong about yourself</div><div class="voc-ex">"She spoke in a confident voice."</div></div></div>
      </div>
    `
  },
  {
    num: '7 of 7', title: 'Confidence Challenge + Reward', time: '5 min',
    render: () => `
      <div class="confidence-task">
        <div class="ct-label">Today's Confidence Challenge</div>
        <p class="ct-text">Before you sleep tonight, introduce yourself in English to one person — a family member, a friend, or just yourself in the mirror. Say: "Hi, I am [name]. I am from [city]. I am a [job or student]." That is real English. You did it today.</p>
      </div>
      <div class="xp-earned">
        <span class="xp-tag">+50 XP earned</span>
        <span>Day 1 complete! Streak: 1 day 🔥</span>
      </div>
      <div class="next-btn-wrap" style="margin-top:2rem">
        <button class="btn-next" onclick="completeLesson()">Finish Lesson 🎉</button>
      </div>
    `,
    isLast: true
  }
];

function renderLesson() {
  const body = document.getElementById('lesson-body');
  if (!body) return;

  const seg = SEGMENTS[currentSegment];
  const progress = Math.round(((currentSegment) / SEGMENTS.length) * 100);
  const progEl = document.getElementById('lesson-prog');
  const labelEl = document.getElementById('lesson-prog-label');
  if (progEl) progEl.style.width = progress + '%';
  if (labelEl) labelEl.textContent = currentSegment + ' / ' + SEGMENTS.length;

  const isLast = seg.isLast;

  body.innerHTML = `
    <div class="lesson-segment">
      <div class="seg-head">
        <span class="seg-num">${seg.num}</span>
        <span class="seg-title-text">${seg.title}</span>
        <span class="seg-time">${seg.time}</span>
      </div>
      <div class="seg-body">
        ${seg.render()}
        ${!isLast ? `<div class="next-btn-wrap"><button class="btn-next" onclick="nextSegment()">Next →</button></div>` : ''}
      </div>
    </div>
  `;
}

function nextSegment() {
  if (currentSegment < SEGMENTS.length - 1) {
    currentSegment++;
    renderLesson();
    window.scrollTo(0, 0);
  }
}

function completeLesson() {
  const body = document.getElementById('lesson-body');
  const progEl = document.getElementById('lesson-prog');
  if (progEl) progEl.style.width = '100%';
  body.innerHTML = `
    <div class="completion-screen">
      <div class="completion-icon">🎓</div>
      <h2 class="completion-title">Day 1 Complete!</h2>
      <p class="completion-sub">You just took your first real step toward confident English.<br>Come back tomorrow to continue your streak.</p>
      <div class="completion-xp">+50 XP</div>
      <div class="completion-xp-label">Total XP: 390 &nbsp;•&nbsp; Streak: 1 day 🔥</div>
      <button class="btn-primary" onclick="goTo('screen-dashboard')">Back to Dashboard →</button>
    </div>
  `;
}

// ── Quiz helper ──
function quizAnswer(btn, correct, fbId) {
  const opts = btn.parentElement.querySelectorAll('.quiz-opt');
  opts.forEach(o => { o.disabled = true; });
  const fb = document.getElementById(fbId);
  if (!fb) return;
  if (correct) {
    btn.classList.add('correct');
    fb.className = 'feedback-box show win';
    fb.innerHTML = '<strong>Hurray! Correct!</strong> "She" always uses <strong>is</strong>. Rule: I → am &nbsp;|&nbsp; He/She/It → is &nbsp;|&nbsp; You/We/They → are. Keep going!';
  } else {
    btn.classList.add('wrong');
    fb.className = 'feedback-box show lose';
    fb.innerHTML = 'Not quite. The correct answer is <strong>B — She is a student.</strong> "She" is singular so it uses "is". This is a very common mistake — you will get it next time!';
    opts[1].classList.add('correct');
  }
}

// ── Fill blank helper ──
function checkBlank(inputId, correct, resultId) {
  const val = document.getElementById(inputId).value.trim().toLowerCase();
  const span = document.getElementById(resultId);
  if (!span) return;
  if (val === correct) {
    span.className = 'result-ok'; span.textContent = '✓ Correct!';
  } else if (val === '') {
    span.className = 'result-no'; span.textContent = 'Type your answer';
  } else {
    span.className = 'result-no'; span.textContent = '✗ Answer: ' + correct;
  }
}

// ── Speak task ──
function markSpoken() {
  const btn = document.getElementById('speak-btn');
  if (btn) { btn.textContent = 'Done! Great job! ✓'; btn.classList.add('done'); }
}

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  buildLessonsGrid();

  // When entering lesson screen, reset to segment 0
  document.querySelectorAll('[onclick*="screen-lesson"]').forEach(el => {
    el.addEventListener('click', () => {
      currentSegment = 0;
      setTimeout(renderLesson, 50);
    });
  });

  // Patch goTo to reset lesson when needed
  const origGoTo = goTo;
  window.goTo = function(id) {
    origGoTo(id);
    if (id === 'screen-lesson') {
      currentSegment = 0;
      setTimeout(renderLesson, 50);
    }
  };
});
