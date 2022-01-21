import http from 'k6/http';
import { sleep } from 'k6';

// export const options = {
//   stages: [
//     { duration: '10s', target: 100 },
//     { duration: '10s', target: 75 },
//     { duration: '10s', target: 50 },
//   ]
// };
export const options = {
  vus: 100,
  duration: '10s',
};

export default function () {
  const randomProduct = (Math.random() * 1000011).toFixed(0);

  http.get(`http://localhost:3000/products/${randomProduct}`);
  sleep(1);
}