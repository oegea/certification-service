const TEST_PUBLIC_KEY = 'TEST_PUBLIC_KEY';

/**
 * Performs a GET http request
 * @param url Address to request
 */
async function get(url: string) {
  // console.log(url);
  if (!url.includes('http')) { throw new Error(); }

  const response:any = { };

  if (url.includes('keys.json')) {
    response.data = [TEST_PUBLIC_KEY];
  }

  return response;
}

exports.get = get;
