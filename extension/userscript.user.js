// ==UserScript==
// @name         X to Twitter
// @name:ja  X to Twitter
// @description  Get our Twitter back from Elon.
// @namespace    https://xtotwitter.yakisova.com
// @version      1.9.0
// @author       yakisova41
// @match        https://twitter.com/*
// @match        https://X.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=twitter.com
// @grant        unsafeWindow
// @run-at       document-start
// @license      MIT
// @description:ja  イーロンから私達のTwitterを取り戻します
// ==/UserScript==
"use strict";

const paths = {
  xLogoPath:
    "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  loadingXLogoPath:
    "M14.258 10.152L23.176 0h-2.113l-7.747 8.813L7.133 0H0l9.352 13.328L0 23.973h2.113l8.176-9.309 6.531 9.309h7.133zm-2.895 3.293l-.949-1.328L2.875 1.56h3.246l6.086 8.523.945 1.328 7.91 11.078h-3.246zm0 0",
  birdPath:
    "M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z",
  verifiedPath:
    "M8.52 3.59c.8-1.1 2.04-1.84 3.48-1.84s2.68.74 3.49 1.84c1.34-.21 2.74.14 3.76 1.16s1.37 2.42 1.16 3.77c1.1.8 1.84 2.04 1.84 3.48s-.74 2.68-1.84 3.48c.21 1.34-.14 2.75-1.16 3.77s-2.42 1.37-3.76 1.16c-.8 1.1-2.05 1.84-3.49 1.84s-2.68-.74-3.48-1.84c-1.34.21-2.75-.14-3.77-1.16-1.01-1.02-1.37-2.42-1.16-3.77-1.09-.8-1.84-2.04-1.84-3.48s.75-2.68 1.84-3.48c-.21-1.35.14-2.75 1.16-3.77s2.43-1.37 3.77-1.16zm3.48.16c-.85 0-1.66.53-2.12 1.43l-.38.77-.82-.27c-.96-.32-1.91-.12-2.51.49-.6.6-.8 1.54-.49 2.51l.27.81-.77.39c-.9.46-1.43 1.27-1.43 2.12s.53 1.66 1.43 2.12l.77.39-.27.81c-.31.97-.11 1.91.49 2.51.6.61 1.55.81 2.51.49l.82-.27.38.77c.46.9 1.27 1.43 2.12 1.43s1.66-.53 2.12-1.43l.39-.77.82.27c.96.32 1.9.12 2.51-.49.6-.6.8-1.55.48-2.51l-.26-.81.76-.39c.91-.46 1.43-1.27 1.43-2.12s-.52-1.66-1.43-2.12l-.77-.39.27-.81c.32-.97.12-1.91-.48-2.51-.61-.61-1.55-.81-2.51-.49l-.82.27-.39-.77c-.46-.9-1.27-1.43-2.12-1.43zm4.74 5.68l-6.2 6.77-3.74-3.74 1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36z",
};

const colors = {
  twitterColor: "rgb(29, 155, 240)",
  loadingBirdColor: "rgba(29,161,242,1.00)",
};

