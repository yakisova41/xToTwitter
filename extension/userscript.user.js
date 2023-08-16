// ==UserScript==
// @name         X to Twitter
// @name:ja  X to Twitter
// @description  Get our Twitter back from Elon.
// @namespace    https://xtotwitter.yakisova.com
// @version      1.8.0
// @author       yakisova41
// @match        https://twitter.com/*
// @match        https://X.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=twitter.com
// @grant        unsafeWindow
// @run-at       document-start
// @license      MIT
// @description:ja  イーロンから私達のTwitterを取り戻します
// ==/UserScript==
'use strict';

const paths = {
    xLogoPath: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
    loadingXLogoPath: "M14.258 10.152L23.176 0h-2.113l-7.747 8.813L7.133 0H0l9.352 13.328L0 23.973h2.113l8.176-9.309 6.531 9.309h7.133zm-2.895 3.293l-.949-1.328L2.875 1.56h3.246l6.086 8.523.945 1.328 7.91 11.078h-3.246zm0 0",
    birdPath: "M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"
}

const colors = {
    twitterColor:"rgb(29, 155, 240)",
    loadingBirdColor: "rgba(29,161,242,1.00)"
}

const postToTweetText = {
    en: {
        tweetBtn: "Tweet",
        retweet: "Retweet",
        tweet: "Tweet"
    },
    ja: {
        tweetBtn: "ツイートする",
        retweet: "リツイート",
        tweet: "ツイート"
    },
    ko: {
        tweetBtn: "트윗하기",
        retweet: "리트윗",
        tweet: "트윗"
    },
    "zh-tw": {
        tweetBtn: "发推",
        retweet: "轉推",
        tweet: "发推"
    },
    "zh-cn": {
        tweetBtn: "发推",
        retweet: "转推",
        tweet: "发推"
    },
    es: {
        tweetBtn: "Tweet",
        retweet: "Retwitear",
        tweet:"Tweet"
    },
    de: {
        tweetBtn: "Tweet",
        retweet: "Retweet",
        tweet:"Tweet"  
    },
    ru: {
        tweetBtn: "Твит",
        retweet: "Ретвнитнуть",
        tweet:"Твит"  
    },
    pt: {
        tweetBtn: "Tweet",
        retweet: "Retweetar",
        tweet:"Tweet"  
    },
    fr: {
        tweetBtn: "Tweet",
        retweet: "Retweeter",
        tweet:"Tweet"  
    },
   tr: {
        tweetBtn: "Tweet",
        retweet: "Retweet",
        tweet:"Tweet"  
    },
    ar: {
        tweetBtn: "تويت",
        retweet: "إعادة التغريد",
        tweet:"تويت"
    },
    pl: {
        tweetBtn: "Tweetnij",
        retweet: "Podaj dalej",
        tweet:"Tweetnij"
    },
    uk: {
        tweetBtn: "Твіт",
        retweet: "Ретвітнути",
        tweet:"Твіт"
    },
    ro: {
        tweetBtn: "Tweet",
        retweet: "Retweet",
        tweet:"Tweet"
    },
    lv: {
        tweetBtn: "Tvītot",
        retweet: "Retvīto",
        tweet:"Tvītot"
    },
    th: {
        tweetBtn: "ทวิต",
        retweet: "รีทวิต",
        tweet:"ทวิต"
    },
    vi: {
        tweetBtn: "Tweet",
        retweet: "Retweet",
        tweet:"Tweet"
    },
    cs: {
        tweetBtn: "Tweet",
        retweet: "Retweetnout",
        tweet:"Tweet"
    },
    el: {
        tweetBtn: "Tweet",
        retweet: "Retweet",
        tweet:"Tweet"
    },
    nl: {
        tweetBtn: "Tweet",
        retweet: "Retweeten",
        tweet:"Tweet"
    },
    tl: {
        tweetBtn: "Mag-Tweet",
        retweet: "I-retweet",
        tweet:"Tweet"
    },
    he: {
        tweetBtn: "ציוץ",
        retweet: "צייץ מחדש",
        tweet: "ציוץ",
    },
    ca: {
        tweetBtn: "Tuita",
        retweet: "Retuitejar",
        tweet:"Tuita"
    },
    ne: {
        tweetBtn: "ट्वीट्गर्नू",
        retweet: "रिट्वीट",
        tweet:"ट्वीट्गर्नू"
    },
}

