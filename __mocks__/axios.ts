const TEST_PUBLIC_KEY = 'TEST_PUBLIC_KEY';
const VALID_VERIFICATION_ADDRESS = 'http://www.public-keys.com';

/**
 * Performs a GET http request
 * @param url Address to request
 */
async function get(url: string) {
  // console.log(url);
  if (!url.includes('http')) { throw new Error(); }

  // If we're retrieving authorized public keys
  if (url.includes(VALID_VERIFICATION_ADDRESS)) {
    return {
      data: [TEST_PUBLIC_KEY],
    };
  }

  // If we're calling to a random http resource
  return { data: 'random thing' };
}

exports.get = get;
