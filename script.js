// ===== STATS =====
var copyCount = 0;
var quizAttempts = 0;

// ===== TOAST SYSTEM =====
function toast(msg) {
  var container = document.getElementById('toasts');
  var t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  container.appendChild(t);
  setTimeout(function () {
    t.style.animation = 'toastOut 0.3s ease forwards';
    setTimeout(function () { t.remove(); }, 300);
  }, 2800);
}

// ===== CARD TOGGLE =====
function toggleCard(header) {
  var body = header.nextElementSibling;
  var chevron = header.querySelector('.chevron');
  var isOpen = body.classList.toggle('visible');
  chevron.classList.toggle('open', isOpen);
}

// ===== COPY CODE =====
function copyCode(id, btn) {
  var code = document.getElementById(id).textContent;
  navigator.clipboard.writeText(code).then(function () {
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    copyCount++;
    document.getElementById('stat-copies').textContent = copyCount;
    toast('code copied — paste with confidence bestie 🤙');
    setTimeout(function () {
      btn.textContent = 'Copy code';
      btn.classList.remove('copied');
    }, 2000);
  }).catch(function () {
    // fallback for older browsers
    var ta = document.createElement('textarea');
    ta.value = code;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    copyCount++;
    document.getElementById('stat-copies').textContent = copyCount;
    toast('code copied — go paste it king 👑');
    setTimeout(function () {
      btn.textContent = 'Copy code';
      btn.classList.remove('copied');
    }, 2000);
  });
}

// ===== SEARCH =====
function handleSearch(val) {
  val = val.toLowerCase().trim();
  var cards = document.querySelectorAll('.card');
  cards.forEach(function (card) {
    var topic = (card.getAttribute('data-topic') || '').toLowerCase();
    var text = card.textContent.toLowerCase();
    card.style.display = (topic.includes(val) || text.includes(val)) ? '' : 'none';
  });
}

// ===== MODALS =====
function closeModal(id) {
  document.getElementById(id).classList.remove('active');
}

// ===== RIZZ MODAL =====
var rizzes = [
  {
    t: 'SQL pickup line',
    b: 'Are you a foreign key? Because you complete me and I cannot function without you. Seriously — ORA-02291 everywhere.'
  },
  {
    t: 'Dev truth',
    b: 'Me at 2am: just one more query. Also me at 5am: the DB is on fire, I have 3 syntax errors, and I am somehow crying laughing.'
  },
  {
    t: 'Lab wisdom',
    b: 'The real DBMS was the bugs we fixed along the way. Just kidding — it was definitely Zain\'s notes. Download them.'
  },
  {
    t: 'Oracle hours',
    b: 'Oracle: ORA-00942: table or view does not exist. You: *staring at the table that CLEARLY exists* 💀'
  },
  {
    t: 'Commit issues',
    b: 'COMMIT to your code like you commit to plans — reluctantly, under deadline pressure, and hoping nobody noticed the ROLLBACK.'
  },
  {
    t: 'Philosophical SQL',
    b: 'SELECT happiness FROM life WHERE stress = 0 — returned 0 rows. Bestie, the table might just be empty. Check the WHERE clause fr.'
  },
  {
    t: 'Exam season realness',
    b: 'There are two types of students: those who start studying a week early, and the ones reading this at midnight. We see you. You\'re valid.'
  },
];

var rIdx = 0;

function showRizzModal() {
  rIdx = Math.floor(Math.random() * rizzes.length);
  document.getElementById('rizz-title').textContent = rizzes[rIdx].t;
  document.getElementById('rizz-body').textContent = rizzes[rIdx].b;
  document.getElementById('rizz-modal').classList.add('active');
}

function nextRizz() {
  rIdx = (rIdx + 1) % rizzes.length;
  document.getElementById('rizz-title').textContent = rizzes[rIdx].t;
  document.getElementById('rizz-body').textContent = rizzes[rIdx].b;
}

// ===== PANIC MODAL =====
var panics = [
  'You opened this 2 hours before the exam. Bold. Stupid. Iconic. We respect the chaos.',
  'Bro really thought vibes would carry the lab exam. Let\'s find out together.',
  'The lab teacher is already judging you from across the room. It\'s giving ORA-00001: unique constraint violated.',
  'Error 404: preparation not found. But hey — Zain\'s notes are right here. Download button is green. You\'ve got this.',
  'Survival probability: not zero. That\'s something. You got this! (This message not backed by any data whatsoever.)',
  'You still have time. 2 hours is literally 120 minutes. Zain mastered this in less. Open the PDF. Go.',
];

function panicMode() {
  var p = panics[Math.floor(Math.random() * panics.length)];
  document.getElementById('panic-body').textContent = p;
  document.getElementById('panic-modal').classList.add('active');
  var bar = document.getElementById('panic-bar');
  bar.style.width = '0%';
  setTimeout(function () {
    var pct = Math.floor(Math.random() * 55) + 25;
    bar.style.width = pct + '%';
  }, 350);
}