// prettier-ignore
const i18n = {"ar-x-fm":{"hb7b0cea":"return e.retweetCount+\" إعاد\"+n(e.retweetCount,\"ات\",\"ة\",\"ة\",\"ة\",\"تا\",\"ة\")+\" تغريد\"","bea869b3":"غرّدي","bab1f8b0":"التغريدات","c9d7235d":"اقتباس التغريدة","d91695cb":"return e.fullName+\" (@\"+e.screenName+\") غرّد:\\n\"+e.tweet","d497b854":"إعادات التغريد","e2414184":"return\"تغريد\"+n(e.count,\"ات\",\"ة\",\"ة\",\"ة\",\"تا\",\"ة\")+\" اقتباس\"","hdf72269":"ردّ","d2c7a41c":"غرّدي ردَكِ","e349147b":"ماذا يحدث؟","h99e9c95":"return[\"قام \",\" بإعادة تغريدها\"]","f3bbbb87":"التراجع عن التغريدة","d25289b4":"مُعاد تغريدها بواسطة","f70a36d0":"تغريد الكل","c42234da":null,"bea869b4":null,"c9d7235e":null,"e2414185":null,"d17df548":null,"e349147c":null,"hb7b0ceb":null,"fa9ce7f4":null,"bd7c0390":null},"bg":{"hb7b0cea":"return e.retweetCount+\" ретуит\"+n(e.retweetCount,\"\",\"а\")","bea869b3":"Туит","bab1f8b0":"Туитове","c9d7235d":"Цитиране на туита","d91695cb":"return e.fullName+\" (@\"+e.screenName+\") Tweeted:\\n\"+e.tweet","d497b854":"Ретуитове","e2414184":"return\"\"+n(e.count,\"Цитиране на туита\",\"Туитове с цитат\")","hdf72269":"Отговор","d2c7a41c":"Отговори с туит","e349147b":"Какво се случва?","h99e9c95":"return[\"\",\" ретуитна\"]","f3bbbb87":"Отмяна на ретуитването","d25289b4":"Ретуитнат от","f70a36d0":"Туитване на всички","c42234da":null,"bea869b4":null,"c9d7235e":null,"e2414185":null,"d17df548":null,"e349147c":null,"hb7b0ceb":null,"fa9ce7f4":null,"bd7c0390":null},"bn":{"hb7b0cea":"return e.retweetCount+\" পুনঃ\"+a(e.retweetCount,\" টুইট করুন\",\"টুইটগুলো\")","bab1f8b0":"টুইটগুলি","c9d7235d":"টুইট উদ্ধৃত করুন","d91695cb":"return e.fullName+\" (@\"+e.screenName+\") টুইট করেছেন: \"+e.tweet","d497b854":"পুনঃটুইটগুলো","e2414184":"return\"টুইট উদ্ধৃত\"+a(e.count,\" করুন\",\"িগুলো\")","hdf72269":"উত্তর","d2c7a41c":"আপনার উত্তর টুইট করুন","e349147b":"কী ঘটছে?","h99e9c95":"return[\"\",\" পুনঃ টুইট করেছেন\"]","f3bbbb87":"পুনঃ টুইট পুর্বাবস্থায় ফেরান","d25289b4":"পুনঃ টুইট করেছেন","f70a36d0":"সব টুইট করুন","bea869b3":null,"c42234da":null,"bea869b4":null,"c9d7235e":null,"e2414185":null,"d17df548":null,"e349147c":null,"hb7b0ceb":null,"fa9ce7f4":null,"bd7c0390":null},"ca":{"hb7b0cea":"return e.retweetCount+\" Retuit\"+r(e.retweetCount,\"\",\"s\")","bea869b3":"Tuita","bab1f8b0":"Tuits","c9d7235d":"Cita el tuit","d91695cb":"return e.fullName+\" (@\"+e.screenName+\") ha tuitat: \"+e.tweet","d497b854":"Retuits","e2414184":"return\"\"+r(e.count,\"Cita el tuit\",\"Tuits amb cita\")","hdf72269":"Respon","d2c7a41c":"Tuita una resposta","e349147b":"Què passa?","h99e9c95":"return[\"\",\" ha retuitat\"]","f3bbbb87":"Desfés el retuit","d25289b4":"Retuitat per","f70a36d0":"Tuita-ho tot","c42234da":null,"bea869b4":null,"c9d7235e":null,"e2414185":null,"d17df548":null,"e349147c":null,"hb7b0ceb":null,"fa9ce7f4":null,"bd7c0390":null},"cs":{"hb7b0cea":"return e.retweetCount+\" Retweet\"+n(e.retweetCount,\"y\",\"y\",\"\",\"ů\")","bea869b3":"Tweet","bab1f8b0":"Tweety","c9d7235d":"Citovat Tweet","d91695cb":"return\"Uživatel \"+e.fullName+\" (@\"+e.screenName+\") tweetnul: \"+e.tweet","d497b854":"Retweety","e2414184":"return\"\"+n(e.count,\"Tweety s citací\",\"Tweety s citací\",\"Citovat Tweet\",\"Tweety s citací\")","hdf72269":"Odpovědět","d2c7a41c":"Tweetnout odpověď","e349147b":"Co se právě děje?","h99e9c95":"return[\"Uživatel \",\" retweetnul\"]","f3bbbb87":"Zrušit Retweet","d25289b4":"Retweetnuto uživateli","f70a36d0":"Tweetnout vše","c42234da":null,"bea869b4":null,"c9d7235e":null,"e2414185":null,"d17df548":null,"e349147c":null,"hb7b0ceb":null,"fa9ce7f4":null,"bd7c0390":null},"da":{"hb7b0cea":"return e.retweetCount+\" Retweet\"+i(e.retweetCount,\"\",\"s\")","bea869b3":"Tweet","bab1f8b0":"Tweets","c9d7235d":"Citér Tweet","d91695cb":"return e.fullName+\" (@\"+e.screenName+\") tweetede: \"+e.tweet","d497b854":"Retweets","e2414184":"return\"Cit\"+i(e.count,\"ér Tweet\",\"at-Tweets\")","hdf72269":"Svar","d2c7a41c":"Tweet dit svar","e349147b":"Hvad sker der?","h99e9c95":"return[\"\",\" retweetede\"]","f3bbbb87":"Fortryd Retweet","d25289b4":"Retweetet af","f70a36d0":"Tweet alt","c42234da":null,"bea869b4":null,"c9d7235e":null,"e2414185":null,"d17df548":null,"e349147c":null,"hb7b0ceb":null,"fa9ce7f4":null,"bd7c0390":null},"de":{"hb7b0cea":"return e.retweetCount+\" Retweet\"+r(e.retweetCount,\"\",\"s\")","bea869b3":"Twittern","bab1f8b0":"Tweets","c9d7235d":"Tweet zitieren","d91695cb":"return e.fullName+\" (@\"+e.screenName+\") Tweeted:\\n\"+e.tweet","d497b854":"Retweets","e2414184":"return\"\"+r(e.count,\"Tweet zitieren\",\"Zitierte Tweets\")","hdf72269":"Antworten","d2c7a41c":"Twittere deine Antwort","e349147b":"Was gibt's Neues?","h99e9c95":"return[\"\",\" hat retweetet\"]","f3bbbb87":"Retweet rückgängig machen","d25289b4":"Retweetet von","f70a36d0":"Alle twittern","c42234da":null,"bea869b4":null,"c9d7235e":null,"e2414185":null,"d17df548":null,"e349147c":null,"hb7b0ceb":null,"fa9ce7f4":null,"bd7c0390":null},"el":{"hb7b0cea":"return e.retweetCount+\" Retweet\"","bea869b3":"Tweet","bab1f8b0":"Tweet","c9d7235d":"Παράθεση Tweet","d91695cb":"return\"Ο χρήστης \"+e.fullName+\" (@\"+e.screenName+\") έγραψε το Tweet: \"+e.tweet","d497b854":"Retweet","e2414184":"return\"\"+n(e.count,\"Παράθεση Tweet\",\"Tweet με παράθεση\")","hdf72269":"Απάντηση","d2c7a41c":"Κάντε Tweet με την απάντησή σας","e349147b":"Τι συμβαίνει;","h99e9c95":"return[\"Ο χρήστης \",\" έκανε Retweet\"]","f3bbbb87":"Αναίρεση Retweet","d25289b4":"Έγινε Retweet από","f70a36d0":"Δημοσίευση όλων ως Tweet","c42234da":null,"bea869b4":null,"c9d7235e":null,"e2414185":null,"d17df548":null,"e349147c":null,"hb7b0ceb":null,"fa9ce7f4":null,"bd7c0390":null},"en-GB":{"hb7b0cea":"return e.retweetCount+\" Retweet\"+n(e.retweetCount,\"\",\"s\")","bea869b3":"Tweet","bab1f8b0":"Tweets","c9d7235d":"Quote Tweet","d91695cb":"return e.fullName+\" (@\"+e.screenName+\") Tweeted: \"+e.tweet","d497b854":"Retweets","e2414184":"return\"Quote Tweet\"+n(e.count,\"\",\"s\")","hdf72269":"Reply","d2c7a41c":"Tweet your reply","e349147b":"What’s happening?","h99e9c95":"return[\"\",\" Retweeted\"]","f3bbbb87":"Undo Retweet","d25289b4":"Retweeted by","f70a36d0":"Tweet all","c42234da":null,"bea869b4":null,"c9d7235e":null,"e2414185":null,"d17df548":null,"e349147c":null,"hb7b0ceb":null,"fa9ce7f4":null,"bd7c0390":null},"en":{"bab1f8b0":"Tweets","d91695cb":"return e.fullName+\" (@\"+e.screenName+\") Tweeted:\\n\"+e.tweet","d497b854":"Retweets","d2c7a41c":"Tweet your reply","h99e9c95":"return[\"\",\" Retweeted\"]","d25289b4":"Retweeted by","c42234da":"return\"Retweet\"+n(e.count,\"\",\"s\")","bea869b4":"Tweet","c9d7235e":"Quote Tweet","e2414185":"return\"Quote Tweet\"+n(e.count,\"\",\"s\")","f70a36d0":"Tweet all","d17df548":"Reply","e349147c":"What’s happening?","hb7b0ceb":"return e.retweetCount+\" Retweet\"+n(e.retweetCount,\"\",\"s\")","fa9ce7f4":"Undo Retweet","bd7c0390":"Quote Tweets","hb7b0cea":null,"bea869b3":null,"c9d7235d":null,"e2414184":null,"hdf72269":null,"e349147b":null,"f3bbbb87":null},"es":{"hb7b0cea":"return e.retweetCount+\" Retweet\"+r(e.retweetCount,\"\",\"s\")","bea869b3":"Twittear","bab1f8b0":"Tweets","c9d7235d":"Citar Tweet","d91695cb":"return e.fullName+\" (@\"+e.screenName+\") twitteó: \"+e.tweet","d497b854":"Retweets","e2414184":"return\"\"+r(e.count,\"Citar Tweet\",\"Tweets citados\")","hdf72269":"Responder","d2c7a41c":"Twittea tu respuesta","e349147b":"¿Qué está pasando?","h99e9c95":"return[\"\",\" lo retwitteó\"]","f3bbbb87":"Deshacer Retweet","d25289b4":"Retwitteado por","f70a36d0":"Twittear todo","c42234da":null,"bea869b4":null,"c9d7235e":null,"e2414185":null,"d17df548":null,"e349147c":null,"hb7b0ceb":null,"fa9ce7f4":null,"bd7c0390":null},"fa":{"hb7b0cea":"return e.retweetCount+\" بازتوییت\"","bea869b3":"توییت","bab1f8b0":"توييت‌ها","c9d7235d":"نقل‌توییت","d91695cb":"return e.fullName+\" (@\"+e.screenName+\") توییت کرد: \"+e.tweet","d497b854":"بازتوییت‌ها","e2414184":"return\"نقل‌توییت\"","hdf72269":"پاسخ","d2c7a41c":"پاسختان را توییت کنید","e349147b":"چه خبر است؟","h99e9c95":"return[\"\",\" بازتوییت کرد\"]","f3bbbb87":"لغو بازتوییت","d25289b4":"بازتوییت‌ شد توسط","f70a36d0":"توییت به همه","c42234da":null,"bea869b4":null,"c9d7235e":null,"e2414185":null,"d17df548":null,"e349147c":null,"hb7b0ceb":null,"fa9ce7f4":null,"bd7c0390":null},"eu":{"hb7b0cea":"return e.retweetCount+\" bertxio\"","bea869b3":"Txio","bab1f8b0":"Txioak","c9d7235d":"Txioa apaitu","d91695cb":"return e.fullName+\"(e)k (@\"+e.screenName+\") Txiokatu du: \"+e.tweet","d497b854":"Bertxioak","e2414184":"return\"Quote Tweet\"+n(e.count,\"\",\"s\")","hdf72269":"Erantzun","d2c7a41c":"Txiokatu erantzuna","e349147b":"Zer ari da gertatzen?","h99e9c95":"return[\"\",\" erabiltzaileak bertxiotu du\"]","f3bbbb87":"Desegin birtxiokatzea","d25289b4":"Bertxiotua:","f70a36d0":"Txiotu guztiak","c42234da":null,"bea869b4":null,"c9d7235e":null,"e2414185":null,"d17df548":null,"e349147c":null,"hb7b0ceb":null,"fa9ce7f4":null,"bd7c0390":null},"fi":{"bea869b3":"Twiittaa","bab1f8b0":"Twiitit","c9d7235d":"Twiitin lainaus","d497b854":"Uudelleentwiittaukset","hdf72269":"Vastaa","d2c7a41c":"Twiittaa vastauksesi","e349147b":"Mitä tapahtuu?","h99e9c95":"return[\"\",\" uudelleentwiittasi\"]","f3bbbb87":"Kumoa uudelleentwiittaus","d25289b4":"Uudelleentwiitannut","f70a36d0":"Twiittaa kaikki","hb7b0cea":null,"d91695cb":null,"e2414184":null,"c42234da":null,"bea869b4":null,"c9d7235e":null,"e2414185":null,"d17df548":null,"e349147c":null,"hb7b0ceb":null,"fa9ce7f4":null,"bd7c0390":null},"fr":{"bab1f8b0":"Tweets","d91695cb":"return e.fullName+\" (@\"+e.screenName+\") a tweeté : \"+e.tweet","d497b854":"Retweets","d2c7a41c":"Tweetez votre réponse.","h99e9c95":"return[\"\",\" a retweeté\"]","d25289b4":"Retweeté par","c42234da":"return\"Retweet\"+s(e.count,\"\",\"s\")","bea869b4":"Tweeter","c9d7235e":"Citer le Tweet","e2414185":"return\"\"+s(e.count,\"Citer le Tweet\",\"Tweets cités\")","f70a36d0":"Tout tweeter","d17df548":"Répondre","e349147c":"Quoi de neuf ?","hb7b0ceb":"return e.retweetCount+\" Retweet\"+s(e.retweetCount,\"\",\"s\")","fa9ce7f4":"Annuler le Retweet","bd7c0390":"Tweets cités","hb7b0cea":null,"bea869b3":null,"c9d7235d":null,"e2414184":null,"hdf72269":null,"e349147b":null,"f3bbbb87":null},"ga":{"bab1f8b0":"Tweetanna","d497b854":"Atweetanna","d2c7a41c":"Tweetáil do Fhreagra","h99e9c95":"return[\"Rinne \",\" Atweetáil\"]","d25289b4":"Atweetáilte ag","bea869b4":"Tweet","c9d7235e":"Cuir Ráiteas Leis","f70a36d0":"Tweetáil gach rud","d17df548":"Freagair","e349147c":"Cad atá ag tarlú?","fa9ce7f4":"Cuir an Atweet ar ceal","bd7c0390":"Luaigh Tvuíteanna","hb7b0cea":null,"bea869b3":null,"c9d7235d":null,"d91695cb":null,"e2414184":null,"hdf72269":null,"e349147b":null,"f3bbbb87":null,"c42234da":null,"e2414185":null,"hb7b0ceb":null},"gl":{"hb7b0cea":"return e.retweetCount+\" rechouchío\"+t(e.retweetCount,\"\",\"s\")","bea869b3":"Chío","bab1f8b0":"Chíos","c9d7235d":"Citar chío","d91695cb":"return e.fullName+\" (@\"+e.screenName+\") chiou:\\n\"+e.tweet","d497b854":"Rechouchíos","e2414184":"return\"Quote Tweet\"+r(e.count,\"\",\"s\")","hdf72269":"Responder","d2c7a41c":"Chía a túa resposta","e349147b":"Que está a pasar?","h99e9c95":"return[\"\",\" rechouchiou\"]","f3bbbb87":"Desfacer rechouchío","d25289b4":"Rechouchiado por","f70a36d0":"Chiar todo","c42234da":null,"bea869b4":null,"c9d7235e":null,"e2414185":null,"d17df548":null,"e349147c":null,"hb7b0ceb":null,"fa9ce7f4":null,"bd7c0390":null},"gu":{"hb7b0cea":"return e.retweetCount+\" પુનટ્વીટ\"+n(e.retweetCount,\"\",\"્સ\")","bea869b3":"ટ્વીટ","bab1f8b0":"ટ્વીટ્સ","c9d7235d":"અવતરણની સાથે ટ્વીટ કરો","d91695cb":"return e.fullName+\" (@\"+e.screenName+\") એ ટ્વીટ કરી: \"+e.tweet","d497b854":"પુનટ્વીટ્સ","e2414184":"return\"અવતરણની સાથે ટ્વીટ\"+n(e.count,\" કરો\",\"્સ\")","hdf72269":"પ્રત્યુતર","d2c7a41c":"તમારા પ્રત્યુતરને ટ્વીટ કરો","e349147b":"શું ચાલી રહ્યું છે?","h99e9c95":"return[\"\",\"એ પુનટ્વીટ કરી\"]","f3bbbb87":"પુનટ્વીટને પૂર્વવત કરો","d25289b4":"આમની દ્વારા પુનટ્વીટ કરવામાં આવી","f70a36d0":"બધાને ટ્વીટ કરો","c42234da":null,"bea869b4":null,"c9d7235e":null,"e2414185":null,"d17df548":null,"e349147c":null,"hb7b0ceb":null,"fa9ce7f4":null,"bd7c0390":null},"he":{"hb7b0cea":"return e.retweetCount+\" ציו\"+c(e.retweetCount,\"צים\",\"ץ\",\"צים\",\"צים\")+\" מחדש\"","bea869b3":"צייץ","bab1f8b0":"ציוצים","c9d7235d":"ציטוט ציוץ","d91695cb":"return e.fullName+\" (@\"+e.screenName+\") צייץ: \"+e.tweet","d497b854":"ציוצים מחדש","e2414184":"return\"צי\"+c(e.count,\"וץ ציטוט\",\"טוט ציוץ\",\"וץ ציטוט\",\"וץ ציטוט\")","hdf72269":"השב","d2c7a41c":"צייץ את התשובה שלך","e349147b":"מה קורה?","h99e9c95":"return[\"\",\" צייץ מחדש\"]","f3bbbb87":"ביטול ציוץ מחדש","d25289b4":"צויץ מחדש על־ידי","f70a36d0":"צייץ הכל","c42234da":null,"bea869b4":null,"c9d7235e":null,"e2414185":null,"d17df548":null,"e349147c":null,"hb7b0ceb":null,"fa9ce7f4":null,"bd7c0390":null},"hi":{"bab1f8b0":"ट्वीट","d91695cb":"return e.fullName+\" (@\"+e.screenName+\") ने ट्वीट किया: \"+e.tweet","d497b854":"रीट्वीट्स","d2c7a41c":"अपना जवाब ट्वीट करें","h99e9c95":"return[\"\",\" ने रीट्वीट किया\"]","d25289b4":"इनके द्वारा रीट्वीट किया गया","c42234da":"return\"रीट्वीट\"+n(e.count,\"\",\"्स\")","bea869b4":"ट्वीट करें","c9d7235e":"ट्वीट क्वोट करें","e2414185":"return\"कोट ट्वीट\"+n(e.count,\"\",\"्स\")","f70a36d0":"सभी ट्वीट करें","d17df548":"जवाब दें","e349147c":"क्या हो रहा है?","hb7b0ceb":"return e.retweetCount+\" रीट्वीट\"+n(e.retweetCount,\"\",\"्स\")","fa9ce7f4":"रीट्वीट को पूर्ववत करें","bd7c0390":"कोट ट्वीट्स","hb7b0cea":null,"bea869b3":null,"c9d7235d":null,"e2414184":null,"hdf72269":null,"e349147b":null,"f3bbbb87":null},"hr":{"bab1f8b0":"Tweetovi","d91695cb":"return e.fullName+\" (@\"+e.screenName+\") objavio/la je Tweet: \"+e.tweet","d497b854":"Proslijeđeni tweetovi","d2c7a41c":"Pošalji Tweet s odgovorom","h99e9c95":"return[\"\",\" proslijedio/la je Tweet\"]","d25289b4":"Korisnici koji su proslijedili Tweet","c42234da":"return\"proslijeđen\"+t(e.count,\"a tweeta\",\"i Tweet\",\"ih tweetova\")","bea869b4":"Tweet","c9d7235e":"Citiraj Tweet","e2414185":"return\"\"+t(e.count,\"citirana tweeta\",\"Citiraj Tweet\",\"citiranih tweetova\")","f70a36d0":"Tweetaj sve","d17df548":"Odgovori","e349147c":"Što se događa?","hb7b0ceb":"return e.retweetCount+\" proslijeđen\"+t(e.retweetCount,\"a tweeta\",\"i Tweet\",\"ih tweetova\")","fa9ce7f4":"Poništi prosljeđivanje tweeta","bd7c0390":"Citirani tweetovi","hb7b0cea":null,"bea869b3":null,"c9d7235d":null,"e2414184":null,"hdf72269":null,"e349147b":null,"f3bbbb87":null},"hu":{"bab1f8b0":"Tweetek","d91695cb":"return e.fullName+\" (@\"+e.screenName+\") tweetelte: \"+e.tweet","d497b854":"Retweetek","d2c7a41c":"Tweeteld válaszodat","h99e9c95":"return[\"\",\" Retweetelte\"]","d25289b4":"Retweetelte","c42234da":"return\"Retweet\"","bea869b4":"Tweetelj","c9d7235e":"Tweet idézése","e2414185":"return\"Tweet\"+n(e.count,\" idézése\",\"-idézés\")","f70a36d0":"Tweet küldése mindenkinek","d17df548":"Válasz","e349147c":"Mi történik éppen most?","hb7b0ceb":"return e.retweetCount+\" Retweet\"","fa9ce7f4":"Retweet visszavonása","bd7c0390":"Tweet-idézések","hb7b0cea":null,"bea869b3":null,"c9d7235d":null,"e2414184":null,"hdf72269":null,"e349147b":null,"f3bbbb87":null},"id":{"bea869b3":"Tweet","bab1f8b0":"Tweet","c9d7235d":"Kutip Tweet","d497b854":"Retweet","hdf72269":"Balas","d2c7a41c":"Tweet balasan Anda","e349147b":"Apa yang sedang terjadi?","h99e9c95":"return[\"\",\" me-retweet\"]","f3bbbb87":"Batalkan Retweet","d25289b4":"Di-retweet oleh","f70a36d0":"Tweet semua","hb7b0cea":null,"d91695cb":null,"e2414184":null,"c42234da":null,"bea869b4":null,"c9d7235e":null,"e2414185":null,"d17df548":null,"e349147c":null,"hb7b0ceb":null,"fa9ce7f4":null,"bd7c0390":null},"it":{"hb7b0cea":"return e.retweetCount+\" Retweet\"","bea869b3":"Twitta","bab1f8b0":"Tweet","c9d7235d":"Cita Tweet","d91695cb":"return e.fullName+\" (@\"+e.screenName+\") ha twittato: \"+e.tweet","d497b854":"Retweet","e2414184":"return\"Tweet di citazione\"","hdf72269":"Rispondi","d2c7a41c":"Twitta la tua risposta","e349147b":"Che c'è di nuovo?","h99e9c95":"return[\"\",\" ha ritwittato\"]","f3bbbb87":"Annulla Retweet","d25289b4":"Ritwittato da","f70a36d0":"Twitta tutto","c42234da":null,"bea869b4":null,"c9d7235e":null,"e2414185":null,"d17df548":null,"e349147c":null,"hb7b0ceb":null,"fa9ce7f4":null,"bd7c0390":null},"ja":{"hb7b0cea":"return e.retweetCount+\" 件のリツイート\"","bea869b3":"ツイートする","bab1f8b0":"ツイート","c9d7235d":"引用ツイート","d91695cb":"return e.fullName+\"（@\"+e.screenName+\"）さんがツイートしました: \"+e.tweet","d497b854":"リツイート","e2414184":"return\"件の引用ツイート\"","hdf72269":"返信","d2c7a41c":"返信をツイート","e349147b":"いまどうしてる？","h99e9c95":"return[\"\",\"さんがリツイート\"]","f3bbbb87":"リツイートを取り消す","d25289b4":"リツイートしたユーザー","f70a36d0":"すべてツイート","c42234da":null,"bea869b4":null,"c9d7235e":null,"e2414185":null,"d17df548":null,"e349147c":null,"hb7b0ceb":null,"fa9ce7f4":null,"bd7c0390":null},"kn":{"bab1f8b0":"ಟ್ವೀಟ್‌ಗಳು","d91695cb":"return e.fullName+\" (@\"+e.screenName+\") Tweeted:\\n\"+e.tweet","d497b854":"ಮರುಟ್ವೀಟ್‌ಗಳು","d2c7a41c":"ನಿಮ್ಮ ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ಟ್ವೀಟ್ ಮಾಡಿ","h99e9c95":"return[\"\",\" ಅವರು ಮರುಟ್ವೀಟಿಸಿದ್ದಾರೆ\"]","d25289b4":"ಮರುಟ್ವೀಟಿಸಿದವರು","c42234da":"return\"ಮರುಟ್ವೀಟ\"+n(e.count,\"ಿಸಿ\",\"್‌ಗಳು\")","bea869b4":"ಟ್ವೀಟ್","c9d7235e":"ಟ್ವೀಟ್ ಕೋಟ್ ಮಾಡಿ","e2414185":"return\"\"+n(e.count,\"ಟ್ವೀಟ್ ಕೋಟ್ ಮಾಡಿ\",\"ಕೋಟ್ ಟ್ವೀಟ್‌ಗಳು\")","f70a36d0":"ಎಲ್ಲಾ ಟ್ವೀಟ್ ಮಾಡಿ","d17df548":"ಪ್ರತಿಕ್ರಿಯಿಸಿ","e349147c":"ಏನಾಗುತ್ತಿದೆ?","hb7b0ceb":"return e.retweetCount+\" ಮರುಟ್ವೀಟ\"+n(e.retweetCount,\"ಿಸಿ\",\"್‌ಗಳು\")","fa9ce7f4":"ಮರುಟ್ವೀಟಿಸುವುದನ್ನು ರದ್ದುಮಾಡಿ","bd7c0390":"ಕೋಟ್ ಟ್ವೀಟ್‌ಗಳು","hb7b0cea":null,"bea869b3":null,"c9d7235d":null,"e2414184":null,"hdf72269":null,"e349147b":null,"f3bbbb87":null},"ko":{"hb7b0cea":"return e.retweetCount+\" 리트윗\"","bea869b3":"트윗","bab1f8b0":"트윗","c9d7235d":"트윗 인용하기","d91695cb":"return e.fullName+\" (@\"+e.screenName+\") Tweeted:\\n\"+e.tweet","d497b854":"리트윗","e2414184":"return\"인용한 트윗\"","hdf72269":"답글","d2c7a41c":"내 답글을 트윗합니다.","e349147b":"무슨 일이 일어나고 있나요?","h99e9c95":"return[\"\",\" 님이 리트윗함\"]","f3bbbb87":"리트윗 취소","d25289b4":"리트윗함","f70a36d0":"모두 트윗하기","c42234da":null,"bea869b4":null,"c9d7235e":null,"e2414185":null,"d17df548":null,"e349147c":null,"hb7b0ceb":null,"fa9ce7f4":null,"bd7c0390":null},"mr":{"hb7b0cea":"return e.retweetCount+\" पुन\"+r(e.retweetCount,\"्हा ट्विट करा\",\"र्ट्विट्स\")","bea869b3":"ट्विट","bab1f8b0":"ट्विट्स","c9d7235d":"ट्विट वर भाष्य करा","d91695cb":"return e.fullName+\" (@\"+e.screenName+\") यांनी ट्विट केले: \"+e.tweet","d497b854":"पुनर्ट्विट्स","e2414184":"return\"\"+r(e.count,\"ट्विट वर भाष्य करा\",\"भाष्य ट्विट्स\")","hdf72269":"प्रत्युत्तर","d2c7a41c":"आपल्या प्रत्युत्तरावर ट्विट करा","e349147b":"काय घडत आहे?","h99e9c95":"return[\"\",\" यांनी पुन्हा ट्विट केले\"]","f3bbbb87":"पुनर्ट्विट पूर्ववत करा","d25289b4":"यांनी पुन्हा ट्विट केले","f70a36d0":"सर्व ट्विट करा","c42234da":null,"bea869b4":null,"c9d7235e":null,"e2414185":null,"d17df548":null,"e349147c":null,"hb7b0ceb":null,"fa9ce7f4":null,"bd7c0390":null},"ms":{"bea869b3":"Tweet","bab1f8b0":"Tweet","c9d7235d":"Petik Tweet","d497b854":"Tweet semula","hdf72269":"Balas","d2c7a41c":"Tweet balasan anda","e349147b":"Apakah yang sedang berlaku?","h99e9c95":"return[\"\",\" telah Tweet semula\"]","f3bbbb87":"Buat asal Tweet semula","d25289b4":"Ditweet semula oleh","f70a36d0":"Tweet semua","hb7b0cea":null,"d91695cb":null,"e2414184":null,"c42234da":null,"bea869b4":null,"c9d7235e":null,"e2414185":null,"d17df548":null,"e349147c":null,"hb7b0ceb":null,"fa9ce7f4":null,"bd7c0390":null},"nb":{"bab1f8b0":"Tweets","d91695cb":"return e.fullName+\" (@\"+e.screenName+\") Tweetet: \"+e.tweet","d497b854":"Retweets","d2c7a41c":"Tweet svaret ditt","h99e9c95":"return[\"\",\" retweetet\"]","d25289b4":"Retweetet av","c42234da":"return\"Retweet\"+i(e.count,\"\",\"s\")","bea869b4":"Tweet","c9d7235e":"Sitat-Tweet","e2414185":"return\"sitat-Tweet\"+i(e.count,\"\",\"s\")","f70a36d0":"Tweet alle","d17df548":"Svar","e349147c":"Hva skjer?","hb7b0ceb":"return e.retweetCount+\" Retweet\"+i(e.retweetCount,\"\",\"s\")","fa9ce7f4":"Angre Retweet","bd7c0390":"Sitat-Tweets","hb7b0cea":null,"bea869b3":null,"c9d7235d":null,"e2414184":null,"hdf72269":null,"e349147b":null,"f3bbbb87":null},"nl":{"bab1f8b0":"Tweets","d91695cb":"return e.fullName+\" (@\"+e.screenName+\") Tweeted:\\n\"+e.tweet","d497b854":"Retweets","d2c7a41c":"Je antwoord tweeten","h99e9c95":"return[\"\",\" heeft geretweet\"]","d25289b4":"Geretweet door","c42234da":"return\"Retweet\"+r(e.count,\"\",\"s\")","bea869b4":"Tweeten","c9d7235e":"Citeer Tweet","e2414185":"return\"\"+r(e.count,\"Citeer Tweet\",\"Geciteerde Tweets\")","f70a36d0":"Alles tweeten","d17df548":"Beantwoorden","e349147c":"Wat houdt je bezig?","hb7b0ceb":"return e.retweetCount+\" Retweet\"+r(e.retweetCount,\"\",\"s\")","fa9ce7f4":"Retweet ongedaan maken","bd7c0390":"Geciteerde Tweets","hb7b0cea":null,"bea869b3":null,"c9d7235d":null,"e2414184":null,"hdf72269":null,"e349147b":null,"f3bbbb87":null},"pl":{"hb7b0cea":"return e.retweetCount+\" Tweet\"+n(e.retweetCount,\"y podane\",\"ów podanych\",\" podany\",\"ów podanych\")+\" dalej\"","bea869b3":"Tweet","bab1f8b0":"Tweety","c9d7235d":"Cytuj Tweeta","d91695cb":"return e.fullName+\" (@\"+e.screenName+\") Napisał/a: \"+e.tweet","d497b854":"Tweety podane dalej","e2414184":"return\"Cyt\"+n(e.count,\"aty z\",\"atów z\",\"uj\",\"atów z\")+\" Tweeta\"","hdf72269":"Odpowiedz","d2c7a41c":"Wyślij Tweeta z odpowiedzią","e349147b":"Co się dzieje?","h99e9c95":"return[\"\",\" podał/a dalej Tweeta\"]","f3bbbb87":"Cofnij podanie dalej","d25289b4":"Podane dalej przez","f70a36d0":"Tweetnij wszystko","c42234da":null,"bea869b4":null,"c9d7235e":null,"e2414185":null,"d17df548":null,"e349147c":null,"hb7b0ceb":null,"fa9ce7f4":null,"bd7c0390":null},"pt":{"hb7b0cea":"return e.retweetCount+\" Retweet\"+r(e.retweetCount,\"\",\"s\")","bea869b3":"Tweetar","bab1f8b0":"Tweets","c9d7235d":"Citar Tweet","d91695cb":"return e.fullName+\" (@\"+e.screenName+\") tweetou: \"+e.tweet","d497b854":"Retweets","e2414184":"return\"Tweet\"+r(e.count,\"\",\"s\")+\" de comentário\"","hdf72269":"Responder","d2c7a41c":"Tweete sua resposta","e349147b":"O que está acontecendo?","h99e9c95":"return[\"\",\" retweetou\"]","f3bbbb87":"Desfazer Retweet","d25289b4":"Retweetado por","f70a36d0":"Tweetar tudo","c42234da":null,"bea869b4":null,"c9d7235e":null,"e2414185":null,"d17df548":null,"e349147c":null,"hb7b0ceb":null,"fa9ce7f4":null,"bd7c0390":null},"ro":{"hb7b0cea":"return e.retweetCount+\" \"+r(e.retweetCount,\"Retweeturi\",\"Retweet\",\"de Retweeturi\")","bea869b3":"Tweet","bab1f8b0":"Tweeturi","c9d7235d":"Citează Tweetul","d91695cb":"return e.fullName+\" (@\"+e.screenName+\") a dat Tweetul: \"+e.tweet","d497b854":"Retweeturi","e2414184":"return\"\"+r(e.count,\"Tweeturi cu citat\",\"Tweet cu citat\",\"de Tweeturi cu citate\")","hdf72269":"Răspunde","d2c7a41c":"Dă un Tweet cu răspunsul","e349147b":"Ce se întâmplă?","h99e9c95":"return[\"\",\" a redistribuit\"]","f3bbbb87":"Anulează Retweetul","d25289b4":"Redistribuit de către","f70a36d0":"Dă Tweeturi cu tot","c42234da":null,"bea869b4":null,"c9d7235e":null,"e2414185":null,"d17df548":null,"e349147c":null,"hb7b0ceb":null,"fa9ce7f4":null,"bd7c0390":null},"ru":{"hb7b0cea":"return e.retweetCount+\" ретвит\"+n(e.retweetCount,\"а\",\"ов\",\"\",\"а\")","bea869b3":"Твитнуть","bab1f8b0":"Твиты","c9d7235d":"Цитировать","d91695cb":"return e.fullName+\" (@\"+e.screenName+\") твитнул(а): \"+e.tweet","d497b854":"Ретвиты","e2414184":"return\"\"+n(e.count,\"твита с цитатами\",\"твитов с цитатами\",\"Цитировать твит\",\"Твиты с цитатами\")","hdf72269":"Ответить","d2c7a41c":"Твитнуть в ответ","e349147b":"Что происходит?","h99e9c95":"return[\"\",\" ретвитнул(а)\"]","f3bbbb87":"Отменить ретвит","d25289b4":"Ретвитнул(а)","f70a36d0":"Твитнуть все","c42234da":null,"bea869b4":null,"c9d7235e":null,"e2414185":null,"d17df548":null,"e349147c":null,"hb7b0ceb":null,"fa9ce7f4":null,"bd7c0390":null},"sr":{"bab1f8b0":"Твитови","d91695cb":"return e.fullName+\" (@\"+e.screenName+\") Tweeted:\\n\"+e.tweet","d497b854":"Ретвитови","d2c7a41c":"Твитуј свој одговор","h99e9c95":"return[\"\",\" ретвитује\"]","d25289b4":"Ретвитовано од стране","c42234da":"return\"ретвит\"+n(e.count,\"а\",\"\",\"ова\")","bea869b4":"Твитуј","c9d7235e":"твит са цитатом","e2414185":"return\"твит\"+n(e.count,\"а\",\"\",\"(ов)а\")+\" са цитатом\"","f70a36d0":"Твитуј све","d17df548":"Одговори","e349147c":"Шта се дешава?","hb7b0ceb":"return e.retweetCount+\" ретвит\"+n(e.retweetCount,\"а\",\"\",\"ова\")","fa9ce7f4":"Опозови ретвит","bd7c0390":"твит(ов)а са цитатом","hb7b0cea":null,"bea869b3":null,"c9d7235d":null,"e2414184":null,"hdf72269":null,"e349147b":null,"f3bbbb87":null},"sk":{"hb7b0cea":"return e.retweetCount+\" retweet\"+n(e.retweetCount,\"y\",\"u\",\"\",\"ov\")","bea869b3":"Tweetnuť","bab1f8b0":"Tweety","c9d7235d":"Tweet s citátom","d91695cb":"return e.fullName+\" (@\"+e.screenName+\") Tweeted:\\n\"+e.tweet","d497b854":"Retweety","e2414184":"return\"Tweet\"+n(e.count,\"y\",\"u\",\"\",\"y\")+\" s citátom\"","hdf72269":"Odpovedať","d2c7a41c":"Tweetnuť odpoveď","e349147b":"Čo sa deje?","h99e9c95":"return[\"Používateľ \",\" retweetol\"]","f3bbbb87":"Zrušiť retweet","d25289b4":"Retweetnuté používateľom","f70a36d0":"Tweetnuť všetko","c42234da":null,"bea869b4":null,"c9d7235e":null,"e2414185":null,"d17df548":null,"e349147c":null,"hb7b0ceb":null,"fa9ce7f4":null,"bd7c0390":null},"sv":{"hb7b0cea":"return e.retweetCount+\" Retweet\"+r(e.retweetCount,\"\",\"s\")","bea869b3":"Tweeta","bab1f8b0":"Tweets","c9d7235d":"Citera Tweet","d91695cb":"return e.fullName+\" (@\"+e.screenName+\") Tweetade: \"+e.tweet","d497b854":"Retweets","e2414184":"return\"citat-tweet\"+r(e.count,\"\",\"s\")","hdf72269":"Svara","d2c7a41c":"Tweeta ditt svar","e349147b":"Vad händer?","h99e9c95":"return[\"\",\" Retweetade\"]","f3bbbb87":"Ångra retweeten","d25289b4":"Retweetad av","f70a36d0":"Tweeta allt","c42234da":null,"bea869b4":null,"c9d7235e":null,"e2414185":null,"d17df548":null,"e349147c":null,"hb7b0ceb":null,"fa9ce7f4":null,"bd7c0390":null},"ta":{"bab1f8b0":"கீச்சுகள்","d91695cb":"return e.fullName+\" (@\"+e.screenName+\") Tweeted:\\n\"+e.tweet","d497b854":"மறுகீச்சுகள்","d2c7a41c":"உங்கள் பதிலை ட்விட் செய்யவும்","h99e9c95":"return[\"\",\" மறுட்வீட் செய்துள்ளார்\"]","d25289b4":"இவரால் மறுட்விட் செய்யப்பட்டது","c42234da":"return\"மறுகீச்சு\"+n(e.count,\"\",\"கள்\")","bea869b4":"ட்விட் செய்","c9d7235e":"ட்விட்டை மேற்கோள் காட்டு","e2414185":"return\"\"+n(e.count,\"ட்விட்டை மேற்கோள் காட்டு\",\"மேற்கோள் கீச்சுகள்\")","f70a36d0":"அனைத்தையும் ட்விட் செய்","d17df548":"பதிலளி","e349147c":"என்ன நிகழ்கிறது?","hb7b0ceb":"return e.retweetCount+\" மறுகீச்சு\"+n(e.retweetCount,\"\",\"கள்\")","fa9ce7f4":"மறுகீச்சை செயல்தவிர்","bd7c0390":"மேற்கோள் கீச்சுகள்","hb7b0cea":null,"bea869b3":null,"c9d7235d":null,"e2414184":null,"hdf72269":null,"e349147b":null,"f3bbbb87":null},"th":{"bab1f8b0":"ทวีต","d91695cb":"return e.fullName+\" (@\"+e.screenName+\") Tweeted:\\n\"+e.tweet","d497b854":"รีทวีต","d2c7a41c":"ทวีตการตอบกลับของคุณ","h99e9c95":"return[\"\",\" รีทวีต\"]","d25289b4":"ถูกรีทวีตโดย","c42234da":"return\"รีทวีต\"","bea869b4":"ทวีต","c9d7235e":"อ้างอิงทวีต","e2414185":"return\"ทวีตและคำพูด\"","f70a36d0":"ทวีตทั้งหมด","d17df548":"ตอบกลับ","e349147c":"มีอะไรเกิดขึ้นบ้าง","hb7b0ceb":"return e.retweetCount+\" รีทวีต\"","fa9ce7f4":"ยกเลิกการรีทวีต","bd7c0390":"ทวีตและคำพูด","hb7b0cea":null,"bea869b3":null,"c9d7235d":null,"e2414184":null,"hdf72269":null,"e349147b":null,"f3bbbb87":null},"tr":{"hb7b0cea":"return e.retweetCount+\" Retweet\"","bea869b3":"Tweetle","bab1f8b0":"Tweetler","c9d7235d":"Tweeti Alıntıla","d91695cb":"return e.fullName+\" (@\"+e.screenName+\") Tweetledi: \"+e.tweet","d497b854":"Retweetler","e2414184":"return\"Alıntı Tweet\"+r(e.count,\"\",\"ler\")","hdf72269":"Yanıtla","d2c7a41c":"Yanıtını Tweetle","e349147b":"Neler oluyor?","h99e9c95":"return[\"\",\" Retweetledi\"]","f3bbbb87":"Retweeti Geri Al","d25289b4":"Retweetleyen(ler):","f70a36d0":"Hepsini Tweetle","c42234da":null,"bea869b4":null,"c9d7235e":null,"e2414185":null,"d17df548":null,"e349147c":null,"hb7b0ceb":null,"fa9ce7f4":null,"bd7c0390":null},"uk":{"bab1f8b0":"Твіти","d91695cb":"return e.fullName+\" (@\"+e.screenName+\") Tweeted:\\n\"+e.tweet","d497b854":"Ретвіти","d2c7a41c":"Твітніть відповідь","h99e9c95":"return[\"\",\" ретвітнув(ла)\"]","d25289b4":"Ретвіти","c42234da":"return\"ретвіт\"+n(e.count,\"и\",\"ів\",\"\",\"а\")","bea869b4":"Твіт","c9d7235e":"Цитувати твіт","e2414185":"return\"цитован\"+n(e.count,\"і твіти\",\"их твітів\",\"ий твіт\",\"ого твіта\")","f70a36d0":"Твітнути все","d17df548":"Відповісти","e349147c":"Що відбувається?","hb7b0ceb":"return e.retweetCount+\" ретвіт\"+n(e.retweetCount,\"и\",\"ів\",\"\",\"а\")","fa9ce7f4":"Скасувати ретвіт","bd7c0390":"Цитовані твіти","hb7b0cea":null,"bea869b3":null,"c9d7235d":null,"e2414184":null,"hdf72269":null,"e349147b":null,"f3bbbb87":null},"ur":{"hb7b0cea":"return e.retweetCount+\" ریٹویٹ\"","bea869b3":"ٹویٹ کریں","bab1f8b0":"ٹویٹس","c9d7235d":"ٹویٹ اقتباس کریں","d91695cb":"return e.fullName+\" (@\"+e.screenName+\") نے ٹویٹ کی: \"+e.tweet","d497b854":"ریٹویٹس","e2414184":"return\"Quote Tweet\"+o(e.count,\"\",\"s\")","hdf72269":"جواب دیں","d2c7a41c":"اپنا جواب ٹویٹ کریں","e349147b":"کیا ہو رہا ہے؟","h99e9c95":"return[\"\",\" نے ریٹویٹ کیا\"]","f3bbbb87":"ریٹویٹ کالعدم کریں","d25289b4":"ریٹویٹ منجانب","f70a36d0":"سب کو ٹویٹ کریں","c42234da":null,"bea869b4":null,"c9d7235e":null,"e2414185":null,"d17df548":null,"e349147c":null,"hb7b0ceb":null,"fa9ce7f4":null,"bd7c0390":null},"vi":{"bab1f8b0":"Tweet","c9d7235d":"Trích dẫn Tweet","d497b854":"Các Tweet lại","hdf72269":"Trả lời","d2c7a41c":"Tweet trả lời của bạn","e349147b":"Chuyện gì đang xảy ra?","h99e9c95":"return[\"\",\" đã Tweet lại\"]","f3bbbb87":"Hoàn tác Tweet lại","d25289b4":"Được Tweet lại bởi","f70a36d0":"Đăng Tweet tất cả","hb7b0cea":null,"bea869b3":null,"d91695cb":null,"e2414184":null,"c42234da":null,"bea869b4":null,"c9d7235e":null,"e2414185":null,"d17df548":null,"e349147c":null,"hb7b0ceb":null,"fa9ce7f4":null,"bd7c0390":null},"zh-Hant":{"hb7b0cea":"return e.retweetCount+\" 則轉推\"","bea869b3":"推文","bab1f8b0":"推文","c9d7235d":"引用推文","d91695cb":"return e.fullName+\" (@\"+e.screenName+\") 已推文：\"+e.tweet","d497b854":"轉推","e2414184":"return\"引用的推文\"","hdf72269":"回覆","d2c7a41c":"推你的回覆","e349147b":"有什麼新鮮事？","h99e9c95":"return[\"\",\" 已轉推\"]","f3bbbb87":"取消轉推","d25289b4":"已被轉推","f70a36d0":"推全部內容","c42234da":null,"bea869b4":null,"c9d7235e":null,"e2414185":null,"d17df548":null,"e349147c":null,"hb7b0ceb":null,"fa9ce7f4":null,"bd7c0390":null},"zh":{"hb7b0cea":"return e.retweetCount+\" 转推\"","bea869b3":"推文","bab1f8b0":"推文","c9d7235d":"引用推文","d91695cb":"return e.fullName+\" (@\"+e.screenName+\") 发推说：\"+e.tweet","d497b854":"转推","e2414184":"return\"引用推文\"","hdf72269":"回复","d2c7a41c":"发布你的回复","e349147b":"有什么新鲜事？","h99e9c95":"return[\"\",\" 转推了\"]","f3bbbb87":"撤销转推","d25289b4":"转推者","f70a36d0":"全部发推","c42234da":null,"bea869b4":null,"c9d7235e":null,"e2414185":null,"d17df548":null,"e349147c":null,"hb7b0ceb":null,"fa9ce7f4":null,"bd7c0390":null}};

