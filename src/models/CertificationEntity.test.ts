import CertificationEntity from './CertificationEntity';

const PUBLIC_KEY = 'PUBLIC_KEY';
const PRIVATE_KEY = 'PRIVATE_KEY';
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

describe('test toString function', () => {
  it('should return name and verification address in a string', () => {
    certificationEntity.setVerificationAddress(VERIFICATION_ADDRESS);
    expect(certificationEntity.toString()).toBe(`${CERTIFICATION_ENTITY_NAME} - ${VERIFICATION_ADDRESS}`);
  });
});

describe('test getVerificationAddress function', () => {
  it('should be able to properly return verification address', () => {
    certificationEntity.setVerificationAddress(VERIFICATION_ADDRESS);
    expect(certificationEntity.getVerificationAddress()).toBe(VERIFICATION_ADDRESS);
  });
});