function titleChange(head) {
    const i = setInterval(()=>{
        const titleEl = head.querySelector("title");

        if(titleEl !== null) {
            const titleOb = new MutationObserver(()=>{
                if(titleEl.innerHTML === "X") {
                    titleEl.innerHTML = "Twitter";
                }
                else {
                    const split = titleEl.innerHTML.split("/");

                    if(split[1] === " X"){
                        split[1] = " Twitter";
                        titleEl.innerHTML = split.join("/");
                    }
                }
            });
            titleOb.observe(titleEl, {
                childList: true
            });
            clearInterval(i);
        }
    },100);
}

function styleInject(head) {
    const style = document.createElement("style");
    style.innerHTML = `
    .x-to-twitter {
        fill: inherit;
        color: ${colors.twitterColor};
    }
    
    path[d="${paths.xLogoPath}"], path[d="${paths.loadingXLogoPath}"] {
        d:path("${paths.birdPath}");
        fill: inherit;
        color: ${colors.twitterColor};
    }

    div[style="color: rgb(239, 243, 244);"] > svg > g > path {
        color: rgb(239, 243, 244);
    }

    div[aria-label="Loading…"] > svg > g > path {
        d:path("${paths.birdPath}");
        fill: inherit;
        color: ${colors.loadingBirdColor};
    }
    `;
    head.appendChild(style);
}

function getLang() {
    const cookie = document.cookie;
    const cookieLang = cookie.split(";").map(s => s.split("=")).filter(([key, value]) => {
        return key === " lang";
    })[0][1];

    if(Object.keys(postToTweetText).includes(cookieLang)) {
        return cookieLang;
    }
    else {
        return "en"
    }
}

// 「ポストする」の文字を「ツイートする」に変更
function postToTweet() {
    const langData = postToTweetText[getLang()];

    setInterval(() => {
        const tweetButtonInline = document.querySelector('div[data-testid="tweetButtonInline"] > div > span > span');
        if(tweetButtonInline !== null && tweetButtonInline.textContent !== langData.tweetBtn){
            tweetButtonInline.textContent = langData.tweetBtn;
        }

        const sideNavNewTweetButton = document.querySelector('a[data-testid="SideNav_NewTweet_Button"] > div > span > div > div > span > span');
        if(sideNavNewTweetButton !== null && sideNavNewTweetButton.textContent !== langData.tweetBtn){
            sideNavNewTweetButton.textContent = langData.tweetBtn;
        }

        const tweetButton = document.querySelector('div[data-testid="tweetButton"] > div > span > span');
        if(tweetButton !== null && tweetButton.textContent !== langData.tweetBtn){
            tweetButton.textContent = langData.tweetBtn;
        }

        const profileTabPost = document.querySelector('div[role="tablist"] > div[role="presentation"]:nth-child(1) > a > div > div > span');
        if(profileTabPost !== null && profileTabPost.textContent !== langData.tweet){
            if(
                location.pathname !== "/home" 
                && location.pathname !== "/notifications" 
                && location.pathname !== "/explore" 
                && location.pathname !== "/search"
            ) {
                profileTabPost.textContent = langData.tweet;
            }
        }

        const retweetBtns = document.querySelectorAll('div[data-testid="retweetConfirm"] > div:nth-child(2) > div > span:not(.x-to-twitter-retweet)');
        retweetBtns?.forEach(retweetBtn => {
            retweetBtn.classList.add("x-to-twitter-retweet");
            retweetBtn.textContent = langData.retweet;
        });
    }, 300);
}