/**
 * クッキーから設定言語を取得
 * 国際化データに含まれない言語の場合の初期値はen
 */
function getLang() {
  const cookie = document.cookie;
  const cookieLang = cookie
    .split(";")
    .map((s) => s.split("="))
    .filter(([key, value]) => {
      return key === " lang";
    })[0][1];

  if (Object.keys(i18n).includes(cookieLang)) {
    return cookieLang;
  } else if (cookieLang === "zh-cn") {
    return "zh";
  } else if (cookieLang === "zh-tw") {
    return "zh-Hant";
  } else if (cookieLang === "en-gb") {
    return "en-GB";
  } else {
    return "en";
  }
}

/**
 * サイドメニューのツイートするボタン
 */
function postToTweetSideNavNewTweetButton(langData) {
  const tweetButton = document.querySelector(
    'a[data-testid="SideNav_NewTweet_Button"] > div > span > div > div > span > span'
  );
  const toTweet =
    langData.bea869b3 !== null ? langData.bea869b3 : langData.bea869b4;

  if (tweetButton !== null && tweetButton.textContent !== toTweet) {
    tweetButton.textContent = toTweet;
  }
}

/**
 * 小さいツイートするボタン
 */
function postToTweetButtonInline(langData) {
  const tweetButton = document.querySelector(
    'div[data-testid="tweetButtonInline"] > div > span > span'
  );
  const toTweet =
    langData.bea869b3 !== null ? langData.bea869b3 : langData.bea869b4;

  const reply =
    langData.hdf72269 !== null ? langData.hdf72269 : langData.d17df548;

  if (tweetButton !== null) {
    if (location.pathname === "/home") {
      if (tweetButton.textContent !== toTweet) {
        tweetButton.textContent = toTweet;
      }
    } else {
      if (tweetButton.textContent !== reply) {
        tweetButton.textContent = reply;
      }
    }
  }
}

