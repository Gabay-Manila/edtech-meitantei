// ============================================================
// app.js — 名探偵ゲーム メインアプリ
// Meitantei Game — Main Application Controller
//
// 依存:
//   voice.js    — Voice オブジェクト
//   subtitle.js — Subtitle オブジェクト
//   data/case01.js — CASE01_DATA
//   data/case02.js — CASE02_DATA  （追加で自動認識）
//   data/case03.js — CASE03_DATA  （追加で自動認識）
//
// ケースの追加方法:
//   1. data/caseXX.js を作成し CASEXX_DATA をexport
//   2. index.html に <script src="data/caseXX.js"> を追加
//   3. 以下の REGISTRY に1行追加するだけ
// ============================================================

// ============================================================
// 📋 ケースレジストリ — ここだけ編集してケースを追加
// ============================================================
const REGISTRY = [
  { id: 1, dataVar: 'CASE01_DATA', unlocked: true  },
  { id: 2, dataVar: 'CASE02_DATA', unlocked: false },
  { id: 3, dataVar: 'CASE03_DATA', unlocked: false },
];

// ============================================================
// 🗂 アプリ状態
// ============================================================
const State = {
  currentCase : null,   // 現在のケースデータオブジェクト
  currentLevel: 1,      // 選択中のレベル（1/2/3）
  currentQ    : 0,      // 現在の問題インデックス
  pending     : null,   // 最後に選んだ選択肢タイプ ('correct'|'wrong'|'funny')
  clearedCases: (() => { try { return new Set(JSON.parse(localStorage.getItem('cleared') || '[]')); } catch(e) { return new Set(); } })(),
};

// クリア状態を保存
function _saveClear(caseId) {
  State.clearedCases.add(caseId);
  try {
    localStorage.setItem('cleared', JSON.stringify([...State.clearedCases]));
  } catch(e) { /* localStorage使えない環境は無視 */ }
}

// ============================================================
// 📺 画面切替
// ============================================================
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
}

// ============================================================
// 🏠 タイトル画面
// ============================================================
function renderTitle() {
  const list = document.getElementById('case-list');
  if (!list) {
    console.error('[app.js] #case-list が見つかりません');
    return;
  }
  list.innerHTML = '';

  REGISTRY.forEach(reg => {
    const data = window[reg.dataVar];

    // ── デバッグ：データ取得状況をコンソールに出力 ──
    if (data) {
      console.log(`[app.js] ${reg.dataVar} 読み込みOK:`, data.title.jp);
    } else {
      console.warn(`[app.js] ${reg.dataVar} が window に存在しません。data/${reg.dataVar.toLowerCase().replace('_data','')}.js が読み込まれているか確認してください。`);
    }

    const cleared  = State.clearedCases.has(reg.id);
    const unlocked = reg.unlocked || cleared || (reg.id === 2 && State.clearedCases.has(1));

    const card = document.createElement('div');
    card.className = 'case-card' + (unlocked ? '' : ' locked');

    const statusText  = cleared ? 'CLEAR！' : unlocked ? '捜査中' : 'まもなく';
    const statusClass = cleared ? 'b-clear' : unlocked ? 'b-open'  : 'b-lock';

    // data が未ロードでも ???  ではなく CASE番号を表示
    const titleJp = data ? data.title.jp : '（データ読み込み中…）';
    const titleEn = data ? data.title.en : 'Loading...';

    card.innerHTML = `
      <div class="c-num">CASE ${String(reg.id).padStart(2,'0')}</div>
      <div class="c-titles">
        <div class="c-jp">${titleJp}</div>
        <div class="c-en">${titleEn}</div>
      </div>
      <div class="c-badge ${statusClass}" id="case${reg.id}-badge">${statusText}</div>
    `;

    if (unlocked) {
      card.addEventListener('click', () => startCase(reg.id));
    }

    list.appendChild(card);
  });

  showScreen('title-screen');
}

// ============================================================
// 🎬 ケース開始（レベル選択画面へ）
// ============================================================
function startCase(caseId) {
  const reg  = REGISTRY.find(r => r.id === caseId);
  const data = reg ? window[reg.dataVar] : null;
  if (!data) return;

  State.currentCase  = data;
  State.currentLevel = 1;
  State.currentQ     = 0;
  State.pending      = null;

  // CASE01は従来通りレベル選択なし（levelsキーがなければスキップ）
  if (!data.levels) {
    renderIntro();
    return;
  }

  renderLevelSelect();
}

