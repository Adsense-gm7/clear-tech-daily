import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, extname, sep } from 'node:path';

const root=fileURLToPath(new URL('../',import.meta.url));
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript','.svg':'image/svg+xml','.xml':'application/xml','.txt':'text/plain'};
createServer(async(req,res)=>{
 try{
  let path=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  if(path.endsWith('/'))path+='index.html';
  else if(!extname(path))path+='.html';
  const file=resolve(root,'.'+path);
  if(!file.startsWith(resolve(root)+sep)){res.writeHead(403);res.end();return;}
  let body=await readFile(file);
  if(extname(file)==='.html')body=Buffer.from(body.toString().replace(/<script async src="https:\/\/pagead2[^>]*><\/script>/g,''));
  res.writeHead(200,{'Content-Type':types[extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(body);
 }catch{res.writeHead(404,{'Content-Type':'text/plain'});res.end('Page not found');}
}).listen(8092,'127.0.0.1',()=>console.log('Preview: http://127.0.0.1:8092 (advertising disabled locally)'));