/**
 * ツイートボタン
 */
function postToTweetButton(langData) {
  const tweetButton = document.querySelector(
    'div[data-testid="tweetButton"] > div > span > span'
  );
  const toTweet =
    langData.bea869b3 !== null ? langData.bea869b3 : langData.bea869b4;

  if (tweetButton !== null && tweetButton.textContent !== toTweet) {
    tweetButton.textContent = toTweet;
  }
}

/**
 * 返信をツイート
 */
function postToTweetReplyDraftEditorPlaceholder(langData) {
  const whatsHappen =
    langData.e349147c !== null ? langData.e349147c : langData.e349147b;

  const placeholder = document.querySelector(
    `.public-DraftEditorPlaceholder-inner`
  );

  // mobile
  const placeholderTextArea = document.querySelector(
    `textarea[data-testid="tweetTextarea_0"]`
  );

  if (placeholder !== null) {
    if (
      location.pathname !== "/home" &&
      location.pathname !== "/compose/tweet"
    ) {
      if (placeholder.textContent !== langData.d2c7a41c) {
        placeholder.textContent = langData.d2c7a41c;
      }
    } else {
      if (placeholder.textContent !== whatsHappen) {
        placeholder.textContent = whatsHappen;
      }
    }
  }

  if (placeholderTextArea !== null) {
    if (
      location.pathname !== "/home" &&
      location.pathname !== "/compose/tweet"
    ) {
      if (
        placeholderTextArea.getAttribute("placeholder") !== langData.d2c7a41c
      ) {
        placeholderTextArea.setAttribute("placeholder", langData.d2c7a41c);
      }
    }
  }
}

