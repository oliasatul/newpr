// ===== Utilities =====
}


function cheapHeuristicFallback(text){
const lower = text.toLowerCase();
const negWords = ['not my fault','blame','lazy','hate','argue','messy','failed','problem','issue','weakness','late','behind'];
const red = negWords.filter(w=>lower.includes(w));
const positives = [];
if (/(result|impact|increas|reduc|save|improv)/.test(lower)) positives.push('Mentions outcome or impact.');
if (/(led|ownership|proactive|initi|drove|managed)/.test(lower)) positives.push('Shows ownership or leadership.');
return {
positives,
red_flags: red.length? red.map(w=>`Potential negative phrasing detected: “${w}”`) : ['May be vague on metrics and specific actions.'],
suggestions: [
'Quantify the result (%, $, time saved) and your unique contribution.',
'Use STAR: one sentence each for Situation, Task, Action, Result.'
]
};
}


// ===== Render =====
function renderResults(obj){
const wrap = $('#results');
wrap.innerHTML = '';


const sections = [
{ key:'positives', title:'Positive aspects', icon:'✅', cls:'card--green' },
{ key:'red_flags', title:'Red flags', icon:'⚠️', cls:'card--red' },
{ key:'suggestions', title:'Suggestions', icon:'✍️', cls:'card--blue' }
];


for (const sec of sections){
const list = obj[sec.key] || [];
const card = buildCard(sec.title, sec.icon, list, sec.cls);
wrap.appendChild(card);
}
}


function buildCard(title, icon, items, extraClass=''){
const tmpl = $('#cardTmpl');
const node = tmpl.content.firstElementChild.cloneNode(true);
if (extraClass) node.classList.add(extraClass);
$('.card-icon', node).textContent = icon;
$('.card-title', node).textContent = title;
const ul = $('.card-list', node);
if (!items.length){
const li = document.createElement('li'); li.textContent = 'No items.'; ul.appendChild(li);
} else {
for (const it of items){ const li = document.createElement('li'); li.textContent = it; ul.appendChild(li); }
}
return node;
}


// ===== Loading =====
function setLoading(flag){
$('#loading').hidden = !flag;
}


// ===== On load: hydrate theme & history =====
(function init(){
const savedTheme = localStorage.getItem('rfd_theme');
if (savedTheme) document.body.setAttribute('data-theme', savedTheme);
renderHistory();
})();
