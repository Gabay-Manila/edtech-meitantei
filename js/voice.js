// ============================================================
// voice.js — TTSエンジン
// 名探偵ゲーム / Meitantei Game
//
// 依存: なし（単体で動作）
// 使い方:
//   Voice.speak("おはようございます");
//   Voice.autoSpeak("自動再生テキスト");  // 300ms後に再生
//   Voice.toggle();                       // ON/OFFトグル
//   Voice.isOn()                          // true/false
// ============================================================

const Voice = (() => {

  let _on    = true;   // 音声のデフォルトはON
  let _voice = null;   // キャッシュするJPボイス

  // ── 初期化：JPボイスを探す ──────────────────────────────
  function init() {
    if (!window.speechSynthesis) {
      _on = false;
      _showWarn();
      return;
    }

    function _findVoice() {
      const all = speechSynthesis.getVoices();
      _voice =
        all.find(v => v.lang === 'ja-JP' && v.localService) ||
        all.find(v => v.lang === 'ja-JP') ||
        all.find(v => v.lang.startsWith('ja'));

      if (!_voice && all.length > 0) _showWarn();
    }

    _findVoice();
    if (typeof speechSynthesis.onvoiceschanged !== 'undefined') {
      speechSynthesis.onvoiceschanged = _findVoice;
    }
  }

  // ── 警告バナーを表示 ────────────────────────────────────
  function _showWarn() {
    const el = document.getElementById('voice-warn');
    if (el) el.style.display = 'block';
  }

  // ── テキストを読み上げる ────────────────────────────────
  function speak(text) {
    if (!_on || !window.speechSynthesis) return;

    // 括弧内（ト書き）は読み飛ばす
    const cleaned = text
      .replace(/（[^）]*）/g, '')   // 全角括弧
      .replace(/\([^)]*\)/g, '')    // 半角括弧
      .replace(/[\n\r]+/g, '。')    // 改行→読点
      .trim();

    if (!cleaned) return;

    speechSynthesis.cancel();

    const u = new SpeechSynthesisUtterance(cleaned);
    u.lang  = 'ja-JP';
    u.rate  = 0.95;
    u.pitch = 1.05;
    if (_voice) u.voice = _voice;

    speechSynthesis.speak(u);
  }

  // ── 要素IDのテキストを読み上げる ───────────────────────
  function speakEl(id) {
    const el = document.getElementById(id);
    if (el) speak(el.textContent);
  }

  // ── 自動再生（画面遷移後300msで発火）──────────────────
  function autoSpeak(text) {
    if (_on) setTimeout(() => speak(text), 300);
  }

  // ── ON/OFFトグル ───────────────────────────────────────
  function toggle() {
    _on = !_on;
    if (!_on && window.speechSynthesis) speechSynthesis.cancel();
    _syncUI();
  }

  function isOn() { return _on; }

  // ── UI同期（全ボイスボタンのラベル＋スタイル）──────────
  function _syncUI() {
    const label = _on ? '🔊' : '🔇';
    const mainLabel = _on ? '🔊 音声: ON' : '🔇 音声: OFF';

    // メインピル（タイトル画面）
    const mainPill = document.getElementById('voice-pill');
    if (mainPill) {
      mainPill.classList.toggle('on', _on);
      const lbl = mainPill.querySelector('#voice-lbl');
      if (lbl) lbl.textContent = mainLabel;
    }

    // 各画面のミニボタン
    document.querySelectorAll('.voice-lbl-sm').forEach(el => {
      el.textContent = label;
      const btn = el.closest('.pill, .sub-mini');
      if (btn) btn.classList.toggle('on', _on);
    });
  }

  // Public API
  return { init, speak, speakEl, autoSpeak, toggle, isOn };

})();
