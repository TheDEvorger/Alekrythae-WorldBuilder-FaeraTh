# Ałek’ryŧhæ World Builder & Færa’Th

> **World-building, yapılandırılmış bilgi, yazı, görsel planlama, odak ve AI destekli çalışma için yerel-öncelikli Windows çalışma ortamı.**

**Ałek’ryŧhæ World Builder & Færa’Th**, **Ałek’ryŧhæ Core** üzerinden çalışan bir `.alek` masaüstü uygulamasıdır.

Uygulama, world-builder mantığını günlük gerçek çalışma araçlarıyla aynı ortamda birleştirir. Lore ile bilgini düzenleyebilir, Reverie ile uzun metinler yazabilir, Cartographer’s Table üzerinde görsel çalışabilir, takvim notlarını tutabilir, odak araçlarını kullanabilir, AI çalışma alanını açabilir ve kişisel kayıtlarını public kaynak koduna karıştırmadan uyumlu sürümler arasında taşıyabilirsin.

**Mevcut sürüm:** `v0.1.1`  
**Platform:** Windows 10 / 11  
**Runtime:** Uyumlu Ałek’ryŧhæ Core kurulumu  
**Veri yaklaşımı:** Local-first / yerel-öncelikli

> **İlk kez mi açıyorsun?** Core'u kur, `Alekrythae.cmd` dosyasını çalıştır, Mavi Ay'a tıkla ve ardından **F1**'e bas. Uygulamayı anlamanın en kısa yolu bu.

---

## 1. Bu uygulama tam olarak nedir?

Bu proje yalnızca bir not uygulaması değildir. Yalnızca fantastik evren hazırlamak için yapılmış bir world-builder da değildir.

Birbirine bağlı birkaç çalışma yüzeyini aynı uygulamada toplar:

| Yüzey | Ne için kullanılır? |
|---|---|
| **Mavi Ay / Odak Merkezi** | Pomodoro benzeri odak döngüleri, kronometre, zamanlayıcı, çalışma sistemleri ve olumlama |
| **Takvim** | Gerçek dünya takvim notları ve bütün notları kronolojik inceleme |
| **Lore** | Hiyerarşik bilgi, araştırma, evren dokümantasyonu ve referans arşivi |
| **Reverie** | Uzun yazılar, günlük/hikâye kayıtları, kapaklar ve metin içi görseller |
| **Cartographer’s Table (CT)** | 2D çizim, görsel yerleştirme, görsel planlama, diyagram ve harita benzeri çalışma |
| **Tide** | Bağlantı/ilişki odaklı eşlik eden 2D çalışma yüzeyi |
| **Harmonizer** | Ses ve atmosfer kontrolleri |
| **AI** | Core/Edge entegrasyonu üzerinden açılan ChatGPT çalışma alanı |

Bütün yüzeyleri kullanmak zorunda değilsin. Uygulamayı yalnızca world-builder, çalışma defteri, ders notu sistemi, yazı ortamı, görsel pano veya bunların karışımı olarak kullanabilirsin.

---

## 2. Core ve `.alek` neden ayrı?

Ałek’ryŧhæ World Builder & Færa’Th uygulamanın kendisidir. **Ałek’ryŧhæ Core** ise onu açan çalışma zamanıdır.

```text
Ałek’ryŧhæ Core
        │
        └── Alekrythae-World-Builder-FaeraTh.alek
```

Bu repo uygulamanın JavaScript modüllerini, arayüzünü, assetlerini ve uygulamaya özgü mantığını taşır. Core ise Windows host'unu, `.alek` yüklemeyi, WebView2/native entegrasyonunu ve ortak servisleri sağlar.

Bu ayrım bilinçlidir. Klasör kendi başına görünsün diye Core'u bu repoya kopyalama.

---

## 3. Gereksinimler

Şunlar gerekir:

- **Windows 10 veya Windows 11**;
- uyumlu bir **Ałek’ryŧhæ Core** kurulumu;
- Core'un ihtiyaç duyduğu durumda **Microsoft Edge WebView2 Runtime**;
- bu repo veya uygulamanın release paketi.

Normal kullanım için Node.js/npm derleme adımı yoktur. `.alek` uygulamasını doğrudan Core yükler.

---

## 4. İlk kurulum

