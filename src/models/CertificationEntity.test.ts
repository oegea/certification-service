import CertificationEntity from './CertificationEntity';

const PUBLIC_KEY = 'PUBLIC_KEY';
const PRIVATE_KEY = 'PRIVATE_KEY';
let certificationEntity: CertificationEntity;

beforeEach(() => {
  certificationEntity = new CertificationEntity();
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

describe('test toString function', () => {
  it('should return the public key in a string', () => {
    certificationEntity.loadKeys(PUBLIC_KEY, PRIVATE_KEY);
    expect(certificationEntity.toString()).toBe(`${PUBLIC_KEY}`);
  });
});