// ゴミSafariはcssのpath d変更に対応していないため
// 一つ一つのDOMを書き換えることで対応
function trashSafari() {
    setInterval(()=>{
        const pathElems = document.querySelectorAll(`path[d="${paths.xLogoPath}"]:not(.x-to-twitter), path[d="${paths.loadingXLogoPath}"]:not(.x-to-twitter)`);
        
        if(pathElems.length !== 0) {
            pathElems.forEach(path => {
                path.setAttribute("d", paths.birdPath);
                path.classList.add("x-to-twitter");
            });
        }
    },200);

    document.querySelector('div[aria-label="Loading…"] > svg > g > path').setAttribute("d", paths.birdPath);
}

// PWAのmanifestをtwitterに書き換える
// !! 拡張機能でのみ動作
function replaceManifest(head) {
    document.querySelector('link[rel="manifest"').remove()
    const manifestEl = document.createElement('link');
    manifestEl.setAttribute('rel', 'manifest');
    manifestEl.setAttribute('crossorigin', 'use-credentials');
    manifestEl.setAttribute('href', chrome.runtime.getURL("/twitterManifest.json"));
    head.prepend(manifestEl);
}

function headFound(head) {
    // favicon change
    const shortcutIcon = head.querySelector('[rel="shortcut icon"]')
    if(shortcutIcon !== null) {
        shortcutIcon.href = "data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJkSURBVHgB7VZBbtpQEH3zIW0WVYuXVaH4Bs0NSk4AOUFhEarskhMknIDsqkKlcIT0BNAT1D1B3ZJK3dmVuirwp/MhVmzAxiagKBJv9+ePZ97M/JkxsMMODwzChlD84FWQp3MxeCDHAhiumB+MJrr1+8Ryw3p/9+H4DctfIPCq49Xlw8Kv99YlMuB19885gy/i7llziwGfFFWJyR02XzSCuwiBUse7BlFVaz5LS8KQVkRXaXRJsqImfDjKSZBNyzEyFWFKVJ4KFbWLElUao6KbSk8i9TXgTPaorxTskPwOxa7/9baGt4zg8oQbNyfWYJlRU0/KUx9ZwNwYNq1ecFRzl18QpW0bB0Ks//KjV1uwlbuLJA3GxEdh5wb5yGEPl3qMd2xecYQHKnlFlVLX95kxYCFKGg5IlU2a0uLpCM68LEJA+sJ/Dm6Jy3aMjQIRakRUm+UuvfOp/X34iQSejeFo0Hdx4optG5uFH/R+GHNvANcm3VtwLs+Lvy2TRwhIOnrYHhysIuDKcCDwGbYAjglOzQt+HssElF6dvoNNOZeuCSbfSgIGMjILMo4/ExZf7TqghNLmlwm1gpSC2tmaLAZMvWGz0Iu7XpqBm2NrQNN5cD+Y5ZOTdZyok3RZMusZOJUN+QZrQFb0oQkG6xIIYHe8A03Unx/Ryd6jS2ctAsbxmFRVynGKlM5na5ePVkUe0p+h9MmraS2zXqYgmSWjOPtElHbLTVB3Q79gqQlMScxqXpeav0UWiGMmXKSNOpZAAPvKs/U/1MRoxRxl+5WD+psUy2D5IdmRVoWjnqDnLlkyO+zwaPAf1zXwZL751PUAAAAASUVORK5CYII=";
    }
    
    styleInject(head);
    titleChange(head);
    postToTweet();
}

if(typeof GM_info !== 'undefined') {
    // userscript
    let head;
    
    if(GM_info.scriptHandler === "Userscripts") {
        // ios
        head = document.head;
        trashSafari();
    }
    else {
        head = unsafeWindow.document.head;
    }

    if(head !== null && head !== undefined){
        headFound(head);
    }
    else {
        const i = setInterval(() => {
            const head = document.head;
            if(head !== undefined && head !== null) {
                clearInterval(i);
                headFound(head);
            }
        });        
    }
}
else {
    // extension
    const i = setInterval(()=>{
        const head = document.head;
        if(head !== null){
            clearInterval(i);
            headFound(head);
            replaceManifest(head);
        }
    });
}