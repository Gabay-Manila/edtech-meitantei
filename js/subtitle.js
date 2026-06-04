// ============================================================
// subtitle.js — 英語字幕トグル
// 名探偵ゲーム / Meitantei Game
//
// 依存: なし（単体で動作）
// 使い方:
//   Subtitle.toggle();   // 字幕ON/OFFを切り替え
//   Subtitle.isOn()      // true/false
//   Subtitle.sync()      // 現在の状態を全要素に強制反映
//
// HTMLの規約:
//   class="sub-show"   を持つ要素が字幕対象
//   class="sub-lbl-sm" を持つボタンラベルが自動更新
// ============================================================

const Subtitle = (() => {

  let _on = false;  // デフォルトはOFF

  // ── ON/OFFトグル ───────────────────────────────────────
  function toggle() {
    _on = !_on;
    sync();
  }

  function isOn() { return _on; }

  // ── 全要素に現在の状態を反映 ────────────────────────────
  function sync() {
    // 字幕対象クラス一覧
    const targets = [
      '.sub-txt',    // 字幕バー
      '.ch-en',      // 選択肢の英訳
      '.react-en',   // フィードバックリアクション英訳
      '.tip-en',     // Tipの英訳
      '.truth-en',   // CLEAR画面の英訳
      '.hint-en',    // ヒントの英訳
      '.dlg-en',     // ダイアログの英訳
      '.sc-en',      // シーン説明の英訳
      '.role-en',    // ロール説明の英訳
      '.lv-en',      // レベル説明の英訳（CASE02拡張）
    ];

    targets.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        el.classList.toggle('show', _on);
      });
    });

    // CLEAR画面のインライン要素（display:none で制御しているもの）
    const inlineEls = ['clr-sub-en'];
    inlineEls.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = _on ? 'inline' : 'none';
    });

    _syncUI();
  }

  // ── ボタンUI同期 ─────────────────────────────────────
  function _syncUI() {
    // メインピル（タイトル画面）
    const mainLbl = document.getElementById('sub-lbl');
    if (mainLbl) mainLbl.textContent = _on ? 'EN: ON' : 'EN: OFF';

    // 各画面のミニラベル
    document.querySelectorAll('.sub-lbl-sm').forEach(el => {
      el.textContent = _on ? 'EN✓' : 'EN';
      const btn = el.closest('.pill, .sub-mini');
      if (btn) btn.classList.toggle('on', _on);
    });

    // メインピル自体のスタイル
    const mainPill = document.getElementById('sub-pill');
    if (mainPill) mainPill.classList.toggle('on', _on);
  }

  // Public API
  return { toggle, isOn, sync };

})();
