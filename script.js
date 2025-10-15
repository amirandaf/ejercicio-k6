import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';

const csvData = new SharedArray('usuarios', function() {
    return papaparse.parse(open('./usuarios.csv'), { header: true }).data;
});

export const options = {
    stages: [
        { duration: '10s', target: 10 },
        { duration: '1m', target: 20 },
        { duration: '10s', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(95)<1500'],
        http_req_failed: ['rate<0.03'],
    },
};

export default function () {
    const usuario = csvData[Math.floor(Math.random() * csvData.length)];

    const url = 'https://fakestoreapi.com/auth/login';
    const payload = JSON.stringify({
        username: usuario.user,
        password: usuario.passwd
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
        timeout: '60s'
    };

    const response = http.post(url, payload, params);

    check(response, {
        'request successful (any 2xx status)': (r) => r.status >= 200 && r.status < 300,
        'response time < 1500ms': (r) => r.timings.duration < 1500,
        'login exitoso - tiene token': (r) => {
            try {
                const body = r.json();
                return body.token !== undefined;
            } catch (e) {
                return false;
            }
        }
    });

    sleep(0.05);
}