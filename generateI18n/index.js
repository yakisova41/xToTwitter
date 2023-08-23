import { readFileSync, writeFileSync } from 'fs';
import fetch from "node-fetch";


const getIds = [
    "e59a4e90",//件のリツイート,
    "bea869b3",//ツイートする
    "bab1f8b0", //Tweets
    "c9d7235d", //引用ツイート
    "d91695cb", // さんがツイートしました
    "d497b854", //リツイート
    "e2414184", // jap 件の引用

    "c42234da", // english retweet
    "bea869b4", // english To tweet
    "c9d7235e", // english quote tweet
    "e2414185" // english quote tweet count
];



(async () => {
    const text = readFileSync("i18nFileList.txt", 'utf-8');
    const urls = text.split("\n");
    const langDatas = {}

    for (const url of urls) {
        const lang = url.split("/")[11].split(".")[0]
        const text = readFileSync(`files/${lang}.js`, 'utf-8');
                
        console.log(`Lang: ${lang}`)

        const rawData = {}

        for (const match of text.matchAll(/"([a-zA-Z0-9]+)","([^"]+)"/g)) {
            rawData[match[1]] = match[2]
        }

        for (const match of text.matchAll(/"([a-zA-Z0-9]+)",\(function\(e\){([^}]+)}\)\)/g)) {
            rawData[match[1]] = match[2]
        }

        getIds.forEach(id => {
            Object.keys(rawData).forEach(key => {
                if(key === id) {
                    if(langDatas[lang] === undefined) {
                        langDatas[lang] = {}
                    }
                    langDatas[lang][id] = rawData[key];
                }
            })
        });

        getIds.forEach(id => {
            if(langDatas[lang][id] === undefined) {

                langDatas[lang][id] = null
            }
        });
    }

    writeFileSync("i18n.json", JSON.stringify(langDatas, undefined, 2))
})();

