/* ============================================
   Ascend - content.js
   All researched content lives here (no fake data).
   Each guide section item: sev = 'good' | 'warn' | 'bad'
   Sources are real, published works.
   ============================================ */

window.ASCEND_CONTENT = {

guides: [
  {
    id: 'skin',
    icon: 'fa-face-smile',
    title: 'Skin: The Real, Minimal Routine',
    summary: 'Four things matter: gentle cleanser, vitamin C (AM), moisturizer, daily SPF 30+ — plus a retinoid at night. Sunscreen prevents the #1 cause of visible skin aging.',
    evidence: 5,
    sev: 'good',
    sections: [
      { h: 'Why skin is the foundation', t: 'Skin is the "canvas" for every other appearance change. Over and above hairstyle or body composition, dull, sun-damaged, or texturally uneven skin reads as unhealthy and aged. Leading dermatology guidance (Mayo Clinic, dermatological societies) agrees the single most impactful, modifiable factor in skin aging is cumulative sun exposure.' },
      { h: 'The simple AM routine', t: '1) Gentle cleanser — removes overnight sebum without stripping the barrier. 2) Vitamin C serum (L-ascorbic acid 10–20%) — an antioxidant and a required cofactor for collagen synthesis; helps with pigmentation. 3) Moisturizer — locks in hydration. 4) SPF 30+ broad-spectrum sunscreen — daily, even when cloudy.' },
      { h: 'The PM routine', t: '1) Oil-based cleanser (if you wore SPF/makeup) then a gentle water-based one. 2) A retinoid (tretinoin 0.025% or retinol 0.5–1%) — the most-studied topical anti-aging agent, increases dermal collagen over time; start low and go slow to limit irritation. 3) Moisturizer buffer.' },
      { h: 'Realistic timeline', t: 'Hydration improves within weeks. Texture/pigmentation change over ~8–12 weeks. Collagen/anti-aging effects compound over months. Consistency beats intensity — a routine you can actually do every day wins.' }
    ]
  },
  {
    id: 'bodyfat',
    icon: 'fa-percent',
    title: 'Body Composition & the Face',
    summary: 'Lower body fat is the single highest-ROI free change for jaw/cheek definition — but don\u2019t crash-diet; preserve muscle.',
    evidence: 5,
    sev: 'good',
    sections: [
      { h: 'The data', t: 'A strong body of research (facial adiposity studies, e.g. the Frontiers in Psychology review) links facial adiposity — weight visible in the face — to attractiveness and perceived health. Both over- and underweight faces are rated less attractive; people reliably estimate BMI/body-fat from faces alone (correlation ~0.71 in a meta-analysis).' },
      { h: 'What it means practically', t: 'For most men, moving toward the lower end of a healthy body-fat range sharpens the jawline and cheekbones, because there is less soft tissue obscuring the underlying bone structure. This is free, optionally fast, and health-positive.' },
      { h: 'Do it healthily', t: 'A moderate calorie deficit (~500 kcal/day) preserves muscle while losing fat, and lets skin adapt gradually. Extreme restriction (<~1200 kcal) causes muscle loss and can cause facial skin laxity ("crash-diet face"). Resistance training + adequate protein protects muscle.' }
    ]
  },
  {
    id: 'sleep',
    icon: 'fa-bed',
    title: 'Sleep & Hydration',
    summary: '7–9 hours of sleep visibly reduces under-eye puffiness and dark circles, and supports skin repair. Hydration reduces facial bloating.',
    evidence: 5,
    sev: 'good',
    sections: [
      { h: 'Sleep is the original beauty treatment', t: 'Studies of sleep quality link poor sleep to more under-eye circles, increased water loss from skin, and lower self-rated attractiveness. Growth hormone peaks in deep sleep and drives the cell turnover and collagen synthesis behind skin repair. Sleep deprivation raises cortisol, which promotes collagen breakdown.' },
      { h: 'Hydration & puffiness', t: 'Chronic mild dehydration makes the body retain more water in tissues, paradoxically increasing facial bloating. Adequate consistent fluid intake reduces facial puffiness and improves skin turgor. Note: drinking extra beyond your needs in a healthy person has unclear added benefit — consistency is the goal.' },
      { h: 'Alcohol & sodium', t: 'Alcohol causes facial vasodilation and water retention (the "puffy morning" look) and disrupts deep sleep. High sodium promotes fluid retention. Moderating both is a free, fast win for facial definition.' }
    ]
  },
  {
    id: 'posture',
    icon: 'fa-person',
    title: 'Posture & Presentation',
    summary: 'Upright posture is one of the few overnight visual changes — it immediately alters your jawline and neckline in photos and real life.',
    evidence: 4,
    sev: 'good',
    sections: [
      { h: 'The instant change', t: 'Chin parallel to the floor, shoulders back and relaxed — this instantly changes how your jaw, neck, and overall frame present. It is the cheapest immediate improvement and disappears the moment you slouch, so it makes a habit.' },
      { h: 'Long-term posture', t: 'Forward head posture lengthens the appearance of the neck and can strain muscles. Regular movement, strengthening the upper back, and mindful desk setup help sustainable posture. Posture is about presentation — it does not change bone structure.' }
    ]
  },
  {
    id: 'hair',
    icon: 'fa-scissors',
    title: 'Hair & Grooming',
    summary: 'A haircut matched to your face shape is one of the largest single-day visual changes. Clean grooming reads as "put together" instantly.',
    evidence: 4,
    sev: 'good',
    sections: [
      { h: 'Haircut by face shape', t: 'Barbers and stylists match haircuts to face shape to balance proportions — e.g. adding height to balance a round face, keeping length to soften a narrow/oblong face, or avoiding too-short sides that over-square an already-square jaw. It is a real, immediate styling principle, not a cosmetic verdict.' },
      { h: 'Grooming basics', t: 'Tidy brows, facial-hair shaping that frames your jaw (rather than hiding an undefined one), dental hygiene, and clean nails all read as "groomed." These are low-cost, reversible, and universally beneficial.' },
      { h: 'Chronic hair loss', t: 'Hair loss is common; treatments (minoxidil, finasteride — under a doctor, as finasteride has side effects) are real but medical decisions. Hair transplant is an option discussed with a qualified professional. Beware of miracle oils — evidence is weak.' }
    ]
  },
  {
    id: 'nutrition',
    icon: 'fa-apple-whole',
    title: 'Nutrition for Skin',
    summary: 'A balanced diet, enough protein, and limiting refined carbs and sugar support skin health. Supplements (collagen etc.) have modest, conditional evidence.',
    evidence: 4,
    sev: 'good',
    sections: [
      { h: 'The basics', t: 'A balanced diet rich in fruit, vegetables, whole grains, and lean protein protects skin. A meta-analysis of dietary interventions in skin aging found strongest, consistent evidence for essential fatty acids and polyphenols (broad benefits: wrinkle reduction, hydration, barrier). Carotenoids target redness; collagen specifically helps wrinkles/hydration but with more conditionality.' },
      { h: 'What to limit', t: 'High refined-sugar and processed-carbohydrate diets may speed skin aging (advanced glycation). Alcohol depletes vitamins and provokes facial puffiness. Hydration matters but excess water in healthy people is not a proven anti-aging lever.' },
      { h: 'Supplements: honest take', t: 'Some oral collagen, omega-3 fatty acids, and polyphenols show conditional benefit in studies. They are supporting players — they do not override sleep, SPF, and body composition. Buy from reputable sources; "miraculous" claims should be ignored.' }
    ]
  }
],

debunked: [
  {
    icon: 'fa-hammer',
    title: 'Bonesmashing',
    sev: 'bad',
    danger: 'Dangerous',
    body: 'Hitting your face with a hammer or blunt object to "remodel" bone. The idea misreads Wolff\u2019s law, which describes adaptive remodeling under controlled physiological load — not blunt trauma. Reality: contusions, microfractures, displaced fractures, nerve damage, and asymmetric healing requiring reconstructive surgery. Pain without cosmetic benefit. Do not do this. (Expert consensus: plastic/aesthetic surgeons, oral & maxillofacial surgeons, Healthline.)'
  },
  {
    icon: 'fa-mouth',
    title: 'Mewing (adult jaw reshaping)',
    sev: 'bad',
    danger: 'Unsupported',
    body: 'Resting the tongue against the palate to change adult jaw shape is not supported by evidence. The AAO does not recommend it; Cleveland Clinic and multiple orthodontists note tongue posture is relevant in childhood facial development, but cannot meaningfully reshape the adult skeleton, and forced pressure can worsen TMJ tension or tooth alignment. Tongue posture during growth is real science; adult jaw "mewing" outcomes are mostly natural aging + fat loss.'
  },
  {
    icon: 'fa-syringe',
    title: 'DIY / at-home cosmetic procedures',
    sev: 'bad',
    danger: 'Dangerous',
    body: 'Self-injecting fillers or other substances is extremely dangerous: risk of infection, vascular occlusion, nerve damage, and permanent disfigurement. Fillers, jaw surgery, and implants are medical procedures for qualified professionals only. Never buy or inject anything meant for clinical use at home.'
  },
  {
    icon: 'fa-pills',
    title: '"Miracle" supplements & growth-hormone hacks',
    sev: 'bad',
    danger: 'Unsupported / risky',
    body: 'Most "jawline/hair/skin in 30 days" pills have no credible evidence. Unregulated growth-hormone or testosterone boosting can cause serious health harm. Real interventions (finasteride, tretinoin, filler) are prescription/clinical decisions. If a supplement promises bone or structure change, it is almost certainly overstated.'
  },
  {
    icon: 'fa-gauge-high',
    title: '"Ascension scores" & fake rating tiers',
    sev: 'warn',
    danger: 'Unsupported',
    body: 'Some communities assign pseudo-scientific "scores" or tiers to faces. These are not validated measures — no academic rating scale works like this. They are marketing/lore, and they fuel insecurity. Use objective health metrics (BMI, body-fat %, healthy habits) instead. Focus on controllable, evidence-backed levers.'
  }
],

sources: [
  { label: 'Skin care: 5 tips for healthy skin', org: 'Mayo Clinic', url: 'https://www.mayoclinic.org/healthy-lifestyle/adult-health/in-depth/skin-care/art-20048237' },
  { label: 'Facial Adiposity, Attractiveness, and Health: A Review', org: 'Frontiers in Psychology (2018)', url: 'https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2018.02562/full' },
  { label: 'The Influence of Body Composition on Male Facial Masculinity', org: 'Frontiers in Psychology (2019), University of Glasgow', url: 'https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2018.02658/full' },
  { label: 'Dietary interventions in skin ageing: systematic review & meta-analysis', org: 'PMC (Nutr. factors)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12577306/' },
  { label: 'Enhancing Skin Anti-Aging through Healthy Lifestyle Factors', org: 'MDPI Cosmetics (2023)', url: 'https://www.mdpi.com/2079-9284/10/5/142' },
  { label: 'Mewing: What It Is, How To Do It and Results', org: 'Cleveland Clinic', url: 'https://health.clevelandclinic.org/what-is-mewing' },
  { label: 'Does Mewing Actually Reshape Your Jaw?', org: 'American Association of Orthodontists', url: 'https://aaoinfo.org/whats-trending/is-mewing-bad-for-you/' },
  { label: 'Bone Smashing TikTok trend: why it is dangerous and doesn\u2019t work', org: 'Healthline (2023)', url: 'https://www.healthline.com/health-news/bone-smashing-tiktok-trend-isnt-just-dangerous-it-doesnt-work' },
  { label: 'Bonesmashing & mewing: a maxillofacial surgeon\u2019s view', org: 'Dr. Larry M. Wolford', url: 'https://drlarrywolford.com/looksmaxxing-mewing-and-bone-smashing-what-a-maxillofacial-surgeon-actually-thinks-about-the-viral-jawline-trend/' },
  { label: 'Three-dimensional photographic analysis of the face (anthropometric reference)', org: 'BMC Oral Health (Springer, 2019)', url: 'https://link.springer.com/article/10.1186/s12903-019-0898-y' },
  { label: 'Principal component analysis of 3D facial soft-tissue morphology', org: 'Scientific Reports (Nature, 2026)', url: 'https://www.nature.com/articles/s41598-026-41517-z' },
  { label: 'Evaluation of Facial Proportions, Landmarks Relationships', org: 'PMC (2025)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12202967/' },
  { label: 'International anthropometric study of facial morphology in various ethnic groups', org: 'Farkas et al., Europe PMC', url: 'https://europepmc.org/article/med/16077306' },
  { label: 'Facial attractiveness is related to cortisol and body fat', org: 'PMC (2013)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3730635/' }
],

faceShapes: {
  oval:   { name: 'Oval', hint: 'Length clearly greater than width; gently rounded jaw. The most "balanced" baseline — most hairstyles suit it.', guide: 'Balanced proportions; you can pull off most styles. Keep it clean.' },
  round:  { name: 'Round', hint: 'Face width and length are similar; full cheeks; no sharp angles.', guide: 'Add height/volume with your cut and lower body fat to reveal more definition.' },
  square: { name: 'Square', hint: 'Strong, broad jaw and forehead; similar width at jaw and temples.', guide: 'A strong jaw is usually an asset. Soften with medium length; keep sides not too tight.' },
  oblong: { name: 'Oblong', hint: 'Face is noticeably longer than it is wide; gentler jaw.', guide: 'Add width with fuller sides; avoid too much top height.' },
  heart:  { name: 'Heart', hint: 'Broad forehead/cheekbones tapering to a narrower chin.', guide: 'Draw attention to the eyes/cheekbones; avoid adding width on top.' },
  diamond:{ name: 'Diamond', hint: 'Narrow forehead and chin with wide cheekbones.', guide: 'Balance prominent cheekbones; keep hair off the forehead.' }
},

// Body-fat category labels by estimate
bfCatMale: function(p){ if(p==null)return''; if(p<6)return'Probably underfat (very low)'; if(p<=13)return'Athletic / lean'; if(p<=17)return'Fitness'; if(p<=24)return'Average / healthy'; if(p<=31)return'Above average'; return'High / overweight range'; },
bfCatFemale: function(p){ if(p==null)return''; if(p<14)return'Probably underfat (very low)'; if(p<=20)return'Athletic / lean'; if(p<=24)return'Fitness'; if(p<=31)return'Average / healthy'; if(p<=38)return'Above average'; return'High / overweight range'; }

};
