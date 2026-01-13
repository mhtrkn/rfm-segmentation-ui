# RFM Segmentation Grid – Frontend Case Study

Bu proje, RFM (Recency, Frequency, Monetary) metriklerini kullanarak müşterileri
5x5’lik bir grid üzerinde görselleştiren ve filtrelenebilir / seçilebilir hale getiren
bir frontend case çalışmasıdır.

## 🎯 Amaç

Bu case’te hedeflenen temel problemler:

1. Ham RFM verisini anlamlı skorlara dönüştürmek
2. Bu skorları iki boyutlu bir koordinat sistemine taşımak
3. Kullanıcı etkileşimini (filtreleme, seçim, gönderim) temiz ve yönetilebilir şekilde ele almak

Bu sebeple çözüm şu prensiplerle kurgulanmıştır:

- **Deterministic data flow** (tek yönlü veri akışı)
- **Pure utility fonksiyonları** (test edilebilirlik)
- **Sunum (UI) ve iş mantığı ayrımı**
- **Client Component odaklı mimari**


## 🧩 Kullanılan Teknolojiler

- **Next.js 14 (App Router)**
- **React**
- **TypeScript**
- **Mock API (Next.js Route Handler)**
- **Client Components**

❗ Harici state, chart veya data-fetching kütüphanesi **bilinçli olarak kullanılmamıştır**.
Amaç: temel React ve mimari becerileri göstermek.

---

## 📊 Dataset

### Neden Manuel Yazılmadı?

- 100+ satır veriyi manuel yazmak:
  - Hatalara açıktır
  - Gerçek hayat pratiği değildir
  - Ölçeklenebilir değildir

Bu nedenle veri **script ile üretilmiştir**.

- Alanlar:
  - `id`
  - `recency`
  - `frequency`
  - `monetary`

Veriler `scripts/generateData.ts` dosyası ile otomatik üretilmiştir. Üretilen dosya `src/data/data.json` içerisine kaydedilmiştir.

```bash
node scripts/generateData.ts
```

Başka yada yeni bir veriseti oluşturmak isterseniz yukarıda ki script kodunu terminalde çalıştırabilirsiniz.