### Adım 1: Ałek’ryŧhæ Core'u kur

Önce Core'u kur/kaydet. Core, mevcut Windows kullanıcısı için `.alek` dosya ilişkilendirmesini kaydetmelidir.

Core kaydı yoksa `Alekrythae.cmd` çalışmayı durdurur ve Core kaydının bulunamadığını söyler.

### Adım 2: repo yapısını bozma

Dosyaları tek tek başka klasörlere taşıma.

Önemli yapı şu şekildedir:

```text
Alekrythae-World-Builder-FaeraTh-v0.1.1/
├── Alekrythae.cmd
├── README.md
├── README_TR.md
├── LICENSE.md
└── Meggy/
    ├── Alekrythae-World-Builder-FaeraTh.alek
    ├── Alekrythae.App/
    ├── Assets/
    ├── MapLibrary/
    └── VERSION
```

### İç klasör neden hâlâ `Meggy`?

`Meggy/`, **eski veri ve içe aktarma uyumluluğunu korumak için bırakılmış teknik bir legacy yoldur**. Ürünün public adı **Ałek’ryŧhæ World Builder & Færa’Th**'dır.

`alekrythae.meggy` gibi bazı eski teknik kimlikler de bilerek korunmuştur. Bunları yalnız isim eski görünüyor diye değiştirmek eski `.alekdata`/çalışma alanı geçişlerini bozabilir. Bunları marka adı değil, uyumluluk kimliği olarak düşün.

### Adım 3: uygulamayı çalıştır

Şuna çift tıkla:

```text
Alekrythae.cmd
```

Windows'ta `.alek` ilişkilendirmesi hazırsa doğrudan şu dosyayı da açabilirsin:

```text
Meggy/Alekrythae-World-Builder-FaeraTh.alek
```

### Adım 4: Mavi Ay kapısını aç

Başlangıçta Mavi Ay açılış ekranı gelir.

- **Mavi Ay'a tıkla** ve içeri gir.
- `Esc` de açılış ekranını geçer.

### Adım 5: F1'e bas

Uygulama açıldıktan sonra:

```text
F1
```

Bu, yerleşik **Komuta Atlası / Kısayol Rehberi**'ni açar. Bir çizim aracını veya ekranı nasıl kullanacağını unuttuğunda ilk bakacağın yer F1 olsun.

---

## 5. En önemli tuş: F2

Şuna bas:

```text
F2
```

Ana daire açılır.

Dış halkada:

- **AI**
- **Takvim**
- **CT** — Cartographer’s Table
- **Tide**
- **Lore**
- **Reverie**

vardır.

Ortadaki **Mavi Ay** ise Odak Merkezi'ni açar.

Çıkış kontrolü Ałek’ryŧhæ uygulama katmanını kapatır.

`Esc` çoğu yerde ana daireyi, aktif pencereyi, seçimi veya işlemi kapatır/iptal eder.

---

## 6. Mavi Ay / Odak Merkezi

**F2**'yi aç, ortadaki Mavi Ay'a bas.

Odak Merkezi'nde:

- Pomodoro tipi çalışma/mola döngüsü;
- çok setli çalışma sistemi;
- son set sonrası uzun mola;
- kronometre ve tur kayıtları;
- geri sayım zamanlayıcısı;
- farklı çalışma sistemleri;
- olumlama kayıtları

bulunur.

Mevcut çalışma sistemleri arasında:

- `25 / 5` Pomodoro;
- `50 / 10` Derin Çalışma;
- `52 / 17`;
- `90 / 20`;
- geçişleri hızlı test etmek için **15 saniyelik Test** düzeni

vardır.

Çalışma/mola geçiş sesleri çalarken Harmonizer/Bard kanalı geçici olarak duraklatılabilir.

---

## 7. Takvim ve notlar

**F2 → Takvim** yolunu kullan.

Takvim gerçek dünya tarihini kullanır.

Temel akış:

1. bir güne tıkla;
2. o günün not alanını aç veya oluştur;
3. notunu kaydet;
4. daha sonra aynı güne dönüp tekrar aç.

Takvimdeki dairesel **Meggy** portresi uygulama içinde korunmuş bir karakter/yardımcı öğedir. Ona tıklarsan **bütün takvim notlarını eskiden yeniye kronolojik** olarak görürsün.