// ===== DOWNLOAD =====
function flexDownload() {
  toast('notes downloading... Zain carried again fr 🙏');
}

// ===== QUIZ =====
var quizData = [
  {
    q: 'What does the SELECT statement do in SQL?',
    opts: ['Deletes rows from a table', 'Retrieves data from a table', 'Creates a new table', 'Updates existing values'],
    ans: 1
  },
  {
    q: 'Which keyword removes duplicate rows from query results?',
    opts: ['UNIQUE', 'NODUPE', 'DISTINCT', 'FILTER'],
    ans: 2
  },
  {
    q: 'In PL/SQL, what does the EXCEPTION block handle?',
    opts: ['Regular SELECT queries', 'Runtime errors during execution', 'Table creation statements', 'Index operations'],
    ans: 1
  },
  {
    q: 'What does a CURSOR do in PL/SQL?',
    opts: ['Deletes records one by one', 'Points to your mouse position', 'Iterates over query results row by row', 'Performs JOIN operations'],
    ans: 2
  }
];

var qIdx = 0;
var score = 0;

function loadQuiz() {
  if (qIdx >= quizData.length) {
    var endMsg = score === quizData.length
      ? 'sheesh, perfect score! you actually read the notes 🔥'
      : score >= 2
        ? 'not bad ngl — ' + score + '/' + quizData.length + ' ✌️'
        : 'L but it\'s a learning moment — ' + score + '/' + quizData.length;

    document.getElementById('quiz-q').textContent = 'Quiz complete! ' + endMsg;
    document.getElementById('quiz-opts').innerHTML =
      '<button class="btn-pill accent" onclick="resetQuiz()" style="margin-top:10px;">run it back</button>';
    document.getElementById('quiz-feedback').textContent = '';
    document.getElementById('quiz-progress').style.width = '100%';
    return;
  }

  var q = quizData[qIdx];
  document.getElementById('q-num').textContent = qIdx + 1;
  document.getElementById('score').textContent = score;
  document.getElementById('quiz-progress').style.width = (((qIdx + 1) / quizData.length) * 100) + '%';
  document.getElementById('quiz-q').textContent = q.q;
  document.getElementById('quiz-feedback').textContent = '';

  var optsEl = document.getElementById('quiz-opts');
  optsEl.innerHTML = '';
  q.opts.forEach(function (opt, i) {
    var btn = document.createElement('button');
    btn.className = 'quiz-opt';
    btn.textContent = opt;
    btn.onclick = function () { answerQuiz(i, q.ans); };
    optsEl.appendChild(btn);
  });
}

function answerQuiz(picked, correct) {
  quizAttempts++;
  document.getElementById('stat-attempts').textContent = quizAttempts;

  var opts = document.querySelectorAll('.quiz-opt');
  opts.forEach(function (o, i) {
    o.onclick = null;
    if (i === correct) o.classList.add('correct');
    else if (i === picked) o.classList.add('wrong');
  });

  if (picked === correct) {
    score++;
    document.getElementById('quiz-feedback').textContent = 'correct! you actually know things fr.';
    toast('W answer — we love to see it 🏆');
  } else {
    document.getElementById('quiz-feedback').textContent =
      'nope — option ' + (correct + 1) + ' was correct. you\'ll get the next one bestie, trust.';
    toast('L but educationally speaking, very valuable 📚');
  }

  qIdx++;
  setTimeout(loadQuiz, 1600);
}

function resetQuiz() {
  qIdx = 0;
  score = 0;
  loadQuiz();
  toast('running it back — let\'s go again 🔁');
}

// ===== IMAGE GALLERY =====
var images = [
  'WhatsApp%20Image%202026-04-15%20at%201.17.02%20AM.jpeg',
  'img2.jpeg',
  'img3.jpeg',
  'img4.jpeg',
  'img5.jpeg',
  'img6.jpeg'
];

var currentIndex = 0;

function openImage(index) {
  currentIndex = index;
  document.getElementById('fullImage').src = decodeURIComponent(images[index]);
  document.getElementById('imageModal').classList.add('active');
}

function closeImage() {
  document.getElementById('imageModal').classList.remove('active');
}

function changeImage(step) {
  currentIndex = (currentIndex + step + images.length) % images.length;
  document.getElementById('fullImage').src = decodeURIComponent(images[currentIndex]);
}

// close image modal on Escape key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeImage();
    closeModal('rizz-modal');
    closeModal('panic-modal');
  }
  if (e.key === 'ArrowRight') changeImage(1);
  if (e.key === 'ArrowLeft') changeImage(-1);
});

// ===== INIT =====
window.onload = function () {
  loadQuiz();
  setTimeout(function () {
    toast('yo welcome to the DBMS guide 👋 check the daily rizz button fr');
  }, 900);
};