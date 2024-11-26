import { RESULT_PER_PAGE, TIMEOUT_SEC } from './config';

const timeout = function (s: number): Promise<never> {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(
        new Error(`Request took too long! Timeout after ${s} second`)
      );
    }, s * 1000);
  });
};

export const getJSON = async function (url: `https://${string}`) {
  try {
    const res = await Promise.race([
      fetch(url),
      timeout(TIMEOUT_SEC),
    ]);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(`${data.message} (${res.status}) 💥💥💥`);
    }
    return data;
  } catch (err) {
    throw err;
  }
};

export const isLastPage = function <T>(
  page: number,
  dataLength: number
): boolean {
  return dataLength
    ? Math.ceil(dataLength / RESULT_PER_PAGE) === page
    : true;
};
