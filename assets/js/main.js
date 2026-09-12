/* ═══════════════════════════════════════════════════════
   منطق اصلی سایت «روغنکده رئوف»
   هدر/فوتر مشترک + کاروسل‌ها + منطق هر صفحه
   ═══════════════════════════════════════════════════════ */
/* ابزارهای $, $$, fmt, catTitle, refreshIcons از products-data.js */

const PAGE = document.body.dataset.page || 'home';

/* ─────────── ۱) هدر مشترک ─────────── */
const NAV = [
  { href: 'index.html', label: 'خانه', page: 'home' },
  { href: 'shop.html', label: 'فروشگاه', page: 'shop' },
  { href: 'blog.html', label: 'مجله', page: 'blog' },
  { href: 'about.html', label: 'درباره ما', page: 'about' },
  { href: 'contact.html', label: 'تماس با ما', page: 'contact' },
];

function renderHeader() {
  $('#site-header').innerHTML = `
  <div class="sticky top-0 z-50">
    <!-- نوار اعلان طلایی -->
    <div id="topbar" class="bg-gold text-forest text-xs">
      <div class="max-w-7xl mx-auto px-4 h-9 flex items-center justify-between gap-4">
        <p class="flex items-center gap-2 font-bold"><i data-lucide="truck" class="w-4 h-4"></i><span>ارسال رایگان برای سفارش‌های بالای ۵۰۰٬۰۰۰ تومان</span></p>
        <a href="tel:+983434345566" class="hidden md:flex items-center gap-1.5 font-black">۰۳۴ ۳۴۳۴ ۵۵۶۶</a>
      </div>
    </div>
    <!-- هدر اصلی -->
    <header id="hdr-root" class="bg-forest/95 backdrop-blur text-cream">
      <div id="hdr-bar" class="max-w-7xl mx-auto px-4 h-16 lg:h-20 flex items-center gap-5 lg:gap-8 transition-all duration-300">
        <a href="index.html" class="flex items-center gap-3 shrink-0">
          <span class="w-10 h-10 lg:w-11 lg:h-11 rounded-xl bg-gold/10 border border-gold/40 grid place-items-center"><i data-lucide="droplet" class="w-5 h-5 text-gold"></i></span>
          <span class="leading-tight">
            <span class="gold-grad-text block text-lg lg:text-2xl font-black">روغنکده رئوف</span>
            <span class="block text-[9px] lg:text-[10px] text-cream/50 tracking-[.35em] mt-1">SINCE 1375</span>
          </span>
        </a>
        <nav class="hidden lg:flex items-center gap-7 text-[15px] font-medium">
          ${NAV.map(n => `<a href="${n.href}" class="transition ${n.page === PAGE ? 'text-gold' : 'text-cream/85 hover:text-gold'}">${n.label}</a>`).join('')}
        </nav>
        <div class="mr-auto flex items-center gap-1.5 sm:gap-2.5">
          <button id="btn-search" class="icon-btn" title="جستجو" aria-label="جستجو"><i data-lucide="search" class="w-5 h-5"></i></button>
          <button id="btn-cart" class="icon-btn relative" title="سبد خرید" aria-label="سبد خرید">
            <i data-lucide="shopping-cart" class="w-5 h-5"></i>
            <span id="cart-badge" class="absolute -top-1.5 -left-1.5 min-w-[20px] h-5 px-1 rounded-full bg-gold text-forest text-[11px] font-black grid place-items-center">۰</span>
          </button>
          <button id="btn-menu" class="icon-btn lg:hidden" title="منو" aria-label="منو"><i data-lucide="menu" class="w-5 h-5"></i></button>
        </div>
      </div>
    </header>
  </div>

  <!-- منوی موبایل (آفکانواس از راست) -->
  <div id="mnav-ov" class="fixed inset-0 z-[55] bg-deep/60 backdrop-blur-sm"></div>
  <nav id="mnav" class="fixed top-0 bottom-0 right-0 z-[56] w-[19rem] bg-forest text-cream flex flex-col shadow-2xl">
    <div class="flex items-center justify-between p-5 border-b border-cream/10">
      <span class="gold-grad-text text-xl font-black">روغنکده رئوف</span>
      <button class="icon-btn" data-mnav-close aria-label="بستن"><i data-lucide="x" class="w-5 h-5"></i></button>
    </div>
    <div class="p-5 space-y-1 flex-1 overflow-y-auto">
      ${NAV.map(n => `
        <a href="${n.href}" class="flex items-center gap-2 px-4 py-3.5 rounded-xl font-bold ${n.page === PAGE ? 'bg-gold/15 text-gold' : 'text-cream/85 hover:bg-cream/5'}">
          ${n.label}<i data-lucide="chevron-left" class="w-4 h-4 mr-auto opacity-40"></i>
        </a>`).join('')}
      <p class="pt-6 pb-2 px-4 text-xs text-gold font-black">دسته‌های محبوب</p>
      ${CATS.slice(0, 6).map(c => `<a href="shop.html?cat=${c.slug}" class="flex items-center gap-3 px-4 py-2.5 text-sm text-cream/70 hover:text-gold"><i data-lucide="${c.icon}" class="w-4 h-4 text-gold/70"></i>${c.title}</a>`).join('')}
    </div>
    <a href="tel:+983434345566" class="m-5 p-4 rounded-xl bg-gold text-forest font-black flex items-center justify-center gap-2 shrink-0"><i data-lucide="phone" class="w-4 h-4"></i> تماس با ما</a>
  </nav>

  <!-- مودال جستجو (زنده) -->
  <div id="search-modal" class="fixed inset-0 z-[80] hidden">
    <div class="absolute inset-0 bg-deep/80 backdrop-blur-sm" data-close-search></div>
    <div class="relative max-w-2xl mx-4 sm:mx-auto mt-20 lg:mt-28 bg-cream rounded-2xl shadow-2xl overflow-hidden">
      <div class="flex items-center gap-3 px-5 border-b border-forest/10">
        <i data-lucide="search" class="w-5 h-5 text-goldd shrink-0"></i>
        <input id="search-input" type="text" placeholder="نام محصول یا دسته را بنویسید…" class="flex-1 h-14 bg-transparent outline-none text-lg text-forest placeholder:text-forest/40" autocomplete="off">
        <button data-close-search class="text-forest/40 hover:text-forest transition" aria-label="بستن"><i data-lucide="x" class="w-5 h-5"></i></button>
      </div>
      <div id="search-results" class="max-h-[55vh] overflow-y-auto p-3"></div>
    </div>
  </div>`;

  // رفتار اسکرول: جمع‌شدن نوار بالا + فشرده‌شدن هدر
  const bar = $('#hdr-bar');
  addEventListener('scroll', () => {
    const on = scrollY > 40;
    bar.classList.toggle('h-14', on);
    bar.classList.toggle('h-16', !on);
    bar.classList.toggle('lg:h-16', on);
    bar.classList.toggle('lg:h-20', !on);
    $('#topbar').classList.toggle('tb-hide', on);
    $('#hdr-root').classList.toggle('shadow-soft', on);
  }, { passive: true });

  // دکمه‌های هدر
  $('#btn-cart').addEventListener('click', () => Cart.open());
  $('#btn-menu').addEventListener('click', () => { $('#mnav').classList.add('open'); $('#mnav-ov').classList.add('open'); document.body.style.overflow = 'hidden'; });
  const mnavClose = () => { $('#mnav').classList.remove('open'); $('#mnav-ov').classList.remove('open'); document.body.style.overflow = ''; };
  $$('[data-mnav-close]').forEach(b => b.addEventListener('click', mnavClose));
  $('#mnav-ov').addEventListener('click', mnavClose);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && $('#mnav').classList.contains('open')) mnavClose(); });

  // جستجوی زنده
  const modal = $('#search-modal'), input = $('#search-input');
  const sClose = () => { modal.classList.add('hidden'); document.body.style.overflow = ''; };
  const sOpen = () => { modal.classList.remove('hidden'); document.body.style.overflow = 'hidden'; renderSearchResults(''); setTimeout(() => input.focus(), 60); };
  $('#btn-search').addEventListener('click', sOpen);
  $$('[data-close-search]').forEach(b => b.addEventListener('click', sClose));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.classList.contains('hidden')) sClose(); });
  input.addEventListener('input', () => renderSearchResults(input.value.trim()));
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && input.value.trim()) location.href = 'shop.html?q=' + encodeURIComponent(input.value.trim());
  });
  refreshIcons();
}

