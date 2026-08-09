(function registerShortcutModule(){
    "use strict";
    const app=window.Alekrythae;if(!app)throw new Error("Alekrythae orkestratörü bulunamadı");

    const isF2=event=>{
        const key=String(event?.key||"");
        const code=String(event?.code||"");
        return !event?.altKey&&!event?.ctrlKey&&!event?.metaKey&&!event?.shiftKey
            && (code==="F2"||key==="F2"||Number(event?.keyCode)===113);
    };

    app.registerModule({
        id:"application.shortcuts",
        order:20,
        async start({eventBus}){
            window.__ALEK_WORLD_MAP_SHORTCUT_OWNED__=true;
            this.onKeyDown=event=>{
                if(!isF2(event))return;
                event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();
                if(event.repeat)return;
                if(typeof window.__alekOpenPrimaryRadial==="function")window.__alekOpenPrimaryRadial();
                else window.__ALEK_PENDING_PRIMARY_RADIAL__=true;
            };
            window.addEventListener("keydown",this.onKeyDown,true);
            eventBus.emit("shortcut:ready",{id:"primary-radial.toggle",keys:"F2"});
        },
        async stop(){
            window.removeEventListener("keydown",this.onKeyDown,true);
            this.onKeyDown=null;delete window.__ALEK_WORLD_MAP_SHORTCUT_OWNED__;
        }
    });
})();
