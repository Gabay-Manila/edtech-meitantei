// ============================================================
// CASE 02: 行方不明のランドセル事件
// The Case of the Missing Backpack
//
// カメレオン・スクリプト構造
//   Level 1 🟢 ひらがな中心（初心者）
//   Level 2 🟡 日常会話・ルビなし（中級手前）
//   Level 3 🔵 敬語・論理表現（中級）
//
// 各レベル 3問構成：
//   Q1 — 状況確認（どうやって話しかける？）
//   Q2 — 矛盾の発見（証拠を見つける）
//   Q3 — クライマックス（真実はいつもひとつ！）
// ============================================================

var CASE02_DATA = {

  id: 2,

  title: {
    jp: "行方不明のランドセル事件",
    en: "The Case of the Missing Backpack"
  },

  characters: {
    partner: "ハルト",
    suspect: "おじいちゃん"
  },

  // 各レベルのラベル（UI表示用）
  levelLabels: {
    1: { label: "🟢 かんたん",  desc: "ひらがな中心" },
    2: { label: "🟡 ふつう",    desc: "日常会話" },
    3: { label: "🔵 むずかしい", desc: "敬語・論理" }
  },

  levels: {

    // =========================================================
    // 🟢 LEVEL 1 — ひらがな中心（初心者）
    // =========================================================
    1: {
      introJp: "「ぼくの ランドセルが ないんだ！おじいちゃんが あやしいな。なんて きく？」",
      introEn: "\"My backpack is gone! Grandpa looks suspicious. What will you say?\"",

      sceneJp: ["おじいちゃんが へやに いる", "つくえの まわりを しらべている", "しょうこが そろった！クライマックス！"],
      sceneEn: ["Grandpa is in the room", "Investigating around the desk", "Evidence gathered! The climax!"],

      hints: [
        "ハルト：おじいちゃんに なんて きく？",
        "ハルト：つくえの うえには ノートしか ないよ。どこを みる？",
        "ハルト：しょうこは そろった！けってい のひとこと を いおう！"
      ],
      hintsEn: [
        "Haruto: \"What will you say to Grandpa?\"",
        "Haruto: \"There's only a notebook on the desk. Where should we look?\"",
        "Haruto: \"Evidence gathered! Let's say the final line!\""
      ],

      choices: [
        // Q1
        [
          { jp: "「ランドセルは、どこに ありますか？」", en: "\"Where is the backpack?\"", t: "correct" },
          { jp: "「ランドセルは、あかいですか？」",     en: "\"Is the backpack red?\"",     t: "wrong"   },
          { jp: "「おはようございます！」",             en: "\"Good morning!\"",             t: "funny"   }
        ],
        // Q2
        [
          { jp: "「つくえの 『なか』を みます。」",   en: "\"Look inside the desk.\"",   t: "wrong"   },
          { jp: "「つくえの 『うしろ』を みます。」", en: "\"Look behind the desk.\"",   t: "correct" },
          { jp: "「テレビを みます。」",               en: "\"Watch TV.\"",               t: "funny"   }
        ],
        // Q3 — クライマックス（全レベル共通フレーズ）
        [
          { jp: "「たぶん、おじいちゃんが とった！」",  en: "\"Grandpa probably took it!\"",       t: "wrong"   },
          { jp: "「ごちそうさまでした！」",              en: "\"Thank you for the meal!\"",         t: "funny"   },
          { jp: "「しんじつは、いつも ひとつ！」",      en: "\"The truth is always just one!\"",   t: "correct" }
        ]
      ],

      fb: [
        // Q1 フィードバック
        {
          correct: {
            hdr: "correct", ico: "✅", lbl: "GOOD MOVE！",
            spk: "おじいちゃん",
            rjp: "「きのうから ずっと、へやの つくえの うえに あるぞ。」\n\nハルト：「あれ？でも つくえの うえには ノートしか ないよ！」",
            ren: "Grandpa: \"It's been on the desk in the room since yesterday.\"\nHaruto: \"Wait — but there's only a notebook on the desk!\"",
            tjp: "「〜は どこに ありますか」は ものの ばしょを きく ひょうげんだよ。",
            ten: "\"Where is the ~?\" is the expression for asking where something is located."
          },
          wrong: {
            hdr: "wrong", ico: "❌", lbl: "MISS！",
            spk: "おじいちゃん",
            rjp: "「いろは あかいけれど……いまは どこにあるか はなしとるんじゃ。」",
            ren: "Grandpa: \"Yes, it's red... but we're talking about where it is, aren't we?\"",
            tjp: "「〜は あかいですか」は いろを きく ひょうげん。ばしょを きこう！",
            ten: "\"Is it red?\" asks about color. We need to ask about the location!"
          },
          funny: {
            hdr: "funny", ico: "😄", lbl: "OOPS！",
            spk: "おじいちゃん",
            rjp: "「おお、おはよう！……じゃなくて、ランドセルを さがさんとかんぞ！」",
            ren: "Grandpa: \"Oh, good morning! ...But we need to find the backpack first!\"",
            tjp: "「おはようございます」は あさの あいさつ。いまは ランドセルを さがそう！",
            ten: "\"Good morning\" is a greeting. Right now we need to find the backpack!"
          }
        },
        // Q2 フィードバック
        {
          correct: {
            hdr: "correct", ico: "🔍", lbl: "FOUND IT！",
            spk: "ハルト",
            rjp: "「やった！つくえの うしろに おちてたよ！じけんかいけつだ！」",
            ren: "Haruto: \"Found it! It had fallen behind the desk! Case solved!\"",
            tjp: "「〜の うしろ」は うしろがわを あらわす ひょうげん。ばしょの ことばは たいせつ！",
            ten: "\"Behind the ~\" means the back side. Location words are super important!"
          },
          wrong: {
            hdr: "wrong", ico: "❌", lbl: "NOT THERE！",
            spk: "ハルト",
            rjp: "「なかには きょうかしょしか 入っていないよ。もういちど さがそう！」",
            ren: "Haruto: \"There are only textbooks inside. Let's look again!\"",
            tjp: "「〜の なか」は うちがわ。「うしろ」「した」「よこ」も おぼえよう！",
            ten: "\"Inside\" means the interior. Try also learning \"behind\", \"under\", \"beside\"!"
          },
          funny: {
            hdr: "funny", ico: "😂", lbl: "FOCUS！",
            spk: "ハルト",
            rjp: "「もう！なんで いまテレビを みるのさー！」",
            ren: "Haruto: \"Come on! Why are you watching TV right now?!\"",
            tjp: "「テレビを みます」は まちがいでは ないけど、いまは ランドセルを さがそう！",
            ten: "\"Watch TV\" isn't wrong Japanese, but now is not the time! Focus!"
          }
        },
        // Q3 フィードバック（クライマックス）
        {
          correct: {
            hdr: "correct", ico: "⚡", lbl: "PERFECT！",
            spk: "おじいちゃん",
            rjp: "「ううっ……すまんかった！さんぽに いくとき、まちがえて もってでちゃったんじゃ……。」\n\nハルト：「やったね！なんてい！じけんかいけつ！」",
            ren: "Grandpa: \"Oh... I'm sorry! I accidentally took it with me on my walk...\"\nHaruto: \"We did it! Case solved, Detective!\"",
            tjp: "「しんじつは いつも ひとつ！」——めいたんていの めいゼリフ！「しんじつ」は truth、「ひとつ」は one。",
            ten: "\"The truth is always just one!\" — the iconic detective line! \"しんじつ\" = truth, \"ひとつ\" = one."
          },
          wrong: {
            hdr: "wrong", ico: "😤", lbl: "ALMOST！",
            spk: "ハルト",
            rjp: "「おじいちゃんが とったとは かぎらないよ！もっと かっこよく きめよう！」",
            ren: "Haruto: \"We can't say Grandpa took it for sure! Let's say it cooler!\"",
            tjp: "「たぶん〜」は すいそく。めいたんていは しょうこで きめる！あのゆうめいな ひとこと は？",
            ten: "\"Probably\" is a guess. A real detective uses evidence! What's that famous line?"
          },
          funny: {
            hdr: "funny", ico: "😂", lbl: "HILARIOUS！",
            spk: "おじいちゃん",
            rjp: "「え？いま たべるの？……ランドセルを さがしとるんじゃないのか？」",
            ren: "Grandpa: \"Huh? Are we eating now?... Weren't we looking for the backpack?\"",
            tjp: "「ごちそうさまでした」は しょくじの あとに いう ことば。いまは クライマックス！",
            ten: "\"ごちそうさまでした\" is said after a meal. Right now is the big climax!"
          }
        }
      ]
    }, // end level 1

    // =========================================================
    // 🟡 LEVEL 2 — 日常会話・ルビなし（中級手前）
    // =========================================================
    2: {
      introJp: "「学校に行く時間なのに、ランドセルがないんだ！おじいちゃんに、最後にどこで見たか確認して！」",
      introEn: "\"It's time for school but my backpack is gone! Ask Grandpa where he last saw it!\"",

      sceneJp: ["おじいちゃんが部屋にいる", "机の周りを調べている", "証拠がそろった！クライマックス！"],
      sceneEn: ["Grandpa is in the room", "Investigating around the desk", "Evidence gathered! The climax!"],

      hints: [
        "ハルト：おじいちゃんに、ランドセルを最後に見た場所を聞いてみよう！",
        "ハルト：おじいちゃんは「机の上にある」と言ったけど、上には何もない。どこを確認する？",
        "ハルト：証拠はそろった！名探偵の決め台詞でビシッと決めよう！"
      ],
      hintsEn: [
        "Haruto: \"Ask Grandpa where he last saw the backpack!\"",
        "Haruto: \"Grandpa said it's on the desk, but there's nothing there. Where should we check?\"",
        "Haruto: \"Evidence gathered! Strike with the famous detective's line!\""
      ],

      choices: [
        // Q1
        [
          { jp: "「ランドセル、最後にどこに置きましたか？」", en: "\"Where did you last put the backpack?\"", t: "correct" },
          { jp: "「ランドセル、好きですか？」",               en: "\"Do you like the backpack?\"",           t: "wrong"   },
          { jp: "「今日、天気がいいですね。」",               en: "\"The weather is nice today, isn't it?\"", t: "funny"   }
        ],
        // Q2
        [
          { jp: "「机の引き出しの中を見ます。」",   en: "\"Look inside the desk drawer.\"", t: "wrong"   },
          { jp: "「机の後ろを確認してみます。」",   en: "\"Check behind the desk.\"",       t: "correct" },
          { jp: "「おじいちゃんの話を信じます。」", en: "\"Trust what Grandpa says.\"",    t: "funny"   }
        ],
        // Q3 — クライマックス
        [
          { jp: "「犯人は、おじいちゃんですね！」",  en: "\"The culprit is you, Grandpa!\"",     t: "wrong"   },
          { jp: "「いただきます！」",                en: "\"Let's eat!\"",                        t: "funny"   },
          { jp: "「真実は、いつもひとつ！」",        en: "\"The truth is always just one!\"",    t: "correct" }
        ]
      ],

      fb: [
        // Q1
        {
          correct: {
            hdr: "correct", ico: "✅", lbl: "GOOD MOVE！",
            spk: "おじいちゃん",
            rjp: "「昨日からずっと、部屋の机の上にあるぞ。」\n\nハルト：「あれ？でも机の上には何もないよ！記憶が違うのかも。」",
            ren: "Grandpa: \"It's been on the desk in the room since yesterday.\"\nHaruto: \"Hm? But there's nothing on the desk! His memory might be off.\"",
            tjp: "「最後にどこに置きましたか」は過去の行動を確認する便利な表現。探偵の基本テクニック！",
            ten: "\"Where did you last put it?\" is a handy phrase for confirming past actions — a core detective technique!"
          },
          wrong: {
            hdr: "wrong", ico: "❌", lbl: "MISS！",
            spk: "おじいちゃん",
            rjp: "「好きか嫌いか……そんな話をしとるんじゃないわい！」",
            ren: "Grandpa: \"Like it or not... that's not what we're talking about here!\"",
            tjp: "「〜が好きですか」は好みを聞く表現。今は場所を確認したかった！",
            ten: "\"Do you like ~?\" asks about preferences. We needed to ask about location!"
          },
          funny: {
            hdr: "funny", ico: "😄", lbl: "OOPS！",
            spk: "おじいちゃん",
            rjp: "「ほんとうにいい天気じゃ……って、ランドセルを探しとるんじゃないのか！」",
            ren: "Grandpa: \"It really is nice weather... wait, aren't we supposed to be finding the backpack!?\"",
            tjp: "「〜がいいですね」は天気の話。いい日本語だけど今はランドセル優先！",
            ten: "\"Nice weather, isn't it?\" — great Japanese, but the backpack comes first!"
          }
        },
        // Q2
        {
          correct: {
            hdr: "correct", ico: "🔍", lbl: "EVIDENCE！",
            spk: "ハルト",
            rjp: "「あった！机の後ろに落ちてたよ！おじいちゃんの記憶と場所がずれてたんだ！」",
            ren: "Haruto: \"Found it! It had fallen behind the desk! Grandpa's memory was slightly off!\"",
            tjp: "「〜の後ろを確認する」は場所を具体的に調べる表現。「前・後ろ・横・下」を使いこなそう！",
            ten: "\"Check behind the ~\" specifies a location. Master front, behind, beside, and under!"
          },
          wrong: {
            hdr: "wrong", ico: "❌", lbl: "NOT THERE！",
            spk: "ハルト",
            rjp: "「引き出しの中は教科書だけだったよ。別の場所を探してみよう！」",
            ren: "Haruto: \"Only textbooks in the drawer. Let's try a different spot!\"",
            tjp: "「引き出しの中」は正しい表現。でも今回は場所が違った。位置を表す言葉を増やそう！",
            ten: "\"Inside the drawer\" is correct Japanese. The location just wasn't right this time!"
          },
          funny: {
            hdr: "funny", ico: "😂", lbl: "HMMMM！",
            spk: "ハルト",
            rjp: "「おじいちゃんの話を信じたら探偵じゃないよ！証拠で確かめないと！」",
            ren: "Haruto: \"If we just trust Grandpa's word, we're not being detectives! We need proof!\"",
            tjp: "「〜を信じます」は信頼の表現。でも探偵は必ず自分で確認する。それが名探偵！",
            ten: "\"I'll trust ~\" is fine Japanese. But a real detective always verifies — that's the detective way!"
          }
        },
        // Q3
        {
          correct: {
            hdr: "correct", ico: "⚡", lbl: "PERFECT！",
            spk: "おじいちゃん",
            rjp: "「ううっ……すまんかった！散歩に行くとき、間違えて持って出てしまったんじゃ……。」\n\nハルト：「やったね！名探偵！事件解決だ！」",
            ren: "Grandpa: \"Oh... I'm sorry! I accidentally took it with me on my walk...\"\nHaruto: \"We did it! You're a real detective! Case solved!\"",
            tjp: "「真実はいつもひとつ！」——名探偵の名ゼリフ！「真実」＝truth、「いつも」＝always。かっこいい！",
            ten: "\"The truth is always just one!\" — the iconic line! \"真実\" = truth, \"いつも\" = always. So cool!"
          },
          wrong: {
            hdr: "wrong", ico: "😤", lbl: "ALMOST！",
            spk: "ハルト",
            rjp: "「それだと決めつけになるよ！証拠はあるけど、もっとかっこよく締めようよ！」",
            ren: "Haruto: \"That sounds too accusatory! We have evidence, but let's say it cooler!\"",
            tjp: "「犯人はあなた」は直接的すぎる場合も。名探偵らしい決め台詞はもっとドラマチック！",
            ten: "\"You're the culprit\" can sound too blunt. A true detective's line is more dramatic!"
          },
          funny: {
            hdr: "funny", ico: "😂", lbl: "HILARIOUS！",
            spk: "おじいちゃん",
            rjp: "「まだご飯の時間じゃないぞ……ランドセルはどこじゃ！」",
            ren: "Grandpa: \"It's not mealtime yet... where's the backpack!\"",
            tjp: "「いただきます」は食事の前の挨拶。大事な言葉だけど今はクライマックスの場面！",
            ten: "\"いただきます\" is said before a meal. Very important phrase — but this is the climax!"
          }
        }
      ]
    }, // end level 2

    // =========================================================
    // 🔵 LEVEL 3 — 敬語・論理表現（中級）
    // =========================================================
    3: {
      introJp: "「大変だよ、ランドセルがどこにも見当たらないんだ。おじいちゃんに事情を説明して聞いてみよう。」",
      introEn: "\"This is serious — the backpack is nowhere to be found. Let's explain the situation to Grandpa and ask him.\"",

      sceneJp: ["おじいちゃんに事情を説明している", "机の周辺を論理的に調査中", "証拠がそろった！最終追及！"],
      sceneEn: ["Explaining the situation to Grandpa", "Logically investigating around the desk", "Evidence gathered! Final questioning!"],

      hints: [
        "ハルト：おじいちゃんに、ランドセルを最後に見た状況を丁寧に確認しよう。",
        "ハルト：おじいちゃんの証言に矛盾がある。机の後ろを確かめるよう、論理的にお願いしよう！",
        "ハルト：証拠はそろった！名探偵らしい決め台詞でビシッと締めよう！"
      ],
      hintsEn: [
        "Haruto: \"Politely ask Grandpa about the last time he saw the backpack.\"",
        "Haruto: \"There's a contradiction in Grandpa's account. Logically ask him to check behind the desk!\"",
        "Haruto: \"All evidence is in! Deliver the detective's iconic closing line!\""
      ],

      choices: [
        // Q1
        [
          { jp: "「ランドセルを最後にご覧になったのは、いつごろでしょうか？」", en: "\"About when did you last see the backpack?\"",         t: "correct" },
          { jp: "「おじいちゃんは、ランドセルを知っていますか？」",           en: "\"Grandpa, do you know about the backpack?\"",          t: "wrong"   },
          { jp: "「本日はお忙しいところ、失礼いたします。」",                 en: "\"Sorry to bother you when you're busy today.\"",       t: "funny"   }
        ],
        // Q2
        [
          { jp: "「机の上にあるとおっしゃっていましたが、確認できませんでした。机の後ろを一緒に見ていただけますか？」", en: "\"You mentioned it's on the desk, but I couldn't find it. Could we check behind the desk together?\"", t: "correct" },
          { jp: "「机の引き出しに入れた可能性はありますか？」",                                                       en: "\"Is there a possibility it's in the desk drawer?\"",                                              t: "wrong"   },
          { jp: "「おじいちゃんの記憶は正確だと思います。」",                                                         en: "\"I believe Grandpa's memory is accurate.\"",                                                      t: "funny"   }
        ],
        // Q3 — クライマックス
        [
          { jp: "「状況証拠から判断すると、おじいちゃんが持ち出した可能性が高いですね。」", en: "\"Based on circumstantial evidence, it's likely that you took it out, Grandpa.\"", t: "wrong"   },
          { jp: "「大変おいしゅうございました。」",                                         en: "\"That was absolutely delicious.\"",                                               t: "funny"   },
          { jp: "「真実は、いつもひとつ！」",                                               en: "\"The truth is always just one!\"",                                                t: "correct" }
        ]
      ],

      fb: [
        // Q1
        {
          correct: {
            hdr: "correct", ico: "✅", lbl: "EXCELLENT！",
            spk: "おじいちゃん",
            rjp: "「昨日の夕方から、部屋の机の上に置いてあるはずじゃよ。」\n\nハルト：「でも机の上には何もない。証言に矛盾がある！」",
            ren: "Grandpa: \"It should be on the desk in the room, since yesterday evening.\"\nHaruto: \"But there's nothing on the desk. There's a contradiction in his account!\"",
            tjp: "「〜をご覧になりましたか」は尊敬語。「見ましたか→ご覧になりましたか」と変化する敬語の基本形！",
            ten: "\"Did you see ~\" becomes \"ご覧になりましたか\" in honorific form. This is a core polite Japanese pattern!"
          },
          wrong: {
            hdr: "wrong", ico: "❌", lbl: "VAGUE！",
            spk: "おじいちゃん",
            rjp: "「知っておるとも！赤くて大きいやつじゃろ？……で、どこにあるかということか？」",
            ren: "Grandpa: \"Of course I know it! The big red one, right?... Ah, you're asking where it is?\"",
            tjp: "「〜を知っていますか」は情報の有無を確認する表現。今回は場所や時間を具体的に聞く必要があった！",
            ten: "\"Do you know about ~?\" asks if someone has information. We needed to ask specifically about location and time!"
          },
          funny: {
            hdr: "funny", ico: "😄", lbl: "TOO FORMAL！",
            spk: "おじいちゃん",
            rjp: "「いや、全然忙しくないが……なんか改まって怖いのう。ランドセルのことか？」",
            ren: "Grandpa: \"No, I'm not busy at all... but why so formal? It's scaring me a little. Is this about the backpack?\"",
            tjp: "「本日はお忙しいところ失礼いたします」はビジネス敬語。家族には少し丁寧すぎる表現。場面によって使い分けよう！",
            ten: "\"Sorry to bother you when you're busy\" is business-level formal. A bit too stiff for family — match your level to the situation!"
          }
        },
        // Q2
        {
          correct: {
            hdr: "correct", ico: "🔍", lbl: "LOGICAL！",
            spk: "おじいちゃん",
            rjp: "「ほう、後ろか……（確認する）……あっ！落ちとった！すまんかった！」\n\nハルト：「矛盾を突いた完璧な質問だったよ！さあ、締めの一言！」",
            ren: "Grandpa: \"Oh, behind it?... (checks) ...Oh! It fell back there! I'm so sorry!\"\nHaruto: \"You perfectly spotted the contradiction! Now for the closing line!\"",
            tjp: "「〜とおっしゃっていましたが」は相手の発言を丁寧に引用する表現。矛盾を指摘するときにとても使える！",
            ten: "\"You mentioned that ~\" is a polite way to quote someone. Very useful for pointing out contradictions!"
          },
          wrong: {
            hdr: "wrong", ico: "❌", lbl: "POSSIBLE, BUT…",
            spk: "おじいちゃん",
            rjp: "「引き出しには入れとらんよ。いつも机の上に置くんじゃ。」\n\nハルト：「証言は変わらない。もっと具体的に矛盾を突こう！」",
            ren: "Grandpa: \"I didn't put it in the drawer. I always place it on top of the desk.\"\nHaruto: \"His story isn't changing. Point out the contradiction more specifically!\"",
            tjp: "「〜の可能性はありますか」は可能性を確認する表現。でも今回は証言の矛盾を直接指摘する必要があった！",
            ten: "\"Is there a possibility that ~?\" asks about likelihood. This time we needed to directly point out the contradiction!"
          },
          funny: {
            hdr: "funny", ico: "😂", lbl: "NOT A DETECTIVE！",
            spk: "ハルト",
            rjp: "「証拠より感情を優先したら名探偵失格だよ！矛盾を論理的に追及しよう！」",
            ren: "Haruto: \"Prioritizing feelings over evidence disqualifies you as a detective! Let's pursue the contradiction logically!\"",
            tjp: "「〜は正確だと思います」は意見を述べる表現。でも探偵は証拠で判断する。思い込みは禁物！",
            ten: "\"I think ~ is accurate\" states an opinion. But a detective judges by evidence — assumptions are forbidden!"
          }
        },
        // Q3
        {
          correct: {
            hdr: "correct", ico: "⚡", lbl: "PERFECT！",
            spk: "おじいちゃん",
            rjp: "「ううっ……すまんかった！朝の散歩のとき、無意識に持って出てしまったんじゃ……。」\n\nハルト：「やったね！完璧な推理だった！真の名探偵認定！」",
            ren: "Grandpa: \"Oh... I'm so sorry! I unconsciously took it with me on my morning walk...\"\nHaruto: \"We did it! Perfect deduction! You're officially a true detective!\"",
            tjp: "「真実はいつもひとつ！」——すべての証拠と論理の積み重ねが、この一言に集約される。名探偵の真髄！",
            ten: "\"The truth is always just one!\" — all the evidence and logic leads to this single line. The essence of a true detective!"
          },
          wrong: {
            hdr: "wrong", ico: "😤", lbl: "ALMOST！",
            spk: "ハルト",
            rjp: "「証拠はあっても、決めつける前にもっとドラマチックに締めようよ！あの名ゼリフ！」",
            ren: "Haruto: \"Even with evidence, let's wrap it up more dramatically before concluding! That famous line!\"",
            tjp: "「〜の可能性が高い」は論理的だが、クライマックスには感情も必要。名探偵の決め台詞はシンプルかつ力強く！",
            ten: "\"Highly likely\" is logical, but the climax needs emotion too. The detective's line is simple yet powerful!"
          },
          funny: {
            hdr: "funny", ico: "😂", lbl: "HILARIOUS！",
            spk: "おじいちゃん",
            rjp: "「……今は食事の話をしとらんぞ？（困惑）」\n\nハルト：「もう！なんでそこで食べ物の話になるんだよ！」",
            ren: "Grandpa: \"...We're not talking about food right now? (confused)\"\nHaruto: \"Come on! Why does food come up at a moment like this!\"",
            tjp: "「大変おいしゅうございました」は最上級の丁寧な食事の感想。正しい敬語だが、場面が完全に違う！",
            ten: "\"That was absolutely delicious\" is the most polite form of a food compliment. Correct keigo — completely wrong moment!"
          }
        }
      ]
    } // end level 3

  } // end levels

}; // end CASE02_DATA