/* نتایج جستجوی زنده */
function renderSearchResults(q) {
  const box = $('#search-results');
  if (!q) {
    // حالت اولیه: جستجوهای پرطرفدار
    const hints = ['کنجد', 'رب انار', 'ارده', 'زعفران', 'عرق', 'پسته'];
    box.innerHTML = `<p class="text-xs font-black text-forest/40 px-2 py-2">جستجوهای پرطرفدار:</p>
      <div class="flex flex-wrap gap-2 px-2 pb-1">${hints.map(h => `<a href="shop.html?q=${encodeURIComponent(h)}" class="text-sm font-bold text-forest bg-white border border-forest/10 rounded-full px-4 py-2 hover:border-gold transition">${h}</a>`).join('')}</div>`;
    return;
  }
  const list = PRODUCTS.filter(p => p.name.includes(q) || catTitle(p.cat).includes(q)).slice(0, 8);
  box.innerHTML = list.length
    ? list.map(p => `
      <a href="product.html?id=${p.id}" class="flex items-center gap-3 p-2.5 rounded-xl hover:bg-sand/70 transition">
        <img src="${p.images[0]}" class="w-12 h-12 rounded-lg object-cover" alt="${p.name}">
        <div class="flex-1 min-w-0">
          <p class="font-bold text-sm text-forest truncate">${p.name}</p>
          <p class="text-xs text-forest/50 mt-0.5">${catTitle(p.cat)}</p>
        </div>
        <span class="text-sm font-black text-forest shrink-0">${fmt(p.price)} <small class="text-[10px] font-medium text-forest/50">تومان</small></span>
      </a>`).join('')
    : `<p class="text-center py-8 text-sm text-forest/50">چیزی مطابق «${q}» پیدا نشد.<br><a href="shop.html" class="text-goldd font-bold hover:underline">مشاهدهٔ همهٔ محصولات</a></p>`;
}

/* ─────────── ۲) فوتر مشترک ─────────── */
function renderFooter() {
  $('#site-footer').innerHTML = `
  <footer class="bg-forest text-cream/75">
    <!-- خبرنامه -->
    <div class="border-b border-cream/10">
      <div class="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-6 items-center">
        <div class="flex items-start gap-4">
          <span class="w-12 h-12 rounded-2xl bg-gold/10 border border-gold/30 grid place-items-center shrink-0"><i data-lucide="mail" class="w-6 h-6 text-gold"></i></span>
          <div>
            <h3 class="text-cream text-lg font-black">خبرنامهٔ روغنکدهٔ رئوف</h3>
            <p class="text-sm mt-1.5 leading-7">با ثبت ایمیل یا شمارهٔ موبایل، اولین نفری باشید که از تخفیف‌ها و محصولات تازه باخبر می‌شوید.</p>
          </div>
        </div>
        <form id="newsletter-form" class="flex gap-2 bg-deep/60 border border-cream/15 rounded-2xl p-2">
          <input required type="text" id="newsletter-input" placeholder="ایمیل یا شمارهٔ موبایل" class="flex-1 min-w-0 bg-transparent px-3 outline-none placeholder:text-cream/35 text-cream text-sm">
          <button class="bg-gold hover:bg-goldl text-forest font-black text-sm px-5 py-3 rounded-xl transition shrink-0">عضویت</button>
        </form>
      </div>
    </div>
    <!-- ستون‌های اصلی -->
    <div class="max-w-7xl mx-auto px-4 py-12 grid gap-10 md:grid-cols-2 lg:grid-cols-[1.35fr_1fr_.8fr_1.1fr]">
      <div>
        <a href="index.html" class="gold-grad-text text-2xl font-black">روغنکده رئوف</a>
        <p class="mt-4 text-sm leading-8">سه نسل است که با پرس سرد و روش‌های سنتی، روغن‌ها و خوشمزه‌های اصیل ایرانی را بدون هیچ افزودنی‌ای به خانه‌های شما می‌رسانیم. «چیزی که خودمان نمی‌خوریم، نمی‌فروشیم.»</p>
        <div class="flex gap-2 mt-5">
          <a href="#" title="اینستاگرام" class="w-10 h-10 rounded-xl border border-cream/20 grid place-items-center hover:bg-gold hover:text-forest hover:border-gold transition"><i data-lucide="instagram" class="w-4 h-4"></i></a>
          <a href="#" title="تلگرام" class="w-10 h-10 rounded-xl border border-cream/20 grid place-items-center hover:bg-gold hover:text-forest hover:border-gold transition"><i data-lucide="send" class="w-4 h-4"></i></a>
          <a href="#" title="واتساپ" class="w-10 h-10 rounded-xl border border-cream/20 grid place-items-center hover:bg-gold hover:text-forest hover:border-gold transition"><i data-lucide="message-circle" class="w-4 h-4"></i></a>
        </div>
      </div>
      <div>
        <h4 class="text-cream font-black text-sm mb-4">دسته‌بندی محصولات</h4>
        <ul class="grid grid-cols-2 gap-x-4 gap-y-2.5 text-[13px]">
          ${CATS.map(c => `<li><a href="shop.html?cat=${c.slug}" class="hover:text-gold transition">${c.title}</a></li>`).join('')}
        </ul>
      </div>
      <div>
        <h4 class="text-cream font-black text-sm mb-4">لینک‌های مفید</h4>
        <ul class="space-y-2.5 text-[13px]">
          <li><a href="about.html" class="hover:text-gold transition">دربارهٔ ما</a></li>
          <li><a href="contact.html" class="hover:text-gold transition">تماس با ما</a></li>
          <li><a href="#" data-text-modal="privacy" class="hover:text-gold transition">حریم خصوصی</a></li>
          <li><a href="#" data-text-modal="terms" class="hover:text-gold transition">شرایط استفاده</a></li>
        </ul>
      </div>
      <div>
        <h4 class="text-cream font-black text-sm mb-4">اطلاعات تماس</h4>
        <ul class="space-y-3.5 text-[13px]">
          <li class="flex items-start gap-3"><i data-lucide="map-pin" class="w-4 h-4 text-gold shrink-0 mt-1"></i>کرمان، رفسنجان، خیابان امام رضا، نبش کوچهٔ گلستان، پلاک ۱۲</li>
          <li class="flex items-center gap-3"><i data-lucide="phone" class="w-4 h-4 text-gold shrink-0"></i>۰۳۴ ۳۴۳۴ ۵۵۶۶</li>
          <li class="flex items-center gap-3"><i data-lucide="mail" class="w-4 h-4 text-gold shrink-0"></i><span dir="ltr">info@roghankadeh-raouf.ir</span></li>
          <li class="flex items-center gap-3"><i data-lucide="clock" class="w-4 h-4 text-gold shrink-0"></i>شنبه تا پنجشنبه · ۸ تا ۱۸</li>
        </ul>
      </div>
    </div>
    <div class="bg-deep text-cream/50 text-xs">
      <div class="max-w-7xl mx-auto px-4 h-12 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-1">
        <p>© ۱۴۰۳ روغنکدهٔ رئوف — تمامی حقوق محفوظ است.</p>
        <p>ساخته‌شده با احترام به تولید سنتی ایران</p>
      </div>
    </div>
  </footer>`;

  // خبرنامه
  $('#newsletter-form').addEventListener('submit', e => {
    e.preventDefault();
    const v = $('#newsletter-input').value.trim();
    if (v.length < 5) { showToast('لطفاً یک ایمیل یا شمارهٔ معتبر وارد کنید', 'x'); return; }
    e.target.innerHTML = '<p class="flex items-center gap-2 text-gold font-black text-sm py-3"><i data-lucide="check-circle-2" class="w-5 h-5"></i> عضویت شما با موفقیت ثبت شد!</p>';
    showToast('به خبرنامهٔ روغنکده خوش آمدید');
    refreshIcons();
  });
  refreshIcons();
}

