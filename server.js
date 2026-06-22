/**
 * Mock API Server for Career Fair Display System
 * Usage: node server.js
 * Then open http://localhost:3456 in browser
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3456;
const DATA = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf-8'));

// Helper: random name generation for simulated check-ins
const SURNAMES = '张李王陈刘杨黄赵周吴徐孙马朱胡林郭何高罗郑梁谢宋唐许韩冯邓曹'.split('');
const GIVENS = '伟芳敏静丽强磊洋勇艳杰娟涛明超秀英华慧鑫桂英建华丽兰萍红梅军峰斌文博雪雨桐子轩宇轩一诺欣怡梓涵奕辰思源乐天'.split('');

function randomName() {
  return SURNAMES[Math.floor(Math.random() * SURNAMES.length)] +
         GIVENS[Math.floor(Math.random() * GIVENS.length)];
}

// MIME types
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = url.pathname;

  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  // ===== API Routes =====
  if (pathname === '/api/panel') {
    const fairId = url.searchParams.get('jobFairId') || '17';
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    return res.end(JSON.stringify({
      code: 200,
      msg: 'success',
      data: {
        fairInfo: { ...DATA.fairInfo, id: parseInt(fairId) },
        schools: DATA.schools,
        majors: DATA.majors,
        industries: DATA.industries,
        locations: DATA.locations,
        companyTypes: DATA.companyTypes,
      }
    }));
  }

  if (pathname === '/api/panel/companies') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    return res.end(JSON.stringify({
      code: 200,
      msg: 'success',
      data: {
        industries: DATA.industries,
        locations: DATA.locations,
        companyTypes: DATA.companyTypes,
        // Companies are embedded in industries for the frontend to extract
      }
    }));
  }

  if (pathname === '/api/panel/checkins') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    return res.end(JSON.stringify({
      code: 200,
      msg: 'success',
      data: {
        checkinRate: DATA.fairInfo.checkinRate,
        totalAttendees: DATA.fairInfo.totalAttendees,
        schools: DATA.schools,
        majors: DATA.majors,
      }
    }));
  }

  if (pathname === '/api/panel/checkins/recent') {
    const limit = parseInt(url.searchParams.get('limit') || '20');
    const checkins = [];
    const now = new Date();
    for (let i = 0; i < limit; i++) {
      const t = new Date(now - Math.floor(Math.random() * 1800000)); // within last 30 min
      checkins.push({
        id: Math.floor(Math.random() * 10000),
        name: randomName(),
        school: DATA.schools[Math.floor(Math.random() * DATA.schools.length)].name,
        major: DATA.majors[Math.floor(Math.random() * DATA.majors.length)].name,
        time: t.toISOString(),
      });
    }
    checkins.sort((a, b) => new Date(b.time) - new Date(a.time));
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    return res.end(JSON.stringify({ code: 200, msg: 'success', data: checkins }));
  }

  // ===== Static File Serving =====
  let filePath = pathname === '/' ? '/index.html' : pathname;
  filePath = path.join(__dirname, filePath);

  // Security: prevent directory traversal
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }

  const ext = path.extname(filePath);
  const contentType = MIME[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // SPA fallback: serve index.html for non-file routes
        fs.readFile(path.join(__dirname, 'index.html'), (err2, data2) => {
          if (err2) {
            res.writeHead(404);
            return res.end('Not Found');
          }
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(data2);
        });
      } else {
        res.writeHead(500);
        res.end('Internal Server Error');
      }
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`\n  🎓 Career Fair Display System`);
  console.log(`  ─────────────────────────────`);
  console.log(`  ▶ Local:  http://localhost:${PORT}`);
  console.log(`  ▶ API:    http://localhost:${PORT}/api/panel?jobFairId=17`);
  console.log(`  ▶ Recent: http://localhost:${PORT}/api/panel/checkins/recent?limit=10`);
  console.log(`  ─────────────────────────────\n`);
});