/**
 * リツイートボタン、引用ツイートボタン
 */
function postToTweetRetweetBtn(langData) {
  const retweetBtns = document.querySelectorAll(
    'div[data-testid="retweetConfirm"] > div:nth-child(2) > div > span:not(.x-to-twitter-retweet)'
  );

  const quoteBtns = document.querySelectorAll(
    'a[href="/compose/tweet"] > div:nth-child(2) > div > span:not(.x-to-twitter-retweet)'
  );

  const unRetweetBtns = document.querySelectorAll(
    'div[data-testid="unretweetConfirm"] > div:nth-child(2) > div > span:not(.x-to-twitter-retweet)'
  );

  const toRetweet =
    langData.d497b854 !== null ? langData.d497b854 : langData.c42234da;

  const toQuote =
    langData.c9d7235d !== null ? langData.c9d7235d : langData.c9d7235e;

  const undoRetweet =
    langData.f3bbbb87 !== null ? langData.f3bbbb87 : langData.fa9ce7f4;

  retweetBtns?.forEach((retweetBtn) => {
    retweetBtn.classList.add("x-to-twitter-retweet");
    retweetBtn.textContent = toRetweet;
  });

  quoteBtns?.forEach((quoteBtn) => {
    quoteBtn.classList.add("x-to-twitter-retweet");
    quoteBtn.textContent = toQuote;
  });

  unRetweetBtns?.forEach((unRetweetBtn) => {
    unRetweetBtn.classList.add("x-to-twitter-retweet");
    unRetweetBtn.textContent = undoRetweet;
  });
}