Not silme işlemi, kalıcı silmeden önce uygulamanın onay/mühür akışını kullanır.

**Bugüne Git** ile güncel tarihe dönersin.

---

## 8. Lore: yapılandırılmış bilgi arşivi

**F2 → Lore** yolunu kullan.

Lore hiyerarşik bilgi arşividir. Şunlar için kullanılabilir:

- world-building;
- karakter, mekân, kültür ve evren belgeleri;
- yazılım notları;
- dil çalışması;
- araştırma;
- kişisel bilgi tabanı.

Örnek düzen:

```text
Lore Archive
├── Dünya
│   ├── Bölgeler
│   ├── Halklar
│   └── Tarih
├── Yazılım Notları
│   ├── C#
│   └── SQL
└── Diller
    ├── İngilizce
    └── Almanca
```

Üst ve alt öğeler kendi bağlam kontrollerinden yönetilir. Mevcut UI'da kök satırlar bilerek sade tutulur: sayı rozeti yerine isim ve `⋯` menüsü esas kontroldür.

---

## 9. Reverie: yazı ve görsel anlatım

**F2 → Reverie** yolunu kullan.

Reverie uzun metin çalışma yüzeyidir.

Bir Reverie kaydı şunları taşıyabilir:

- başlık/tarih;
- kapak görseli;
- metin bölümleri;
- metin bloklarının arasına yerleştirilmiş görseller;
- görsel ölçekleme;
- görseli sola/ortaya/sağa konumlandırma;
- desteklenen durumda mühürlü/salt-okunur benzeri akış.

Görsel düzeni bilerek basittir: **metin görselin sağına/soluna sarılmaz; görselin üstünde ve altında akar**. Görselden sonra gelen metin bloğunda yazmaya devam edebilirsin.

Bu yaklaşım, karmaşık kelime işlemci yerleşiminin yazı akışını bozmasını önler.

---

## 10. Cartographer’s Table (CT)

**F2 → CT** yolunu kullan.

Cartographer’s Table **2D** görsel çalışma alanıdır. 3D CAD uygulaması olarak sunulmaz.

Şunlar için kullanabilirsin:

- serbest çizim;
- çizgi ve şekiller;
- diyagram;
- harita benzeri planlama;
- referans görselleri yerleştirme;
- görsel organizasyon.

### Temel CT kontrolleri

| Girdi | İşlev |
|---|---|
| Mouse tekerleği | Çalışma yüzeyini yakınlaştırır/uzaklaştırır |
| Orta tuş + sürükle | Çalışma yüzeyinde gezinir |
| Alt + tekerlek | 2D CT yüzeyini döndürür |
| `R` | İmleç konumuna raptiye ekler |
| `F` | Seçili kütüphane görselini imleç konumuna ekler |
| `Ctrl + Z` | Geri alır |
| `Ctrl + Shift + Z` veya `Ctrl + Y` | İleri alır |
| Boyutlandırırken `Shift` | Görsel en-boy oranını korur |
| Döndürürken `Shift` | Dönüşü tam derece adımlarına kısıtlar |

### Çizim Paleti

`Tab` tuşunun fiziksel olarak üstündeki tuşla (`Backquote` ve desteklenen klavye karşılıkları) Çizim Paleti'ni açıp kapatabilirsin.

Çizim sırasında:

| Girdi | İşlev |
|---|---|
| `Space` | Seçimi yeni yerine bırakır veya noktalı çizimi tamamlar |
| `Delete` | Seçili çizim/metni siler |
| `Backspace` | Noktalı çizimde son kontrol noktasını kaldırır |
| Çift tık | Noktalı çizimi tamamlar |
| `Shift` | Desteklenen araçlarda kare/daire/eşkenar kısıtı uygular |
| `Esc` | Aktif çizimi veya seçimi iptal eder |

Bir kısayoldan emin değilsen **F1**'e bas. Çalıştırdığın sürüm için esas kısayol kaynağı uygulamanın kendi F1 rehberidir.

---

## 11. Tide

**F2 → Tide** yolunu kullan.

Tide, bağlantı/ilişki odaklı eşlik eden 2D yüzeydir. CT ile bazı çalışma alanı davranışlarını, görünüm hareketlerini ve uygun yerlerde geri al/ileri al mantığını paylaşır.

