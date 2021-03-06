import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 200 },
    { duration: '10s', target: 75 },
    { duration: '10s', target: 50 },
  ]
};

export default function () {
  const randomProduct = (Math.random() * 1000011).toFixed(0);

  http.get(`http://18.233.153.135/products/${randomProduct}/styles`);
  sleep(1);
}