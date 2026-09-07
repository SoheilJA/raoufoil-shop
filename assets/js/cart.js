/* ═══════════════════════════════════════════════════════
   ماژول سبد خرید «روغنکده رئوف»
   مدیریت state + localStorage + دراور کشویی + Toast
   ═══════════════════════════════════════════════════════ */

const CART_KEY = 'raouf-cart-v1';

const Cart = {
    items: [], // [{ id, qty }]

    /* بارگذاری از localStorage + ساخت DOM دراور */
    init() {
        try { this.items = JSON.parse(localStorage.getItem(CART_KEY)) || []; }
        catch (e) { this.items = []; }
        this._buildDrawer();
        this._bind();
        this.refreshUI();
    },

    save() {
        try { localStorage.setItem(CART_KEY, JSON.stringify(this.items)); } catch (e) { }
        this.refreshUI();
    },

    /* تعداد کل اقلام (برای بج هدر) */
    count() { return this.items.reduce((s, i) => s + i.qty, 0); },

    /* جمع کل مبلغ سبد (قیمت پس از تخفیف) */
    total() {
        return this.items.reduce((s, i) => {
            const p = PRODUCTS.find(x => x.id === i.id);
            return s + (p ? p.price * i.qty : 0);
        }, 0);
    },

    /* افزودن محصول؛ opts.open → دراور هم باز شود */
    add(id, qty = 1, opts = {}) {
        const p = PRODUCTS.find(x => x.id === id);
        if (!p) return;
        const it = this.items.find(x => x.id === id);
        if (it) it.qty = Math.min(99, it.qty + qty);
        else this.items.push({ id, qty });
        this.save();
        if (opts.open) { this.open(); return; }
        showToast(`«${p.name}» به سبد خرید اضافه شد`, 'check-circle-2');
        const b = document.getElementById('cart-badge');
        if (b) { b.classList.remove('badge-pop'); void b.offsetWidth; b.classList.add('badge-pop'); }
    },

    setQty(id, qty) {
        const it = this.items.find(x => x.id === id);
        if (!it) return;
        it.qty = Math.max(1, Math.min(99, qty));
        this.save();
    },

    remove(id) { this.items = this.items.filter(x => x.id !== id); this.save(); },

    /* رندر بج هدر + محتوای دراور */
    refreshUI() {
        const b = document.getElementById('cart-badge');
        if (b) b.textContent = fmt(this.count());
        this._renderDrawer();
    },

    open() {
        document.getElementById('cart-drawer')?.classList.add('open');
        document.getElementById('cart-overlay')?.classList.add('open');
        document.body.style.overflow = 'hidden';
    },

    close() {
        document.getElementById('cart-drawer')?.classList.remove('open');
        document.getElementById('cart-overlay')?.classList.remove('open');
        document.body.style.overflow = '';
    },

    /* ── ساخت یک‌بارهٔ DOM دراور ── */
    _buildDrawer() {
        if (document.getElementById('cart-drawer')) return;
        document.body.insertAdjacentHTML('beforeend', `
    <div id="cart-overlay" class="fixed inset-0 z-[70] bg-deep/60 backdrop-blur-[2px]"></div>
    <aside id="cart-drawer" class="fixed top-0 bottom-0 left-0 z-[71] w-[min(26rem,92vw)] bg-cream shadow-2xl flex flex-col" aria-label="سبد خرید">
      <div class="flex items-center justify-between px-5 py-4 bg-forest text-cream shrink-0">
        <h3 class="font-black text-lg flex items-center gap-2"><i data-lucide="shopping-cart" class="w-5 h-5 text-gold"></i> سبد خرید شما</h3>
        <button id="cart-close" class="w-9 h-9 rounded-lg grid place-items-center hover:bg-cream/10 transition" aria-label="بستن"><i data-lucide="x" class="w-5 h-5"></i></button>
      </div>
      <div id="cart-items" class="flex-1 overflow-y-auto p-4 space-y-3"></div>
      <div id="cart-footer" class="border-t border-forest/10 p-4 bg-white shrink-0"></div>
    </aside>`);
    },

    /* ── رویدادهای دراور (delegation) ── */
    _bind() {
        document.getElementById('cart-close').addEventListener('click', () => this.close());
        document.getElementById('cart-overlay').addEventListener('click', () => this.close());
        document.addEventListener('keydown', e => { if (e.key === 'Escape') this.close(); });

        document.getElementById('cart-drawer').addEventListener('click', e => {
            // دکمهٔ نمایشی «ادامهٔ فرآیند خرید»
            if (e.target.closest('#cart-checkout')) {
                showToast('نسخهٔ نمایشی — درگاه پرداخت در این دمو فعال نیست', 'credit-card');
                return;
            }
            const b = e.target.closest('[data-act]');
            if (!b) return;
            const id = +b.dataset.id;
            const it = this.items.find(x => x.id === id);
            if (b.dataset.act === 'plus') this.setQty(id, (it ? it.qty : 1) + 1);
            if (b.dataset.act === 'minus') this.setQty(id, (it ? it.qty : 2) - 1);
            if (b.dataset.act === 'del') { this.remove(id); showToast('محصول از سبد حذف شد', 'trash-2'); }
        });
    },

    /* ── رندر آیتم‌ها و جمع کل ── */
    _renderDrawer() {
        const box = document.getElementById('cart-items');
        const foot = document.getElementById('cart-footer');
        if (!box) return;

        if (!this.items.length) {
            box.innerHTML = `
      <div class="h-full grid place-items-center text-center py-16">
        <div>
          <span class="w-20 h-20 rounded-full bg-forest/5 border border-forest/10 grid place-items-center mx-auto"><i data-lucide="shopping-cart" class="w-9 h-9 text-forest/30"></i></span>
          <p class="mt-5 font-black text-forest">سبد خرید شما خالی است</p>
          <p class="mt-1.5 text-sm text-forest/50 leading-7">هنوز چیزی انتخاب نکرده‌اید؛<br>از محصولات طبیعی ما دیدن کنید.</p>
          <a href="shop.html" class="btn-gold mt-6 !py-3 !px-6 text-sm">رفتن به فروشگاه</a>
        </div>
      </div>`;
            foot.innerHTML = '';
            refreshIcons();
            return;
        }

        box.innerHTML = this.items.map(({ id, qty }) => {
            const p = PRODUCTS.find(x => x.id === id);
            if (!p) return '';
            return `
      <div class="flex gap-3 bg-white rounded-2xl p-3 shadow-card">
        <img src="${p.images[0]}" alt="${p.name}" class="w-20 h-20 rounded-xl object-cover shrink-0">
        <div class="flex-1 min-w-0">
          <div class="flex items-start justify-between gap-2">
            <a href="product.html?id=${id}" class="font-bold text-sm text-forest leading-6 hover:text-goldd line-clamp-2">${p.name}</a>
            <button data-act="del" data-id="${id}" class="text-forest/30 hover:text-brick transition shrink-0 mt-1" title="حذف" aria-label="حذف"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
          </div>
          <div class="flex items-center justify-between mt-2.5 gap-2">
            <div class="flex items-center border border-forest/15 rounded-lg bg-cream">
              <button data-act="plus" data-id="${id}" class="w-7 h-7 grid place-items-center text-forest hover:bg-sand rounded-lg" aria-label="افزایش"><i data-lucide="plus" class="w-3.5 h-3.5"></i></button>
              <span class="w-8 text-center text-sm font-black text-forest">${fmt(qty)}</span>
              <button data-act="minus" data-id="${id}" class="w-7 h-7 grid place-items-center text-forest hover:bg-sand rounded-lg" aria-label="کاهش"><i data-lucide="minus" class="w-3.5 h-3.5"></i></button>
            </div>
            <div class="text-left leading-tight">
              ${p.oldPrice ? `<s class="text-[11px] text-forest/35 block">${fmt(p.oldPrice * qty)}</s>` : ''}
              <span class="text-sm font-black text-forest">${fmt(p.price * qty)} <small class="text-[10px] font-medium text-forest/50">تومان</small></span>
            </div>
          </div>
        </div>
      </div>`;
        }).join('');

        const remaining = 500000 - this.total();
        foot.innerHTML = `
      <div class="flex items-center justify-between">
        <span class="text-sm text-forest/60">جمع کل سبد:</span>
        <span class="text-xl font-black text-forest">${fmt(this.total())} <small class="text-xs font-medium text-forest/50">تومان</small></span>
      </div>
      ${remaining > 0
                ? `<p class="mt-2 text-[11px] text-goldd font-bold flex items-center gap-1.5"><i data-lucide="truck" class="w-4 h-4"></i> ${fmt(remaining)} تومان تا ارسال رایگان</p>`
                : `<p class="mt-2 text-[11px] text-moss font-bold flex items-center gap-1.5"><i data-lucide="truck" class="w-4 h-4"></i> ارسال این سفارش رایگان است</p>`}
      <div class="grid grid-cols-2 gap-2 mt-3">
        <a href="shop.html" class="h-12 grid place-items-center rounded-xl border border-forest/15 text-forest font-bold text-sm hover:bg-cream transition">مشاهدهٔ فروشگاه</a>
        <button id="cart-checkout" class="h-12 rounded-xl bg-gold hover:bg-goldl text-forest font-black text-sm transition">ادامهٔ فرآیند خرید</button>
      </div>`;
        refreshIcons();
    },
};

/* ── سیستم Toast (عمومی — در همهٔ صفحات قابل استفاده) ── */
function showToast(msg, icon = 'check-circle-2') {
    let c = document.getElementById('toast-box');
    if (!c) {
        c = document.createElement('div');
        c.id = 'toast-box';
        c.className = 'fixed bottom-5 right-5 z-[100] flex flex-col gap-2';
        document.body.appendChild(c);
    }
    const t = document.createElement('div');
    t.className = 'toast-item flex items-center gap-3 bg-forest text-cream px-5 py-3.5 rounded-xl shadow-soft max-w-xs';
    t.innerHTML = `<i data-lucide="${icon}" class="w-5 h-5 text-gold shrink-0"></i><span class="text-sm font-bold leading-6">${msg}</span>`;
    c.appendChild(t);
    refreshIcons();
    setTimeout(() => {
        t.style.opacity = '0'; t.style.transform = 'translateY(8px)';
        setTimeout(() => t.remove(), 350);
    }, 3200);
}

/* راه‌اندازی سبد (پس از لود دیتا) */
Cart.init();