/* ─────────── ۳) مودال عمومی + متون ثابت ─────────── */
const STATIC_TEXTS = {
  privacy: {
    title: 'حریم خصوصی', body: `
    <p>در روغنکدهٔ رئوف، اطلاعات شما (نام، شمارهٔ تماس و نشانی) صرفاً برای پردازش سفارش و ارتباط لازم دربارهٔ همان سفارش استفاده می‌شود و هرگز در اختیار شخص یا شرکت ثالثی قرار نمی‌گیرد.</p>
    <p class="mt-4">اطلاعات پرداخت شما مستقیماً در درگاه بانکی پردازش می‌شود و هیچ‌گونه دادهٔ کارت بانکی در سایت ما ذخیره نمی‌شود. سبد خرید شما فقط در مرورگر خودتان (localStorage) نگه داشته می‌شود.</p>
    <p class="mt-4">در هر زمان می‌توانید با تماس با پشتیبانی، حذف کامل اطلاعات خود از سامانه را درخواست کنید.</p>` },
  terms: {
    title: 'شرایط استفاده', body: `
    <p>استفاده از این سایت به معنای پذیرش شرایط زیر است: تصاویر محصولات نمونه بوده و ممکن است با بسته‌بندی نهایی تفاوت جزئی داشته باشند. قیمت‌ها و موجودی لحظه‌ای به‌روزرسانی می‌شوند و قیمت نهایی همان مبلغ درگاه پرداخت است.</p>
    <p class="mt-4">از آنجا که محصولات غذایی‌اند، مرجوعی فقط در صورت آسیب فیزیکی یا مغایرت با سفارش ثبت‌شده، تا ۷۲ ساعت پس از تحویل پذیرفته می‌شود. شرایط ارسال رایگان: سفارش بالای ۵۰۰٬۰۰۰ تومان.</p>` },
};

function openModal(title, html) {
  let m = document.getElementById('app-modal');
  if (!m) {
    document.body.insertAdjacentHTML('beforeend', `
    <div id="app-modal" class="fixed inset-0 z-[90] hidden">
      <div class="absolute inset-0 bg-deep/80 backdrop-blur-sm" data-close-modal></div>
      <div class="relative bg-cream rounded-2xl shadow-2xl w-[min(46rem,92vw)] max-h-[82vh] mx-auto mt-16 sm:mt-20 flex flex-col overflow-hidden">
        <div class="flex items-center justify-between px-6 py-4 border-b border-forest/10 shrink-0">
          <h3 id="app-modal-title" class="text-forest font-black text-lg"></h3>
          <button data-close-modal class="w-9 h-9 rounded-lg grid place-items-center text-forest/50 hover:bg-forest/5 transition" aria-label="بستن"><i data-lucide="x" class="w-5 h-5"></i></button>
        </div>
        <div id="app-modal-body" class="p-6 overflow-y-auto text-forest/80 leading-9 text-[15px]"></div>
      </div>
    </div>`);
    m = document.getElementById('app-modal');
    m.addEventListener('click', e => { if (e.target.closest('[data-close-modal]')) closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
  }
  $('#app-modal-title').textContent = title;
  $('#app-modal-body').innerHTML = html;
  m.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  refreshIcons();
}
function closeModal() {
  const m = document.getElementById('app-modal');
  if (m && !m.classList.contains('hidden')) { m.classList.add('hidden'); document.body.style.overflow = ''; }
}
function openArticle(id) {
  // هدایت به صفحه مقاله تکی به جای پاپ‌آپ
  location.href = `article.html?id=${id}`;
}

/* ─────────── ۴) کارت محصول + کاروسل ─────────── */
function productCard(p, o = {}) {
  const w = o.w || 'w-[262px] sm:w-[286px] shrink-0 snap-start';
  const badges = [];
  if (p.isNew) badges.push('<span class="bg-gold text-forest text-[11px] font-black rounded-full px-2.5 py-1">جدید</span>');
  if (p.isBest) badges.push('<span class="bg-forest/90 text-cream text-[11px] font-black rounded-full px-2.5 py-1">پرفروش</span>');
  return `
  <a href="product.html?id=${p.id}" class="group bg-white rounded-2xl shadow-card overflow-hidden block ${w} hover:shadow-soft hover:-translate-y-1 transition duration-300">
    <div class="relative overflow-hidden">
      <div class="aspect-square overflow-hidden relative">
        <img src="${p.images[0]}" alt="${p.name}" class="w-full h-full object-cover transition duration-500 group-hover:scale-105">
        <img src="${p.images[1]}" alt="" class="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition duration-500">
      </div>
      <div class="absolute top-3 right-3 flex flex-col items-start gap-1.5">${badges.join('')}</div>
      ${o.disc && p.discount ? `<span class="absolute top-3 left-3 w-12 h-12 rounded-full bg-brick text-white grid place-items-center text-[13px] font-black shadow-lg">${fmt(p.discount)}٪</span>` : ''}
      <button data-add="${p.id}" title="افزودن به سبد" class="absolute bottom-3 left-3 w-11 h-11 rounded-full bg-gold text-forest grid place-items-center shadow-lg hover:scale-110 hover:bg-goldl active:scale-95 transition"><i data-lucide="plus" class="w-5 h-5"></i></button>
    </div>
    <div class="p-4 sm:p-5">
      <span class="text-[11px] font-bold text-goldd">${catTitle(p.cat)}</span>
      <h3 class="mt-1.5 font-extrabold text-forest text-[15px] leading-7 line-clamp-1 group-hover:text-moss transition">${p.name}</h3>
      <div class="mt-2 flex items-center gap-1.5 text-xs text-forest/50">
        <i data-lucide="star" class="w-4 h-4 fill-gold text-gold"></i>
        <b class="text-forest/80">${fmt(p.rating)}</b>
        <span class="text-forest/25">·</span>
        <span>${fmt(p.sales)} فروش</span>
      </div>
      <div class="mt-3 flex items-baseline gap-2 flex-wrap">
        ${p.oldPrice ? `<s class="text-xs text-forest/35">${fmt(p.oldPrice)}</s>` : ''}
        <span class="font-black text-forest text-lg">${fmt(p.price)} <span class="text-[11px] font-medium text-forest/50">تومان</span></span>
      </div>
    </div>
  </a>`;
}

/* نمای لیستی (فروشگاه) */
function productRow(p) {
  return `
  <a href="product.html?id=${p.id}" class="group bg-white rounded-2xl shadow-card overflow-hidden flex flex-col sm:flex-row hover:shadow-soft transition">
    <div class="relative sm:w-52 shrink-0 overflow-hidden aspect-square sm:aspect-auto sm:h-auto">
      <img src="${p.images[0]}" alt="${p.name}" class="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-105">
      ${p.discount ? `<span class="absolute top-3 right-3 bg-brick text-white text-[11px] font-black rounded-full px-2.5 py-1">${fmt(p.discount)}٪ تخفیف</span>` : ''}
    </div>
    <div class="flex-1 p-5 flex flex-col gap-2 min-w-0">
      <span class="text-[11px] font-bold text-goldd">${catTitle(p.cat)}</span>
      <h3 class="font-extrabold text-forest leading-7 group-hover:text-moss transition">${p.name}</h3>
      <p class="text-sm text-forest/55 leading-7 line-clamp-2">${p.desc}</p>
      <div class="mt-auto pt-3 flex flex-wrap items-center gap-4 justify-between">
        <div class="flex items-baseline gap-2">
          ${p.oldPrice ? `<s class="text-xs text-forest/35">${fmt(p.oldPrice)}</s>` : ''}
          <span class="font-black text-forest text-xl">${fmt(p.price)} <span class="text-xs font-medium text-forest/50">تومان</span></span>
        </div>
        <button data-add="${p.id}" class="inline-flex items-center gap-2 bg-gold hover:bg-goldl text-forest font-black text-sm px-5 py-2.5 rounded-xl transition active:scale-95"><i data-lucide="shopping-cart" class="w-4 h-4"></i>افزودن به سبد</button>
      </div>
    </div>
  </a>`;
}

/* دکمه‌های قبلی/بعدی کاروسل‌ها — در RTL «بعدی» به سمت چپ است */
function initCarousels() {
  const step = t => t.firstElementChild ? t.firstElementChild.offsetWidth + 20 : 300;
  $$('[data-next]').forEach(b => b.addEventListener('click', () => { const t = $(b.dataset.target); t && t.scrollBy({ left: -step(t), behavior: 'smooth' }); }));
  $$('[data-prev]').forEach(b => b.addEventListener('click', () => { const t = $(b.dataset.target); t && t.scrollBy({ left: step(t), behavior: 'smooth' }); }));
}

/* ظاهرشدن عناصر هنگام اسکرول */
function initReveal() {
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); }
  }), { threshold: .12 });
  $$('.reveal').forEach(el => io.observe(el));
}

