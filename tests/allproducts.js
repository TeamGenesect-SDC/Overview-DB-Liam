import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 100 },
    { duration: '10s', target: 75 },
    { duration: '10s', target: 50 },
  ]
};

export default function () {

  http.get(`http://localhost:3000/products`);
  sleep(1);
}