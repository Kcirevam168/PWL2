const http = require('http');
const fs = require('fs');
const url = require('url');

const hostname = '127.0.0.1';
const port = 8000;

const handleRequest = async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    try {
        let filePath = '';
        if (pathname === '/') {
            filePath = 'index.html';
        } else if (pathname === '/mahasiswa') {
            filePath = 'mahasiswa.html';
        } else if (pathname === '/dosen') {
            filePath = 'dosen.html';
        } else if (pathname === '/uts') {
            filePath = 'uts.html';
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Halaman tidak ditemukan');
            return;
        }

        const data = await fs.readFile(filePath, 'utf8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    } catch (err) {
        console.error(`Gagal membaca file ${filePath}: ${err}`);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Terjadi kesalahan server');
    }
};

const server = http.createServer(handleRequest);

server.listen(port, hostname, () => {
    console.log('Server berjalan di http://${hostname}:${port}/');
});