/* کانترهای آماری */
function initCounters() {
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (!en.isIntersecting) return;
    io.unobserve(en.target);
    const el = en.target, target = +el.dataset.count, suf = el.dataset.suffix || '';
    const t0 = performance.now(), D = 1500;
    (function tick(now) {
      const k = Math.min(1, (now - t0) / D), ease = 1 - Math.pow(1 - k, 3);
      el.textContent = fmt(Math.round(target * ease)) + suf;
      if (k < 1) requestAnimationFrame(tick);
    })(t0);
  }), { threshold: .4 });
  $$('[data-count]').forEach(el => io.observe(el));
}

/* ─────────── ۵) صفحهٔ اصلی ─────────── */
const HERO_SLIDES = [
  {
    kicker: 'روغنکدهٔ رئوف · از ۱۳۷۵', title: 'طعم اصالت، از دل طبیعت', text: 'روغن‌های سردپرس، عرقیجات و خوشمزه‌های سنتی؛ بدون افزودنی و با عطر خاطرهٔ خانهٔ مادربزرگ.',
    primary: { href: 'shop.html', label: 'مشاهدهٔ فروشگاه' }, secondary: { href: 'about.html', label: 'درباره ما' },
    img: 'https://placehold.co/720x720/123B24/E4B027?text=Sesame+Oil', float: '۱۰۰٪ طبیعی و سردپرس'
  },
  {
    kicker: 'پیشنهاد ویژهٔ این هفته', title: 'طلای سفید آشپزخانهٔ شما', text: 'روغن کنجد معجون با دانه‌های درجه‌یک قم؛ بو و طعمی که هر غذایی را متفاوت می‌کند.',
    primary: { href: 'product.html?id=1', label: 'مشاهدهٔ محصول' },
    img: 'https://placehold.co/720x720/1E4D31/EFE7D3?text=Cold+Press', float: '۱۵٪ تخفیف ویژه'
  },
  {
    kicker: 'جشنوارهٔ پاییزه', title: 'تا ۲۰٪ تخفیف روی محصولات منتخب', text: 'فرصت محدود برای تهیهٔ روغن‌های درمانی، رب انار و اردهٔ سنتی با بهترین قیمت سال.',
    primary: { href: 'shop.html?sort=discount', label: 'دریافت تخفیف' },
    img: 'https://placehold.co/720x720/946B2D/FFF8E7?text=Pomegranate', float: 'ارسال رایگان'
  },
];

function initHome() {
  /* — هیرو: اسلایدها روی‌هم‌افتاده با grid — */
  $('#hero-slides').innerHTML = HERO_SLIDES.map((s, i) => `
  <div class="hero-slide ${i === 0 ? 'active' : ''} py-12 lg:py-0">
    <div class="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
      <div class="max-w-xl">
        <span class="hero-st inline-flex items-center gap-2 text-gold text-sm font-bold bg-gold/10 border border-gold/30 rounded-full px-4 py-1.5"><i data-lucide="sparkles" class="w-4 h-4"></i> ${s.kicker}</span>
        <h1 class="hero-st mt-6 text-3xl sm:text-5xl lg:text-[3.3rem] font-black leading-[1.3]">${s.title}</h1>
        <p class="hero-st mt-5 text-cream/70 sm:text-lg leading-9">${s.text}</p>
        <div class="hero-st mt-8 flex flex-wrap gap-3">
          <a href="${s.primary.href}" class="btn-gold">${s.primary.label} <i data-lucide="arrow-left" class="w-5 h-5"></i></a>
          ${s.secondary ? `<a href="${s.secondary.href}" class="btn-ghost-hero">${s.secondary.label}</a>` : ''}
        </div>
      </div>
      <div class="hero-st relative mx-auto w-64 h-64 sm:w-80 sm:h-80 lg:w-[24rem] lg:h-[24rem]">
        <div class="absolute -inset-4 rounded-full border border-dashed border-gold/30"></div>
        <img src="${s.img}" alt="${s.title}" class="w-full h-full object-cover rounded-full border-4 border-gold/40 shadow-soft">
        <div class="absolute -bottom-3 right-6 bg-cream text-forest rounded-xl px-4 py-2.5 shadow-soft flex items-center gap-2">
          <i data-lucide="sparkles" class="w-4 h-4 text-goldd"></i><span class="text-xs font-black">${s.float}</span>
        </div>
      </div>
    </div>
  </div>`).join('');

  // کنترل اسلایدر
  let hIdx = 0, hTimer;
  const hGo = i => {
    hIdx = (i + HERO_SLIDES.length) % HERO_SLIDES.length;
    $$('#hero-slides .hero-slide').forEach((el, k) => el.classList.toggle('active', k === hIdx));
    $$('#hero-dots .dot').forEach((d, k) => d.classList.toggle('active', k === hIdx));
  };
  const hAuto = () => { clearInterval(hTimer); hTimer = setInterval(() => hGo(hIdx + 1), 6500); };
  $('#hero-dots').innerHTML = HERO_SLIDES.map((_, i) => `<button class="dot ${i === 0 ? 'active' : ''}" data-dot="${i}" aria-label="اسلاید ${fmt(i + 1)}"></button>`).join('');
  $('#hero-dots').addEventListener('click', e => { const d = e.target.closest('[data-dot]'); if (d) { hGo(+d.dataset.dot); hAuto(); } });
  $('#hero-next').addEventListener('click', () => { hGo(hIdx + 1); hAuto(); });
  $('#hero-prev').addEventListener('click', () => { hGo(hIdx - 1); hAuto(); });
  $('#hero').addEventListener('mouseenter', () => clearInterval(hTimer));
  $('#hero').addEventListener('mouseleave', hAuto);
  hAuto();

  /* — دسته‌بندی‌ها — */
  $('#cats-grid').innerHTML = CATS.map(c => {
    const n = PRODUCTS.filter(p => p.cat === c.slug).length;
    return `
    <a href="shop.html?cat=${c.slug}" class="reveal group bg-white rounded-2xl border border-forest/10 shadow-card p-5 flex flex-col items-center gap-3 text-center hover:shadow-soft hover:-translate-y-1 hover:border-gold/60 transition duration-300">
      <span class="w-14 h-14 rounded-full bg-cream border border-gold/30 grid place-items-center group-hover:bg-gold/15 transition">
        <i data-lucide="${c.icon}" class="w-6 h-6 text-moss group-hover:text-goldd transition"></i>
      </span>
      <span class="text-sm font-black text-forest group-hover:text-moss">${c.title}</span>
      <span class="text-[11px] text-forest/45">${fmt(n)} محصول</span>
    </a>`;
  }).join('');

  /* — کاروسل‌های محصول — */
  const news = PRODUCTS.filter(p => p.isNew);
  $('#track-new').innerHTML = news.map(p => productCard(p)).join('');
  const best = PRODUCTS.filter(p => p.isBest).sort((a, b) => b.sales - a.sales).slice(0, 10);
  $('#track-best').innerHTML = best.map(p => productCard(p)).join('');
  const off = PRODUCTS.filter(p => p.discount).sort((a, b) => b.discount - a.discount).slice(0, 10);
  $('#track-off').innerHTML = off.map(p => productCard(p, { disc: true })).join('');

  /* — اسلایدر نظرات — */
  let tIdx = 0, tTimer;
  const tGo = i => {
    tIdx = (i + TESTIMONIALS.length) % TESTIMONIALS.length;
    $$('#t-slider .t-slide').forEach((el, k) => el.classList.toggle('active', k === tIdx));
    $$('#t-dots .dot').forEach((d, k) => d.classList.toggle('active', k === tIdx));
  };
  const tAuto = () => { clearInterval(tTimer); tTimer = setInterval(() => tGo(tIdx + 1), 7000); };
  $('#t-slider').innerHTML = TESTIMONIALS.map((t, i) => `
  <div class="t-slide ${i === 0 ? 'active' : ''} bg-white rounded-2xl p-7 sm:p-9 shadow-card relative">
    <i data-lucide="quote" class="w-8 h-8 text-gold/50 absolute top-6 left-6"></i>
    <p class="text-forest/80 leading-9 text-[15px]">${t.text}</p>
    <div class="mt-6 flex items-center gap-3 flex-wrap">
      <span class="w-11 h-11 rounded-full bg-moss text-gold grid place-items-center font-black">${t.name[0]}</span>
      <div><p class="font-black text-forest text-sm">${t.name}</p><p class="text-xs text-forest/50 mt-0.5">${t.city} · مشتری روغنکده</p></div>
      <span class="mr-auto flex gap-0.5">${Array.from({ length: 5 }, (_, k) => `<i data-lucide="star" class="w-4 h-4 ${k < t.rating ? 'fill-gold text-gold' : 'text-forest/15'}"></i>`).join('')}</span>
    </div>
  </div>`).join('');
  $('#t-dots').innerHTML = TESTIMONIALS.map((_, i) => `<button class="dot ${i === 0 ? 'active' : ''}" aria-label="نظر ${fmt(i + 1)}"></button>`).join('');
  $('#t-dots').addEventListener('click', e => { if (e.target.closest('.dot')) { const k = [...$$('#t-dots .dot')].indexOf(e.target.closest('.dot')); tGo(k); tAuto(); } });
  $('#t-next').addEventListener('click', () => { tGo(tIdx + 1); tAuto(); });
  $('#t-prev').addEventListener('click', () => { tGo(tIdx - 1); tAuto(); });
  tAuto();

  /* — کاروسل مقالات — */
  $('#track-articles').innerHTML = ARTICLES.map(a => `
  <article class="w-[290px] sm:w-[330px] shrink-0 snap-start bg-white rounded-2xl overflow-hidden shadow-card group">
    <div class="relative h-44 overflow-hidden">
      <img src="${a.img}" alt="${a.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
      <span class="absolute top-3 right-3 bg-forest/85 text-gold text-[11px] font-bold px-3 py-1 rounded-full">${a.cat}</span>
    </div>
    <div class="p-5">
      <div class="flex items-center gap-2 text-xs text-forest/50"><i data-lucide="calendar" class="w-4 h-4"></i>${a.date} · ${a.min} دقیقه مطالعه</div>
      <h3 class="mt-2.5 font-black text-forest leading-8 line-clamp-2">${a.title}</h3>
      <p class="mt-2 text-sm text-forest/55 leading-7 line-clamp-2">${a.summary}</p>
      <button data-article="${a.id}" class="mt-4 inline-flex items-center gap-1.5 text-goldd font-black text-sm hover:gap-3 transition-all">ادامهٔ مطلب <i data-lucide="arrow-left" class="w-4 h-4"></i></button>
    </div>
  </article>`).join('');

  initCarousels();
  refreshIcons();
}

