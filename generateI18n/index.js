import { readFileSync, writeFileSync } from "fs";

const getIds = [
  // Tweet all
  "f70a36d0",
  // Popup Top Retweeted by
  "d25289b4",
  // Profile Tab Tweets
  "bab1f8b0",
  // [user] Retweeted
  "h99e9c95",
  // Replay placeholder
  "d2c7a41c",
  // Quote Tweet Counter
  "e2414184",
  "e2414185",
  // Retweet Counter
  "hb7b0ceb",
  "hb7b0cea",
  // Header Quote Tweets
  "bd7c0390",
  "bd7c039f",
  // Button "Tweet"
  "bea869b4",
  "bea869b3",
  // Button Reply
  "d17df548",
  "hdf72269",
  // Whats Happening placeholder
  "e349147c",
  "e349147b",
  // Button Undo Retweet
  "fa9ce7f4",
  "f3bbbb87",
  // Button Quote tweet
  "c9d7235e",
  "c9d7235d",
  // Button Retweet
  "c42234da",
  "d497b854",
  // Top Pill [user] Tweeted
  "d91695cb",
  // Show e.count Tweets
  "d6917e0c",
  "d6917e0d",
];

(async () => {
  const text = readFileSync("i18nFileList.txt", "utf-8");
  const urls = text.split("\n");
  const langDatas = {};

  for (const url of urls) {
    const lang = url.split("/")[11].split(".")[0];
    const text = readFileSync(`files/${lang}.js`, "utf-8");

    console.log(`Lang: ${lang}`);

    const rawData = {};

    for (const match of text.matchAll(/"([a-zA-Z0-9]+)","([^"]+)"/g)) {
      rawData[match[1]] = match[2];
    }

    for (const match of text.matchAll(
      /"([a-zA-Z0-9]+)",\(function\(e\){([^}]+)}\)\)/g
    )) {
      rawData[match[1]] = match[2];
    }

    for (const match of text.matchAll(
      /{key:"([a-zA-Z0-9]+)",get:function\([a-zA-Z0-9]*\){([^}]+)}}/g
    )) {
      rawData[match[1]] = match[2];
    }

    getIds.forEach((id) => {
      Object.keys(rawData).forEach((key) => {
        if (key === id) {
          if (langDatas[lang] === undefined) {
            langDatas[lang] = {};
          }
          langDatas[lang][id] = rawData[key];
        }
      });
    });

    getIds.forEach((id) => {
      if (langDatas[lang][id] === undefined) {
        langDatas[lang][id] = null;
      }
    });
  }

  writeFileSync("i18n.json", JSON.stringify(langDatas, undefined));
})();
