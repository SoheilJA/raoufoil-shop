/* پیکربندی Tailwind (نسخهٔ CDN) — پالت رنگ و فونت برند */
tailwind.config = {
    theme: {
        extend: {
            colors: {
                forest: '#002F18',  // سبز تیرهٔ اصلی برند
                deep: '#0A2415',  // سبز خیلی تیره (کپی‌رایت/اورلی)
                moss: '#1E4D31',  // سبز میانه
                gold: '#E4B027',  // طلایی اصلی
                goldl: '#F6DA82',  // طلایی روشن
                goldd: '#B9871B',  // طلایی تیره (کنتراست روی زمینهٔ روشن)
                cream: '#F7F2E7',  // کرم زمینهٔ اصلی
                sand: '#EFE7D3',  // بژ
                brick: '#B3402F',  // قرمز آجری برچسب تخفیف
            },
            fontFamily: { sans: ['Vazirmatn', 'Tahoma', 'sans-serif'] },
            boxShadow: {
                soft: '0 14px 34px -14px rgba(0,47,24,.28)',
                card: '0 6px 20px -10px rgba(0,47,24,.18)',
            },
        },
    },
};