/* ─────────── ۶) صفحهٔ فروشگاه ─────────── */
function initShop() {
  const state = { cats: new Set(), min: null, max: null, sort: 'newest', view: 'grid', page: 1, q: '' };
  const VALID_SORTS = ['newest', 'cheap', 'expensive', 'discount', 'bestseller'];
  const params = new URLSearchParams(location.search);
  if (params.get('cat')) state.cats.add(params.get('cat'));
  if (params.get('q')) state.q = params.get('q').trim();
  if (params.get('sort') && VALID_SORTS.includes(params.get('sort'))) state.sort = params.get('sort');
  $('#sort-select').value = state.sort;

  /* — سایدبار: چک‌باکس دسته‌ها — */
  $('#cat-filters').innerHTML = CATS.map(c => {
    const n = PRODUCTS.filter(p => p.cat === c.slug).length;
    return `
    <label class="flex items-center gap-3 py-2.5 cursor-pointer group">
      <input type="checkbox" value="${c.slug}" ${state.cats.has(c.slug) ? 'checked' : ''} class="cbox">
      <span class="text-sm text-forest/70 group-hover:text-forest transition flex-1">${c.title}</span>
      <span class="text-[11px] text-forest/35">${fmt(n)}</span>
    </label>`;
  }).join('');
  $('#cat-filters').addEventListener('change', e => {
    if (e.target.type !== 'checkbox') return;
    e.target.checked ? state.cats.add(e.target.value) : state.cats.delete(e.target.value);
    state.page = 1; apply();
  });

  /* — فیلتر قیمت — */
  $('#price-apply').addEventListener('click', () => {
    let min = Number($('#price-min').value), max = Number($('#price-max').value);
    if (min && max && min > max) [min, max] = [max, min];
    state.min = $('#price-min').value ? min : null;
    state.max = $('#price-max').value ? max : null;
    state.page = 1; apply(); closeSidebar();
  });

  const resetFilters = () => {
    state.cats.clear(); state.min = state.max = null; state.q = ''; state.page = 1;
    $$('#cat-filters input').forEach(c => c.checked = false);
    $('#price-min').value = ''; $('#price-max').value = '';
    history.replaceState({}, '', 'shop.html');
    apply(); renderQChip();
  };
  $('#filters-reset').addEventListener('click', resetFilters);

  /* — مرتب‌سازی و نمای گرید/لیست — */
  $('#sort-select').addEventListener('change', e => { state.sort = e.target.value; state.page = 1; apply(); });
  $$('[data-view]').forEach(b => b.addEventListener('click', () => {
    if (b.dataset.view === state.view) return;
    state.view = b.dataset.view; state.page = 1;
    $$('[data-view]').forEach(x => x.classList.toggle('active', x === b));
    apply();
  }));

  /* — سایدبار موبایل — */
  const openSidebar = () => { $('#shop-sidebar').classList.add('open'); $('#shop-ov').classList.add('show'); document.body.style.overflow = 'hidden'; };
  const closeSidebar = () => { $('#shop-sidebar').classList.remove('open'); $('#shop-ov').classList.remove('show'); document.body.style.overflow = ''; };
  $('#btn-filters').addEventListener('click', openSidebar);
  $('#sidebar-close').addEventListener('click', closeSidebar);
  $('#sidebar-done').addEventListener('click', closeSidebar);
  $('#shop-ov').addEventListener('click', closeSidebar);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSidebar(); });

  /* — چیپ جستجو — */
  function renderQChip() {
    const box = $('#q-chip');
    if (!state.q) { box.innerHTML = ''; return; }
    box.innerHTML = `<span class="inline-flex items-center gap-2 bg-gold/15 border border-gold/40 text-forest text-xs font-bold rounded-full px-3.5 py-1.5">نتایج برای «${state.q}»<button id="q-clear" class="w-4 h-4 grid place-items-center hover:text-brick" aria-label="حذف"><i data-lucide="x" class="w-3 h-3"></i></button></span>`;
    $('#q-clear').addEventListener('click', () => { state.q = ''; state.page = 1; history.replaceState({}, '', 'shop.html'); apply(); renderQChip(); });
    refreshIcons();
  }

  /* — اعمال فیلتر + مرتب‌سازی + صفحه‌بندی — */
  function apply() {
    let list = PRODUCTS.filter(p => {
      if (state.cats.size && !state.cats.has(p.cat)) return false;
      if (state.min != null && p.price < state.min) return false;
      if (state.max != null && p.price > state.max) return false;
      if (state.q && !(p.name.includes(state.q) || catTitle(p.cat).includes(state.q))) return false;
      return true;
    });
    const SORTS = {
      newest: (a, b) => b.id - a.id,
      cheap: (a, b) => a.price - b.price,
      expensive: (a, b) => b.price - a.price,
      discount: (a, b) => b.discount - a.discount,
      bestseller: (a, b) => b.sales - a.sales,
    };
    list = list.slice().sort(SORTS[state.sort]);

    const per = 8, pages = Math.max(1, Math.ceil(list.length / per));
    state.page = Math.min(state.page, pages);
    const slice = list.slice((state.page - 1) * per, state.page * per);

    $('#result-count').textContent = fmt(list.length);
    const grid = $('#shop-grid');
    grid.className = state.view === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5' : 'flex flex-col gap-4';
    grid.innerHTML = slice.length
      ? slice.map(p => state.view === 'grid' ? productCard(p, { w: 'w-full' }) : productRow(p)).join('')
      : `<div class="col-span-2 md:col-span-3 bg-white rounded-2xl shadow-card p-14 text-center">
          <span class="w-16 h-16 rounded-full bg-cream border border-forest/10 grid place-items-center mx-auto"><i data-lucide="search" class="w-7 h-7 text-forest/30"></i></span>
          <p class="mt-5 font-black text-forest">محصولی مطابق فیلترهای شما پیدا نشد</p>
          <p class="mt-1.5 text-sm text-forest/55">محدودهٔ قیمت را بازتر کنید یا فیلترها را حذف کنید.</p>
          <button id="empty-reset" class="btn-gold mt-6 !py-3 !px-6 text-sm">حذف فیلترها</button>
        </div>`;
    const er = $('#empty-reset');
    if (er) er.addEventListener('click', resetFilters);

    /* صفحه‌بندی */
    const pg = $('#pagination');
    if (pages <= 1) { pg.innerHTML = ''; }
    else {
      let html = `<button class="p-btn" data-page="${state.page - 1}" ${state.page === 1 ? 'disabled' : ''} aria-label="قبلی"><i data-lucide="chevron-right" class="w-4 h-4"></i></button>`;
      for (let i = 1; i <= pages; i++) html += `<button class="p-btn ${i === state.page ? 'active' : ''}" data-page="${i}">${fmt(i)}</button>`;
      html += `<button class="p-btn" data-page="${state.page + 1}" ${state.page === pages ? 'disabled' : ''} aria-label="بعدی"><i data-lucide="chevron-left" class="w-4 h-4"></i></button>`;
      pg.innerHTML = html;
    }
    refreshIcons();
  }
  $('#pagination').addEventListener('click', e => {
    const b = e.target.closest('[data-page]');
    if (!b || b.disabled) return;
    state.page = +b.dataset.page; apply();
    window.scrollTo({ top: $('#shop-grid').offsetTop - 140, behavior: 'smooth' });
  });

  renderQChip();
  apply();
}

