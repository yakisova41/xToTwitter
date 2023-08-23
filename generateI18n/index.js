import { readFileSync, writeFileSync } from "fs";

const getIds = [
  "hb7b0cea", // 2022年1月頃のi18nファイル　件のリツイート,
  "bea869b3", // 2022年1月頃のi18nファイル　ツイートする
  "bab1f8b0", // 共通i18nファイル　Tweets
  "c9d7235d", // 2022年1月頃のi18nファイル　引用ツイート
  "d91695cb", // 2022年1月頃のi18nファイル　さんがツイートしました
  "d497b854", // 2022年1月頃のi18nファイル　リツイート
  "e2414184", // 2022年1月頃のi18nファイル　件の引用
  "hdf72269", // 2022年1月頃のi18nファイル　返信
  "d2c7a41c", // 2022年1月頃のi18nファイル　返信をツイート
  "e349147b", // 2022年1月頃のi18nファイル　いまどうしてる？
  "h99e9c95", // 共通i18nファイル　さんがリツイート
  "f3bbbb87", // 2022年1月頃のi18nファイル リツイートを取り消す
  "d25289b4", // 共通i18nファイル リツイートしたユーザー

  "c42234da", // 2022年夏頃のi18nファイル retweet
  "bea869b4", // 2022年夏頃のi18nファイル To tweet
  "c9d7235e", // 2022年夏頃のi18nファイル quote tweet
  "e2414185", // 2022年夏頃のi18nファイル quote tweet count
  "f70a36d0", // 2022年夏頃のi18nファイル　tweet all
  "d17df548", // 2022年夏頃のi18nファイル reply
  "e349147c", // 2022年夏頃のi18nファイル　Whats happening
  "hb7b0ceb", // 2022年夏頃のi18nファイル　Retweets　Count
  "fa9ce7f4", // 2022年夏頃のi18nファイル　Undo Retweet
  "bd7c0390", // 2022年夏頃のi18nファイル Quote Tweets
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
