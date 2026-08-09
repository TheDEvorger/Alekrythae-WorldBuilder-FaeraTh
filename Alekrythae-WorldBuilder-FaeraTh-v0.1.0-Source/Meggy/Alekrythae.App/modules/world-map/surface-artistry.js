(function installSurfaceArtistry(){
    "use strict";

    const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
    const mix=(a,b,t)=>a+(b-a)*t;
    const hash01=(seed,x,z,salt=0)=>{
        let h=(Number(seed)||1)^Math.imul((x|0)+salt,374761393)^Math.imul((z|0)-salt,668265263);
        h=Math.imul(h^(h>>>13),1274126177);
        return((h^(h>>>16))>>>0)/4294967295;
    };
    const rgb=(color,factor=1,offset=0)=>{
        const source=Array.isArray(color)?color:[65,153,83];
        return source.map(value=>Math.round(clamp(Number(value)*factor+offset,0,255)));
    };
    const css=color=>`rgb(${color[0]},${color[1]},${color[2]})`;

    function fallbackTile({generator,sampleWorld,tx,tz,size,worldSize:requestedWorldSize}){
        const canvas=document.createElement("canvas");canvas.width=size;canvas.height=size;
        const ctx=canvas.getContext("2d",{alpha:false}),image=ctx.createImageData(size,size),data=image.data;
        const worldSize=Number(requestedWorldSize)||size*sampleWorld,baseX=tx*worldSize,baseZ=tz*worldSize;
        sampleWorld=worldSize/size;
        let p=0;
        for(let y=0;y<size;y++)for(let x=0;x<size;x++){
            const sample=generator.sampleAt(baseX+(x+.5)*sampleWorld,baseZ+(y+.5)*sampleWorld),color=sample?.color||[65,153,83];
            data[p++]=color[0];data[p++]=color[1];data[p++]=color[2];data[p++]=255;
        }
        ctx.putImageData(image,0,0);
        return{canvas,worldSize,baseX,baseZ};
    }

    function vegetationPalette(sample){
        const process=Number(sample?.taxonomy?.processIndex),signature=Number(sample?.taxonomy?.signatureIndex),base=sample?.color||[46,132,73];
        const frost=process===4||signature===14;
        const twilight=process===6||signature===1||signature===2||signature===6||signature===23;
        const blossom=signature===8||signature===16||process===3;
        if(frost)return{dark:[94,121,128],mid:[169,194,194],light:[231,243,239],trunk:[101,91,76],frost:true,twilight:false,blossom:false};
        if(twilight)return{dark:rgb(base,.34,-12),mid:rgb(base,.58,-7),light:rgb(base,.84,1),trunk:[56,45,42],frost:false,twilight:true,blossom:false};
        if(blossom)return{dark:rgb(base,.48,-7),mid:rgb(base,.76,1),light:rgb(base,1.06,10),trunk:[93,68,48],frost:false,twilight:false,blossom:true};
        return{dark:rgb(base,.48,-8),mid:rgb(base,.76,0),light:rgb(base,1.08,6),trunk:[78,62,43],frost:false,twilight:false,blossom:false};
    }

    function broadleaf(ctx,x,y,r,palette,seedValue,{giant=false}={}){
        const shadowAlpha=palette.twilight?.43:.29;
        ctx.save();ctx.imageSmoothingEnabled=false;
        ctx.fillStyle=`rgba(0,7,9,${shadowAlpha})`;ctx.beginPath();ctx.ellipse(Math.round(x+r*.24),Math.round(y+r*.27),Math.max(.45,r*.92),Math.max(.4,r*.68),0,0,Math.PI*2);ctx.fill();
        const lobes=giant?11:6;
        for(let i=0;i<lobes;i++){
            const angle=(i/lobes)*Math.PI*2+seedValue*2.3,radial=r*(giant?.38:.29),lr=r*(giant?.50:.46)*(0.84+hash01(91,i,Math.floor(seedValue*999),7)*.30);
            ctx.fillStyle=css(i%4===0?palette.dark:i%3===0?palette.light:palette.mid);ctx.beginPath();ctx.arc(Math.round(x+Math.cos(angle)*radial),Math.round(y+Math.sin(angle)*radial),Math.max(.45,lr),0,Math.PI*2);ctx.fill();
        }
        ctx.fillStyle=css(palette.mid);ctx.beginPath();ctx.arc(Math.round(x),Math.round(y),Math.max(.5,r*.58),0,Math.PI*2);ctx.fill();
        ctx.fillStyle=css(palette.light);ctx.beginPath();ctx.ellipse(Math.round(x-r*.17),Math.round(y-r*.24),Math.max(.4,r*.20),Math.max(.35,r*.13),-.4,0,Math.PI*2);ctx.fill();
        if(palette.blossom&&r>1.2){
            const bloom=["#f3a8ce","#d9c2ff","#fff0a6"];
            for(let i=0;i<(giant?9:3);i++){const a=hash01(711,i,Math.floor(seedValue*10000),13)*Math.PI*2,rr=r*(.18+hash01(719,i,33,19)*.56);ctx.fillStyle=bloom[i%bloom.length];ctx.fillRect(Math.round(x+Math.cos(a)*rr),Math.round(y+Math.sin(a)*rr),Math.max(1,Math.round(r*.055)),Math.max(1,Math.round(r*.055)));}
        }
        if(giant){
            // Önceki uzun ışın kökler kaldırıldı. Dev ağaç zemine kısa ve ağır
            // gölgelerle bağlanır; uzaktan güneş şekline dönüşmez.
            ctx.strokeStyle=css(rgb(palette.trunk,.58,-8));ctx.lineWidth=Math.max(1,r*.075);ctx.lineCap="round";
            for(let i=0;i<4;i++){const angle=i/4*Math.PI*2+seedValue*.7,len=r*(.55+hash01(733,i,17,23)*.32);ctx.beginPath();ctx.moveTo(x+Math.cos(angle)*r*.08,y+Math.sin(angle)*r*.08);ctx.lineTo(x+Math.cos(angle)*len,y+Math.sin(angle)*len);ctx.stroke();}
            ctx.fillStyle=css(palette.trunk);ctx.beginPath();ctx.arc(Math.round(x),Math.round(y),Math.max(1,r*.12),0,Math.PI*2);ctx.fill();
            ctx.strokeStyle=palette.frost?"rgba(239,250,250,.58)":"rgba(229,204,126,.34)";ctx.lineWidth=Math.max(1,r*.022);ctx.beginPath();ctx.arc(x,y,r*.72,0,Math.PI*2);ctx.stroke();
        }
        ctx.restore();
    }

    function conifer(ctx,x,y,r,palette,seedValue){
        ctx.save();ctx.imageSmoothingEnabled=false;
        ctx.fillStyle="rgba(0,5,10,.31)";ctx.beginPath();ctx.ellipse(x+r*.20,y+r*.30,Math.max(.45,r*.55),Math.max(.35,r*.30),0,0,Math.PI*2);ctx.fill();
        const layers=3;
        for(let i=0;i<layers;i++){
            const width=r*(.92-i*.18),top=y-r*(.78-i*.40),bottom=y+r*(.38-i*.12);
            ctx.fillStyle=css(i===0?palette.dark:i===1?palette.mid:palette.light);ctx.beginPath();ctx.moveTo(x,top);ctx.lineTo(x-width,bottom);ctx.lineTo(x+width,bottom);ctx.closePath();ctx.fill();
        }
        ctx.fillStyle=css(palette.trunk);ctx.fillRect(Math.round(x-r*.07),Math.round(y+r*.22),Math.max(1,r*.14),Math.max(1,r*.42));
        if(palette.frost){ctx.strokeStyle="rgba(248,255,255,.77)";ctx.lineWidth=Math.max(.6,r*.07);ctx.beginPath();ctx.moveTo(x,y-r*.69);ctx.lineTo(x-r*.64,y+r*.22);ctx.moveTo(x,y-r*.31);ctx.lineTo(x+r*.60,y+r*.24);ctx.stroke();}
        ctx.restore();
    }

    function shrub(ctx,x,y,r,palette,seedValue){
        ctx.save();ctx.fillStyle="rgba(0,7,9,.22)";ctx.beginPath();ctx.ellipse(x+r*.14,y+r*.22,r*.82,r*.50,0,0,Math.PI*2);ctx.fill();
        for(let i=0;i<4;i++){const angle=i/4*Math.PI*2+seedValue*3.1;ctx.fillStyle=css(i===0?palette.light:i===2?palette.dark:palette.mid);ctx.beginPath();ctx.arc(x+Math.cos(angle)*r*.30,y+Math.sin(angle)*r*.18,Math.max(.4,r*.45),0,Math.PI*2);ctx.fill();}
        ctx.restore();
    }

    function drawVegetation(ctx,{generator,seed,sampleWorld,baseX,baseZ,worldSize,size}){
        if(sampleWorld>40)return;
        const detail=sampleWorld<=3?1:sampleWorld<=11?2:3;
        const cellWorld=detail===1?14:detail===2?42:125;
        const minCX=Math.floor(baseX/cellWorld)-1,maxCX=Math.ceil((baseX+worldSize)/cellWorld)+1,minCZ=Math.floor(baseZ/cellWorld)-1,maxCZ=Math.ceil((baseZ+worldSize)/cellWorld)+1;
        for(let cz=minCZ;cz<=maxCZ;cz++)for(let cx=minCX;cx<=maxCX;cx++){
            const h=hash01(seed,cx,cz,701),jitterX=(hash01(seed,cx,cz,709)-.5)*cellWorld*.74,jitterZ=(hash01(seed,cx,cz,719)-.5)*cellWorld*.74;
            const wx=(cx+.5)*cellWorld+jitterX,wz=(cz+.5)*cellWorld+jitterZ;
            if(wx<baseX-cellWorld||wx>baseX+worldSize+cellWorld||wz<baseZ-cellWorld||wz>baseZ+worldSize+cellWorld)continue;
            const sample=generator.sampleAt(wx,wz);if(!sample?.walkable||sample.water)continue;
            const cover=Number(sample.taxonomy?.coverIndex),process=Number(sample.taxonomy?.processIndex),signature=Number(sample.taxonomy?.signatureIndex),moisture=clamp(Number(sample.moisture)||0,0,1);
            const densityByCover=[.22,.34,.50,.60,.74,.91,.96,.80,.87,.55];
            let density=(densityByCover[cover]??.38)*mix(.82,1.12,moisture);
            if(process===4)density*=.88; // Kar bölgeleri canlı kalır, fakat açık nefes cepleri de vardır.
            if(process===6)density=Math.min(.99,density*1.10);
            if(h>density)continue;
            const grove=cover>=5||cover===8,clusterCount=detail===3?1:grove?(h<density*.45?3:2):cover>=2&&h<density*.35?2:1;
            const palette=vegetationPalette(sample);
            for(let n=0;n<clusterCount;n++){
                const angle=hash01(seed,cx*7+n,cz*11-n,743)*Math.PI*2,spread=clusterCount===1?0:cellWorld*(.10+hash01(seed,cx+n,cz-n,751)*.18);
                const twx=wx+Math.cos(angle)*spread,twz=wz+Math.sin(angle)*spread,px=(twx-baseX)/sampleWorld,py=(twz-baseZ)/sampleWorld;
                if(px<-12||py<-12||px>size+12||py>size+12)continue;
                const ordinaryRadiusM=cover<=2?mix(1.1,2.6,hash01(seed,cx+n,cz,761)):cover===3?mix(1.8,3.8,hash01(seed,cx,cz+n,769)):mix(2.8,6.2,hash01(seed,cx+n,cz-n,773));
                const aggregateRadiusM=detail===1?ordinaryRadiusM:detail===2?ordinaryRadiusM*2.1:ordinaryRadiusM*5.2;
                const r=clamp(aggregateRadiusM/sampleWorld,.55,detail===1?8:6);
                if(cover<=2)shrub(ctx,px,py,r,palette,h+n*.13);
                else if(palette.frost||cover===3||signature===14)conifer(ctx,px,py,r,palette,h+n*.17);
                else broadleaf(ctx,px,py,r,palette,h+n*.19,{giant:false});
                if(signature===21&&detail===1){ctx.strokeStyle="rgba(211,183,83,.26)";ctx.lineWidth=.7;ctx.beginPath();ctx.arc(Math.round(px),Math.round(py),Math.max(1.5,r*1.16),0,Math.PI*2);ctx.stroke();}
            }
        }

        if(sampleWorld<=13){
            const flowerCell=detail===1?9:30,minFX=Math.floor(baseX/flowerCell)-1,maxFX=Math.ceil((baseX+worldSize)/flowerCell)+1,minFZ=Math.floor(baseZ/flowerCell)-1,maxFZ=Math.ceil((baseZ+worldSize)/flowerCell)+1;
            for(let cz=minFZ;cz<=maxFZ;cz++)for(let cx=minFX;cx<=maxFX;cx++){
                const wx=(cx+.5)*flowerCell+(hash01(seed,cx,cz,811)-.5)*flowerCell*.75,wz=(cz+.5)*flowerCell+(hash01(seed,cx,cz,821)-.5)*flowerCell*.75;
                const sample=generator.sampleAt(wx,wz);if(!sample?.walkable||sample.water)continue;
                const cover=Number(sample.taxonomy?.coverIndex),process=Number(sample.taxonomy?.processIndex),signature=Number(sample.taxonomy?.signatureIndex);
                const chance=process===4?.20:cover===1?.78:signature===16?.58:cover===0?.26:cover===2?.18:.08;
                if(hash01(seed,cx,cz,829)>chance)continue;
                const x=Math.round((wx-baseX)/sampleWorld),y=Math.round((wz-baseZ)/sampleWorld);if(x<0||y<0||x>=size||y>=size)continue;
                const colors=process===4?["#f8ffff","#bed9dd","#d8e9ff"]:signature===1?["#d7e5ff","#8b73d6","#8f4361"]:signature===16?["#ff90d0","#9fdcff","#ffe17b"]:["#f2d77d","#d28bdd","#8bd7c1"];
                ctx.fillStyle=colors[Math.floor(hash01(seed,cx,cz,839)*colors.length)%colors.length];ctx.fillRect(x,y,detail===1?2:1,detail===1?2:1);
            }
        }
    }

    function drawMacroFeatures(ctx,{generator,seed,sampleWorld,baseX,baseZ,worldSize,size,samples,stride}){
        if(sampleWorld>64)return;
        const macro=1500,minX=Math.floor(baseX/macro)-1,maxX=Math.ceil((baseX+worldSize)/macro)+1,minZ=Math.floor(baseZ/macro)-1,maxZ=Math.ceil((baseZ+worldSize)/macro)+1;
        for(let cz=minZ;cz<=maxZ;cz++)for(let cx=minX;cx<=maxX;cx++){
            const wx=(cx+.5)*macro+(hash01(seed,cx,cz,1201)-.5)*macro*.64,wz=(cz+.5)*macro+(hash01(seed,cx,cz,1213)-.5)*macro*.64,sample=generator.sampleAt(wx,wz);if(!sample?.walkable)continue;
            const surface=Number(sample.taxonomy?.surfaceIndex),cover=Number(sample.taxonomy?.coverIndex),signature=Number(sample.taxonomy?.signatureIndex),roll=hash01(seed,cx,cz,1223);
            const px=(wx-baseX)/sampleWorld,py=(wz-baseZ)/sampleWorld;if(px<-180||py<-180||px>size+180||py>size+180)continue;
            if((cover===7||signature===21)&&roll<.42){
                const radiusM=36+hash01(seed,cx,cz,1237)*78,r=clamp(radiusM/sampleWorld,3,92);broadleaf(ctx,px,py,r,vegetationPalette(sample),roll,{giant:true});
            }
            if((surface===4||signature===18)&&roll>.82){
                const radiusM=55+hash01(seed,cx,cz,1249)*125,r=clamp(radiusM/sampleWorld,3,86);
                ctx.save();ctx.strokeStyle="rgba(148,192,180,.30)";ctx.lineWidth=Math.max(.8,r*.055);for(let ring=1;ring<=2;ring++){ctx.beginPath();ctx.ellipse(px,py,r*(1.02-ring*.17),r*(.74-ring*.11),-.18,0,Math.PI*2);ctx.stroke();}
                const g=ctx.createRadialGradient(px-r*.18,py-r*.18,Math.max(1,r*.08),px,py,r*.70);g.addColorStop(0,"rgba(24,50,51,.35)");g.addColorStop(.56,"rgba(5,20,24,.76)");g.addColorStop(1,"rgba(0,3,6,.95)");ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(px,py,r*.56,r*.38,-.18,0,Math.PI*2);ctx.fill();ctx.restore();
            }
        }

        if(sampleWorld>10)return;
        const spacing=5;
        for(let y=spacing;y<size-spacing;y+=spacing)for(let x=spacing;x<size-spacing;x+=spacing){
            const index=(y+1)*stride+(x+1),sample=samples[index];if(!sample?.water||Number(sample.riverStrength)<.46)continue;
            const left=samples[index-1],right=samples[index+1],up=samples[index-stride],down=samples[index+stride];
            const dx=(Number(right?.height)-Number(left?.height))/(2*sampleWorld),dz=(Number(down?.height)-Number(up?.height))/(2*sampleWorld),slope=Math.hypot(dx,dz);
            if(slope<.13||hash01(seed,Math.floor((baseX+x*sampleWorld)/16),Math.floor((baseZ+y*sampleWorld)/16),1301)>.32)continue;
            const len=clamp(5+slope*14,5,13),mag=Math.hypot(dx,dz)||1,fx=-dx/mag,fz=-dz/mag;
            ctx.save();ctx.strokeStyle="rgba(225,250,255,.92)";ctx.lineWidth=1;ctx.lineCap="round";for(let i=-1;i<=1;i++){ctx.beginPath();ctx.moveTo(x-fx*len*.45-fz*i*1.7,y-fz*len*.45+fx*i*1.7);ctx.lineTo(x+fx*len*.45-fz*i*1.7,y+fz*len*.45+fx*i*1.7);ctx.stroke();}ctx.fillStyle="rgba(229,252,255,.72)";ctx.fillRect(Math.round(x-2),Math.round(y+2),5,1);ctx.restore();
        }
    }

    function drawReliefMarks(ctx,{generator,sampleWorld,baseX,baseZ,size,samples,heights,stride}){
        if(sampleWorld>22)return;
        ctx.save();ctx.lineCap="round";
        const step=sampleWorld<=4?5:7;
        for(let y=step;y<size-step;y+=step)for(let x=step;x<size-step;x+=step){
            const index=(y+1)*stride+(x+1),sample=samples[index];if(!sample||sample.water)continue;
            const dx=(heights[index+1]-heights[index-1])/(2*Math.max(.001,sampleWorld)),dz=(heights[index+stride]-heights[index-stride])/(2*Math.max(.001,sampleWorld)),slope=Math.hypot(dx,dz);
            if(slope<.28)continue;
            const h=hash01(generator.seed,Math.floor((baseX+x*sampleWorld)/18),Math.floor((baseZ+y*sampleWorld)/18),1601);if(h>.42)continue;
            const mag=slope||1,nx=-dz/mag,ny=dx/mag,len=clamp(2+slope*4,2,5);
            const frost=Number(sample.taxonomy?.processIndex)===4||Number(sample.taxonomy?.signatureIndex)===14;
            ctx.strokeStyle=frost?"rgba(244,253,253,.58)":"rgba(15,34,25,.31)";ctx.lineWidth=frost?.8:1;
            ctx.beginPath();ctx.moveTo(x-nx*len,y-ny*len);ctx.lineTo(x+nx*len,y+ny*len);ctx.stroke();
        }
        ctx.restore();
    }


    // Uzak ölçekte tek tek ağaç çizmek yerine ormanın kütlesi korunur. Böylece
    // aynı coğrafya verisi yaşamaya devam eder, fakat ekran ve işlemci binlerce
    // küçük tacı çizmek zorunda kalmaz.
    function drawCanopyMasses(ctx,{generator,seed,sampleWorld,baseX,baseZ,worldSize,size,detailTier}){
        const step=detailTier>=3?8:7;
        ctx.save();ctx.imageSmoothingEnabled=true;
        for(let y=step/2;y<size;y+=step)for(let x=step/2;x<size;x+=step){
            const wx=baseX+x*sampleWorld,wz=baseZ+y*sampleWorld,sample=generator.sampleAt(wx,wz);
            if(!sample?.walkable||sample.water)continue;
            const cover=Number(sample.taxonomy?.coverIndex),moisture=clamp(Number(sample.moisture)||0,0,1),density=clamp((cover/9)*.72+moisture*.34,0,1);
            if(hash01(seed,Math.floor(wx/Math.max(24,sampleWorld*step)),Math.floor(wz/Math.max(24,sampleWorld*step)),1801)>density)continue;
            const palette=vegetationPalette(sample),jitter=(hash01(seed,Math.floor(wx),Math.floor(wz),1811)-.5)*step*.45,r=detailTier>=3?1.5+3*density:2+4.5*density;
            ctx.globalAlpha=detailTier>=3?.22+.18*density:.28+.24*density;
            ctx.fillStyle=css(palette.dark);ctx.beginPath();ctx.ellipse(x+jitter,y-jitter*.35,r*1.45,r*.86,-.18,0,Math.PI*2);ctx.fill();
            ctx.globalAlpha*=.72;ctx.fillStyle=css(palette.mid);ctx.beginPath();ctx.ellipse(x-r*.22,y-r*.18,r*.92,r*.56,-.18,0,Math.PI*2);ctx.fill();
        }
        ctx.restore();
    }

    // Animasyon yoktur. Uzak ve kenar karolarında birkaç sabit ışık/toz izi,
    // düşük çözünürlüklü yüzeyin bilinçli bir atmosfer katmanı gibi görünmesini sağlar.
    function drawAtmosphereParticles(ctx,{generator,seed,sampleWorld,baseX,baseZ,size,detailTier}){
        if(detailTier<2)return;
        const count=Math.max(8,Math.round(size*(detailTier>=3?.42:.62)));
        ctx.save();ctx.imageSmoothingEnabled=true;
        for(let i=0;i<count;i++){
            const x=hash01(seed,i+Math.floor(baseX/sampleWorld),Math.floor(baseZ/sampleWorld),1901)*size,y=hash01(seed,i+Math.floor(baseZ/sampleWorld),Math.floor(baseX/sampleWorld),1913)*size;
            const sample=generator.sampleAt(baseX+x*sampleWorld,baseZ+y*sampleWorld),frost=Number(sample?.taxonomy?.processIndex)===4||Number(sample?.taxonomy?.signatureIndex)===14;
            const alpha=(detailTier>=3?.10:.14)+hash01(seed,i,31,1931)*.10,r=detailTier>=3?.55+hash01(seed,i,37,1949)*.75:.7+hash01(seed,i,41,1951)*1.15;
            ctx.globalAlpha=alpha;ctx.fillStyle=frost?"#f4ffff":sample?.water?"#b9f1ff":"#d8efcf";ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();
        }
        ctx.restore();
    }

    function renderSurfaceTile({generator,sampleWorld,tx,tz,size=128,detailTier=0,worldSize:requestedWorldSize}){
        const canvas=document.createElement("canvas");canvas.width=size;canvas.height=size;
        const ctx=canvas.getContext("2d",{alpha:false}),stride=size+2,samples=new Array(stride*stride),heights=new Float32Array(stride*stride);
        const worldSize=Number(requestedWorldSize)||size*sampleWorld,baseX=tx*worldSize,baseZ=tz*worldSize;
        sampleWorld=worldSize/size;
        for(let gy=0;gy<stride;gy++)for(let gx=0;gx<stride;gx++){
            const wx=baseX+(gx-.5)*sampleWorld,wz=baseZ+(gy-.5)*sampleWorld,sample=generator.sampleAt(wx,wz);samples[gy*stride+gx]=sample;heights[gy*stride+gx]=Number(sample?.height)||0;
        }
        const image=ctx.createImageData(size,size),data=image.data,contourStep=sampleWorld<=4?1.6:sampleWorld<=12?2.7:5.4;
        let p=0;
        for(let y=0;y<size;y++)for(let x=0;x<size;x++){
            const index=(y+1)*stride+(x+1),sample=samples[index]||{},h=heights[index],dx=(heights[index+1]-heights[index-1])/(2*Math.max(.0001,sampleWorld)),dz=(heights[index+stride]-heights[index-stride])/(2*Math.max(.0001,sampleWorld));
            const nx=-dx,ny=1.62,nz=-dz,norm=Math.hypot(nx,ny,nz)||1,dot=(nx*.43+ny*.76+nz*.49)/norm,slope=Math.hypot(dx,dz);
            let factor=detailTier>=2?clamp(.84+dot*.24,.72,1.14):clamp(.76+dot*.38,0.62,1.22),offset=0;
            if(sample.water){const wave=detailTier>=2?0:Math.sin((baseX+x*sampleWorld)*.034+(baseZ+y*sampleWorld)*.019)+Math.sin((baseX+x*sampleWorld)*.011-(baseZ+y*sampleWorld)*.027);factor*=1.01+wave*.022;offset+=detailTier>=2?3:5;}
            else{
                // Uzak LOD'da mikroskobik konturlar tamamen gizlenir. Arazi verisi
                // değişmez; yalnız ekranda toplu renk ve yükseklik kütlesi kalır.
                if(detailTier<=1&&sampleWorld>=5){const contour=Math.floor(h/contourStep),leftContour=Math.floor(heights[index-1]/contourStep),upContour=Math.floor(heights[index-stride]/contourStep);if(contour!==leftContour||contour!==upContour)factor*=.94;}
                if(slope>.24)factor*=clamp(1-(slope-.24)*(detailTier>=2?.06:.12),.72,1);
            }
            const grain=(hash01(generator.seed,Math.floor((baseX+x*sampleWorld)/Math.max(.5,sampleWorld)),Math.floor((baseZ+y*sampleWorld)/Math.max(.5,sampleWorld)),1409)-.5)*(detailTier>=2?.8:sampleWorld<=4?5:2.4);
            const color=rgb(sample.color||[65,153,83],factor,offset+grain);
            data[p++]=color[0];data[p++]=color[1];data[p++]=color[2];data[p++]=255;
        }
        ctx.putImageData(image,0,0);ctx.imageSmoothingEnabled=false;

        if(detailTier<=1&&sampleWorld<=16){
            ctx.save();ctx.globalAlpha=.32;ctx.strokeStyle="#d8f8ff";ctx.lineWidth=1;
            for(let y=3;y<size-3;y+=4)for(let x=3;x<size-3;x+=4){const sample=samples[(y+1)*stride+(x+1)];if(!sample?.water)continue;const strength=Number(sample.riverStrength)||0;if(strength<.18&&hash01(generator.seed,x+tx*size,y+tz*size,1501)>.18)continue;const phase=hash01(generator.seed,x+tx*size,y+tz*size,1511),len=strength>.45?3:2;ctx.beginPath();ctx.moveTo(x-len,y+phase*2);ctx.lineTo(x+len,y-1+phase*2);ctx.stroke();}
            ctx.restore();
        }
        if(detailTier<=1){
            drawReliefMarks(ctx,{generator,sampleWorld,baseX,baseZ,size,samples,heights,stride});
            drawVegetation(ctx,{generator,seed:generator.seed,sampleWorld,baseX,baseZ,worldSize,size});
            drawMacroFeatures(ctx,{generator,seed:generator.seed,sampleWorld,baseX,baseZ,worldSize,size,samples,stride});
        }else{
            drawCanopyMasses(ctx,{generator,seed:generator.seed,sampleWorld,baseX,baseZ,worldSize,size,detailTier});
            drawAtmosphereParticles(ctx,{generator,seed:generator.seed,sampleWorld,baseX,baseZ,size,detailTier});
        }
        return{canvas,worldSize,baseX,baseZ};
    }

    function renderTile(options){
        if(!options?.generator)return null;
        return options.layerKey==="surface"?renderSurfaceTile(options):fallbackTile(options);
    }

    window.AlekrythaeSurfaceArtistry=Object.freeze({version:"surface-artistry-r48-adaptive-lod",renderTile});
})();