/* ─────────── ۷) صفحهٔ محصول تکی ─────────── */
function initProduct() {
  const id = Number(new URLSearchParams(location.search).get('id'));
  const p = PRODUCTS.find(x => x.id === id);

  if (!p) { // محصول یافت نشد
    $('#product-root').innerHTML = `
    <div class="bg-white rounded-2xl shadow-card p-14 text-center max-w-lg mx-auto">
      <span class="w-16 h-16 rounded-full bg-brick/10 text-brick grid place-items-center mx-auto"><i data-lucide="package" class="w-8 h-8"></i></span>
      <h1 class="mt-5 text-xl font-black text-forest">محصول مورد نظر پیدا نشد</h1>
      <p class="mt-2 text-sm text-forest/60">ممکن است آدرس اشتباه باشد یا این محصول حذف شده باشد.</p>
      <a href="shop.html" class="btn-gold mt-6 !py-3 !px-6 text-sm">بازگشت به فروشگاه</a>
    </div>`;
    refreshIcons();
    return;
  }
  document.title = `${p.name} | روغنکده رئوف`;

  let qty = 1;
  let reviews = [...PRODUCT_REVIEWS];

  $('#product-root').innerHTML = `
  <!-- مسیر (breadcrumb) -->
  <nav class="flex items-center gap-2 text-xs sm:text-sm text-forest/55 flex-wrap">
    <a href="index.html" class="hover:text-goldd transition">خانه</a><i data-lucide="chevron-left" class="w-4 h-4"></i>
    <a href="shop.html" class="hover:text-goldd transition">فروشگاه</a><i data-lucide="chevron-left" class="w-4 h-4"></i>
    <a href="shop.html?cat=${p.cat}" class="hover:text-goldd transition">${catTitle(p.cat)}</a><i data-lucide="chevron-left" class="w-4 h-4"></i>
    <span class="text-forest font-bold">${p.name}</span>
  </nav>

  <div class="grid lg:grid-cols-2 gap-8 lg:gap-14 items-start mt-6">
    <!-- گالری -->
    <div>
      <div class="relative bg-white rounded-2xl overflow-hidden shadow-card">
        <img id="main-img" src="${p.images[0]}" alt="${p.name}" class="w-full aspect-square object-cover transition duration-300">
        ${p.discount ? `<span class="absolute top-4 right-4 bg-brick text-white text-sm font-black w-12 h-12 rounded-full grid place-items-center shadow-lg">${fmt(p.discount)}٪</span>` : ''}
      </div>
      <div class="flex gap-3 mt-4">
        ${p.images.map((im, i) => `<button class="th-btn ${i === 0 ? 'active' : ''}" data-thumb="${im}"><img src="${im}" alt="نمای ${fmt(i + 1)}" class="w-20 h-20 object-cover"></button>`).join('')}
      </div>
    </div>

    <!-- اطلاعات -->
    <div>
      <a href="shop.html?cat=${p.cat}" class="inline-flex items-center gap-1.5 text-xs font-bold text-goldd bg-gold/10 border border-gold/30 rounded-full px-3.5 py-1.5 hover:bg-gold/20 transition">${catTitle(p.cat)}</a>
      <h1 class="mt-4 text-2xl sm:text-3xl font-black text-forest leading-snug">${p.name}</h1>
      <div class="mt-3 flex items-center gap-3 text-sm">
        <span class="flex items-center gap-1.5"><i data-lucide="star" class="w-4 h-4 fill-gold text-gold"></i><b class="text-forest">${fmt(p.rating)}</b></span>
        <span class="text-forest/25">|</span>
        <span class="text-forest/60">${fmt(p.sales)} فروش موفق</span>
      </div>
      <p class="mt-5 text-forest/70 leading-9">${p.desc}</p>

      <!-- قیمت -->
      <div class="mt-6 bg-white rounded-2xl p-5 shadow-card border-r-4 border-gold flex items-center justify-between flex-wrap gap-3">
        ${p.oldPrice ? `<div class="text-left"><s class="text-forest/35 text-base">${fmt(p.oldPrice)}</s><p class="text-[11px] text-brick font-bold mt-0.5">تخفیف ویژهٔ روغنکده</p></div>` : '<span class="text-xs font-bold text-forest/45">قیمت محصول</span>'}
        <div class="flex items-baseline gap-2">
          <span class="text-3xl font-black text-forest">${fmt(p.price)}</span>
          <span class="text-sm text-forest/60 font-medium">تومان</span>
        </div>
      </div>

      <!-- تعداد + افزودن -->
      <div class="mt-6 flex flex-wrap items-center gap-4">
        <div class="flex items-center border border-forest/15 rounded-xl bg-white overflow-hidden shadow-card">
          <button id="qty-plus" class="w-11 h-12 grid place-items-center text-forest hover:bg-cream transition" aria-label="افزایش"><i data-lucide="plus" class="w-4 h-4"></i></button>
          <span id="qty-val" class="w-12 text-center font-black text-forest text-lg">۱</span>
          <button id="qty-minus" class="w-11 h-12 grid place-items-center text-forest hover:bg-cream transition" aria-label="کاهش"><i data-lucide="minus" class="w-4 h-4"></i></button>
        </div>
        <button id="btn-add-main" class="flex-1 min-w-[220px] h-14 bg-gold hover:bg-goldl text-forest font-black text-lg rounded-xl inline-flex items-center justify-center gap-2.5 shadow-soft transition active:scale-[.98]">
          <i data-lucide="shopping-cart" class="w-5 h-5"></i> افزودن به سبد خرید
        </button>
        <button id="btn-fav" class="w-14 h-14 rounded-xl border border-forest/15 bg-white grid place-items-center text-forest/40 hover:text-brick hover:border-brick/40 transition shadow-card" title="افزودن به علاقه‌مندی‌ها" aria-label="علاقه‌مندی"><i data-lucide="heart" class="w-6 h-6"></i></button>
      </div>

      <!-- آیتم‌های اعتمادساز -->
      <div class="mt-8 grid grid-cols-3 gap-3">
        ${[['shield-check', 'ضمانت اصالت کالا'], ['truck', 'ارسال ۲۴ تا ۷۲ ساعته'], ['rotate-ccw', '۷ روز مهلت مرجوعی']].map(([ic, tx]) => `
        <div class="bg-white rounded-xl border border-forest/10 p-3.5 text-center">
          <i data-lucide="${ic}" class="w-5 h-5 text-goldd mx-auto"></i>
          <p class="text-[11px] font-bold text-forest/70 mt-2 leading-5">${tx}</p>
        </div>`).join('')}
      </div>
    </div>
  </div>

  <!-- تب‌ها -->
  <div class="mt-12 lg:mt-16">
    <div class="flex gap-1 sm:gap-2 border-b border-forest/10 flex-wrap">
      <button class="tab-btn active" data-tab="desc">توضیحات محصول</button>
      <button class="tab-btn" data-tab="specs">مشخصات فنی</button>
      <button class="tab-btn" data-tab="reviews">نظرات کاربران</button>
    </div>
    <div class="bg-white rounded-b-2xl rounded-tl-2xl shadow-card p-6 sm:p-9">
      <div id="tab-desc" class="tab-body leading-9 text-forest/75">${p.full}</div>
      <div id="tab-specs" class="tab-body hidden">
        <dl class="divide-y divide-forest/10">
          ${Object.entries(p.specs).map(([k, v]) => `
          <div class="grid grid-cols-[130px_1fr] sm:grid-cols-[210px_1fr] gap-3 py-4">
            <dt class="text-forest/50 text-sm">${k}</dt><dd class="text-forest font-bold text-sm">${v}</dd>
          </div>`).join('')}
        </dl>
      </div>
      <div id="tab-reviews" class="tab-body hidden">
        <div id="reviews-list" class="space-y-4"></div>
        <form id="review-form" class="mt-8 pt-6 border-t border-forest/10 grid gap-3" novalidate>
          <p class="font-black text-forest">ثبت نظر شما</p>
          <div class="grid sm:grid-cols-2 gap-3">
            <input id="rv-name" type="text" class="field" placeholder="نام شما">
            <div class="flex items-center gap-1.5" id="rv-stars">
              ${[1, 2, 3, 4, 5].map(i => `<button type="button" data-star="${i}" class="p-1" aria-label="${fmt(i)} ستاره"><i data-lucide="star" class="w-6 h-6 text-forest/20 transition"></i></button>`).join('')}
            </div>
          </div>
          <textarea id="rv-text" rows="3" class="field" placeholder="نظر شما دربارهٔ این محصول…"></textarea>
          <p id="rv-error" class="hidden text-sm text-brick font-bold"></p>
          <button type="submit" class="btn-gold justify-self-start !py-3 text-sm h-12">ثبت نظر</button>
        </form>
      </div>
    </div>
  </div>

  <!-- محصولات مشابه -->
  <div class="mt-14">
    <div class="flex items-end justify-between gap-4 mb-7">
      <div>
        <span class="section-kicker">پیشنهاد ما</span>
        <h2 class="section-title !mt-2">محصولات مشابه</h2>
      </div>
      <div class="flex gap-2 shrink-0">
        <button class="c-btn" data-prev data-target="#track-similar" aria-label="قبلی"><i data-lucide="chevron-right" class="w-5 h-5"></i></button>
        <button class="c-btn" data-next data-target="#track-similar" aria-label="بعدی"><i data-lucide="chevron-left" class="w-5 h-5"></i></button>
      </div>
    </div>
    <div id="track-similar" class="carousel-track no-scrollbar flex gap-4 sm:gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 pt-1">
      ${PRODUCTS.filter(x => x.cat === p.cat && x.id !== p.id).sort((a, b) => b.sales - a.sales).slice(0, 8).map(x => productCard(x)).join('')}
    </div>
  </div>`;

  /* — گالری — */
  const mainImg = $('#main-img');
  $$('.th-btn').forEach(t => t.addEventListener('click', () => {
    mainImg.src = t.dataset.thumb;
    $$('.th-btn').forEach(x => x.classList.toggle('active', x === t));
  }));

  /* — تعداد — */
  const qtyVal = $('#qty-val');
  $('#qty-plus').addEventListener('click', () => { qty = Math.min(99, qty + 1); qtyVal.textContent = fmt(qty); });
  $('#qty-minus').addEventListener('click', () => { qty = Math.max(1, qty - 1); qtyVal.textContent = fmt(qty); });

  /* — افزودن به سبد (با باز شدن دراور) — */
  $('#btn-add-main').addEventListener('click', () => Cart.add(p.id, qty, { open: true }));
  $('#btn-fav').addEventListener('click', () => showToast('به فهرست علاقه‌مندی‌ها اضافه شد (نمایشی)', 'heart'));

  /* — تب‌ها — */
  $$('.tab-btn').forEach(b => b.addEventListener('click', () => {
    $$('.tab-btn').forEach(x => x.classList.toggle('active', x === b));
    $$('.tab-body').forEach(x => x.classList.toggle('hidden', x.id !== 'tab-' + b.dataset.tab));
  }));

  /* — نظرات — */
  function renderReviews() {
    $('#reviews-list').innerHTML = reviews.map(r => `
    <div class="bg-cream rounded-2xl p-5">
      <div class="flex items-center gap-3 flex-wrap">
        <span class="w-10 h-10 rounded-full bg-moss text-gold grid place-items-center font-black">${r.name[0]}</span>
        <div><p class="font-black text-forest text-sm">${r.name}</p><p class="text-[11px] text-forest/45 mt-0.5">${r.date}</p></div>
        <span class="mr-auto flex gap-0.5">${Array.from({ length: 5 }, (_, k) => `<i data-lucide="star" class="w-3.5 h-3.5 ${k < r.rating ? 'fill-gold text-gold' : 'text-forest/15'}"></i>`).join('')}</span>
      </div>
      <p class="mt-3 text-sm text-forest/70 leading-8">${r.text}</p>
    </div>`).join('');
    refreshIcons();
  }
  renderReviews();

  /* فرم ثبت نظر (نمایشی) */
  let rvRating = 0;
  $('#rv-stars').addEventListener('click', e => {
    const b = e.target.closest('[data-star]');
    if (!b) return;
    rvRating = +b.dataset.star;
    $$('#rv-stars [data-star]').forEach(x => {
      const on = +x.dataset.star <= rvRating;
      const ic = x.querySelector('i, svg');
      if (ic) { ic.className = ic.tagName === 'svg' ? ic.className : ''; }
      x.querySelector('svg')?.classList.remove('fill-gold', 'text-forest/20');
      x.querySelector('svg')?.classList.add(on ? 'fill-gold' : 'text-forest/20', on ? 'text-gold' : 'text-forest/20');
    });
    $$('#rv-stars [data-star]').forEach(x => { const s = x.querySelector('svg'); if (s) s.setAttribute('class', `${+x.dataset.star <= rvRating ? 'fill-gold text-gold' : 'fill-none text-forest/25'} w-6 h-6`); });
  });
  $('#review-form').addEventListener('submit', e => {
    e.preventDefault();
    const name = $('#rv-name').value.trim(), text = $('#rv-text').value.trim(), err = $('#rv-error');
    if (!name || !text || !rvRating) { err.textContent = 'لطفاً نام، متن نظر و امتیاز (ستاره‌ها) را کامل کنید.'; err.classList.remove('hidden'); return; }
    err.classList.add('hidden');
    reviews = [{ name, date: 'همین حالا', rating: rvRating, text }, ...reviews];
    renderReviews();
    e.target.reset(); rvRating = 0;
    $$('#rv-stars svg').forEach(s => s.setAttribute('class', 'fill-none text-forest/25 w-6 h-6'));
    showToast('نظر شما ثبت شد و پس از تأیید نمایش داده می‌شود');
  });

  initCarousels();
  refreshIcons();
}

