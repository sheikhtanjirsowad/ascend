/* ============================================
   Ascend - app.js
   UI logic: theme, nav, assessment, calculators,
   plan generator, progress tracker, modals.
   Data (guides, sources, debunked) is in content.js.
   ============================================ */

(function(){
  'use strict';
  const C = window.ASCEND_CONTENT;

  // ---- theme ----
  const currentTheme = localStorage.getItem('ascend_theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  const themeIcon = document.querySelector('#themeToggle i');
  if (themeIcon) themeIcon.className = currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) themeToggle.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('ascend_theme', next);
    const i = document.querySelector('#themeToggle i');
    if (i) i.className = next === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  });

  // ---- mobile nav ----
  const mobileMenu = document.getElementById('mobileMenu');
  const navLinks = document.getElementById('navLinks');
  if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      mobileMenu.querySelector('i').className = navLinks.classList.contains('open') ? 'fas fa-xmark' : 'fas fa-bars';
    });
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      mobileMenu.querySelector('i').className = 'fas fa-bars';
    }));
  }

  // ---- scroll-spy + navbar shadow ----
  const navbar = document.getElementById('navbar');
  const sections = Array.prototype.slice.call(document.querySelectorAll('section[id], header[id]'));
  window.addEventListener('scroll', () => {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 40);
    const y = window.scrollY + 120;
    let cur = null;
    sections.forEach(s => { if (s.offsetTop <= y) cur = s.id; });
    navLinks.querySelectorAll('.nav-link').forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + cur);
    });
  }, { passive: true });

  // ---- toast ----
  function toast(type, msg){
    const c = document.getElementById('toastContainer');
    if(!c) return;
    const t = document.createElement('div');
    t.className = 'toast ' + type;
    const icons = { success:'fa-circle-check', error:'fa-circle-xmark', info:'fa-circle-info' };
    t.innerHTML = '<i class="fas ' + (icons[type]||icons.info) + '"></i><span>' + msg + '</span>';
    c.appendChild(t);
    setTimeout(()=> t.remove(), 3500);
  }
  window.toast = toast;

  // ---- controlled options (pick-one) ----
  function initOpt(containerId){
    const g = document.getElementById(containerId);
    if(!g) return ()=>({});
    const state = {};
    g.querySelectorAll('[data-v]').forEach(b => b.addEventListener('click', ()=>{
      g.querySelectorAll('.opt').forEach(x=>x.classList.remove('active'));
      b.classList.add('active');
      g.dataset.val = b.dataset.v;
    }));
    return ()=>g.dataset.val||null;
  }
  // unified unit toggles
  function initUnit(groupId){
    const g = document.getElementById(groupId);
    if(!g) return ()=>({});
    g.querySelectorAll('.uopt').forEach(b=>b.addEventListener('click',()=>{
      g.querySelectorAll('.uopt').forEach(x=>x.classList.remove('active'));
      b.classList.add('active');
    }));
    return ()=> g.querySelector('.uopt.active').dataset.v;
  }

  const getSex = initOpt('opt-sex');
  const getShape = initOpt('opt-shape');
  const getSpf = initOpt('opt-spf');
  const getSleep = initOpt('opt-sleep');
  const getUnitSys = initUnit('unitSystem');
  const getUnitWt = initUnit('unitWeight');

  // Accept plain numbers (cm or inches per unit) OR imperial shorthand like "5'9\"", "5' 9", "5ft9in" — auto-detected regardless of selected unit.
  function parseHeight(raw, unit){
    if(raw==null) return NaN;
    const s = String(raw).trim().toLowerCase();
    const m = s.match(/^(\d+(?:\.\d+)?)\s*(?:ft|['\u2019])\s*(\d+(?:\.\d+)?)?\s*(?:"|in\b|\u201D)?$/);
    if(m && (m[1]||m[2])) return ((parseFloat(m[1])||0)*12 + (parseFloat(m[2])||0)) * 2.54;
    const clean = s.replace(/[, ]/g,'');
    const num = parseFloat(clean);
    if(!isNaN(num)){
      if(clean.indexOf('cm')>-1) return num;
      if(/^\d+(?:\.\d+)?m$/.test(clean)) return num * 100;
      if(/ft|'|in|"/.test(clean)) return num * 2.54;
      return unit==='cm' ? num : num * 2.54;
    }
    return NaN;
  }

  // ---- assessment submit ----
  const form = document.getElementById('assessForm');
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const sex = getSex();
    if(!sex){ toast('error','Please select a sex.'); return; }
    const age = parseFloat(document.getElementById('age').value);
    const rawH = document.getElementById('height').value;
    const rawW = document.getElementById('weight').value;
    if(!(age>0)){ toast('error','Enter a valid age.'); return; }
    const hCm = parseHeight(rawH, getUnitSys());
    let wKg = parseFloat(rawW);
    if(getUnitWt()==='lb') wKg = wKg * 0.453592;
    if(!(hCm>50) || !(wKg>20)){ toast('error','Enter height (cm or 5\'9\") and weight.'); return; }

    // BMI
    const bmi = wKg / Math.pow(hCm/100, 2);
    const shape = getShape() || 'unsure';

    // Estimated body fat (Navy-style). Needs waist/neck; we only have BMI, so give a rough BMI-based estimate with clear caveat.
    const bf = sex==='male'
      ? Math.max(3, Math.min(45, 1.2*bmi + 0.23*age - 16.2))
      : Math.max(8, Math.min(55, 1.2*bmi + 0.23*age - 5.4));

    // Render results
    document.getElementById('bmiVal').textContent = bmi.toFixed(1);
    document.getElementById('bmiCat').textContent =
      bmi<18.5?'Underweight':bmi<25?'Healthy weight':bmi<30?'Overweight':'Obese range';
    document.getElementById('bfVal').textContent = bf.toFixed(1)+'%';
    document.getElementById('bfCat').textContent =
      (sex==='male'?C.bfCatMale(bf):C.bfCatFemale(bf));
    const shapeKey = C.faceShapes[shape] ? shape : 'oval';
    const shapeVal = document.getElementById('shapeVal');
    const shapeHint = document.getElementById('shapeHint');
    if(C.faceShapes[shapeKey]){
      shapeVal.textContent = C.faceShapes[shapeKey].name;
      shapeHint.textContent = C.faceShapes[shapeKey].hint;
    } else {
      shapeVal.textContent = 'Unsure';
      shapeHint.textContent = 'Try the Face Shape tool for a structured guess.';
    }

    // Build plan
    buildPlan({ sex, age, bmi, bf, shape: shapeKey, spf: getSpf(), sleep: getSleep() });

    document.getElementById('results').hidden = false;
    const resultsEl = document.getElementById('results');
    if (resultsEl && typeof resultsEl.scrollIntoView === 'function') resultsEl.scrollIntoView({ behavior:'smooth', block:'start' });
    toast('success','Plan generated!');
  });

  function buildPlan(o){
    const steps = [];
    steps.push({ icon:'fa-bed', title:'Fix sleep (7\u20139h, consistent)', why:'Needed before visible skin/under-eye gains; supports every other change.', done:false });
    if(o.spf!=='yes') steps.push({ icon:'fa-umbrella-beach', title:'Start daily SPF 30+ — today', why:'Prevents the #1 cause of visible skin aging. Highest-ROI skincare step.', done:false });
    steps.push({ icon:'fa-droplet', title:'Hydration + cut excess sodium/alcohol', why:'Reduces facial puffiness and bloating within days.', done:false });
    if(o.sleep!=='yes') steps.push({ icon:'fa-bed-pulse', title:'Protect sleep duration', why:'Poor sleep alone worsens under-eye circles and skin.', done:false });
    if(o.bf>22 || (o.sex==='male' && o.bmi>24.9) ) steps.push({ icon:'fa-percent', title:'Gradually lower body fat (moderate deficit)', why:'The biggest free lever for jaw/cheek definition. Preserve muscle.', done:false });
    steps.push({ icon:'fa-face-laugh', title:'Start a minimal AM/PM skin routine', why:'Cleanser, AM vitamin C + moisturizer + SPF, PM retinoid (start low).', done:false });
    steps.push({ icon:'fa-person', title:'Practice upright posture', why:'Instant jawline/neck change — free and immediate.', done:false });
    if(o.shape==='round'||o.shape==='square'||o.shape==='oblong') steps.push({ icon:'fa-scissors', title:'Book a haircut matched to your face shape', why:'One of the largest single-day visual changes. Ask your barber.', done:false });
    steps.push({ icon:'fa-brain', title:'Keep it healthy — mind your mental health', why:'If this starts creating distress, step back and talk to someone.', done:false });

    const list = document.getElementById('planList');
    list.innerHTML = steps.map((s,i)=>`
      <div class="plan-item"><span class="pi-num">${i+1}</span><div class="pi-body"><strong>${s.title}</strong><p>${s.why}</p></div><span class="pi-icon"><i class="fas ${s.icon}"></i></span></div>
    `).join('');
  }

  // ---- guides render ----
  const gg = document.getElementById('guidesGrid');
  gg.innerHTML = C.guides.map(g=>`
    <div class="guide-card" data-id="${g.id}">
      <div class="guide-top"><i class="fas ${g.icon}"></i><span class="sev ${g.sev}">${sevLabel(g.sev)}</span></div>
      <h3>${g.title}</h3>
      <p>${g.summary}</p>
      <button class="btn-link" data-open="${g.id}">Read guide <i class="fas fa-arrow-right"></i></button>
    </div>`).join('');
  function sevLabel(s){ return s==='good'?'Evidence-backed':s==='warn'?'Uncertain':'Debunked'; }

  // ---- debunked render ----
  const dl = document.getElementById('debunkedList');
  dl.innerHTML = C.debunked.map(d=>`
    <div class="debunked-card">
      <div class="db-head"><i class="fas ${d.icon}"></i><h3>${d.title}</h3><span class="sev ${d.sev}">${d.danger}</span></div>
      <p>${d.body}</p>
    </div>`).join('');

  // ---- sources render ----
  const sl = document.getElementById('sourcesList');
  sl.innerHTML = C.sources.map(s=>`
    <div class="source-item"><a href="${s.url}" target="_blank" rel="noopener">${s.label}</a><span class="sorg">${s.org}</span></div>`).join('');

  // ---- modal ----
  const modal = document.getElementById('modal');
  const mContent = document.getElementById('modalContent');
  function openModal(html){
    mContent.innerHTML = html;
    modal.hidden = false;
    document.body.style.overflow='hidden';
  }
  function closeModal(){ modal.hidden = true; document.body.style.overflow=''; }
  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('modalOverlay').addEventListener('click', closeModal);

  // guide modal from cards / buttons
  function guideModal(id){
    const g = C.guides.find(x=>x.id===id);
    if(!g) return;
    openModal(`<div class="modal-guide"><div class="mg-head"><i class="fas ${g.icon}"></i><h2>${g.title}</h2><span class="sev ${g.sev}">${sevLabel(g.sev)}</span></div><p class="mg-sum">${g.summary}</p>${g.sections.map(s=>`<div class="mg-sec"><h4>${s.h}</h4><p>${s.t}</p></div>`).join('')}</div>`);
  }
  gg.addEventListener('click', e=>{
    const btn = e.target.closest('[data-open]');
    if(btn) guideModal(btn.dataset.open);
  });

  // face shape tool — measurement-based (ruler required)
  document.getElementById('openFaceShape').addEventListener('click', ()=>{
    faceShapeTool();
  });
  function faceShapeTool(){
    const steps = [
      { p:'faceLen', t:'Face length', h:'From your hairline (top of forehead) straight down to the tip of your chin. Hold the ruler vertically.', ph:'e.g. 19' },
      { p:'faceWid', t:'Face width', h:'Across your cheekbones — the widest point of your face, just below the outer corner of your eyes.', ph:'e.g. 14' },
      { p:'jawWid', t:'Jaw width', h:'Across your jaw — the widest point at the back of the jaw on each side, in line with your ears.', ph:'e.g. 11.5' },
      { p:'forehead', t:'Forehead width', h:'Across your forehead at its widest point, about halfway up between eyebrows and hairline.', ph:'e.g. 12' }
    ];
    let step=0; const m = {};
    function render(){
      const cur=steps[step];
      mContent.innerHTML = `
        <div class="wizard"><h2><i class="fas fa-ruler-combined"></i> Face Shape Identifier</h2>
        <div class="wz-progress">Measurement ${step+1} of ${steps.length}</div>
        <p class="wz-desc"><strong>${cur.t}</strong> — ${cur.h}</p>
        <div class="wz-opts">
          <input type="text" inputmode="decimal" class="wz-in" id="wzIn" placeholder="${cur.ph}" value="${m[cur.p]??''}" autocomplete="off">
          <p class="wz-unit">~ cm · use a ruler or a strip of paper + ruler</p>
        </div>
        <div class="wz-nav">
          <button class="btn btn-outline btn-sm" id="wzBack" ${step===0?'disabled':''}>Back</button>
          <button class="btn btn-sm" id="wzNext">${step===steps.length-1?'See result':'Next'}</button>
        </div>
        </div>`;
      const inp=mContent.querySelector('#wzIn');
      inp.focus && inp.focus();
      inp.addEventListener('input',()=>{ m[cur.p] = inp.value.trim(); });
      mContent.querySelector('#wzNext').addEventListener('click',()=>{
        const v=parseFloat(m[cur.p]);
        if(!(v>2) || !(v<40)){ toast('error','Enter a measurement in cm (e.g. 19).'); return; }
        if(step<steps.length-1){ step++; render(); } else finish();
      });
      const back=mContent.querySelector('#wzBack');
      back.addEventListener('click',()=>{ if(step>0){ step--; render(); } });
    }
    function finish(){
      const L=m.faceLen, W=m.faceWid, J=m.jawWid, F=m.forehead;
      const whr = W/L;                     // width : height ratio of the face
      const jawRatio = J/W;                // how much of cheekbone width the jaw occupies
      const foreheadRatio = F/W;           // forehead vs cheekbone width
      let shape='oval', reasons=[], ratio;
      // Quantitative cascade (documented anthropometric-style categories)
      if(whr >= 0.80){
        // nearly as wide as it is long
        shape = 'round';
        ratio = 'width ≈ length';
        reasons.push('Your face is almost as wide as it is long (W:L ratio ≈ '+whr.toFixed(2)+'), the signature of a round shape.');
        if(jawRatio >= 0.92){ shape='square'; reasons.push('Your jaw is nearly as wide as your cheekbones (jaw/cheek ≈ '+jawRatio.toFixed(2)+'), so the face reads stronger/more angular.'); }
      } else if(whr <= 0.66){
        shape = 'oblong';
        ratio = 'clearly longer than wide';
        reasons.push('Your face is noticeably longer than it is wide (W:L ratio ≈ '+whr.toFixed(2)+').');
        if(jawRatio >= 0.90){ shape='square'; reasons.push('But your jaw is wide relative to your cheekbones (≈ '+jawRatio.toFixed(2)+'), giving a squared, strong feel.'); }
      } else {
        // intermediate ratio (0.67–0.79) — decide by jaw + forehead
        if(jawRatio >= 0.92){
          shape='square'; ratio='intermediate length, strong jaw';
          reasons.push('Your jaw is nearly as wide as your cheekbones (jaw/cheek ≈ '+jawRatio.toFixed(2)+'), the main driver of a square shape.');
        } else if(foreheadRatio >= 0.95 && J < W*0.82){
          shape='heart'; ratio='broad forehead tapering';
          reasons.push('Your forehead is wide relative to your cheekbones (≈ '+foreheadRatio.toFixed(2)+') while your jaw is narrower — the classic heart taper.');
        } else if(F < W*0.80 && J < W*0.80 && W > L*0.70){
          shape='diamond'; ratio='narrow forehead & jaw, wide cheekbones';
          reasons.push('Both your forehead and jaw are narrower than your cheekbones, with prominent cheekbones — the diamond signature.');
        } else {
          shape='oval'; ratio='balanced';
          reasons.push('Your width/length and jaw/forehead proportions fall into the balanced, oval range.');
        }
      }
      const info=C.faceShapes[shape];
      mContent.innerHTML = `<div class="wizard"><h2><i class="fas fa-face-smile"></i> Your measured shape</h2>
        <div class="wz-result"><div class="big">${info.name}</div>
        <p class="wz-ratio">Width:length ratio ≈ <strong>${(whr).toFixed(2)}</strong> · (${ratio})</p>
        ${reasons.map(r=>`<p class="wz-why">· ${r}</p>`).join('')}
        <p class="muted">${info.guide}</p>
        <p class="note">Classified from your measured proportions with conventional grooming-category thresholds. It is a <strong>descriptive grooming label, not an attractiveness score</strong>. Small measuring errors change the result — and a barber looking at you is a better judge for your actual cut. Your measurements: length ${L} · width ${W} · jaw ${J} · forehead ${F} cm.</p>
        <div class="wz-nav"><button class="btn btn-outline btn-sm" id="wzRestart">Restart</button>
        <button class="btn btn-sm" id="wzUse">Use in assessment</button></div></div>`;
      mContent.querySelector('#wzRestart').addEventListener('click',()=>{step=0;for(const k in m)delete m[k];render();});
      const use=mContent.querySelector('#wzUse');
      if(use) use.addEventListener('click',()=>{
        const opt=document.querySelector('#opt-shape [data-v="'+shape+'"]');
        if(opt){ opt.click(); toast('success','Set your face shape to '+info.name+'.'); openModal(''); closeModal(); }
      });
    }
    render();
  }

  // proportions modal
  document.getElementById('openProportions').addEventListener('click', ()=>{
    openModal(`<div class="modal-guide"><div class="mg-head"><i class="fas fa-ruler-combined"></i><h2>Facial Proportion Reference</h2></div>
      <p class="mg-sum">Real anthropometric references from published studies. <strong>Critical caveat:</strong> these vary by ethnicity and reference population (Farkas et al.; Springer/Nature orthodontics data). They are descriptive reference for clinicians — <strong>not</strong> a verdict, not an attractiveness score, and not something to obsess over.</p>
      ${[
        ['Vertical thirds','Face height divides roughly into: hairline\u2192brow, brow\u2192base of nose, base of nose\u2192chin — approximately equal thirds.'],
        ['Golden ratio proximity','Some studies report several vertical/transverse face ratios fall near 1.618 ("divine ratio"), but this is descriptive and varies by population; it is not a universal rule of beauty.'],
        ['Eye spacing','Intercanthal (inner-eye) distance is often ~ the width of one eye. Norms differ notably between ethnic groups.'],
        ['Upper face width / FWHR','Width-to-height ratio of the face is measured in studies of attractiveness; men tend to have higher values than women. Descriptive reference only.'],
        ['Summary','Symmetry, averageness, and low facial adiposity are the most consistently replicated attractiveness cues in the literature — and low facial adiposity is the one you can change via body composition. Proportions are mostly genetic and clinical. Focus energy on what you can control.']
      ].map(x=>`<div class="mg-sec"><h4>${x[0]}</h4><p>${x[1]}</p></div>`).join('')}
      </div>`);
  });

  // routine modal
  document.getElementById('openRoutine').addEventListener('click', ()=>{
    openModal(`<div class="modal-guide"><div class="mg-head"><i class="fas fa-person-running"></i><h2>Suggested Routine (dermatology-based)</h2></div>
      <p class="mg-sum">A sensible, evidence-aligned AM/PM template. Adjust products/brands to your skin and budget; introduce one new product at a time.</p>
      ${[
        ['AM','1) Gentle cleanser. 2) Vitamin C (L-ascorbic acid 10\u201320%). 3) Moisturizer. 4) SPF 30+ broad-spectrum sunscreen — reapply if out in sun.'],
        ['PM','1) Oil-based cleanser (if SPF/makeup), then gentle water-based cleanser. 2) Retinoid (start low: tretinoin 0.025% or retinol 0.5\u20131%, every 2\u20133 nights, build up). 3) Moisturizer.'],
        ['Weekly / as needed','Exfoliation 1\u20132x/week if your skin tolerates it. Shave after a shower on damp skin, with the grain, with a clean sharp razor (Mayo Clinic guidance).'],
        ['Hygiene & sleep','Clean pillowcases, wash face at night, and protect sleep — recovery makes the routine work.'],
        ['When to see a professional','For acne that persists, pigmentation, or any procedure (filler, laser, hair transplant), consult a board-certified dermatologist or surgeon. Never self-inject.'
      ]].map(x=>`<div class="mg-sec"><h4>${x[0]}</h4><p>${x[1]}</p></div>`).join('')}
      </div>`);
  });

  // ---- progress tracker ----
  const PROG_KEY = 'ascend_progress_v1';
  const HABITS = [
    { id:'sleep', label:'Sleep 7\u20139h', icon:'fa-bed' },
    { id:'spf', label:'Daily SPF', icon:'fa-umbrella-beach' },
    { id:'water', label:'Hydrate well', icon:'fa-glass-water' },
    { id:'training', label:'Exercise / move', icon:'fa-dumbbell' },
    { id:'skincare', label:'Skin routine (AM+PM)', icon:'fa-face-laugh' },
    { id:'posture', label:'Mindful posture', icon:'fa-person-arrow-up-from-line' }
  ];
  function loadProg(){ try{ return JSON.parse(localStorage.getItem(PROG_KEY))||{}; }catch(e){return {};} }
  function saveProg(p){ try{ localStorage.setItem(PROG_KEY, JSON.stringify(p)); }catch(e){} }
  function todayKey(){ const d=new Date(); return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); }
  function renderProgress(){
    const wrap=document.getElementById('progressWrap');
    const prog=loadProg();
    const key=todayKey();
    const today=prog[key]||[];
    // weekly streak: count consecutive days (including today) where ALL habits done
    let streak=0;
    const d=new Date();
    for(;;){
      const k=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
      const day=prog[k]||[];
      if(day.length===HABITS.length){ streak++; d.setDate(d.getDate()-1); } else break;
    }
    const doneCount=today.length;
    const pct=Math.round(doneCount/HABITS.length*100);
    wrap.innerHTML = `
      <div class="prog-head"><div class="prog-stats"><span class="ps"><strong>${doneCount}/${HABITS.length}</strong> today</span><span class="ps"><strong>${streak}</strong> day streak</span><span class="ps"><strong>${pct}%</strong> today</span></div>
      <div class="prog-bar"><div class="prog-fill" style="width:${pct}%"></div></div></div>
      <div class="habit-list">${HABITS.map(h=>{
        const on=today.includes(h.id);
        return `<div class="habit ${on?'done':''}" data-id="${h.id}"><i class="fas ${h.icon}"></i><span>${h.label}</span><span class="hcheck"><i class="fas ${on?'fa-circle-check':'fa-circle'}"></i></span></div>`;
      }).join('')}</div>
      <p class="note">Only full days count toward your streak. Resets daily; data stays on this device.</p>`;
    wrap.querySelectorAll('.habit').forEach(h=>h.addEventListener('click',()=>{
      const id=h.dataset.id;
      const todayArr=prog[todayKey()]||[];
      const idx=todayArr.indexOf(id);
      if(idx>-1){ todayArr.splice(idx,1); } else { todayArr.push(id); }
      prog[todayKey()]=todayArr;
      saveProg(prog);
      renderProgress();
    }));
  }
  renderProgress();

})();