// ============================================================
// 🎚 レベル選択画面（CASE02以降）
// ============================================================
function renderLevelSelect() {
  const data = State.currentCase;

  // レベル選択画面が存在しない場合は動的生成
  let screen = document.getElementById('level-screen');
  if (!screen) {
    screen = document.createElement('div');
    screen.id = 'level-screen';
    screen.className = 'screen';
    document.querySelector('.phone').appendChild(screen);
  }

  const labels = data.levelLabels || {
    1: { label: '🟢 かんたん',   desc: 'ひらがな中心' },
    2: { label: '🟡 ふつう',     desc: '日常会話' },
    3: { label: '🔵 むずかしい', desc: '敬語・論理' },
  };

  screen.innerHTML = `
    <div class="s-header">
      <div>
        <div class="s-lbl">CASE ${String(data.id).padStart(2,'0')}</div>
        <div class="s-ttl">${data.title.jp}</div>
      </div>
      <div class="hdr-pills">
        <button class="pill ${Voice.isOn() ? 'on' : ''}" onclick="Voice.toggle()">
          <span class="dot"></span><span class="voice-lbl-sm">${Voice.isOn() ? '🔊' : '🔇'}</span>
        </button>
        <button class="pill ${Subtitle.isOn() ? 'on' : ''}" onclick="Subtitle.toggle()">
          <span class="dot"></span><span class="sub-lbl-sm">${Subtitle.isOn() ? 'EN✓' : 'EN'}</span>
        </button>
      </div>
    </div>

    <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px;gap:14px;">
      <div style="font-family:'Oswald',sans-serif;font-size:11px;color:var(--gold);letter-spacing:4px;margin-bottom:4px;">SELECT LEVEL</div>
      <div style="font-size:14px;color:var(--cream);font-weight:700;margin-bottom:8px;">レベルを選んでね</div>

      ${Object.entries(labels).map(([lv, info]) => `
        <button class="level-card" data-lv="${lv}" onclick="selectLevel(${lv})">
          <div class="lv-icon">${info.label.split(' ')[0]}</div>
          <div class="lv-info">
            <div class="lv-label">${info.label.replace(/^[^\s]+\s/, '')}</div>
            <div class="lv-desc">${info.desc}</div>
          </div>
          <div class="lv-arrow">›</div>
        </button>
      `).join('')}

      <button class="btn-sec" style="margin-top:8px;width:100%;" onclick="renderTitle()">← タイトルへ</button>
    </div>
  `;

  // レベルカードのスタイルをインジェクト（まだなければ）
  if (!document.getElementById('level-style')) {
    const s = document.createElement('style');
    s.id = 'level-style';
    s.textContent = `
      .level-card{background:var(--navy2);border:1px solid rgba(200,168,75,0.3);border-radius:10px;
        padding:14px 16px;cursor:pointer;display:flex;align-items:center;gap:12px;width:100%;
        font-family:'Noto Sans JP',sans-serif;transition:all .2s;}
      .level-card:active{border-color:var(--gold);background:#1e3060;}
      .lv-icon{font-size:24px;flex-shrink:0;}
      .lv-info{flex:1;text-align:left;}
      .lv-label{font-size:14px;color:var(--cream);font-weight:700;}
      .lv-desc{font-size:11px;color:rgba(200,168,75,0.7);margin-top:2px;}
      .lv-arrow{font-size:20px;color:var(--gold);font-weight:700;}
    `;
    document.head.appendChild(s);
  }

  showScreen('level-screen');
}

function selectLevel(lv) {
  State.currentLevel = parseInt(lv);
  State.currentQ     = 0;
  State.pending      = null;
  renderIntro();
}

// ============================================================
// 🎬 イントロ画面
// ============================================================
function renderIntro() {
  const data = State.currentCase;
  const lv   = data.levels ? data.levels[State.currentLevel] : null;

  // CASE01（levelsなし）かCASE02以降（levelsあり）で取得先が変わる
  const introJp = lv ? lv.introJp : data.introJp || '';
  const introEn = lv ? lv.introEn : data.introEn || '';

  // イントロダイアログを更新
  const jpEl = document.getElementById('intro-jp');
  const enEl = document.getElementById('intro-en');
  const subEl = document.getElementById('intro-sub');
  if (jpEl) jpEl.textContent = introJp;
  if (enEl) { enEl.textContent = introEn; enEl.className = 'dlg-en' + (Subtitle.isOn() ? ' show' : ''); }
  if (subEl) { subEl.textContent = introEn; subEl.className = 'sub-txt' + (Subtitle.isOn() ? ' show' : ''); }

  // ケース番号・タイトルを更新
  const lblEl = document.querySelector('#intro-screen .s-lbl');
  const ttlEl = document.querySelector('#intro-screen .s-ttl');
  if (lblEl) lblEl.textContent = `CASE ${String(data.id).padStart(2,'0')}`;
  if (ttlEl) ttlEl.textContent = data.title.jp;

  showScreen('intro-screen');
  Voice.autoSpeak(introJp);
}