/* ─────────── ۸) صفحهٔ تماس ─────────── */
function initContact() {
  const form = $('#contact-form');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const err = $('#cf-error');
    const checks = [
      [!$('#cf-name').value.trim(), 'لطفاً نام خود را وارد کنید.'],
      [!$('#cf-contact').value.trim(), 'لطفاً ایمیل یا شمارهٔ تماس را وارد کنید.'],
      [!$('#cf-subject').value.trim(), 'لطفاً موضوع پیام را مشخص کنید.'],
      [!$('#cf-msg').value.trim().length > 0 === false || $('#cf-msg').value.trim().length < 5, 'متن پیام خیلی کوتاه است.'],
    ];
    const bad = checks.find(c => c[0]);
    if (bad) { err.textContent = bad[1]; err.classList.remove('hidden'); return; }
    err.classList.add('hidden');
    form.classList.add('hidden');
    $('#cf-success').classList.remove('hidden');
    showToast('پیام شما با موفقیت ارسال شد');
    refreshIcons();
  });
}

/* ─────────── ۸) صفحهٔ بلاگ ─────────── */
function initBlog() {
  let activeFilter = 'all';

  function renderArticles() {
    const list = activeFilter === 'all'
      ? ARTICLES
      : ARTICLES.filter(a => a.cat === activeFilter);

    const grid = $('#blog-grid');
    grid.innerHTML = list.length
      ? list.map(a => `
        <article class="blog-card reveal">
          <a href="article.html?id=${a.id}" class="block">
            <div class="blog-card-img">
              <img src="${a.img}" alt="${a.title}">
            </div>
            <div class="p-5">
              <div class="flex items-center gap-2 text-xs text-forest/50">
                <span class="bg-gold/15 text-goldd font-bold px-3 py-1 rounded-full">${a.cat}</span>
                <span class="flex items-center gap-1"><i data-lucide="calendar" class="w-3.5 h-3.5"></i>${a.date}</span>
                <span class="flex items-center gap-1"><i data-lucide="clock" class="w-3.5 h-3.5"></i>${a.min} دقیقه</span>
              </div>
              <h3 class="mt-3 font-black text-forest leading-8 line-clamp-2">${a.title}</h3>
              <p class="mt-2 text-sm text-forest/60 leading-7 line-clamp-2">${a.summary}</p>
              <span class="mt-4 inline-flex items-center gap-1.5 text-goldd font-black text-sm hover:gap-3 transition-all">
                ادامه مطلب <i data-lucide="arrow-left" class="w-4 h-4"></i>
              </span>
            </div>
          </a>
        </article>`).join('')
      : `<div class="col-span-2 md:col-span-3 bg-white rounded-2xl shadow-card p-14 text-center">
          <span class="w-16 h-16 rounded-full bg-cream border border-forest/10 grid place-items-center mx-auto"><i data-lucide="file-text" class="w-7 h-7 text-forest/30"></i></span>
          <p class="mt-5 font-black text-forest">مقاله‌ای در این دسته‌بندی یافت نشد</p>
          <p class="mt-1.5 text-sm text-forest/55">دسته‌بندی دیگری را انتخاب کنید.</p>
        </div>`;

    refreshIcons();
    initReveal();
  }

  // فیلترها
  $$('.blog-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      activeFilter = btn.dataset.filter;
      $$('.blog-filter').forEach(b => b.classList.toggle('active', b === btn));
      renderArticles();
    });
  });

  renderArticles();
}

