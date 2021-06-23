import CertificationEntity from './CertificationEntity';

const PUBLIC_KEY = `-----BEGIN RSA PUBLIC KEY-----
MIIBCgKCAQEApfPyCodvO/eRUOvMPZdecrtlFkn+kkjkX6iTGNYUMNSjcUf3x/f/
7kX47opnJ8qSM32JX5od8FxzXb4gPafu1tPPbvJAeCsp3Kf8JLCYlhqu99Hi9i5K
CtGOBVqnJ4BwINIjKGBxZ1ptdYiMoX+8jeNPQ7ueL0mGmwEHCXx+2qauYIovT8Bt
JjwhmXm3mnnfjiFJdSng5ioUm7cScV5+tne/PD8vYm44f/4N0WGBopUZOkh30uFU
aX4trlVLBsFQMLqLMaqpxA5ApIsrCG0sZJWEqGbiRmt+C0Na7b8UUK7ztlw7pGDl
f6rqRNxefmNH8iwxHFiUcpxbJ93AS5GehwIDAQAB
-----END RSA PUBLIC KEY-----`;
const PRIVATE_KEY = `-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEApfPyCodvO/eRUOvMPZdecrtlFkn+kkjkX6iTGNYUMNSjcUf3
x/f/7kX47opnJ8qSM32JX5od8FxzXb4gPafu1tPPbvJAeCsp3Kf8JLCYlhqu99Hi
9i5KCtGOBVqnJ4BwINIjKGBxZ1ptdYiMoX+8jeNPQ7ueL0mGmwEHCXx+2qauYIov
T8BtJjwhmXm3mnnfjiFJdSng5ioUm7cScV5+tne/PD8vYm44f/4N0WGBopUZOkh3
0uFUaX4trlVLBsFQMLqLMaqpxA5ApIsrCG0sZJWEqGbiRmt+C0Na7b8UUK7ztlw7
pGDlf6rqRNxefmNH8iwxHFiUcpxbJ93AS5GehwIDAQABAoIBAANMqVhKPwzrLCl2
trXWx5ryXN0nlXclGd1JBbutrfMWlzVOX//Kz3zWSU+80rY40dVSPqP29Xds7yJD
AHMZXqdIyMwE5wE8onVvpZS5Kh954latBp0saG50oiU7Gy2u4QvWAbrwx/BtHNYE
Y/9mAcK0bUQEe+2mwZVdXN10azU/qO+JeqKOf+oimoRTc+Kp8in3/e6YKJ+biPJR
oOoR8ZA3OW65FKbOPqXPI/zD2UZyHUaxeFLe13x1BFrZezcKdHnGOykSjPQhO0Ta
Dcq6eYSeuhUADuV7q1iK/vICfaApJ54fjSm2xxP3A5Fqd5Op5JKvlqguOuko8BMe
J9t7TMECgYEA0KPajq81NYADy4kghBA1fYonT8C2x7fDIGStLRKOm4Mi58JCHFD0
DRVNfZ2wIGXktD73y1pIRkuQ0lP+lJv8yxX0hZQynxgU1s6GW5ZFL+puVD9WK+Sx
6xf2yYCwyOgyZqpS2bUP5f05rBgxNL7xYNgN1aSVdth/X2w1YDrnmGcCgYEAy5+G
7Kdk0C533T+0IBEUFc1TyBRPGgNYHCCHMqRj5rSmchvHXVsseZniT2KubMVa/BrM
1td10ScP+PKiiYT2hKqlngQVNlnQRd2eIG8oImCQW+JCcIdV/1wlkjX1aiA6lKeb
f/FK8soivyut6kMvDnqNsDEOJiuH0RaT8oGadOECgYEAwhtvPsgqzLdo0HenVLZv
zXg20rAMXQrN8tk3dHOLUYtTciL8trNqGrHzAicusTWa7UaX6wz3qM6s0cFrXH8z
VQ38DDqwTettl9tUjOjlPYrxUlgKp5OBI6OL6jRcRM4h9foIUpttSx+oBEANp3Dt
yJe5Z0ZT99m7xt85WWn0BYkCgYAM+ySM3bcNlojJsA/5o10WbrqSnMjWLbRmRqSX
0+cShB3AVIkHKJLTRb4ptW7NPF+qhsLcR2wZY1YfVsiJ39IfbwmT40q+5kbizVgR
VUTHvEQ3t1ro9ZfD6cnzYkE8/MT/SRgetfFDPSOt8EjsEFBlqeZyfw4Z3NiRudDA
uwZvwQKBgGZN8dXbmVL9K9Vy9Yl446j4tx1Xf8tCjuquoCFtgll7q+W3gy6zQm+a
lYePJlLZmaD8GmIG6oWc6gyx7EOtTzyZ8yhKLFS3Qr56DTm5b2AtsW4MzxGpez8x
zPsB/XEGNy6NSdwRoUq3plK+3Q71mHsp8NG3+2uNQJjoauuIGlJi
-----END RSA PRIVATE KEY-----`;
const CERTIFICATION_ENTITY_NAME: string = 'Test';
const VERIFICATION_ADDRESS: string = 'TestAddress';
let certificationEntity: CertificationEntity;

beforeEach(() => {
  certificationEntity = new CertificationEntity(CERTIFICATION_ENTITY_NAME);
});

describe('test generateKeys function', () => {
  it('should have no key before invoking generateKeys', () => {
    expect(certificationEntity.getPublicKey().length).toBeLessThan(1);
    expect(certificationEntity.getPrivateKey().length).toBeLessThan(1);
  });

  it('should have a public and private key after running generateKeys', () => {
    certificationEntity.generateKeys();
    expect(certificationEntity.getPublicKey().length).toBeGreaterThan(0);
    expect(certificationEntity.getPrivateKey().length).toBeGreaterThan(0);
  });
});

describe('test loadKeys function', () => {
  it('should properly load the keys', () => {
    certificationEntity.loadKeys(PUBLIC_KEY, PRIVATE_KEY);
    expect(certificationEntity.getPublicKey()).toBe(PUBLIC_KEY);
    expect(certificationEntity.getPrivateKey()).toBe(PRIVATE_KEY);
  });
});

describe('test toString() function', () => {
  it('should return name and verification address in a string', () => {
    certificationEntity.setVerificationAddress(VERIFICATION_ADDRESS);
    expect(certificationEntity.toString()).toBe(`${CERTIFICATION_ENTITY_NAME} - ${VERIFICATION_ADDRESS}`);
  });
});