// ============================================================
// ❓ 問題画面
// ============================================================
function renderQuestion() {
  const data  = State.currentCase;
  const lv    = data.levels ? data.levels[State.currentLevel] : data;
  const qi    = State.currentQ;
  const total = lv.choices.length;

  // ヘッダー
  const qLbl = document.getElementById('q-lbl');
  if (qLbl) qLbl.textContent = `QUESTION ${qi + 1} / ${total}`;

  // 進捗ドット
  ['d0','d1','d2'].forEach((id, i) => {
    const d = document.getElementById(id);
    if (!d) return;
    d.className = 'qdot';
    if (i < qi)       d.classList.add('done');
    else if (i === qi) d.classList.add('cur');
  });

  // シーン
  _renderScene(qi, lv);

  // ヒント
  const hJp = document.getElementById('hint-jp');
  const hEn = document.getElementById('hint-en');
  if (hJp) hJp.textContent = lv.hints[qi];
  if (hEn) {
    hEn.textContent = lv.hintsEn ? lv.hintsEn[qi] : '';
    hEn.className = 'hint-en' + (Subtitle.isOn() ? ' show' : '');
  }

  // 選択肢
  const area = document.getElementById('choices');
  if (!area) return;
  area.innerHTML = '';
  lv.choices[qi].forEach((ch, i) => {
    const btn = document.createElement('button');
    btn.className = 'ch-btn';
    btn.innerHTML = `
      <div class="ch-num">${i + 1}</div>
      <div class="ch-inner">
        <div class="ch-jp">${ch.jp}</div>
        <div class="ch-en${Subtitle.isOn() ? ' show' : ''}">${ch.en || ''}</div>
      </div>
      <button class="ch-play" onclick="event.stopPropagation(); Voice.speak('${ch.jp.replace(/'/g,"\\'")}')">🔊</button>
    `;
    btn.addEventListener('click', () => onChoice(ch.t));
    area.appendChild(btn);
  });

  showScreen('question-screen');
  Voice.autoSpeak(lv.hints[qi]);
}

// ── シーン描画 ──────────────────────────────────────────────
function _renderScene(qi, lv) {
  const sceneEl = document.getElementById('q-scene');
  if (!sceneEl) return;

  const emojis  = ['🛋️','👀','⚡','🔎','📝','🎭'];
  const sceneJp = lv.sceneJp || ['シーン1','シーン2','シーン3'];
  const sceneEn = lv.sceneEn || ['Scene 1','Scene 2','Scene 3'];
  const harutoLines = lv.harutoLines ||
    (qi === 0 ? 'がんばれ！' : qi === 1 ? 'もう少し！' : 'クライマックス！');
  const harutoLine = Array.isArray(harutoLines) ? harutoLines[qi] : harutoLines;

  sceneEl.innerHTML = `
    <div class="scene-emoji">${emojis[qi] || '🔍'}</div>
    <div class="sc-caption">
      <div class="sc-jp">${sceneJp[qi] || ''}</div>
      <div class="sc-en${Subtitle.isOn() ? ' show' : ''}">${sceneEn[qi] || ''}</div>
    </div>
    <div class="haruto-wrap">
      <div class="h-bubble">${harutoLine}</div>
      <div class="h-face">🕵️</div>
    </div>
  `;
}

// ============================================================
// 💬 選択肢タップ → フィードバック
// ============================================================
function onChoice(type) {
  const data = State.currentCase;
  const lv   = data.levels ? data.levels[State.currentLevel] : data;
  const qi   = State.currentQ;
  const fb   = lv.fb[qi][type];

  State.pending = type;

  // ヘッダー
  const hdr = document.getElementById('fb-hdr');
  if (hdr) hdr.className = `fb-hdr ${fb.hdr}`;
  _setEl('fb-ico', fb.ico);
  _setEl('fb-lbl', fb.lbl);
  _setEl('fb-spk', fb.spk + '：');

  // リアクション
  _setEl('fb-rjp', fb.rjp);
  const renEl = document.getElementById('fb-ren');
  if (renEl) {
    renEl.textContent = fb.ren || '';
    renEl.className = 'react-en' + (Subtitle.isOn() ? ' show' : '');
  }

  // Tip
  _setEl('tip-jp', fb.tjp);
  const tenEl = document.getElementById('tip-en');
  if (tenEl) {
    tenEl.textContent = fb.ten || '';
    tenEl.className = 'tip-en' + (Subtitle.isOn() ? ' show' : '');
  }

  // 次ボタンのラベル
  const total  = lv.choices.length;
  const isLast = qi === total - 1;
  const btn    = document.getElementById('fb-btn');
  if (btn) {
    if (type === 'correct') {
      btn.textContent = isLast ? '🎉 解決！ Case solved!' : 'つぎへ → Next →';
    } else {
      btn.textContent = 'もう一度 → Try again →';
    }
  }

  showScreen('feedback-screen');
  Voice.autoSpeak(fb.rjp);
}