/* ─────────── ۹) صفحهٔ مقاله تکی ─────────── */
function initArticle() {
  const id = Number(new URLSearchParams(location.search).get('id'));
  const a = ARTICLES.find(x => x.id === id);

  if (!a) {
    $('#article-root').innerHTML = `
    <div class="bg-white rounded-2xl shadow-card p-14 text-center max-w-lg mx-auto">
      <span class="w-16 h-16 rounded-full bg-brick/10 text-brick grid place-items-center mx-auto"><i data-lucide="file-text" class="w-8 h-8"></i></span>
      <h1 class="mt-5 text-xl font-black text-forest">مقاله مورد نظر پیدا نشد</h1>
      <p class="mt-2 text-sm text-forest/60">ممکن است آدرس اشتباه باشد یا این مقاله حذف شده باشد.</p>
      <a href="blog.html" class="btn-gold mt-6 !py-3 !px-6 text-sm">بازگشت به مجله</a>
    </div>`;
    refreshIcons();
    return;
  }

  document.title = `${a.title} | روغنکده رئوف`;

  $('#article-root').innerHTML = `
  <!-- مسیر (breadcrumb) -->
  <nav class="flex items-center gap-2 text-xs sm:text-sm text-forest/55 flex-wrap">
    <a href="index.html" class="hover:text-goldd transition">خانه</a>
    <i data-lucide="chevron-left" class="w-4 h-4"></i>
    <a href="blog.html" class="hover:text-goldd transition">مجله روغنکده</a>
    <i data-lucide="chevron-left" class="w-4 h-4"></i>
    <span class="text-forest font-bold">${a.cat}</span>
  </nav>

  <!-- تصویر اصلی -->
  <div class="mt-6 rounded-3xl overflow-hidden shadow-soft">
    <img src="${a.img}" alt="${a.title}" class="w-full h-64 sm:h-80 lg:h-96 object-cover">
  </div>

  <!-- محتوای مقاله -->
  <div class="mt-8">
    <div class="flex items-center gap-3 flex-wrap">
      <span class="bg-gold/15 text-goldd font-bold text-sm px-4 py-1.5 rounded-full">${a.cat}</span>
      <span class="flex items-center gap-1.5 text-sm text-forest/50"><i data-lucide="calendar" class="w-4 h-4"></i>${a.date}</span>
      <span class="flex items-center gap-1.5 text-sm text-forest/50"><i data-lucide="clock" class="w-4 h-4"></i>${a.min} دقیقه مطالعه</span>
    </div>

    <h1 class="mt-6 text-2xl sm:text-3xl lg:text-4xl font-black text-forest leading-snug">${a.title}</h1>

    <p class="mt-4 text-lg text-forest/70 leading-9">${a.summary}</p>

    <div class="mt-8 prose prose-lg max-w-none">
      ${a.body.map(p => `<p class="mt-6 text-forest/80 leading-9 text-[15px]">${p}</p>`).join('')}
    </div>

    <!-- اشتراک‌گذاری -->
    <div class="mt-10 pt-8 border-t border-forest/10">
      <p class="font-black text-forest mb-4">اشتراک‌گذاری مقاله</p>
      <div class="flex gap-2">
        <a href="#" class="w-10 h-10 rounded-xl bg-forest/5 border border-forest/10 grid place-items-center hover:bg-gold hover:text-forest hover:border-gold transition"><i data-lucide="share-2" class="w-4 h-4"></i></a>
        <a href="#" class="w-10 h-10 rounded-xl bg-forest/5 border border-forest/10 grid place-items-center hover:bg-gold hover:text-forest hover:border-gold transition"><i data-lucide="link" class="w-4 h-4"></i></a>
      </div>
    </div>

    <!-- مقالات مرتبط -->
    <div class="mt-12">
      <div class="flex items-end justify-between gap-4 mb-7">
        <div>
          <span class="section-kicker">پیشنهاد مطالعه</span>
          <h2 class="section-title !mt-2">مقالات مرتبط</h2>
        </div>
        <a href="blog.html" class="btn-outline text-sm">همه مقالات</a>
      </div>
      <div class="grid md:grid-cols-2 gap-5">
        ${ARTICLES.filter(x => x.id !== a.id).slice(0, 2).map(x => `
        <a href="article.html?id=${x.id}" class="blog-card group">
          <div class="blog-card-img">
            <img src="${x.img}" alt="${x.title}">
          </div>
          <div class="p-4">
            <span class="text-[11px] font-bold text-goldd">${x.cat}</span>
            <h3 class="mt-2 font-black text-forest leading-7 line-clamp-2 group-hover:text-moss transition">${x.title}</h3>
          </div>
        </a>`).join('')}
      </div>
    </div>
  </div>`;

  refreshIcons();
}

/* ─────────── ۱۰) رویدادهای سراسری ─────────── */
function initGlobalEvents() {
  // افزودن سریع به سبد (دکمه‌های data-add داخل کارت‌های لینک‌دار)
  document.addEventListener('click', e => {
    const add = e.target.closest('[data-add]');
    if (add) { e.preventDefault(); e.stopPropagation(); Cart.add(+add.dataset.add); return; }
    const art = e.target.closest('[data-article]');
    if (art) { e.preventDefault(); openArticle(+art.dataset.article); return; }
    const tm = e.target.closest('[data-text-modal]');
    if (tm) { e.preventDefault(); const t = STATIC_TEXTS[tm.dataset.textModal]; if (t) openModal(t.title, t.body); }
  });
}

/* ─────────── اجرا ─────────── */
renderHeader();
renderFooter();
initGlobalEvents();
switch (PAGE) {
  case 'home': initHome(); break;
  case 'shop': initShop(); break;
  case 'product': initProduct(); break;
  case 'contact': initContact(); break;
  case 'blog': initBlog(); break;
  case 'article': initArticle(); break;
}
initReveal();
initCounters();
Cart.refreshUI(); // رندر بج سبد و دراور پس از ساخت هدر
refreshIcons();