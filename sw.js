const CACHE='sunday-speaker-pwa-v4';
const CORE=['./','./index.html','./style.css','./app.js','./manifest.json','./icon.svg','./apple-touch-icon.png','./icon-192.png','./icon-512.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('sunday-speaker-pwa-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET')return;
 const url=new URL(event.request.url);
 if(url.origin!==self.location.origin)return;
 event.respondWith((async()=>{
  const cached=await caches.match(event.request);
  try{
   const response=await fetch(event.request);
   if(response&&response.ok){const cache=await caches.open(CACHE);cache.put(event.request,response.clone()).catch(()=>{});return response;}
   if(cached)return cached;
   if(event.request.mode==='navigate')return (await caches.match('./index.html'))||response;
   return response;
  }catch(err){
   if(cached)return cached;
   if(event.request.mode==='navigate')return (await caches.match('./index.html'))||Response.error();
   return Response.error();
  }
 })());
});
