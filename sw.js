const C="col26-v47",IMG="col26-img-1";
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(["./","index.html","manifest.webmanifest","img/icon-192.png"]).catch(()=>{})));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C&&k!==IMG).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;const u=new URL(r.url);
  const fresh=u.origin===location.origin&&(u.pathname.endsWith("/")||u.pathname.endsWith(".html")||u.pathname.endsWith("data-full.json")||u.pathname.endsWith(".webmanifest"));
  if(fresh){e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(r,cp));return res;}).catch(()=>caches.match(r,{ignoreSearch:true})));return;}
  const isImg=u.origin===location.origin&&/\/(img|pdf)\//.test(u.pathname);const store=isImg?IMG:C;
  e.respondWith(caches.match(r,{ignoreSearch:true}).then(hit=>hit||fetch(r).then(res=>{if(res.ok&&(u.origin===location.origin||/fonts\.(googleapis|gstatic)|cdnjs/.test(u.host))){const cp=res.clone();caches.open(store).then(c=>c.put(r,cp));}return res;})));});
