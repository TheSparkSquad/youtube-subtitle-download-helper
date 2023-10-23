(()=>{"use strict";
class t{
    constructor(t){
        this.url=t
    }
    getParam(t){
        t=t.replace(/[[]]/g,"\\$&");
        const e=new RegExp("[?&]"+t+"(=([^&#]*)|&|#|$)").exec(this.url);
        if(!e)throw 
            new Error("Url query parameter does not contain videoid.");
        return e[2]?decodeURIComponent(e[2].replace(/\+/g," ")):""
    }
}
class e{
    async getVideoInformation(t){
        const e=await fetch(`https://www.youtube.com/watch?v=${t}`);
        if(!e.ok)throw 
            new Error(e.statusText);
        return e.text()
    }
    async getSubtitle(t){
        const e=await fetch(t);if(!e.ok)throw new Error(e.statusText);return e.text()
    }
}
chrome.runtime.onMessage.addListener(((o,n,c)=>{const a=new t(document.URL).getParam("v");
return(new e).getVideoInformation(a).then((t=>{const e=(t=>{const e=/\{"captionTracks":(\[.*?\]),/g.exec(t);
if(!e)throw 
    new Error("Not found caption track list");
return JSON.parse(e[1])})(t);
c({captionTrackList:e,videoId:a,videoTitle:r(),error:null})})).catch((t=>{console.log(t),c({error:t})})),!0}));
const r=()=>document.title.replace(/[+|/?^.<>":]/g,"").replace(/ - YouTube/,"")})();