(() => {
const $=id=>document.getElementById(id);
const KEY='sunday_speaker_invites_v1';
const statuses={
 'not-contacted':{label:'Не связывались',cls:''},
 invited:{label:'Приглашён',cls:'invited'},
 waiting:{label:'Ожидает ответа',cls:'waiting'},
 confirmed:{label:'Подтвердил',cls:'confirmed'},
 declined:{label:'Отказался',cls:'declined'}
};
let entries, viewMonth=new Date(new Date().getFullYear(),new Date().getMonth(),1), activeTab='calendar';
const dateISO=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const parseDate=s=>{const [y,m,d]=s.split('-').map(Number);return new Date(y,m-1,d,12)};
const ruMonth=d=>d.toLocaleDateString('ru-RU',{month:'long',year:'numeric'});
const ruDate=s=>parseDate(s).toLocaleDateString('ru-RU',{day:'numeric',month:'long',year:'numeric'});
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const INITIAL_ENTRIES=[{"id":"imported-001","date":"2024-03-03","speechNo":"","songNo":"","speaker":"","contact":"","status":"confirmed","comment":"Конгресс","updatedAt":"2026-10-19T00:00:00.000Z"},{"id":"imported-002","date":"2024-03-10","speechNo":"78","songNo":"110","speaker":"","contact":"","status":"confirmed","comment":"","updatedAt":"2026-10-19T00:00:00.000Z"},{"id":"imported-003","date":"2024-03-17","speechNo":"","songNo":"","speaker":"","contact":"","status":"confirmed","comment":"Спецречь № 5","updatedAt":"2026-10-19T00:00:00.000Z"},{"id":"imported-004","date":"2024-03-24","speechNo":"","songNo":"","speaker":"","contact":"","status":"confirmed","comment":"Вечеря № 14","updatedAt":"2026-10-19T00:00:00.000Z"},{"id":"imported-005","date":"2024-03-31","speechNo":"75","songNo":"","speaker":"Сева","contact":"","status":"confirmed","comment":"Начало в 11:00","updatedAt":"2026-10-19T00:00:00.000Z"},{"id":"imported-006","date":"2025-08-24","speechNo":"149","songNo":"31","speaker":"Саша Ш.","contact":"","status":"confirmed","comment":"Исходная запись: 31 🎼 🎤149","updatedAt":"2026-10-19T00:00:00.000Z"},{"id":"imported-007","date":"2025-08-31","speechNo":"22","songNo":"97","speaker":"Рома от Ш.","contact":"","status":"confirmed","comment":"Исходная запись: 🎼97 🎤22","updatedAt":"2026-10-19T00:00:00.000Z"},{"id":"imported-008","date":"2025-09-07","speechNo":"31","songNo":"","speaker":"Саша Хар","contact":"","status":"confirmed","comment":"","updatedAt":"2026-10-19T00:00:00.000Z"},{"id":"imported-009","date":"2025-09-14","speechNo":"88","songNo":"31","speaker":"Егор","contact":"","status":"confirmed","comment":"Исходная запись: 🎼31 🎤88","updatedAt":"2026-10-19T00:00:00.000Z"},{"id":"imported-010","date":"2025-09-21","speechNo":"65","songNo":"113","speaker":"Амаль","contact":"","status":"confirmed","comment":"Пионерская; исходная запись: 🎼113 🎤65","updatedAt":"2026-10-19T00:00:00.000Z"},{"id":"imported-011","date":"2025-09-28","speechNo":"","songNo":"","speaker":"","contact":"","status":"confirmed","comment":"Спецречь","updatedAt":"2026-10-19T00:00:00.000Z"},{"id":"imported-012","date":"2025-10-05","speechNo":"44","songNo":"","speaker":"Саша Б","contact":"","status":"confirmed","comment":"","updatedAt":"2026-10-19T00:00:00.000Z"},{"id":"imported-013","date":"2025-10-12","speechNo":"29","songNo":"","speaker":"Антон Б","contact":"","status":"confirmed","comment":"","updatedAt":"2026-10-19T00:00:00.000Z"},{"id":"imported-014","date":"2025-10-19","speechNo":"95","songNo":"8","speaker":"Роман Петр..","contact":"","status":"confirmed","comment":"","updatedAt":"2026-10-19T00:00:00.000Z"},{"id":"imported-015","date":"2025-11-02","speechNo":"64","songNo":"","speaker":"Женя Жур","contact":"","status":"confirmed","comment":"","updatedAt":"2026-10-19T00:00:00.000Z"},{"id":"imported-016","date":"2025-11-09","speechNo":"","songNo":"","speaker":"","contact":"","status":"confirmed","comment":"Конгресс","updatedAt":"2026-10-19T00:00:00.000Z"},{"id":"imported-017","date":"2025-11-16","speechNo":"3","songNo":"150","speaker":"Валера Хор","contact":"","status":"confirmed","comment":"","updatedAt":"2026-10-19T00:00:00.000Z"},{"id":"imported-018","date":"2025-11-23","speechNo":"","songNo":"","speaker":"","contact":"","status":"confirmed","comment":"Посещение","updatedAt":"2026-10-19T00:00:00.000Z"},{"id":"imported-019","date":"2025-11-30","speechNo":"144","songNo":"124","speaker":"Юра адлер","contact":"","status":"confirmed","comment":"","updatedAt":"2026-10-19T00:00:00.000Z"},{"id":"imported-020","date":"2025-12-07","speechNo":"48","songNo":"","speaker":"Семен Юд","contact":"","status":"confirmed","comment":"","updatedAt":"2026-10-19T00:00:00.000Z"},{"id":"imported-021","date":"2025-12-14","speechNo":"68","songNo":"","speaker":"Умед","contact":"","status":"confirmed","comment":"В исходной записи также указан 🎧130; сохранено здесь как заметка","updatedAt":"2026-10-19T00:00:00.000Z"},{"id":"imported-022","date":"2025-12-21","speechNo":"12","songNo":"","speaker":"Серж Кул","contact":"","status":"confirmed","comment":"В исходной записи также указан 🎧124; сохранено здесь как заметка","updatedAt":"2026-10-19T00:00:00.000Z"},{"id":"imported-023","date":"2025-12-28","speechNo":"90","songNo":"","speaker":"Саша Бочар","contact":"","status":"confirmed","comment":"","updatedAt":"2026-10-19T00:00:00.000Z"},{"id":"imported-024","date":"2026-01-04","speechNo":"53","songNo":"","speaker":"Вален сомат","contact":"","status":"confirmed","comment":"","updatedAt":"2026-10-19T00:00:00.000Z"},{"id":"imported-025","date":"2026-01-11","speechNo":"45","songNo":"","speaker":"Толя Кай","contact":"","status":"confirmed","comment":"","updatedAt":"2026-10-19T00:00:00.000Z"},{"id":"imported-026","date":"2026-01-18","speechNo":"44","songNo":"","speaker":"И1","contact":"","status":"confirmed","comment":"","updatedAt":"2026-10-19T00:00:00.000Z"},{"id":"imported-027","date":"2026-01-25","speechNo":"175","songNo":"","speaker":"Верещ Вик","contact":"","status":"confirmed","comment":"","updatedAt":"2026-10-19T00:00:00.000Z"},{"id":"imported-028","date":"2026-02-01","speechNo":"45","songNo":"54","speaker":"Толя Кай","contact":"","status":"confirmed","comment":"","updatedAt":"2026-10-19T00:00:00.000Z"},{"id":"imported-029","date":"2026-02-08","speechNo":"32","songNo":"","speaker":"Артур Пенза","contact":"","status":"confirmed","comment":"В исходной записи также указан 🎧33; сохранено здесь как заметка","updatedAt":"2026-10-19T00:00:00.000Z"},{"id":"imported-030","date":"2026-02-15","speechNo":"90","songNo":"","speaker":"Саша Боч","contact":"","status":"confirmed","comment":"","updatedAt":"2026-10-19T00:00:00.000Z"},{"id":"imported-031","date":"2026-02-22","speechNo":"71","songNo":"","speaker":"","contact":"","status":"confirmed","comment":"В исходной записи после номера речи указано «0»","updatedAt":"2026-10-19T00:00:00.000Z"},{"id":"imported-032","date":"2026-03-08","speechNo":"178","songNo":"","speaker":"Sergey 2","contact":"","status":"confirmed","comment":"В исходной записи также указан 🎧34; сохранено здесь как заметка","updatedAt":"2026-10-19T00:00:00.000Z"},{"id":"imported-033","date":"2026-04-05","speechNo":"160","songNo":"","speaker":"Andrey","contact":"","status":"confirmed","comment":"В исходной записи также указан 🎧28; сохранено здесь как заметка","updatedAt":"2026-10-19T00:00:00.000Z"},{"id":"imported-034","date":"2026-04-12","speechNo":"60","songNo":"","speaker":"Ваня","contact":"","status":"confirmed","comment":"В исходной записи также указан 🎧127; сохранено здесь как заметка","updatedAt":"2026-10-19T00:00:00.000Z"},{"id":"imported-035","date":"2026-04-19","speechNo":"16","songNo":"","speaker":"Андрей пенза","contact":"","status":"confirmed","comment":"В исходной записи также указан 🎧28; сохранено здесь как заметка","updatedAt":"2026-10-19T00:00:00.000Z"},{"id":"imported-036","date":"2026-04-26","speechNo":"","songNo":"","speaker":"","contact":"","status":"confirmed","comment":"Конгресс с предст","updatedAt":"2026-10-19T00:00:00.000Z"},{"id":"imported-037","date":"2026-05-03","speechNo":"81","songNo":"","speaker":"М25","contact":"","status":"confirmed","comment":"В исходной записи также указано 🎧…; номер неразборчив","updatedAt":"2026-10-19T00:00:00.000Z"},{"id":"imported-038","date":"2026-05-10","speechNo":"9","songNo":"","speaker":"Влад Г1","contact":"","status":"confirmed","comment":"В исходной записи также указан 🎧89; сохранено здесь как заметка","updatedAt":"2026-10-19T00:00:00.000Z"},{"id":"imported-039","date":"2026-05-17","speechNo":"","songNo":"","speaker":"","contact":"","status":"confirmed","comment":"Спецпрогрм Пред ВГУ","updatedAt":"2026-10-19T00:00:00.000Z"},{"id":"imported-040","date":"2026-05-24","speechNo":"18","songNo":"","speaker":"Олег Сп.","contact":"","status":"confirmed","comment":"В исходной записи также указан 🎧8; сохранено здесь как заметка","updatedAt":"2026-10-19T00:00:00.000Z"},{"id":"imported-041","date":"2026-05-31","speechNo":"40","songNo":"","speaker":"Мтв","contact":"","status":"confirmed","comment":"В исходной записи также указано 🎧Мтв; сохранено здесь как заметка","updatedAt":"2026-10-19T00:00:00.000Z"},{"id":"imported-042","date":"2026-06-07","speechNo":"137","songNo":"","speaker":"Шебан","contact":"","status":"confirmed","comment":"В исходной записи также указан 🎧144; сохранено здесь как заметка","updatedAt":"2026-10-19T00:00:00.000Z"},{"id":"imported-043","date":"2026-06-14","speechNo":"74","songNo":"","speaker":"Бур Ант","contact":"","status":"confirmed","comment":"В исходной записи также указан 🎧12; сохранено здесь как заметка","updatedAt":"2026-10-19T00:00:00.000Z"},{"id":"imported-044","date":"2026-06-21","speechNo":"48","songNo":"","speaker":"Макса отец","contact":"","status":"confirmed","comment":"В исходной записи также указан 🎧124; сохранено здесь как заметка","updatedAt":"2026-10-19T00:00:00.000Z"},{"id":"imported-045","date":"2026-06-28","speechNo":"30","songNo":"","speaker":"Никита Б","contact":"","status":"confirmed","comment":"В исходной записи также указан 🎧134; сохранено здесь как заметка","updatedAt":"2026-10-19T00:00:00.000Z"},{"id":"imported-046","date":"2026-07-05","speechNo":"73","songNo":"","speaker":"Акела","contact":"","status":"confirmed","comment":"В исходной записи также указан 🎧36; сохранено здесь как заметка","updatedAt":"2026-10-19T00:00:00.000Z"}];
entries=load();
function load(){try{const raw=localStorage.getItem(KEY);if(raw!==null){const parsed=JSON.parse(raw);if(Array.isArray(parsed))return parsed.filter(e=>e&&typeof e==='object'&&typeof e.date==='string');}localStorage.setItem(KEY,JSON.stringify(INITIAL_ENTRIES));return INITIAL_ENTRIES.slice()}catch(err){console.error('Не удалось загрузить локальные записи:',err);return INITIAL_ENTRIES.slice()}}
function save(){try{localStorage.setItem(KEY,JSON.stringify(entries));return true}catch(err){console.error('Не удалось сохранить записи:',err);showToast('Не удалось сохранить данные. Сделайте экспорт и проверьте свободное место.');return false}}
function id(){return crypto.randomUUID?crypto.randomUUID():Date.now().toString(36)+Math.random().toString(36).slice(2)}
function sundays(y,m){const arr=[];const d=new Date(y,m,1,12);while(d.getMonth()===m){if(d.getDay()===0)arr.push(new Date(d));d.setDate(d.getDate()+1)}return arr}
function sorted(){return [...entries].sort((a,b)=>a.date.localeCompare(b.date))}
function monthEntries(y,m){return sorted().filter(e=>{const d=parseDate(e.date);return d.getFullYear()===y&&d.getMonth()===m})}
function lastPrior(no,date,excludeId=''){return entries.filter(e=>e.speechNo===String(no)&&e.id!==excludeId&&e.date<date).sort((a,b)=>b.date.localeCompare(a.date))[0]}
function repeatInfo(no,date,excludeId=''){if(!no||!date)return '';const matches=entries.filter(e=>e.speechNo===String(no)&&e.id!==excludeId).sort((a,b)=>b.date.localeCompare(a.date));if(!matches.length)return 'Этот номер речи ещё не встречался в сохранённой истории.';const prior=matches.filter(e=>e.date<date)[0];const future=matches.filter(e=>e.date>date).slice(-1)[0];let out=[];if(prior)out.push(`Последнее предыдущее назначение: ${ruDate(prior.date)}${prior.speaker?' — '+prior.speaker:''}.`);else out.push('В истории нет более раннего назначения этого номера.');if(future)out.push(`Также назначена на более позднюю дату: ${ruDate(future.date)}.`);out.push(`Всего других записей с этим номером: ${matches.length}.`);return out.join(' ')}
function renderCalendar(){
 $('currentMonth').textContent=ruMonth(viewMonth).replace(/^./,c=>c.toLocaleUpperCase('ru-RU'));
 const host=$('monthList');host.innerHTML='';const today=dateISO(new Date());
 // The current month is first; swiping up naturally reveals each following month.
 for(let offset=0;offset<24;offset++){
  const month=new Date(viewMonth.getFullYear(),viewMonth.getMonth()+offset,1);
  const y=month.getFullYear(),m=month.getMonth(),list=monthEntries(y,m);
  if(offset>0){const heading=document.createElement('h2');heading.className='scroll-month-heading';heading.textContent=ruMonth(month).replace(/^./,c=>c.toLocaleUpperCase('ru-RU'));host.appendChild(heading)}
  const group=document.createElement('div');group.className='month-group';group.dataset.month=`${y}-${String(m+1).padStart(2,'0')}`;
  sundays(y,m).forEach(d=>{
   const ds=dateISO(d),e=list.find(x=>x.date===ds),card=document.createElement('article');card.className='sunday-card';
   const status=e?statuses[e.status]||statuses['not-contacted']:null;
   card.innerHTML=`<div class="date-block"><span class="day">${d.getDate()}</span><span class="weekday">ВС</span></div><div class="card-content"><div class="card-top"><h3>${d.toLocaleDateString('ru-RU',{weekday:'long',day:'numeric',month:'long'})}${ds===today?'<span class="today-tag">СЕГОДНЯ</span>':''}</h3>${e?`<span class="status ${status.cls}">${status.label}</span>`:''}</div>${e?`<div class="card-details"><div class="detail">${e.speechNo?`Речь: <b>№ ${esc(e.speechNo)}</b>`:`Событие`}</div><div class="detail">${e.songNo?`Песня: <b>${esc(e.songNo)}</b>`:`${e.speechNo?`Песня: <b>—</b>`:`Тип: <b>вне обычного расписания</b>`}`}</div><div class="detail full">Докладчик: <b>${esc(e.speaker||'Не указан')}</b></div>${e.contact?`<div class="detail full">Контакт: ${esc(e.contact)}</div>`:''}${e.comment?`<div class="detail full">Заметка: ${esc(e.comment)}</div>`:''}</div>`:`<p class="no-data">Докладчик ещё не назначен</p>`}<button class="add-date">${e?'Открыть запись':'＋ Добавить приглашение'}</button></div>`;
   card.querySelector('button').addEventListener('click',()=>openForm(ds,e));group.appendChild(card);
  });
  host.appendChild(group);
 }
 $('emptyState').classList.add('hidden');
}
function renderHistory(){
 const q=$('historySearch').value.trim().toLowerCase(),host=$('historyResults');host.innerHTML='';
 const matches=sorted().reverse().filter(e=>!q||String(e.speechNo||'').toLowerCase().includes(q)||String(e.speaker||'').toLowerCase().includes(q)||String(e.songNo||'').toLowerCase().includes(q)||String(e.comment||'').toLowerCase().includes(q));
 if(!matches.length){host.innerHTML='<div class="history-empty">Записей не найдено.</div>';return}
 const summary=document.createElement('div');summary.className='history-summary';summary.textContent=`Записей в истории: ${matches.length}`;host.appendChild(summary);
 matches.forEach(e=>{
  const item=document.createElement('article');item.className='history-item';
  const status=statuses[e.status]?.label||'Не связывались';
  item.innerHTML=`<strong>${ruDate(e.date)} · ${e.speechNo?'Речь № '+esc(e.speechNo):'Событие'}</strong><p>Докладчик: ${esc(e.speaker||'не указан')} · Песня: ${esc(e.songNo||'—')}</p><p>Статус: ${esc(status)}${e.comment?' · '+esc(e.comment):''}</p>${e.contact?`<p>Контакт: ${esc(e.contact)}</p>`:''}<button class="add-date" data-edit="${esc(e.id)}">Открыть запись</button>`;
  host.appendChild(item);
 });
 host.querySelectorAll('[data-edit]').forEach(b=>b.addEventListener('click',()=>{const e=entries.find(x=>x.id===b.dataset.edit);if(e)openForm(e.date,e)}));
}
function render(){renderCalendar();renderHistory()}
function showToast(s){const t=$('toast');t.textContent=s;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2400)}
function openForm(date,e=null){
 $('entryForm').reset();$('entryId').value=e?.id||'';$('entryDate').value=e?.date||date;$('speechNo').value=e?.speechNo||'';$('songNo').value=e?.songNo||'';$('speakerName').value=e?.speaker||'';$('contactInfo').value=e?.contact||'';$('inviteStatus').value=e?.status||'not-contacted';$('entryComment').value=e?.comment||'';
 $('formEyebrow').textContent=e?'РЕДАКТИРОВАНИЕ':'НОВАЯ ЗАПИСЬ';$('formTitle').textContent=e?'Приглашение':'Новое приглашение';$('deleteEntry').classList.toggle('hidden',!e);
 $('repeatNotice').classList.add('hidden');$('entryDialog').showModal();updateRepeat();
}
function updateRepeat(){const no=$('speechNo').value.trim(),date=$('entryDate').value;const n=$('repeatNotice');if(!no||!date){n.classList.add('hidden');return}n.textContent=repeatInfo(no,date,$('entryId').value);n.classList.remove('hidden')}
$('speechNo').addEventListener('input',updateRepeat);$('entryDate').addEventListener('change',updateRepeat);
$('entryForm').addEventListener('submit',ev=>{ev.preventDefault();const date=$('entryDate').value;if(!date||parseDate(date).getDay()!==0){showToast('Выберите воскресенье.');return}
 const speechNo=$('speechNo').value.trim();if(!speechNo&&!$('entryComment').value.trim()&&!$('speakerName').value.trim()){showToast('Укажите номер речи или описание события.');return}
 const idv=$('entryId').value;const record={id:idv||id(),date,speechNo,songNo:$('songNo').value.trim(),speaker:$('speakerName').value.trim(),contact:$('contactInfo').value.trim(),status:$('inviteStatus').value,comment:$('entryComment').value.trim(),updatedAt:new Date().toISOString()};
 const duplicate=entries.find(x=>x.date===date&&x.id!==idv);if(duplicate&&!confirm('На это воскресенье уже есть запись. Сохранить вторую запись на ту же дату?'))return;
 entries=entries.filter(x=>x.id!==idv);entries.push(record);save();viewMonth=new Date(parseDate(date).getFullYear(),parseDate(date).getMonth(),1);$('entryDialog').close();render();showToast('Запись сохранена на этом устройстве.');
});
function closeForm(){$('entryDialog').close()}
$('closeDialog').onclick=closeForm;$('cancelEntry').onclick=closeForm;
$('deleteEntry').onclick=()=>{const idv=$('entryId').value;if(idv&&confirm('Удалить это приглашение?')){entries=entries.filter(e=>e.id!==idv);save();closeForm();render();showToast('Запись удалена.')}};
$('addTop').onclick=()=>{const ds=dateISO(new Date());let d=parseDate(ds);if(d.getDay()!==0){d.setDate(d.getDate()+(7-d.getDay()))}viewMonth=new Date(d.getFullYear(),d.getMonth(),1);render();openForm(dateISO(d))};
$('historySearch').addEventListener('input',renderHistory);
document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>{activeTab=b.dataset.tab;document.querySelectorAll('.tab').forEach(x=>x.classList.toggle('active',x===b));$('calendarView').classList.toggle('hidden',activeTab!=='calendar');$('historyView').classList.toggle('hidden',activeTab!=='history');if(activeTab==='history')renderHistory()});
$('exportBtn').addEventListener('click',async()=>{
 try{
  const payload=JSON.stringify({app:'Sunday Speaker Invitations',version:1,entries},null,2);
  const file=new File([payload],'voskresnye-rechi-backup.json',{type:'application/json'});
  if(navigator.share&&navigator.canShare&&navigator.canShare({files:[file]})){
   await navigator.share({files:[file],title:'Резервная копия — Воскресные речи'});
   showToast('Выберите «Сохранить в Файлы», чтобы сохранить копию.');return;
  }
  const blob=new Blob([payload],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');
  a.href=url;a.download='voskresnye-rechi-backup.json';a.style.display='none';document.body.appendChild(a);a.click();
  setTimeout(()=>{URL.revokeObjectURL(url);a.remove()},1500);showToast('Экспорт подготовлен. Если загрузка не началась, попробуйте ещё раз.');
 }catch(err){console.error('Экспорт:',err);showToast('Экспорт не выполнен. Попробуйте через меню «Поделиться».')}
});
$('importBtn').addEventListener('click',()=>{const picker=$('importFile');picker.value='';picker.click()});
$('importFile').addEventListener('change',async ev=>{
 const file=ev.target.files&&ev.target.files[0];if(!file)return;
 try{
  const text=await file.text();const data=JSON.parse(text);const arr=Array.isArray(data)?data:data.entries;
  if(!Array.isArray(arr))throw new Error('В файле нет массива entries');
  const valid=arr.filter(e=>{
   if(!e||typeof e!=='object'||typeof e.date!=='string'||!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(e.date))return false;
   const d=parseDate(e.date);return !Number.isNaN(d.getTime())&&d.getDay()===0&&(String(e.speechNo||'').trim()!==''||String(e.comment||'').trim()!==''||String(e.speaker||'').trim()!=='');
  }).map((e,i)=>({...e,id:String(e.id||('imported-'+Date.now()+'-'+i)),speechNo:String(e.speechNo||''),songNo:String(e.songNo||''),speaker:String(e.speaker||''),contact:String(e.contact||''),comment:String(e.comment||''),status:statuses[e.status]?e.status:'confirmed'}));
  if(!valid.length)throw new Error('Не найдено подходящих записей на воскресенья');
  if(!confirm(`Импорт заменит текущую историю. Импортировать ${valid.length} записей? Перед продолжением рекомендуется сохранить экспорт.`))return;
  const previous=entries;entries=valid;
  if(!save()){entries=previous;throw new Error('Не удалось записать данные в локальное хранилище')}
  render();showToast('Импорт завершён: '+entries.length+' записей.');
 }catch(err){console.error('Импорт:',err);showToast('Не удалось импортировать файл. Проверьте JSON и формат дат.');}
 finally{ev.target.value=''}
});
window.addEventListener('error',ev=>{console.error('Ошибка приложения:',ev.message,ev.filename,ev.lineno);showToast('Ошибка приложения. Перезагрузите страницу; если повторится — сообщите.');});
if('serviceWorker' in navigator && location.protocol.startsWith('http'))window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
render();
})();