/**
 * リツイートカウンター
 */
function postToTweetRetweetCounter(langData) {
  const counter = document.querySelector(
    "article > div > div > div:nth-child(3) > div:nth-child(5) > div:nth-child(2) > a > span > span"
  );

  const splitRetweets = (
    langData.hb7b0cea !== null ? langData.hb7b0cea : langData.hb7b0ceb
  ).split('"');

  const retweet =
    splitRetweets[1].trim() +
    (splitRetweets[5] !== undefined ? splitRetweets[5] : "");

  if (counter !== null) {
    if (counter.textContent !== retweet) {
      counter.textContent = retweet;
    }
  }
}

/**
 * Header
 */
function postToTweetHeader(langData) {
  const header = document.querySelector(
    `h2[dir="ltr"]:not(#modal-header) > span`
  );

  const toTweet =
    langData.bea869b3 !== null ? langData.bea869b3 : langData.bea869b4;

  const quoteTweet =
    langData.c9d7235d !== null ? langData.c9d7235d : langData.bd7c0390;

  const splitPath = location.pathname.split("/");

  if (
    header !== null &&
    location.pathname !== "/home" &&
    location.pathname !== "/notifications" &&
    location.pathname !== "/explore" &&
    location.pathname !== "/messages" &&
    location.pathname !== "/search"
  ) {
    if (splitPath[4] === "retweets" && splitPath[5] === "with_comments") {
      // quote
      header.textContent = quoteTweet;
    } else if (header.textContent !== toTweet) {
      //tweet
      header.textContent = toTweet;
    }
  }
}

