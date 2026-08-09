(function registerPerformanceModule(){
    "use strict";
    const app=window.Alekrythae;if(!app)throw new Error("Alekrythae orkestratörü bulunamadı");
    app.registerModule({
        id:"application.performance",
        order:15,
        async start({eventBus}){
            const root=document.documentElement;
            const normalizeProfile=()=>{
                const current=String(root.dataset.alekPerformance||"");
                if(!["eco","balanced","cinematic","cpu-ram"].includes(current))root.dataset.alekPerformance="cinematic";
            };
            this.onSuspend=()=>root.classList.add("alek-suspend");
            this.onResume=()=>{root.classList.remove("alek-suspend");normalizeProfile();};
            this.offSuspend=eventBus.on("app:suspended",this.onSuspend);
            this.offResume=eventBus.on("app:resumed",this.onResume);
            normalizeProfile();
            // Yaşam döngüsü modülü daha erken başladığı için ilk `app:resumed`
            // olayı bu modül abone olmadan yayınlanmış olabilir. Görünür açılışta
            // kökte kalan alek-suspend sınıfını burada doğrudan temizle; kaynak
            // barları ilk klavye girdisini beklemeden çalışsın.
            if(document.hidden)this.onSuspend();else this.onResume();
            window.__ALEK_PERFORMANCE__={profile:()=>root.dataset.alekPerformance||"cinematic",revision:128};
        },
        async stop(){
            this.offSuspend?.();this.offResume?.();
            document.documentElement.classList.remove("alek-suspend");
            delete window.__ALEK_PERFORMANCE__;
        }
    });
})();
