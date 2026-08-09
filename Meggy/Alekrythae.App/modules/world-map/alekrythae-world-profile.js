(function installAlekrythaeWorldLoreProfile(){
    "use strict";
    const profile={
        id:"alekrythae-24th-planet",
        version:4,
        displayName:"Yirmi Dört'ün Gezegeni",
        laws:{
            noDesert:true,
            surfaceWaterCoverage:.50,
            allSurfaceWaterFreshAndDrinkable:true,
            soilAndWaterDoNotBecomeMud:true,
            biomesAreNotBoundToLatitude:true,
            landscapeBias:"beautiful-livable-varied",
            language:"Aꬲæŀɇꞎʏł’Qʏħʉŷɍɨř"
        },

        biomeVariationEngine:{
            mode:"combinatorial-lore-biomes",
            axes:{
                landform:["teras","oyuk","sırt","havza","örgü","halka","yarık","vadi","plato","adacık","kıyı","bahçe"],
                flora:["çiçekli","yosunlu","kök-ağlı","meyveli","ışıltılı","ipeksi","kristal-yapraklı","sarmaşıklı","dev-yapraklı","su-çiçekli","sis-otlu","minik-dostlu"],
                water:["pınarlı","göllü","nehirli","şelaleli","lagünlü","kanallı","damarlı","kaynaklı","inci-sığlıklı","akıntılı","sis-sulu","tatlı-okyanuslu"],
                atmosphere:["mavi-aylı","gümüş-sisli","renkli-bulutlu","fırtına-yüklü","ışık-kırılmalı","yıldız-görülü","sakin","rüzgâr-örgülü","gök-cisimli","auralı","parıltılı","derin-gölgeli"],
                arcana:["düşük-rezonanslı","damar-rezonanslı","kristal-rezonanslı","çiçek-rezonanslı","su-rezonanslı","kök-rezonanslı","fırtına-rezonanslı","mühürlü","dalgalı","yüksek-rezonanslı","uyumlu","değişken"],
                light:["şafak","gün-ışığı","mavi-ay","alacakaranlık","gümüş","turkuaz","zümrüt","mor","kehribar","camgöbeği","yıldız","çok-katmanlı"]
            },
            theoreticalCombinations:2985984,
            rule:"Temel biyom, altı bağımsız lore ekseninin birleşimiyle çeşitlenir; çöl üretilmez."
        },
        layers:{
            surface:{
                key:"surface",
                label:"Yerküre",
                badge:"Yerküre · Tatlı su okyanusları · Yaşayan coğrafya",
                biomes:[
                    "tatlı-su-okyanusu","inci-sığlık","lagün-kıyısı","canlı-orman","çiçek-vadisi",
                    "yosun-terası","kök-koruluğu","tropik-sahil","meyve-ormanı","fırtına-çayırı",
                    "kristal-yüksekova","gümüş-dağ","kar-bahçesi","aeth-bahçesi","sulak-yeşil-havza"
                ]
            },
            sky:{
                key:"sky",
                label:"Uçan Ada",
                badge:"Uçan Ada · Bulut denizleri · Fırtına yolları",
                biomes:["bulut-denizi","uçan-çayır","gök-koruluğu","fırtına-adası","ışık-bahçesi","balina-yolu"]
            },
            underground:{
                key:"underground",
                label:"Yeraltı",
                badge:"Yeraltı · Kaya ve toprak tünelleri · Madenler · Nehirler · Işıklı mantarlar",
                biomes:["derin-kaya-tüneli","kil-havzası","kireçtaşı-odası","yeraltı-nehri","yeraltı-şelalesi","yeraltı-göleti","bakır-damarı","demir-damarı","altın-damarı","gümüş-damarı","ametist-damarı","zümrüt-damarı","safir-damarı","yeşil-ışıklı-mantar-ormanı","mor-ışıklı-mantar-ormanı","kehribar-ışıklı-mantar-ormanı","camgöbeği-ışıklı-mantar-ormanı","mineral-teras"]
            }
        },
        archetypes:[
            "takımada-denizleri","iç-denizler","fiyort-kıyıları","göl-zincirleri","örgülü-kıtalar","yeşil-yarımadalar",
            "kristal-yüksekovalar","çiçek-vadileri","fırtına-kıyıları","tatlı-su-labirenti","dağ-bahçeleri","lagün-kuşakları"
        ]
    };
    window.AlekrythaeWorldLoreProfile=Object.freeze(profile);
})();