/**
 * RetweetedBy popup
 */
function postToTweetRetweetedByPopup(langData) {
  const header = document.querySelector(`h2[dir="ltr"]#modal-header > span`);

  const splitPath = location.pathname.split("/");
  const retweetedBy = langData.d25289b4;

  if (
    header !== null &&
    splitPath[4] === "retweets" &&
    header.textContent !== retweetedBy
  ) {
    header.textContent = retweetedBy;
  }
}

/**
 * リポストしました
 */
function postToTweetRetweeted(langData) {
  const retweeted = langData.h99e9c95.split('"')[3];

  const retweetedSpans = document.querySelectorAll(
    `article span[data-testid="socialContext"]:not(.x-to-twitter-retweeted)`
  );

  retweetedSpans?.forEach((retweetedSpan) => {
    retweetedSpan.classList.add("x-to-twitter-retweeted");
    const namespan = retweetedSpan.querySelector("span");
    retweetedSpan.innerHTML = "";
    retweetedSpan.appendChild(namespan);
    retweetedSpan.innerHTML = retweetedSpan.innerHTML + retweeted;
  });
}

/**
 * 上から出てくるやつ
 * "さんがツイートしました"
 */
function postToTweetTweetedPill(langData) {
  const tweeted = langData.d91695cb
    .replaceAll("）", ")")
    .split(")")[1]
    .split(":")[0];
  const pill = document.querySelector(
    `div[data-testid="pillLabel"] > span > span > span`
  );
  if (pill !== null && pill.textContent !== tweeted) {
    pill.textContent = tweeted;
  }
}

/**
 * プロフィールのタブのツイート
 */
function postToTweetProfileTweets(langData) {
  const tweets = langData.bab1f8b0;

  const profileTabPost = document.querySelector(
    'div[role="tablist"] > div[role="presentation"]:nth-child(1) > a > div > div > span'
  );
  if (profileTabPost !== null && profileTabPost.textContent !== tweets) {
    if (
      location.pathname !== "/home" &&
      location.pathname !== "/notifications" &&
      location.pathname !== "/explore" &&
      location.pathname !== "/search"
    ) {
      profileTabPost.textContent = tweets;
    }
  }
}

/**
 * Post を Tweet に変更
 */
function postToTweet() {
  const ob = new MutationObserver(() => {
    const langData = i18n[getLang()];

    postToTweetSideNavNewTweetButton(langData);
    postToTweetButtonInline(langData);
    postToTweetButton(langData);
    postToTweetReplyDraftEditorPlaceholder(langData);
    postToTweetRetweetBtn(langData);
    postToTweetRetweetCounter(langData);
    postToTweetHeader(langData);
    postToTweetRetweeted(langData);
    postToTweetRetweetedByPopup(langData);
    postToTweetTweetedPill(langData);
    postToTweetProfileTweets(langData);
  });
  ob.observe(document.body, {
    childList: true,
    subtree: true,
    textContent: true,
    characterData: true,
    attributes: true,
  });
}

/**
 * 国際化ファイルのテスト
 */