Tide uygulamayla birlikte geliştiği için eski ekran görüntülerine veya eski anlatımlara güvenmek yerine mevcut sürümdeki kesin kontroller için **F1** rehberini kullan.

---

## 12. Harmonizer

Üst bölümdeki **♫** yardımcı düğmesini kullan.

Harmonizer uygulamanın desteklediği ses/atmosfer kanallarını yönetir. Ayrı bir medya oynatıcı olmak yerine çalışma ortamının parçasıdır.

Odak Merkezi'nin çalışma/mola bildirim sesi sırasında aktif Bard/Harmonizer kanalı geçici olarak durabilir.

---

## 13. AI çalışma alanı

**F2 → AI** yolunu kullan.

AI yüzeyi, uygulamanın Core/Edge entegrasyonu üzerinden ChatGPT çalışma alanını açar.

Önemli noktalar:

- public repoda geliştiricinin **ChatGPT/OpenAI şifresi yoktur**;
- geliştiricinin giriş/session tokenı yoktur;
- geliştiricinin WebView2/Edge profili, cookie'leri veya browser history'si yoktur;
- gerekiyorsa kullanıcı kendi bilgisayarında kendi hesabıyla giriş yapar;
- AI yüzeyi açıkken de **F2** çalışır; başka yüzeye geçmek için önce Edge alanının dışına tıklamak gerekmez.

Bu repo bir hesap paketi değil; kaynak kod ve uygulama assetlerinden oluşur.

---

## 14. Veriyi dışa ve içe aktarma

Üst yardımcı alanda:

- **↥ Dışarı Aktar**
- **↧ İçeri Aktar**

kontrolleri bulunur.

Yeni bir sürüme geçmeden veya çalışma alanında büyük değişiklik yapmadan önce kullan.

Tercih edilen taşınabilir yedek biçimi:

```text
.alekdata
```

Mevcut build, desteklediği eski JSON/klasör tabanlı veri yollarını da gerektiğinde gösterebilir.

### Önerilen yedek alışkanlığı

1. yarım kalan düzenlemeyi bitir;
2. `.alekdata` yedeğini dışarı aktar;
3. yedeği uygulama klasörünün dışında sakla;
4. ancak bundan sonra uygulama dosyalarını güncelle/değiştir;
5. migration gerekiyorsa yedeğini içeri aktar.

GitHub reposunu save klasörü olarak kullanma.

---

## 15. Kişisel veriler nerede?

Bu public source paketi bilerek temiz hazırlanmıştır.

Geliştiricinin kişisel:

- takvim notları;
- Lore kayıtları;
- Reverie kayıtları;
- çalışma save/veritabanları;
- özel medyaları;
- ChatGPT/Edge oturumu;
- cookie/history/cache verisi;
- credential bilgileri

paketin içinde bulunmaz.

Runtime sırasında oluşan kullanıcı klasörleri Git takibinden çıkarılmıştır.

Repo şu yolları runtime/uyumluluk yolu olarak korur:

```text
Meggy/Data/
Meggy/Games/
Meggy/MapLibrary/*
```

Kendi yedeklerini ayrıca tut. Yazılım hâlâ `0.x` serisindedir ve veri/migration davranışları ileride gelişebilir.

---

## 16. Genel kısayollar

| Kısayol | İşlev |
|---|---|
| `F1` | Komuta Atlası / kısayol rehberini açar |
| `F2` | Ana daireyi açar |
| `F11` | Core penceresinde gerçek tam ekranı açar/kapatır |
| `Ctrl + Mouse Tekerleği` | Ałek’ryŧhæ arayüz ölçeğini değiştirir |
| `Alt + G` | A̤ɐ͜ɨǣ́ꞎ͡ƣ İmge Paleti'ni açar/kapatır |
| `Ctrl + Shift + Esc` | Yalnız Ałek’ryŧhæ UI katmanını kapatır; Core penceresini kapatmaz |
| `Esc` | Aktif seçim/pencere/işlemi kapatır veya iptal eder |
| `Enter` / `Space` | Odaktaki düğme/seçeneği etkinleştirir |

İleride bir kısayol değişirse uygulamanın içindeki F1 rehberi esas kabul edilmelidir.

---

## 17. Kaynak kod yapısı

