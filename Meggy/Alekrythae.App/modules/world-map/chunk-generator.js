(function installChunkGenerator(){
    "use strict";
    const PROFILE=window.AlekrythaeWorldLoreProfile||{layers:{surface:{},sky:{},underground:{}},archetypes:[]};
    const SURFACE_TAXONOMY=window.AlekrythaeSurfaceTaxonomy||null;
    const fract=value=>value-Math.floor(value);
    const smooth=t=>t*t*(3-2*t);
    const mix=(a,b,t)=>a+(b-a)*t;
    const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
    const hash=(seed,x,z)=>{
        let h=(Number(seed)||1)^Math.imul(x|0,374761393)^Math.imul(z|0,668265263);
        h=Math.imul(h^(h>>>13),1274126177);return((h^(h>>>16))>>>0)/4294967295;
    };
    const valueNoise=(seed,x,z)=>{
        const x0=Math.floor(x),z0=Math.floor(z),tx=smooth(fract(x)),tz=smooth(fract(z));
        return mix(mix(hash(seed,x0,z0),hash(seed,x0+1,z0),tx),mix(hash(seed,x0,z0+1),hash(seed,x0+1,z0+1),tx),tz);
    };
    const fbm=(seed,x,z,octaves=5)=>{
        let value=0,amplitude=.55,frequency=1,total=0;
        for(let i=0;i<octaves;i++){value+=valueNoise(seed+i*1013,x*frequency,z*frequency)*amplitude;total+=amplitude;amplitude*=.5;frequency*=2;}
        return value/total;
    };
    const ridged=(seed,x,z,octaves=5)=>1-Math.abs(fbm(seed,x,z,octaves)*2-1);
    const signed=(seed,x,z,octaves=5)=>fbm(seed,x,z,octaves)*2-1;
    const layerSalt=layerKey=>layerKey==="sky"?7000003:layerKey==="underground"?13000007:0;
    const normalizedLayer=layerKey=>layerKey==="sky"||layerKey==="underground"?layerKey:"surface";
    const BASE_PALETTE={
        deepWater:[3,21,48],ocean:[4,48,91],water:[7,82,132],lagoon:[18,130,157],shallows:[126,214,197],
        meadow:[65,153,83],forest:[24,111,68],deepForest:[15,83,57],flower:[95,168,93],moss:[78,139,91],
        tropical:[87,170,91],storm:[73,126,111],crystal:[92,142,151],highland:[105,133,116],mountain:[151,166,158],snow:[224,241,239],
        skyVoid:[5,17,37],cloud:[127,183,207],skyMeadow:[86,170,121],skyForest:[39,128,108],stormIsland:[87,109,151],lightGarden:[114,190,194],
        caveVoid:[20,17,14],rock:[82,70,58],darkRock:[48,48,49],limestone:[121,113,94],clay:[129,82,52],mineral:[104,101,88],
        copper:[177,91,48],iron:[137,62,45],gold:[214,169,58],silver:[166,177,181],amethyst:[131,74,170],emerald:[47,145,89],sapphire:[49,105,170],
        crystalCave:[58,151,205],mushroom:[72,157,83],mushroomViolet:[147,73,177],mushroomAmber:[207,139,52],mushroomCyan:[57,168,173],
        undergroundWater:[24,90,101],deepUndergroundWater:[13,55,68]
    };

    const variationAxes=PROFILE.biomeVariationEngine?.axes||{};
    const rgbShift=(color,hueBias=0,lightBias=0,satBias=0)=>{const [r,g,b]=color.map(v=>v/255),max=Math.max(r,g,b),min=Math.min(r,g,b),delta=max-min,l=(max+min)/2;let h=0,s=0;if(delta){s=delta/(1-Math.abs(2*l-1));if(max===r)h=60*(((g-b)/delta)%6);else if(max===g)h=60*((b-r)/delta+2);else h=60*((r-g)/delta+4);}h=(h+hueBias+360)%360;s=clamp(s+satBias,0,1);const nl=clamp(l+lightBias,0,1),c=(1-Math.abs(2*nl-1))*s,x=c*(1-Math.abs((h/60)%2-1)),m=nl-c/2;let rr=0,gg=0,bb=0;if(h<60){rr=c;gg=x}else if(h<120){rr=x;gg=c}else if(h<180){gg=c;bb=x}else if(h<240){gg=x;bb=c}else if(h<300){rr=x;bb=c}else{rr=c;bb=x}return[rr,gg,bb].map(v=>Math.round(clamp((v+m)*255,0,255)));};
    const SURFACE_THEME_PROFILES=Object.freeze({
        "light-fantasy":{base:{hue:8,light:.055,sat:.10},water:{hue:-8,light:.05,sat:.11},flora:{hue:10,light:.04,sat:.10},stone:{hue:2,light:.05,sat:.02},variation:{hue:9.5,light:.055,sat:.065}},
        "epic-fantasy":{base:{hue:0,light:.02,sat:.11},water:{hue:-5,light:.03,sat:.10},flora:{hue:7,light:.02,sat:.11},stone:{hue:-2,light:.015,sat:.03},variation:{hue:10.5,light:.055,sat:.075}},
        "dark-fantasy":{base:{hue:18,light:-.07,sat:.03},water:{hue:12,light:-.08,sat:.02},flora:{hue:26,light:-.05,sat:.025},stone:{hue:18,light:-.03,sat:.01},variation:{hue:7.5,light:.035,sat:.03}},
        "cosmic-fantasy":{base:{hue:18,light:.025,sat:.08},water:{hue:22,light:.04,sat:.09},flora:{hue:16,light:.03,sat:.085},stone:{hue:12,light:.02,sat:.035},variation:{hue:12.5,light:.06,sat:.07}},
        "magical-fantasy":{base:{hue:10,light:.03,sat:.12},water:{hue:-10,light:.04,sat:.11},flora:{hue:12,light:.025,sat:.13},stone:{hue:4,light:.015,sat:.03},variation:{hue:12,light:.06,sat:.08}},
        "nautical-fantasy":{base:{hue:-4,light:.012,sat:.07},water:{hue:-14,light:.06,sat:.14},flora:{hue:2,light:.01,sat:.08},stone:{hue:-6,light:.01,sat:.02},variation:{hue:8,light:.05,sat:.06}},
        "high-fantasy":{base:{hue:4,light:.03,sat:.085},water:{hue:-6,light:.035,sat:.09},flora:{hue:5,light:.02,sat:.09},stone:{hue:2,light:.02,sat:.02},variation:{hue:9,light:.05,sat:.065}},
        "progress-fantasy":{base:{hue:2,light:.015,sat:.09},water:{hue:-4,light:.03,sat:.095},flora:{hue:6,light:.02,sat:.10},stone:{hue:0,light:.01,sat:.02},variation:{hue:10,light:.05,sat:.07}}
    });
    const resolveThemeId=()=>String(window.__alekWorldSurfaceTheme||PROFILE.visualThemes?.defaultSurfaceTheme||"epic-fantasy").trim().toLocaleLowerCase("tr");
    const activeSurfaceTheme=()=>SURFACE_THEME_PROFILES[resolveThemeId()]||SURFACE_THEME_PROFILES["epic-fantasy"];
    const themedPalette=(themeId=resolveThemeId())=>{
        const theme=SURFACE_THEME_PROFILES[String(themeId||"").trim().toLocaleLowerCase("tr")]||SURFACE_THEME_PROFILES["epic-fantasy"];
        const waterKeys=new Set(["deepWater","ocean","water","lagoon","shallows","undergroundWater","deepUndergroundWater","cloud","skyVoid"]);
        const floraKeys=new Set(["meadow","forest","deepForest","flower","moss","tropical","storm","skyMeadow","skyForest","lightGarden","mushroom","mushroomViolet","mushroomAmber","mushroomCyan","emerald"]);
        const stoneKeys=new Set(["crystal","highland","mountain","snow","caveVoid","rock","darkRock","limestone","clay","mineral","copper","iron","gold","silver","amethyst","sapphire","crystalCave"]);
        const themed={};
        Object.entries(BASE_PALETTE).forEach(([key,color])=>{
            const shift=waterKeys.has(key)?theme.water:floraKeys.has(key)?theme.flora:stoneKeys.has(key)?theme.stone:theme.base;
            themed[key]=rgbShift(color,shift.hue,shift.light,shift.sat);
        });
        return themed;
    };
    const palette=themedPalette();
    const biomeVariation=(seed,x,z,layerKey,baseBiome,color)=>{const theme=activeSurfaceTheme(),scale=layerKey==="underground"?1800:layerKey==="sky"?2600:3200,ix=Math.floor(x/scale),iz=Math.floor(z/scale),axisNames=["landform","flora","water","atmosphere","arcana","light"],picked=axisNames.map((axis,index)=>{const list=variationAxes[axis]||[axis];return list[Math.floor(hash(seed+index*7103,ix+index*17,iz-index*23)*list.length)%list.length];}),signature=picked.join(" · "),sx=x/scale,sz=z/scale,hue=signed(seed+77001,sx*.72,sz*.72,4)*theme.variation.hue,light=signed(seed+77002,sx*.66,sz*.66,4)*theme.variation.light,sat=signed(seed+77003,sx*.81,sz*.81,4)*theme.variation.sat;return{biome:`${baseBiome} · ${picked[0]} ${picked[1]}`,baseBiome,variantKey:`${layerKey}:${ix}:${iz}:${picked.join("|")}`,variantName:signature,color:rgbShift(color,hue,light,sat)};};
    const archetypeIndex=seed=>Math.floor(hash(Number(seed)||1,173,991)*12)%12;
    const archetypeName=seed=>PROFILE.archetypes?.[archetypeIndex(seed)]||"yaşayan-kıtalar";
    const warpCoordinates=(seed,x,z,scale=.00042,strength=1650)=>{
        const wx=signed(seed+9301,x*scale,z*scale,4)*strength;
        const wz=signed(seed+19301,(x+9000)*scale,(z-7000)*scale,4)*strength;
        return{x:x+wx,z:z+wz};
    };
    const surfaceFields=(seed,x,z)=>{
        const archetype=archetypeIndex(seed),w=warpCoordinates(seed,x,z,.00024,1950),wx=w.x,wz=w.z;
        const continent=signed(seed+101,wx*.00022,wz*.00022,6);
        const regional=signed(seed+1201,wx*.00072,wz*.00072,5);
        const shelf=signed(seed+2201,wx*.00135,wz*.00135,5);
        const detail=signed(seed+3201,wx*.0031,wz*.0031,4);
        const ridge=ridged(seed+4201,wx*.00105,wz*.00105,5);
        const river=Math.abs(signed(seed+5201,wx*.0022,wz*.0022,4));
        const riverStrength=clamp((.082-river)/.082,0,1);
        const lagoon=ridged(seed+6201,wx*.00145,wz*.00145,4);
        let landSignal=continent*.68+regional*.23+shelf*.07+detail*.02;
        if(archetype===0)landSignal=continent*.52+regional*.28+shelf*.16+detail*.04-.055; // takımadalar
        else if(archetype===1)landSignal=continent*.70+regional*.18-(lagoon-.5)*.22+shelf*.05+.025; // iç denizler
        else if(archetype===2)landSignal=continent*.61+regional*.18+(ridge-.5)*.18-shelf*.08; // fiyortlar
        else if(archetype===3)landSignal=continent*.74+regional*.14-(lagoon-.5)*.18+shelf*.04+.035; // göl zincirleri
        else if(archetype===4)landSignal=continent*.51+regional*.18+(ridge-.5)*.27+shelf*.04-.025; // örgülü kıtalar
        else if(archetype===5)landSignal=continent*.66+regional*.23+shelf*.08+detail*.03+.018; // yarımadalar
        else if(archetype===6)landSignal=continent*.72+regional*.17+(ridge-.5)*.13+shelf*.03+.04; // yüksekova
        else if(archetype===7)landSignal=continent*.70+regional*.20+shelf*.07+detail*.03+.03; // çiçek vadileri
        else if(archetype===8)landSignal=continent*.64+regional*.23-shelf*.05+(ridge-.5)*.08-.005; // fırtına kıyıları
        else if(archetype===9)landSignal=continent*.60+regional*.16-(.5-river)*.18+(lagoon-.5)*.09+.015; // su labirenti
        else if(archetype===10)landSignal=continent*.69+regional*.17+(ridge-.5)*.17+shelf*.03+.035; // dağ bahçeleri
        else if(archetype===11)landSignal=continent*.65+regional*.18+(lagoon-.5)*.14-river*.025+.025; // lagün kuşakları
        const landMask=smooth(clamp((landSignal+.09)/.24,0,1));
        const riverCut=landMask*Math.pow(riverStrength,1.35)*(1.05+lagoon*.55);
        const mountains=Math.pow(ridge,4.15)*landMask*(archetype===6||archetype===10?13.8:10.2);
        const rolling=(detail*.78+regional*.24)*landMask*1.75;
        const height=landSignal*9.4+mountains+rolling-riverCut*2.75;
        const moisture=clamp(fbm(seed+41041,wx*.00062,wz*.00062,5)*.72+lagoon*.28,0,1);
        const warmth=clamp(fbm(seed+51041,(wx+31000)*.00036,(wz-17000)*.00036,5),0,1);
        const arcana=clamp(ridged(seed+61041,wx*.00155,wz*.00155,4)*.70+fbm(seed+71041,wx*.00042,wz*.00042,4)*.30,0,1);
        return{height,moisture,warmth,arcana,ridge,river,riverStrength,lagoon,archetype,landSignal};
    };
    const surfaceSample=(seed,x,z)=>{
        const f=surfaceFields(seed,x,z),h=f.height,m=f.moisture,t=f.warmth,a=f.arcana,riverStrength=clamp(Number(f.riverStrength)||0,0,1);
        let biome,color,walkable=h>1.8,isWater=false;
        if(h<-5.2){biome="tatlı-su-okyanusu";color=palette.deepWater;walkable=false;isWater=true;}
        else if(h<-1.8){biome="tatlı-su-okyanusu";color=palette.ocean;walkable=false;isWater=true;}
        else if(h<.55){biome="tatlı-su-denizi";color=palette.water;walkable=false;isWater=true;}
        else if(h<1.8){biome="inci-sığlık";color=h<1.05?palette.lagoon:palette.shallows;walkable=false;isWater=true;}
        else if(riverStrength>.48&&h<9.6){biome=riverStrength>.78?"berrak-nehir":"ışıltılı-dere";color=riverStrength>.72?palette.water:palette.lagoon;walkable=riverStrength<.68;isWater=true;}
        else if(h>11.3){biome="kar-bahçesi";color=palette.snow;}
        else if(h>8.1){biome="gümüş-dağ";color=palette.mountain;}
        else if(h>5.7){biome=a>.73?"kristal-yüksekova":"dağ-bahçesi";color=a>.73?palette.crystal:palette.highland;}
        else if(t>.72&&m>.57){biome="tropik-sahil";color=palette.tropical;}
        else if(m>.78&&a>.62){biome="aeth-bahçesi";color=palette.lightGarden;}
        else if(m>.73){biome="canlı-orman";color=palette.deepForest;}
        else if(m>.57){biome=a>.70?"çiçek-vadisi":"kök-koruluğu";color=a>.70?palette.flower:palette.forest;}
        else if(t<.28){biome="fırtına-çayırı";color=palette.storm;}
        else if(a>.76){biome="çiçek-vadisi";color=palette.flower;}
        else{biome="yosun-terası";color=m>.42?palette.moss:palette.meadow;}
        const taxonomy=SURFACE_TAXONOMY?.classify?.(seed,x,z,f)||null;
        const signature=taxonomy?.signature||null;
        const signedHue=signature?((Number(signature.hue)||120)-120)*.12:0;
        const signedSat=signature?Number(signature.sat)||0:0;
        const signedLight=signature?Number(signature.light)||0:0;
        const interpretedColor=signature?rgbShift(color,signedHue,signedLight,signedSat):color;
        const variant=biomeVariation(seed,x,z,"surface",biome,interpretedColor);
        const riverWidthM=isWater&&riverStrength>.05?mix(1.2,34,Math.pow(riverStrength,1.45))*mix(.72,1.34,m):0;
        return{...f,...variant,taxonomyCode:taxonomy?.code||"",taxonomyName:taxonomy?.name||"",taxonomyRegionKey:taxonomy?.regionKey||"",taxonomy,walkable,water:isWater,freshwater:isWater,mudless:true,riverStrength,riverWidthM,layerKey:"surface"};
    };
    const skySample=(seed,x,z)=>{
        const w=warpCoordinates(seed+layerSalt("sky"),x,z,.00048,900),wx=w.x,wz=w.z;
        const cloud=fbm(seed+700101,wx*.00072,wz*.00072,5),islands=fbm(seed+700201,wx*.00155,wz*.00155,5),ridge=ridged(seed+700301,wx*.00105,wz*.00105,4),storm=fbm(seed+700401,wx*.00035,wz*.00035,5),light=ridged(seed+700501,wx*.0019,wz*.0019,4);
        const mask=islands*.72+ridge*.28-(cloud-.5)*.10;
        const height=(mask-.61)*18+ridge*4;
        let biome,color,walkable=mask>.61;
        if(!walkable){biome="bulut-denizi";color=cloud>.62?palette.cloud:palette.skyVoid;}
        else if(storm>.70){biome="fırtına-adası";color=palette.stormIsland;}
        else if(light>.72){biome="ışık-bahçesi";color=palette.lightGarden;}
        else if(cloud>.60){biome="gök-koruluğu";color=palette.skyForest;}
        else{biome="uçan-çayır";color=palette.skyMeadow;}
        const variant=biomeVariation(seed,x,z,"sky",biome,color);return{height,moisture:cloud,warmth:storm,arcana:light,ridge,river:0,lagoon:0,...variant,walkable,layerKey:"sky"};
    };
    const undergroundSample=(seed,x,z)=>{
        const s=seed+layerSalt("underground"),w=warpCoordinates(s,x,z,.00085,620),wx=w.x,wz=w.z;
        const chambers=fbm(s+101,wx*.00165,wz*.00165,5),tunnels=ridged(s+201,wx*.0032,wz*.0032,4),water=fbm(s+301,wx*.00115,wz*.00115,5),mineral=ridged(s+401,wx*.00245,wz*.00245,5),fungus=fbm(s+501,wx*.0019,wz*.0019,4);
        const riverField=Math.abs(signed(s+601,wx*.0028,wz*.0028,5)),cascade=ridged(s+701,wx*.0044,wz*.0044,4),stone=fbm(s+801,wx*.0011,wz*.0011,4),oreSelector=hash(s+901,Math.floor(wx/42),Math.floor(wz/42)),fungusSelector=hash(s+1001,Math.floor(wx/38),Math.floor(wz/38));
        const open=chambers*.74+tunnels*.26,walkable=open>.46,height=(open-.46)*8.5+mineral*1.7;
        const river=walkable&&riverField<.032&&water>.42,waterfall=river&&cascade>.78;
        let biome,color;
        if(!walkable){biome="kapalı-kaya";color=stone>.58?palette.darkRock:palette.caveVoid;}
        else if(waterfall){biome="yeraltı-şelalesi";color=palette.undergroundWater;}
        else if(river){biome="yeraltı-nehri";color=water>.68?palette.undergroundWater:palette.deepUndergroundWater;}
        else if(water>.84){biome="yeraltı-göleti";color=palette.undergroundWater;}
        else if(mineral>.86){
            if(oreSelector<.14){biome="bakır-damarı";color=palette.copper;}
            else if(oreSelector<.28){biome="demir-damarı";color=palette.iron;}
            else if(oreSelector<.40){biome="altın-damarı";color=palette.gold;}
            else if(oreSelector<.52){biome="gümüş-damarı";color=palette.silver;}
            else if(oreSelector<.68){biome="ametist-damarı";color=palette.amethyst;}
            else if(oreSelector<.82){biome="zümrüt-damarı";color=palette.emerald;}
            else{biome="safir-damarı";color=palette.sapphire;}
        }
        else if(fungus>.77){
            if(fungusSelector<.25){biome="yeşil-ışıklı-mantar-ormanı";color=palette.mushroom;}
            else if(fungusSelector<.5){biome="mor-ışıklı-mantar-ormanı";color=palette.mushroomViolet;}
            else if(fungusSelector<.75){biome="kehribar-ışıklı-mantar-ormanı";color=palette.mushroomAmber;}
            else{biome="camgöbeği-ışıklı-mantar-ormanı";color=palette.mushroomCyan;}
        }
        else if(chambers<.55){biome="kil-havzası";color=palette.clay;}
        else if(stone>.67){biome="kireçtaşı-odası";color=palette.limestone;}
        else if(mineral>.67){biome="mineral-teras";color=palette.mineral;}
        else{biome="derin-kaya-tüneli";color=stone>.48?palette.rock:palette.darkRock;}
        const variant=biomeVariation(seed,x,z,"underground",biome,color);return{height,moisture:water,warmth:fungus,arcana:mineral,ridge:tunnels,river:river?1:riverField,lagoon:0,...variant,walkable,layerKey:"underground"};
    };
    const sampleAt=(seed,x,z,layerKey="surface")=>{
        const layer=normalizedLayer(layerKey);
        return layer==="sky"?skySample(seed,x,z):layer==="underground"?undergroundSample(seed,x,z):surfaceSample(seed,x,z);
    };
    const terrainHeight=(seed,x,z,layerKey="surface")=>sampleAt(seed,x,z,layerKey).height;
    const moistureAt=(seed,x,z,layerKey="surface")=>sampleAt(seed,x,z,layerKey).moisture;
    const colorFor=(height,moisture,slope,layerKey="surface",seed=1,x=0,z=0)=>sampleAt(seed,x,z,layerKey).color.map(v=>v/255);

    class ChunkGenerator{
        constructor({seed=1,chunkSize=28,resolution=14,layerKey="surface"}={}){
            this.seed=Number(seed)||1;this.chunkSize=chunkSize;this.resolution=resolution;this.layerKey=normalizedLayer(layerKey);this.archetypeName=archetypeName(this.seed);this.cache=new Map();this.cacheLimit=18;
        }
        setLayer(layerKey){const next=normalizedLayer(layerKey);if(next===this.layerKey)return;this.layerKey=next;this.clearCache();}
        key(cx,cz){return`${this.layerKey}:${cx}:${cz}`;}
        sampleAt(x,z){return sampleAt(this.seed,x,z,this.layerKey);}
        heightAt(x,z){return this.sampleAt(x,z).height;}
        isWalkableAt(x,z){return !!this.sampleAt(x,z).walkable;}
        biomeAt(x,z){return this.sampleAt(x,z).biome;}
        colorAt(x,z){return this.sampleAt(x,z).color;}
        generate(cx,cz){
            const key=this.key(cx,cz),cached=this.cache.get(key);if(cached){this.cache.delete(key);this.cache.set(key,cached);return cached;}
            const size=this.chunkSize,res=this.resolution,step=size/res,stride=res+1,paddedStride=res+3;
            const heights=new Float32Array(paddedStride*paddedStride);
            for(let iz=-1;iz<=res+1;iz++)for(let ix=-1;ix<=res+1;ix++){const wx=cx*size+ix*step,wz=cz*size+iz*step;heights[(iz+1)*paddedStride+(ix+1)]=this.heightAt(wx,wz);}
            const vertexCount=stride*stride,vertices=new Float32Array(vertexCount*3),normals=new Float32Array(vertexCount*3),colors=new Float32Array(vertexCount*3),indices=new Uint16Array(res*res*6);let vertexOffset=0;
            for(let iz=0;iz<=res;iz++)for(let ix=0;ix<=res;ix++){
                const p=(iz+1)*paddedStride+(ix+1),h=heights[p],left=heights[p-1],right=heights[p+1],up=heights[p-paddedStride],down=heights[p+paddedStride];let nx=left-right,ny=step*2,nz=up-down,len=Math.hypot(nx,ny,nz)||1;nx/=len;ny/=len;nz/=len;
                const wx=cx*size+ix*step,wz=cz*size+iz*step,sample=this.sampleAt(wx,wz),color=sample.color.map(v=>v/255);
                vertices[vertexOffset]=ix*step;vertices[vertexOffset+1]=h;vertices[vertexOffset+2]=iz*step;normals[vertexOffset]=nx;normals[vertexOffset+1]=ny;normals[vertexOffset+2]=nz;colors[vertexOffset]=color[0];colors[vertexOffset+1]=color[1];colors[vertexOffset+2]=color[2];vertexOffset+=3;
            }
            let indexOffset=0;for(let iz=0;iz<res;iz++)for(let ix=0;ix<res;ix++){const a=iz*stride+ix,b=a+1,c=a+stride,d=c+1;indices[indexOffset++]=a;indices[indexOffset++]=c;indices[indexOffset++]=b;indices[indexOffset++]=b;indices[indexOffset++]=c;indices[indexOffset++]=d;}
            const chunk={key,cx,cz,size,resolution:res,vertices,normals,colors,indices,layerKey:this.layerKey,archetype:archetypeName(this.seed)};this.cache.set(key,chunk);while(this.cache.size>this.cacheLimit)this.cache.delete(this.cache.keys().next().value);return chunk;
        }
        clearCache(){this.cache.clear();}
    }
    window.AlekrythaeWorldMap={...(window.AlekrythaeWorldMap||{}),ChunkGenerator,terrainHeight,moistureAt,colorFor,sampleAt,archetypeName,profile:PROFILE,surfaceThemes:SURFACE_THEME_PROFILES,resolveThemeId};
})();
