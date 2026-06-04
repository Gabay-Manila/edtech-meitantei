// ============================================================
// data/case01.js — 消えたショートケーキ事件
// The Case of the Missing Shortcake
//
// ※ このケースはレベル選択なし（levels キーなし）
//    app.js が levels の有無を見て分岐する
// ============================================================

var CASE01_DATA = {

  id: 1,

  title: {
    jp: "消えたショートケーキ事件",
    en: "The Case of the Missing Shortcake"
  },

  // イントロ（intro-screen の dlg-jp / dlg-en に流し込む）
  introJp: "「大変だ！冷蔵庫のケーキがなくなってる！一緒に犯人を見つけよう！」",
  introEn: "\"Oh no! The cake in the fridge is gone! Let's find the culprit together!\"",

  // シーン情報
  sceneJp: ["ケンジがソファでテレビを見ている", "ケンジの顔をよく見ている", "証拠がそろった！クライマックス！"],
  sceneEn: ["Kenji is watching TV on the sofa", "Looking carefully at Kenji's face", "All evidence gathered! The climax!"],
  harutoLines: ["がんばれ！", "もう少し！", "クライマックス！"],

  // ヒント
  hints: [
    "ハルト：ケンジが怪しいな。どうやって話しかける？",
    "ハルト：ケンジはずっと部屋にいたと言っているね。でも何か怪しいところはない？",
    "ハルト：証拠はそろった！名探偵の決め台詞でビシッと決めよう！"
  ],
  hintsEn: [
    "Haruto: \"Kenji looks suspicious. How will you talk to him?\"",
    "Haruto: \"Kenji says he's been in the room the whole time. Does anything seem off?\"",
    "Haruto: \"All evidence gathered! Strike with the famous detective's line!\""
  ],

  // 選択肢
  choices: [
    [
      { jp: "「ケーキ、食べましたか？」",             en: "\"Did you eat the cake?\"",              t: "wrong"   },
      { jp: "「いま、何をしていますか？」",           en: "\"What are you doing right now?\"",      t: "correct" },
      { jp: "「お腹が痛いです。」",                   en: "\"My stomach hurts.\"",                  t: "funny"   }
    ],
    [
      { jp: "「ケンジさんの服、かっこいいですね。」", en: "\"Kenji, your clothes look really cool!\"", t: "wrong"   },
      { jp: "「口のまわりに、白いクリームがついていますよ。」", en: "\"There's white cream around your mouth.\"", t: "correct" },
      { jp: "「テレビを消してください。」",           en: "\"Please turn off the TV.\"",            t: "funny"   }
    ],
    [
      { jp: "「犯人は、あなたですね！」",             en: "\"You are the culprit, aren't you!\"",   t: "wrong"   },
      { jp: "「ごちそうさまでした！」",               en: "\"Thank you for the meal!\"",            t: "funny"   },
      { jp: "「真実は、いつもひとつ！」",             en: "\"The truth is always just one!\"",      t: "correct" }
    ]
  ],

  // フィードバック
  fb: [
    {
      correct: {
        hdr: "correct", ico: "✅", lbl: "GOOD MOVE！",
        spk: "ケンジ",
        rjp: "ん？テレビを見てるよ。ずっとこの部屋にいるんだ。\n\nハルト：よし、次の質問だ！",
        ren: "Kenji: \"Hm? I'm watching TV. I've been here the whole time.\"\nHaruto: \"Great, next question!\"",
        tjp: "「〜をしていますか」は今やっていることを確認する便利な表現。まず状況を聞くのが探偵の基本！",
        ten: "\"What are you doing?\" is a handy phrase for asking what someone is currently doing. Checking before accusing — detective basics!"
      },
      wrong: {
        hdr: "wrong", ico: "❌", lbl: "FAILED！",
        spk: "ケンジ",
        rjp: "えっ、食べてないよ！疑うなんてひどいな！\n\nケンジが怒って出て行った…",
        ren: "Kenji: \"What?! I didn't eat it! How dare you suspect me!\" (Kenji left angrily...)",
        tjp: "いきなり疑うのは失礼。まずは穏やかに話しかけるのがコツ。",
        ten: "Jumping straight to accusations can seem rude. The trick is to start with a calm approach."
      },
      funny: {
        hdr: "funny", ico: "😅", lbl: "OOPS！",
        spk: "ハルト",
        rjp: "えぇっ！？大丈夫？…じゃなくて、今はケーキの犯人を探すんだよ！",
        ren: "Haruto: \"Huh?! Are you okay?! ...Wait, we're supposed to be finding the cake thief!\"",
        tjp: "「お腹が痛いです」は自分の体の様子を伝える表現。今はケンジのことを聞かないといけなかったね！",
        ten: "\"My stomach hurts\" describes your own condition. We needed to ask about Kenji, not ourselves!"
      }
    },
    {
      correct: {
        hdr: "correct", ico: "🔍", lbl: "EVIDENCE！",
        spk: "ケンジ",
        rjp: "えっ！？（あわてて口をふく）…こ、これはお昼のパンのクリームだよ！\n\nハルト：あやしい！お昼はカレーだったはず。最後の追及だ！",
        ren: "Kenji: \"Wha—?! (frantically wipes mouth) Th-this is cream from bread at lunch!\"\nHaruto: \"Suspicious! We had curry for lunch. Final question!\"",
        tjp: "「〇〇が〜についています」は何かが付着していることを伝える表現。観察力が鍵！",
        ten: "\"There's X on your Y\" is the expression for something being attached. Sharp observation is the key!"
      },
      wrong: {
        hdr: "wrong", ico: "❌", lbl: "MISS！",
        spk: "ハルト",
        rjp: "服はあとで褒めようよ…！ケンジの顔をよく見て！何か気づかない？",
        ren: "Haruto: \"We can compliment his clothes later...! Look carefully at Kenji's face!\"",
        tjp: "「〜かっこいいですね」はほめ言葉。今は証拠を探す場面だったね。",
        ten: "\"That looks cool!\" is a compliment. Right idea, wrong moment — we needed evidence!"
      },
      funny: {
        hdr: "wrong", ico: "😬", lbl: "WRONG MOVE！",
        spk: "ケンジ",
        rjp: "なんで消さなきゃいけないの？\n\nハルト：命令しても証拠は出てこないよ〜！",
        ren: "Kenji: \"Why do I have to turn it off?\" Haruto: \"Giving orders won't get us evidence!\"",
        tjp: "「〜してください」は丁寧な指示の表現。でも理由なく命令すると変に聞こえちゃうよ。",
        ten: "\"Please do X\" is a polite instruction. But ordering without reason sounds strange!"
      }
    },
    {
      correct: {
        hdr: "correct", ico: "⚡", lbl: "PERFECT！",
        spk: "ケンジ",
        rjp: "ううっ……ごめんなさい！美味しそうだったから、つい食べちゃいました……。\n\nハルト：やったね！名探偵！事件解決だ！",
        ren: "Kenji: \"Ugh... I'm sorry! It looked so delicious, I couldn't help myself...\"\nHaruto: \"We did it! You're a real detective! Case solved!\"",
        tjp: "「真実はいつもひとつ！」——名探偵の名ゼリフ！いつも＝always、ひとつ＝one。短くてかっこいい！",
        ten: "The iconic detective catchphrase! \"いつも\" = always, \"ひとつ\" = one. Short, sharp, super cool!"
      },
      wrong: {
        hdr: "wrong", ico: "😤", lbl: "ALMOST！",
        spk: "ハルト",
        rjp: "正しいけど…もっとカッコよく決めようよ！有名な名探偵のセリフ、知ってるでしょ？",
        ren: "Haruto: \"That's right, but... let's say it cooler! You know the famous detective's line, don't you?\"",
        tjp: "「犯人はあなたですね」は正しい文章。でもクライマックスにはもっとドラマチックな一言があるはず！",
        ten: "\"You are the culprit\" is correct Japanese. But for the climax, there's a much more dramatic line!"
      },
      funny: {
        hdr: "funny", ico: "😂", lbl: "HILARIOUS！",
        spk: "ケンジ",
        rjp: "え、今食事の場面じゃないけど…（笑）\n\nハルト：もう！なんでごはんの話してるの！",
        ren: "Kenji: \"Um... we're not eating right now though... (laughs)\" Haruto: \"Why are you talking about food!\"",
        tjp: "「ごちそうさまでした」は食事の後に言う大切な言葉。でも今は犯人を追い詰める場面だよ！",
        ten: "\"ごちそうさまでした\" is said after a meal. Very important — but this was a crime scene, not a dining table!"
      }
    }
  ]

};
