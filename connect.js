const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

// Render에서 설정한 DATABASE_URL 환경변수를 사용하여 연결 풀 생성
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Neon 등 클라우드 DB 연결 시 SSL 설정 필수
  }
});

const fs = require('fs');
const path = require('path');

app.get('/', (req, res) => {
    // __dirname은 현재 app.js가 있는 폴더 위치입니다.
    // 여기서는 app.js와 같은 위치에 있는 index.html을 보낸다고 가정합니다.
    res.sendFile(path.join('index.html'));
});

app.get('/read-file', (req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('파일 읽기 실패:', err);
            return res.status(500).send('파일을 찾을 수 없습니다.');
        }
        res.send(`파일 내용: ${data}`);
    });
});
