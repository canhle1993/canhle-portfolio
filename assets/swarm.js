/* =====================================================================
   HIỆU ỨNG DỰNG TRANG
   Một đàn con trỏ mang tên công nghệ dựng từng phần của trang khi cuộn tới:
   kéo khung, gõ chữ, kéo bản sao cho các thẻ giống nhau.
   Tự viết, lấy cảm hứng từ Swarm của Joel Califa (https://califa.github.io/swarm-site/).

   Đoạn script nhỏ trong <head> thêm class "swarm" cho <html> ở lần đầu vào
   trang trong phiên và bỏ qua khi người xem bật giảm chuyển động. Chữ thật
   vẫn nằm sẵn trong trang, hiệu ứng chỉ ẩn bằng opacity rồi hiện dần.
   ===================================================================== */

(() => {
  const root = document.documentElement;

  /* Nút "Xem lại hiệu ứng" ở chân trang: mở lại trang với ?build để chạy từ đầu */
  const replay = document.getElementById('swarm-replay');
  if (replay) {
    replay.hidden = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    replay.addEventListener('click', () => {
      const url = new URL(location.href);
      url.hash = '';
      url.searchParams.set('build', '1');
      location.assign(url);
    });
  }

  if (!root.classList.contains('swarm')) return;
  window.__swarm = true;

  try {
    const url = new URL(location.href);
    if (url.searchParams.has('build')) {
      url.searchParams.delete('build');
      history.replaceState(null, '', url);
    }
    sessionStorage.setItem('swarm-done', '1');
  } catch {
    /* Bị chặn bộ nhớ hay đổi đường dẫn thì lần sau hiệu ứng chạy lại, không sao */
  }

  /* Đội con trỏ: tên công nghệ, màu nhận diện, màu chữ trên nhãn (mặc định trắng).
     Màn hình nhỏ chỉ dùng 5 con trỏ đầu. */
  const TEAM = [
    ['Java', '#c45f00'],
    ['Spring Boot', '#3d8b24'],
    ['React', '#0a8db0'],
    ['PostgreSQL', '#336791'],
    ['Figma', '#8b3dff'],
    ['Redis', '#cf2c1f'],
    ['JavaScript', '#e9c40e', '#1d1d1f'],
    ['Angular', '#c3005a'],
  ];
  const SKIP_TEXT = { en: 'Skip animation', vi: 'Bỏ qua hiệu ứng', ja: 'アニメーションをスキップ' };
  /* Màn hình cảm ứng không có chuột để bay theo: con trỏ rảnh mờ đi sớm để khỏi che nội dung */
  const IDLE_MS = window.matchMedia('(hover: none)').matches ? 900 : 2600;

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const linear = (p) => p;
  const easeOut = (p) => 1 - (1 - p) ** 3;
  const easeInOut = (p) => (p < 0.5 ? 4 * p ** 3 : 1 - (-2 * p + 2) ** 3 / 2);

  function docRect(el) {
    const r = el.getBoundingClientRect();
    return { x: r.left + window.scrollX, y: r.top + window.scrollY, w: r.width, h: r.height };
  }

  /* ---------- Lớp phủ: con trỏ, khung, con trỏ nhập chữ ---------- */

  const layer = document.createElement('div');
  layer.className = 'sw-layer';
  layer.setAttribute('aria-hidden', 'true');
  const skip = document.createElement('button');
  skip.type = 'button';
  skip.className = 'sw-skip';
  skip.innerHTML = `<span>${SKIP_TEXT[root.lang] || SKIP_TEXT.en}</span><kbd>Esc</kbd>`;
  document.body.append(layer, skip);

  function overlayBox(kind, color, x, y, w, h, radius) {
    const box = document.createElement('div');
    box.className = `sw-box ${kind}`;
    box.style.setProperty('--c', color);
    box.style.transform = `translate(${x}px, ${y}px)`;
    box.style.width = `${w}px`;
    box.style.height = `${h}px`;
    if (radius) box.style.borderRadius = radius;
    layer.append(box);
    return box;
  }

  function fadeOut(node) {
    node.classList.add('is-out');
    setTimeout(() => node.remove(), 320);
  }

  /* ---------- Vòng chuyển động chung ---------- */

  const jobs = new Set();
  let frameId = 0;
  let mouse = null;

  const kick = () => {
    if (!frameId) frameId = requestAnimationFrame(frame);
  };

  /* Mọi chuyển động chạy chung một vòng requestAnimationFrame.
     Phần trang đã xong (sec.done) thì chuyển động của nó dừng ngay. */
  function tween(duration, update, sec, ease = easeOut) {
    return new Promise((resolve) => {
      jobs.add({ start: performance.now(), duration: Math.max(1, duration), update, sec, ease, resolve });
      kick();
    });
  }
  const pause = (ms, sec) => tween(ms, () => {}, sec);

  function frame(now) {
    frameId = 0;
    jobs.forEach((job) => {
      if (job.sec && job.sec.done) {
        jobs.delete(job);
        job.resolve();
        return;
      }
      const p = clamp((now - job.start) / job.duration, 0, 1);
      job.update(job.ease(p));
      if (p === 1) {
        jobs.delete(job);
        job.resolve();
      }
    });
    if (idle(now) || jobs.size) kick();
  }

  /* ---------- Con trỏ ---------- */

  const ICON = `
    <svg viewBox="0 0 24 24">
      <g class="sw-arrow"><path d="M4 3v17l4.4-3.9 2.8 6.2 2.7-1.2-2.8-6.1h5.8Z" /></g>
      <g class="sw-cross">
        <path class="sw-halo" d="M12 3.5v6M12 14.5v6M3.5 12h6M14.5 12h6" />
        <path d="M12 3.5v6M12 14.5v6M3.5 12h6M14.5 12h6" />
      </g>
      <g class="sw-beam">
        <path class="sw-halo" d="M9 4.5h6M9 19.5h6M12 4.5v15" />
        <path d="M9 4.5h6M9 19.5h6M12 4.5v15" />
      </g>
    </svg>`;

  function place(cur, x, y) {
    cur.x = x;
    cur.y = y;
    cur.el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    /* Sát mép phải màn hình (hay gặp trên điện thoại) thì đưa nhãn tên sang trái để khỏi bị cắt */
    const flip = x - window.scrollX > window.innerWidth - 110;
    if (flip !== cur.flip) {
      cur.flip = flip;
      cur.el.classList.toggle('is-flip', flip);
    }
  }

  /* Cả đàn bay vào từ ngoài mép màn hình, tản ra quanh giữa màn hình chờ việc */
  const team = TEAM.slice(0, window.innerWidth < 720 ? 5 : TEAM.length);
  const viewW = window.innerWidth;
  const viewH = window.innerHeight;
  const cursors = team.map(([name, color, ink], i) => {
    const el = document.createElement('div');
    el.className = 'sw-cur';
    el.dataset.mode = 'arrow';
    el.style.setProperty('--c', color);
    if (ink) el.style.setProperty('--ct', ink);
    el.innerHTML = `${ICON}<span class="sw-name">${name}</span>`;
    layer.append(el);
    const angle = (i / team.length) * Math.PI * 2 + 0.4;
    const anchor = {
      x: window.scrollX + viewW / 2 + Math.cos(angle) * viewW * 0.28,
      y: window.scrollY + viewH / 2 + Math.sin(angle) * viewH * 0.26,
    };
    const cur = { el, color, busy: false, idleSince: performance.now(), angle, anchor, x: 0, y: 0 };
    place(cur, anchor.x + Math.cos(angle) * viewW * 0.6, anchor.y + Math.sin(angle) * viewH * 0.6);
    return cur;
  });

  /* Con trỏ rảnh: lúc mới vào thì lượn quanh chỗ chờ, sau đó bay quanh chuột một lúc rồi mờ đi.
     Trả về true khi còn con trỏ đang bay. */
  function idle(now) {
    let active = false;
    cursors.forEach((cur) => {
      if (cur.busy) return;
      const away = now - cur.idleSince > (cur.anchor ? 2600 : IDLE_MS);
      cur.el.classList.toggle('is-away', away);
      if (away) return;
      active = true;
      let x;
      let y;
      if (cur.anchor) {
        const wobble = now / 900 + cur.angle;
        x = cur.anchor.x + Math.cos(wobble) * 10;
        y = cur.anchor.y + Math.sin(wobble * 1.3) * 8;
      } else if (mouse) {
        const spin = cur.angle + now / 2400;
        x = mouse.x + window.scrollX + Math.cos(spin) * 70;
        y = mouse.y + window.scrollY + Math.sin(spin) * 52;
      } else {
        return;
      }
      place(cur, cur.x + (x - cur.x) * 0.07, cur.y + (y - cur.y) * 0.07);
    });
    return active;
  }

  /* Con trỏ đang ở ngoài màn hình thì cho bay vào từ mép gần nhất */
  function wake(cur) {
    cur.el.classList.remove('is-away');
    const top = window.scrollY;
    const bottom = top + window.innerHeight;
    if (cur.y < top - 60 || cur.y > bottom + 60) {
      place(cur, clamp(cur.x, 0, window.innerWidth), cur.y < top ? top - 30 : bottom + 30);
    }
  }

  async function moveTo(cur, x, y, sec, mode = 'arrow') {
    wake(cur);
    cur.el.dataset.mode = 'arrow';
    const fromX = cur.x;
    const fromY = cur.y;
    const distance = Math.hypot(x - fromX, y - fromY);
    await tween(
      clamp(distance * 0.4, 140, 460) / speed(),
      (p) => place(cur, fromX + (x - fromX) * p, fromY + (y - fromY) * p),
      sec,
      easeInOut
    );
    cur.el.dataset.mode = mode;
  }

  /* ---------- Hiện phần tử ---------- */

  function reveal(el, fade = true) {
    if (fade) {
      el.classList.add('sw-fade');
      setTimeout(() => el.classList.remove('sw-fade'), 450);
    }
    el.classList.add('sw-open');
    el.classList.remove('sw-t');
  }

  /* Ảnh và hình vẽ hiện dần từ trên xuống */
  function wipe(el, sec) {
    el.style.clipPath = 'inset(0 0 100% 0)';
    reveal(el, false);
    tween(600 / speed(), (p) => (el.style.clipPath = `inset(0 0 ${(1 - p) * 100}% 0)`), sec).then(() => {
      el.style.clipPath = '';
    });
  }

  /* Phần tử nằm ngoài vùng nhìn thấy của dải cuộn ngang thì hiện luôn, không vẽ */
  function scrolledOut(el, r) {
    for (let node = el.parentElement; node && node !== document.body; node = node.parentElement) {
      const cs = getComputedStyle(node);
      if (cs.overflowX !== 'visible' || cs.overflowY !== 'visible') {
        const b = node.getBoundingClientRect();
        if (r.right <= b.left + 1 || r.left >= b.right - 1 || r.bottom <= b.top + 1 || r.top >= b.bottom - 1) return true;
      }
    }
    return false;
  }

  /* Các dòng chữ của phần tử, toạ độ tính từ góc trên trái của nó */
  function lineBoxes(el) {
    const range = document.createRange();
    range.selectNodeContents(el);
    const base = el.getBoundingClientRect();
    const lines = [];
    [...range.getClientRects()].forEach((r) => {
      if (r.width < 0.5 || r.height < 0.5) return;
      const mid = (r.top + r.bottom) / 2;
      const line = lines.find((l) => mid > l.top && mid < l.bottom);
      if (line) {
        line.left = Math.min(line.left, r.left);
        line.right = Math.max(line.right, r.right);
        line.top = Math.min(line.top, r.top);
        line.bottom = Math.max(line.bottom, r.bottom);
      } else {
        lines.push({ left: r.left, right: r.right, top: r.top, bottom: r.bottom });
      }
    });
    return lines
      .sort((a, b) => a.top - b.top)
      .map((l) => ({ x: l.left - base.left, y: l.top - base.top, w: l.right - l.left, h: l.bottom - l.top }));
  }

  /* ---------- Các việc của con trỏ ---------- */

  /* Kéo khung từ góc trên trái tới góc dưới phải, kèm nhãn kích thước */
  async function drawBox(cur, { el, sec, kind }) {
    const r = docRect(el);
    await moveTo(cur, r.x, r.y, sec, 'cross');
    if (sec.done) return;
    cur.el.classList.add('is-down');
    const box = overlayBox('', cur.color, r.x, r.y, 0, 0, getComputedStyle(el).borderRadius);
    const size = document.createElement('span');
    size.className = 'sw-size';
    box.append(size);
    await tween(
      clamp(Math.sqrt(r.w * r.h) * 0.7, 240, 560) / speed(),
      (p) => {
        const w = r.w * p;
        const h = r.h * p;
        box.style.width = `${w}px`;
        box.style.height = `${h}px`;
        size.textContent = `${Math.round(w)} × ${Math.round(h)}`;
        place(cur, r.x + w, r.y + h);
      },
      sec
    );
    cur.el.classList.remove('is-down');
    if (!sec.done) {
      if (kind === 'media') wipe(el, sec);
      else reveal(el);
    }
    fadeOut(box);
    await pause(60, sec);
  }

  /* Gõ chữ: chữ thật hiện dần theo từng dòng bằng clip-path, con trỏ nhập chữ đi theo */
  async function typeText(cur, { el, sec }) {
    const lines = lineBoxes(el);
    if (!lines.length) return reveal(el, false);
    const r = docRect(el);
    await moveTo(cur, r.x + lines[0].x, r.y + lines[0].y + lines[0].h / 2, sec, 'beam');
    if (sec.done) return;
    const frameBox = overlayBox('is-text', cur.color, r.x - 3, r.y - 3, r.w + 6, r.h + 6);
    const caret = document.createElement('span');
    caret.className = 'sw-caret';
    caret.style.setProperty('--c', cur.color);
    layer.append(caret);
    const total = lines.reduce((sum, line) => sum + line.w, 0);
    el.style.clipPath = 'inset(0 100% 100% 0)';
    reveal(el, false);
    await tween(
      clamp(el.textContent.trim().length * 12, 240, 900) / speed(),
      (p) => {
        let left = total * p;
        let k = 0;
        while (k < lines.length - 1 && left > lines[k].w) {
          left -= lines[k].w;
          k += 1;
        }
        const line = lines[k];
        const x = line.x + Math.min(left, line.w);
        const top = line.y;
        const bottom = line.y + line.h;
        el.style.clipPath = `polygon(0 0, ${r.w}px 0, ${r.w}px ${top}px, ${x}px ${top}px, ${x}px ${bottom}px, 0 ${bottom}px)`;
        caret.style.transform = `translate(${r.x + x}px, ${r.y + top}px)`;
        caret.style.height = `${line.h}px`;
        place(cur, r.x + x + 2, r.y + top + line.h / 2);
      },
      sec,
      linear
    );
    el.style.clipPath = '';
    caret.remove();
    fadeOut(frameBox);
    await pause(60, sec);
  }

  /* Thẻ lặp lại: giữ thẻ mẫu, kéo một bản sao tới chỗ thẻ mới */
  async function dragCopy(cur, { el, sec, master }) {
    const from = docRect(master.el);
    const to = docRect(el);
    const grabX = Math.min(from.w / 2, 40);
    const grabY = Math.min(from.h / 2, 24);
    await moveTo(cur, from.x + grabX, from.y + grabY, sec);
    if (sec.done) return;
    cur.el.classList.add('is-down', 'is-copy');
    const ghost = overlayBox('is-ghost', cur.color, from.x, from.y, to.w, to.h, getComputedStyle(el).borderRadius);
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    await tween(
      clamp(Math.hypot(dx, dy) * 0.4, 220, 480) / speed(),
      (p) => {
        const x = from.x + dx * p;
        const y = from.y + dy * p;
        ghost.style.transform = `translate(${x}px, ${y}px)`;
        place(cur, x + grabX, y + grabY);
      },
      sec,
      easeInOut
    );
    cur.el.classList.remove('is-down', 'is-copy');
    if (!sec.done) reveal(el);
    fadeOut(ghost);
    await pause(60, sec);
  }

  async function perform(cur, task) {
    const { el } = task;
    if (!el.isConnected) return;
    const r = el.getBoundingClientRect();
    if (r.width < 1 || scrolledOut(el, r)) return reveal(el, false);
    if (task.kind === 'text') return typeText(cur, task);
    if (task.kind === 'copy') return dragCopy(cur, task);
    return drawBox(cur, task);
  }

  /* ---------- Chia trang thành việc ---------- */

  const SKIP_SELECTOR = 'script, style, template, noscript, dialog, br, [hidden], [data-sw="skip"]';
  const PHRASING = new Set(
    'A ABBR B BDI BDO BR CITE CODE DATA DFN EM I KBD LABEL MARK Q S SAMP SMALL SPAN STRONG SUB SUP TIME U VAR WBR'.split(' ')
  );
  const MEDIA = new Set(['IMG', 'VIDEO', 'CANVAS', 'IFRAME', 'PICTURE']);

  function alpha(color) {
    const match = /rgba?\(([^)]+)\)/.exec(color);
    if (!match) return color === 'transparent' ? 0 : 1;
    const parts = match[1].split(/[\s,/]+/).filter(Boolean);
    return parts.length > 3 ? parseFloat(parts[3]) : 1;
  }

  /* Phần tử tự vẽ nền, viền hoặc bóng */
  function hasPaint(cs) {
    const textClip = cs.backgroundClip === 'text' || cs.webkitBackgroundClip === 'text';
    if (cs.backgroundImage !== 'none' && !textClip) return true;
    if (alpha(cs.backgroundColor) > 0.02 || cs.boxShadow !== 'none') return true;
    return ['Top', 'Right', 'Bottom', 'Left'].some(
      (side) =>
        parseFloat(cs[`border${side}Width`]) > 0 &&
        cs[`border${side}Style`] !== 'none' &&
        alpha(cs[`border${side}Color`]) > 0.05
    );
  }

  const isSvg = (el) => el.tagName.toLowerCase() === 'svg';
  const isMedia = (el, r) => MEDIA.has(el.tagName) || (isSvg(el) && !el.classList.contains('icon') && r.width >= 40 && r.height >= 20);
  const signature = (el) => `${el.tagName}.${el.getAttribute('class') || ''}`;

  /* Khối chữ: chỉ chứa chữ và thẻ nội dòng (a, strong, span, br, icon...) không có nền riêng */
  function isTextBlock(el) {
    let text = false;
    for (const node of el.childNodes) {
      if (node.nodeType === Node.TEXT_NODE) {
        if (node.data.trim()) text = true;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        if (isSvg(node)) {
          if (!node.classList.contains('icon')) return false;
        } else {
          if (!PHRASING.has(node.tagName)) return false;
          const cs = getComputedStyle(node);
          if (cs.display === 'none') continue;
          const content = node.textContent.trim();
          if (hasPaint(cs) || (content && node.children.length && !isTextBlock(node))) return false;
          if (content) text = true;
        }
      }
    }
    return text;
  }

  /* Duyệt một phần trang, trả về danh sách việc theo thứ tự trên xuống.
     Khung chứa phải vẽ xong thì việc bên trong mới bắt đầu; ba thẻ giống nhau
     trở lên đứng liền nhau thì dựng thẻ đầu, các thẻ sau là bản sao của nó. */
  function classify(sec) {
    const tasks = [];
    const add = (kind, el, parent, master = null) => {
      const task = { kind, el, sec, parent, master, started: false, done: false };
      tasks.push(task);
      return task;
    };
    /* Phần trang đang bị CSS ẩn (opacity 0) chờ dựng nên không xét opacity của chính nó */
    const usable = (el, cs) =>
      !el.matches(SKIP_SELECTOR) &&
      cs.display !== 'none' &&
      cs.visibility !== 'hidden' &&
      cs.position !== 'fixed' &&
      (el === sec.el || parseFloat(cs.opacity) > 0);

    const visit = (el, parent) => {
      const cs = getComputedStyle(el);
      if (!usable(el, cs)) return;
      if (cs.display === 'contents') {
        walk(el, parent);
        return;
      }
      const r = el.getBoundingClientRect();
      if (r.width < 1 || r.height < 1) return;
      if (el.dataset.sw === 'whole') {
        add('box', el, parent);
        return;
      }
      if (isMedia(el, r)) {
        add('media', el, parent);
        return;
      }
      const paint = hasPaint(cs) && r.width >= 12 && r.height >= 8;
      if (isTextBlock(el)) {
        add(paint ? 'box' : 'text', el, parent);
        return;
      }
      walk(el, paint ? add('box', el, parent) : parent);
    };

    const walk = (el, parent) => {
      const kids = [...el.children];
      for (let i = 0; i < kids.length; ) {
        let j = i + 1;
        const sig = signature(kids[i]);
        while (j < kids.length && signature(kids[j]) === sig) j += 1;
        if (j - i >= 3 && !isTextBlock(kids[i])) {
          const first = tasks.length;
          visit(kids[i], parent);
          const master = tasks[first] || null;
          for (let k = i + 1; k < j; k += 1) {
            const cs = getComputedStyle(kids[k]);
            const r = kids[k].getBoundingClientRect();
            if (usable(kids[k], cs) && r.width >= 1 && r.height >= 1) add(master ? 'copy' : 'box', kids[k], parent, master);
          }
        } else {
          for (let k = i; k < j; k += 1) visit(kids[k], parent);
        }
        i = j;
      }
    };

    visit(sec.el, null);
    /* Gắn class ẩn sau khi duyệt xong để trình duyệt không phải tính lại style giữa chừng */
    tasks.forEach((task) => task.el !== sec.el && task.el.classList.add('sw-t'));
    return tasks;
  }

  /* ---------- Điều phối ---------- */

  const queue = [];
  const isReady = (task) =>
    !task.started &&
    !task.done &&
    !task.sec.done &&
    task.sec.visible &&
    (!task.parent || task.parent.done) &&
    (!task.master || task.master.done);

  /* Nhiều việc đang chờ thì cả đàn làm nhanh hơn, tối đa gấp 1,8 lần */
  function speed() {
    const ready = queue.reduce((count, task) => count + (isReady(task) ? 1 : 0), 0);
    return 1 + clamp((ready - 4) / 10, 0, 0.8);
  }

  let finished = false;
  let nextStart = 0;
  let pumpTimer = 0;

  /* Giao việc lần lượt theo thứ tự đọc: trái sang phải, trên xuống dưới. Mỗi việc bắt đầu sau
     việc trước một nhịp ngắn (phần trang nhiều việc thì nhịp ngắn hơn) và giao cho con trỏ rảnh gần nhất. */
  function pump() {
    if (finished) return;
    for (let i = queue.length - 1; i >= 0; i -= 1) {
      if (queue[i].done || queue[i].sec.done) queue.splice(i, 1);
    }
    skip.classList.toggle('is-on', cursors.some((cur) => cur.busy) || queue.some(isReady));
    const task = queue.find(isReady);
    const free = cursors.filter((cur) => !cur.busy);
    if (!task || !free.length) return;
    clearTimeout(pumpTimer);
    const wait = nextStart - performance.now();
    if (wait > 0) {
      pumpTimer = setTimeout(pump, wait);
      return;
    }
    const r = task.el.getBoundingClientRect();
    const x = r.left + window.scrollX;
    const y = r.top + window.scrollY;
    const cur = free.reduce((best, c) => (Math.hypot(c.x - x, c.y - y) < Math.hypot(best.x - x, best.y - y) ? c : best));
    const gap = clamp(2600 / task.sec.tasks.length, 70, 150);
    nextStart = performance.now() + gap;
    run(cur, task);
    pumpTimer = setTimeout(pump, gap);
  }

  async function run(cur, task) {
    cur.busy = true;
    cur.anchor = null;
    task.started = true;
    try {
      await perform(cur, task);
    } catch {
      reveal(task.el, false);
    }
    task.done = true;
    cur.busy = false;
    cur.idleSince = performance.now();
    settle(task.sec);
    pump();
    kick();
  }

  const sections = [...document.querySelectorAll('main > section, main > footer')].map((el) => ({
    el,
    tasks: [],
    active: false,
    visible: false,
    done: false,
  }));

  function activate(sec) {
    if (sec.active || sec.done) return;
    sec.active = true;
    sec.tasks = classify(sec);
    /* Phần trang không tự vẽ nền thì mở luôn, chỉ các việc bên trong còn ẩn */
    if (!sec.tasks.some((task) => task.el === sec.el)) reveal(sec.el, false);
    /* Xếp việc theo vị trí trên trang (từng hàng 24px, rồi trái sang phải) để hai cột dựng song song */
    const at = new Map(sec.tasks.map((task) => [task, task.el.getBoundingClientRect()]));
    sec.tasks.sort(
      (a, b) => Math.round(at.get(a).top / 24) - Math.round(at.get(b).top / 24) || at.get(a).left - at.get(b).left
    );
    queue.push(...sec.tasks);
    settle(sec);
  }

  /* Phần cuối trang (chân trang) không bao giờ lên tới vạch kích hoạt: cuộn tới đáy thì dựng luôn */
  const onScroll = () => {
    if (window.innerHeight + window.scrollY < document.documentElement.scrollHeight - 4) return;
    sections.forEach((sec) => {
      if (sec.el.getBoundingClientRect().top >= window.innerHeight) return;
      sec.visible = true;
      activate(sec);
    });
    pump();
  };

  function settle(sec) {
    if (!sec.done && sec.active && sec.tasks.every((task) => task.done)) {
      sec.done = true;
      if (sections.every((s) => s.done)) end(true);
    }
  }

  /* Hiện ngay toàn bộ một phần trang: khi cuộn qua, khi bấm Tab vào, khi bỏ qua */
  function finish(sec) {
    if (sec.done) return;
    sec.done = true;
    reveal(sec.el, false);
    sec.tasks.forEach((task) => {
      task.done = true;
      task.el.style.clipPath = '';
      reveal(task.el, false);
    });
    if (sections.every((s) => s.done)) end(true);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const sec = sections.find((s) => s.el === entry.target);
        sec.visible = entry.isIntersecting;
        if (sec.visible) activate(sec);
        /* Cuộn qua khỏi mép trên thì hiện hết; bị đẩy xuống dưới thì tạm dừng, cuộn tới sẽ dựng tiếp */
        else if (entry.boundingClientRect.bottom <= 0) finish(sec);
      });
      pump();
    },
    { rootMargin: '0px 0px -12% 0px' }
  );

  /* Đổi ngôn ngữ thì chữ thay đổi, dựng tiếp sẽ lệch: hiện hết luôn */
  const langWatch = new MutationObserver(() => end(false));

  const onKey = (event) => {
    if (event.key === 'Escape') end(false);
  };
  const onFocus = (event) => {
    const sec = sections.find((s) => s.el.contains(event.target));
    if (sec && !sec.done) {
      finish(sec);
      pump();
    }
  };
  const onPointer = (event) => {
    if (event.pointerType !== 'mouse') return;
    mouse = { x: event.clientX, y: event.clientY };
    kick();
  };

  function end(natural) {
    if (finished) return;
    finished = true;
    sections.forEach(finish);
    observer.disconnect();
    langWatch.disconnect();
    document.removeEventListener('keydown', onKey);
    document.removeEventListener('focusin', onFocus);
    window.removeEventListener('scroll', onScroll);
    clearTimeout(pumpTimer);
    skip.classList.remove('is-on');
    /* Dựng xong cả trang: cả đàn bay quanh chuột thêm một chút rồi mới đi */
    const linger = natural && mouse ? 1600 : 0;
    const now = performance.now();
    cursors.forEach((cur) => {
      cur.anchor = null;
      cur.idleSince = now - IDLE_MS + linger;
    });
    kick();
    setTimeout(cleanup, linger + 450);
  }

  function cleanup() {
    jobs.forEach((job) => job.resolve());
    jobs.clear();
    layer.remove();
    skip.remove();
    window.removeEventListener('pointermove', onPointer);
    root.classList.replace('swarm', 'swarm-ran');
    document.querySelectorAll('.sw-t, .sw-open, .sw-fade').forEach((el) => {
      el.classList.remove('sw-t', 'sw-open', 'sw-fade');
    });
  }

  try {
    skip.addEventListener('click', () => end(false));
    document.addEventListener('keydown', onKey);
    document.addEventListener('focusin', onFocus);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pointermove', onPointer, { passive: true });
    langWatch.observe(root, { attributes: true, attributeFilter: ['lang'] });
    sections.forEach((sec) => observer.observe(sec.el));
  } catch {
    end(false);
  }
})();