Uygulama; orkestratör, çalışan davranışı koruyan legacy uyumluluk katmanı ve giderek ayrıştırılan modüller şeklinde düzenlenmiştir.

```text
Meggy/
├── Alekrythae-World-Builder-FaeraTh.alek
├── Alekrythae.App/
│   ├── manifest.json
│   ├── legacy/
│   │   └── legacy-app.js
│   └── modules/
│       ├── application/
│       └── world-map/
├── Assets/
├── MapLibrary/
└── VERSION
```

### Kaynağı okuyacak kişiler için önemli not

`legacy-app.js` büyüktür çünkü çalışan uygulamanın davranışını korurken özellikler adım adım modüllere taşınmaktadır.

Ürün adı değişti diye kaynakta eski görünen her `Meggy`, Journey, Tavern veya migration kimliğini silme. Bazıları hâlâ geriye uyumlulukta, veri okumada veya kapalı legacy akışlarda rol oynayabilir.

Bir temizlik ancak ilgili runtime/veri yolunun artık gerekmediği kanıtlandıktan sonra yapılmalıdır.

---

## 18. Sorun giderme

### “Ałek’ryŧhæ Core kaydı bulunamadı”

Core mevcut Windows kullanıcısı için kurulmamış/kaydedilmemiştir. Önce uyumlu Core'u kur veya çalıştır, ardından `Alekrythae.cmd` dosyasını tekrar aç.

### Uygulama başladı ama yalnız Mavi Ay açılışı var

Mavi Ay'a tıkla. `Esc` de açılışı geçer.

### Bir özelliğin nerede olduğunu bilmiyorum

**F2**'ye bas.

### Kısayolu bilmiyorum

**F1**'e bas.

### AI boş veya açılmıyor

Uyumlu Core'un ve Microsoft Edge/WebView2 ortamının mevcut olduğunu kontrol et. AI entegrasyonu bu repoda saklanan bir credential'a değil Core/Edge davranışına bağlıdır.

### Source klasörünü güncelleyeceğim

Önce `.alekdata` yedeği al. Erken `0.x` sürümlerinde bütün gelecekteki veri şemalarının otomatik taşınacağını varsayma.

### `Meggy/` klasörünü yeniden adlandırdım ve bir şey bozuldu

Repo yapısını geri getir. Ürünün adı değişmiş olsa da bu klasör şu anda legacy uyumluluk yolu olarak korunmaktadır.

---

## 19. Sürümleme

`v0.1.0`, şu adla yayımlanan ilk public source sürümüdür:

**Ałek’ryŧhæ World Builder & Færa’Th**

Uygulama kullanılabilir durumdadır; ancak `0.x` serisi teknik sözleşmenin gelişmeye devam edebileceğini ifade eder. Runtime uyumluluğu, bridge işlemleri, veri şemaları ve modül sınırları sürümler arasında değişebilir.

---

## 20. Lisans

Ałek’ryŧhæ World Builder & Færa’Th **source-available proprietary software** olarak yayımlanır. **Açık kaynak yazılım değildir.**

Şu lisans altında dağıtılır:

**TheDEvorger UNIVERSAL PROPRIETARY SOFTWARE LICENSE — Version 1.3**  
SPDX: `LicenseRef-TheDEvorger-UPSL-1.3`

Tam metin:

**[LICENSE.md](LICENSE.md)**

Kaynak kodun GitHub üzerinden görülebiliyor olması; yeniden dağıtım, ticari kullanım, türev ürün, Covered Materials ile AI eğitimi veya alternatif `.alek` runtime geliştirme haklarını kendiliğinden vermez.

---

## 21. Üçüncü taraf bileşenler

Üçüncü taraf teknolojiler kendi lisanslarına tabidir. Bak:

**[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)**

---

## 22. Güvenlik

Güvenlik bildirimi için:

**[SECURITY.md](SECURITY.md)**

---

## 23. İngilizce dokümantasyon

English documentation:

**[README.md](README.md)**

---

## Geliştirici

**TheDEvorger**

Lisans / yasal iletişim:  
`TheDEvorger.alekrythae.dev@gmail.com`

---

<p align="center">
  <strong>Ałek’ryŧhæ World Builder & Færa’Th</strong><br>
  Dünyanı kur. Bilgini düzenle. Yaz, çiz, odaklan ve çalışmanı yerelde tut.
</p>