// ── フィードバック「つぎへ」ボタン ──────────────────────────
function onFeedbackNext() {
  const data  = State.currentCase;
  const lv    = data.levels ? data.levels[State.currentLevel] : data;
  const total = lv.choices.length;

  if (State.pending === 'correct') {
    if (State.currentQ === total - 1) {
      _saveClear(data.id);
      renderClear();
    } else {
      State.currentQ++;
      renderQuestion();
    }
  } else {
    // 不正解・おもしろ → 同じ問題をやり直し
    renderQuestion();
  }
}

// ============================================================
// 🏅 CLEAR画面
// ============================================================
function renderClear() {
  const data  = State.currentCase;
  const lv    = data.levels ? data.levels[State.currentLevel] : data;
  const total = lv.choices.length;

  // バッジ更新
  const badge = document.getElementById(`case${data.id}-badge`);
  if (badge) {
    badge.textContent = 'CLEAR！';
    badge.className   = 'c-badge b-clear';
  }

  // ハルトのコメント
  const comments = [
    'ハルト：「やっぱり君は本物の名探偵だ！次の事件も一緒に解決しようね！」',
    'ハルト：「すごい！全部正解！頭いいね！君は本当の名探偵だよ！」',
    'ハルト：「完璧な推理だった！探偵バッジ、もらえるよ！」',
  ];
  _setEl('h-cmt', comments[Math.floor(Math.random() * comments.length)]);

  // 英語字幕の状態同期
  const truthEn  = document.getElementById('truth-en');
  const clrSubEn = document.getElementById('clr-sub-en');
  if (truthEn)  truthEn.className  = 'truth-en' + (Subtitle.isOn() ? ' show' : '');
  if (clrSubEn) clrSubEn.style.display = Subtitle.isOn() ? 'inline' : 'none';

  showScreen('clear-screen');
  Voice.autoSpeak('真実は、いつもひとつ！　' + document.getElementById('h-cmt').textContent);
}

// ============================================================
// 🔧 ユーティリティ
// ============================================================
function _setEl(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text || '';
}

// ============================================================
// 🎮 グローバルイベントバインド
// ============================================================
function _bindEvents() {
  // フィードバック「つぎへ」
  const fbBtn = document.getElementById('fb-btn');
  if (fbBtn) fbBtn.addEventListener('click', onFeedbackNext);

  // イントロ「捜査を始める」
  const startBtn = document.getElementById('start-btn');
  if (startBtn) startBtn.addEventListener('click', renderQuestion);

  // CLEAR「もう一度」
  const retryBtn = document.getElementById('retry-btn');
  if (retryBtn) retryBtn.addEventListener('click', () => {
    State.currentQ = 0;
    State.pending  = null;
    renderQuestion();
  });

  // CLEAR「タイトルへ」
  const titleBtn = document.getElementById('title-btn');
  if (titleBtn) titleBtn.addEventListener('click', renderTitle);

  // グローバル関数として公開（HTML onclickから呼ぶため）
  // Voice/Subtitle が未定義でもクラッシュしないよう防御
  window.toggleVoice = () => {
    try { if (typeof Voice !== 'undefined') Voice.toggle(); }
    catch(e) { console.warn('[app.js] toggleVoice error:', e); }
  };
  window.toggleSub = () => {
    try {
      if (typeof Subtitle !== 'undefined') { Subtitle.toggle(); Subtitle.sync(); }
    } catch(e) { console.warn('[app.js] toggleSub error:', e); }
  };
  window.speakEl = (id) => {
    try { if (typeof Voice !== 'undefined') Voice.speakEl(id); }
    catch(e) { console.warn('[app.js] speakEl error:', e); }
  };
}

// ============================================================
// 🚀 アプリ起動
// ============================================================
function _boot() {
  try {
    console.log('[app.js] 起動開始');

    // Voice 初期化（voice.js が読めていない場合はスキップ）
    if (typeof Voice !== 'undefined') {
      Voice.init();
      console.log('[app.js] Voice.init() 完了');
    } else {
      console.warn('[app.js] voice.js が読み込まれていません。音声なしで続行します。');
    }

    if (typeof Subtitle === 'undefined') {
      console.warn('[app.js] subtitle.js が読み込まれていません。字幕なしで続行します。');
    }

    _bindEvents();
    renderTitle();
    console.log('[app.js] renderTitle() 完了');

  } catch(e) {
    console.error('[app.js] 起動エラー:', e);
  }
}

// DOMContentLoaded または既にDOM構築済みの場合どちらでも対応
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', _boot);
} else {
  _boot();
}