function i18nTest() {
  const tests = [
    { name: "ツイートする", keys: ["bea869b3", "bea869b4"] },
    { name: "返信", keys: ["hdf72269", "d17df548"] },
    { name: "いまどうしてる？", keys: ["e349147c", "e349147b"] },
    { name: "リツイート", keys: ["d497b854", "c42234da"] },
    { name: "引用ツイート", keys: ["c9d7235d", "c9d7235e"] },
    { name: "引用ツイート(Quote Tweets)", keys: ["c9d7235d", "bd7c0390"] },
    { name: "リツイートを取り消す", keys: ["f3bbbb87", "fa9ce7f4"] },
    { name: "件のリツイート", keys: ["hb7b0cea", "hb7b0ceb"] },
    { name: "リポストしました", keys: ["h99e9c95"] },
    { name: "リツイートしたユーザー", keys: ["d25289b4"] },
    { name: "さんがツイートしました", keys: ["d91695cb"] },
    { name: "ツイート(Tweets)", keys: ["bab1f8b0"] },
  ];

  let errorExist = false;

  Object.keys(i18n).forEach((langName) => {
    tests.forEach(({ name, keys }) => {
      let isPass = false;

      keys.forEach((key) => {
        if (i18n[langName][key] !== null) {
          isPass = true;
        }
      });

      if (!isPass) {
        errorExist = true;
        console.log(`❌${langName}: "${name}" Not Passed.`);
      }
    });
  });

  if (errorExist) {
    console.log(
      "%c[X to Twitter] Did not pass translation test%c",
      "color:white; background-color:purple; font-size: 20px",
      "",
      "\nIf you have any Twitter i18n js files archived in early 2022, please contact the repository issue\nhttps://github.com/yakisova41/xToTwitter/issues"
    );
  }
}

/**
 * タイトルをTwitterに変更
 */
function titleChange(head) {
  const i = setInterval(() => {
    const titleEl = head.querySelector("title");

    if (titleEl !== null) {
      clearInterval(i);

      const titleOb = new MutationObserver(() => {
        if (titleEl.innerHTML === "X") {
          titleEl.innerHTML = "Twitter";
        } else {
          const split = titleEl.innerHTML.split("/");

          if (split[1] === " X") {
            split[1] = " Twitter";
            titleEl.innerHTML = split.join("/");
          }
        }
      });

      titleOb.observe(titleEl, {
        childList: true,
      });
    }
  }, 100);
}

/**
 * cssを追加
 */
function styleInject(head) {
  const style = document.createElement("style");

  const verifiedSelector = `a[href="/i/verified-choose"] > div > div > svg > g > path`;
  const verifiedSelectorMobile = `a[href="/i/verified-choose"] > div > svg > g > path`;
  const xLogoSelector = `path[d="${paths.xLogoPath}"]:not(${verifiedSelector}):not(${verifiedSelectorMobile})`;
  const xLogoDarkmodeSelector = `div[style="color: rgb(239, 243, 244);"] > svg > g > path:not(${verifiedSelector}):not(${verifiedSelectorMobile})`;

  style.innerHTML = `
    .x-to-twitter {
        fill: inherit;
        color: ${colors.twitterColor};
    }

    ${xLogoSelector}, path[d="${paths.loadingXLogoPath}"] {
        d:path("${paths.birdPath}");
        fill: inherit;
        color: ${colors.twitterColor};
    }

    ${xLogoDarkmodeSelector} {
        color: rgb(239, 243, 244);
    }

    div[aria-label="Loading…"] > svg > g > path {
        d:path("${paths.birdPath}");
        fill: inherit;
        color: ${colors.loadingBirdColor};
    }

    ${verifiedSelector}, ${verifiedSelectorMobile} {
        d:path("${paths.verifiedPath}");
    }
    `;
  head.appendChild(style);
}

/**
 * headが見つかったときの処理
 */
function headFound(head) {
  // favicon change
  const shortcutIcon = head.querySelector('[rel="shortcut icon"]');
  if (shortcutIcon !== null) {
    shortcutIcon.href =
      "data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJkSURBVHgB7VZBbtpQEH3zIW0WVYuXVaH4Bs0NSk4AOUFhEarskhMknIDsqkKlcIT0BNAT1D1B3ZJK3dmVuirwp/MhVmzAxiagKBJv9+ePZ97M/JkxsMMODwzChlD84FWQp3MxeCDHAhiumB+MJrr1+8Ryw3p/9+H4DctfIPCq49Xlw8Kv99YlMuB19885gy/i7llziwGfFFWJyR02XzSCuwiBUse7BlFVaz5LS8KQVkRXaXRJsqImfDjKSZBNyzEyFWFKVJ4KFbWLElUao6KbSk8i9TXgTPaorxTskPwOxa7/9baGt4zg8oQbNyfWYJlRU0/KUx9ZwNwYNq1ecFRzl18QpW0bB0Ks//KjV1uwlbuLJA3GxEdh5wb5yGEPl3qMd2xecYQHKnlFlVLX95kxYCFKGg5IlU2a0uLpCM68LEJA+sJ/Dm6Jy3aMjQIRakRUm+UuvfOp/X34iQSejeFo0Hdx4optG5uFH/R+GHNvANcm3VtwLs+Lvy2TRwhIOnrYHhysIuDKcCDwGbYAjglOzQt+HssElF6dvoNNOZeuCSbfSgIGMjILMo4/ExZf7TqghNLmlwm1gpSC2tmaLAZMvWGz0Iu7XpqBm2NrQNN5cD+Y5ZOTdZyok3RZMusZOJUN+QZrQFb0oQkG6xIIYHe8A03Unx/Ryd6jS2ctAsbxmFRVynGKlM5na5ePVkUe0p+h9MmraS2zXqYgmSWjOPtElHbLTVB3Q79gqQlMScxqXpeav0UWiGMmXKSNOpZAAPvKs/U/1MRoxRxl+5WD+psUy2D5IdmRVoWjnqDnLlkyO+zwaPAf1zXwZL751PUAAAAASUVORK5CYII=";
  }
  styleInject(head);
  titleChange(head);
  postToTweet();
  i18nTest();
}

/**
 * ゴミSafariはcssのpath d変更に対応していないため
 * 一つ一つのDOMを書き換えることで対応
 */
function trashSafari() {
  const ob = new MutationObserver(() => {
    const pathElems = document.querySelectorAll(
      `path[d="${paths.xLogoPath}"]:not(.x-to-twitter):not(a[href="/i/verified-choose"] > div > div > svg > g > path, a[href="/i/verified-choose"] > div > svg > g > path), path[d="${paths.loadingXLogoPath}"]:not(.x-to-twitter)`
    );
    if (pathElems.length !== 0) {
      pathElems.forEach((path) => {
        path.setAttribute("d", paths.birdPath);
        path.classList.add("x-to-twitter");
      });
    }

    const verifiedElems = document.querySelectorAll(
      `a[href="/i/verified-choose"] > div > div > svg > g > path:not(.x-to-twitter-noncolor), a[href="/i/verified-choose"] > div > svg > g > path:not(.x-to-twitter-noncolor)`
    );
    if (verifiedElems.length !== 0) {
      verifiedElems.forEach((path) => {
        path.setAttribute("d", paths.verifiedPath);
        path.classList.add("x-to-twitter-noncolor");
      });
    }
  });

  ob.observe(document.body, {
    childList: true,
    subtree: true,
  });

  document
    .querySelector('div[aria-label="Loading…"] > svg > g > path')
    .setAttribute("d", paths.birdPath);
}

/**
 * PWAのmanifestをtwitterに書き換える
 * !! 拡張機能でのみ動作
 */
function replaceManifest(head) {
  document.querySelector('link[rel="manifest"').remove();
  const manifestEl = document.createElement("link");
  manifestEl.setAttribute("rel", "manifest");
  manifestEl.setAttribute("crossorigin", "use-credentials");
  manifestEl.setAttribute(
    "href",
    chrome.runtime.getURL("/twitterManifest.json")
  );
  head.prepend(manifestEl);
}

/**
 * スクリプトを実行
 */
function main() {
  if (typeof GM_info !== "undefined") {
    // userscript
    let head;
    if (GM_info.scriptHandler === "Userscripts") {
      // ios
      head = document.head;
    } else {
      head = unsafeWindow.document.head;
    }

    if (head !== null && head !== undefined) {
      headFound(head);
    } else {
      const i = setInterval(() => {
        const head = document.head;
        if (head !== undefined && head !== null) {
          clearInterval(i);
          headFound(head);
        }
      });
    }
  } else {
    // extension
    const i = setInterval(() => {
      const head = document.head;
      if (head !== null) {
        clearInterval(i);
        headFound(head);
        replaceManifest(head);
      }
    });
  }
}

main();
