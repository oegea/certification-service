import CertificationEntity from './CertificationEntity';
import Certificate from './Certificate';

let certificate: Certificate;
let certificationEntity: CertificationEntity;
const CERTIFICATION_NAME = 'CERTIFIER';
const CERTIFIED_NAME = 'CERTIFIED';
const DATA_TO_CERTIFY = 'DATA';
const TEST_PUBLIC_KEY = 'TEST_PUBLIC_KEY';
const VALID_VERIFICATION_ADDRESS = 'http://www.public-keys.com';

beforeEach(() => {
  certificationEntity = new CertificationEntity(CERTIFICATION_NAME);
  certificationEntity.generateKeys();
  const publicKey = certificationEntity.getPublicKey();

  certificate = new Certificate(publicKey, CERTIFICATION_NAME, CERTIFIED_NAME, DATA_TO_CERTIFY);
});

describe('test sign and verify functions', () => {
  it('should sign the data and verify it', () => {
    const privateKey = certificationEntity.getPrivateKey();
    certificate.sign(privateKey);
    expect(certificate.verify()).toBe(true);
  });
});

describe('test checkVerificationAddress function', () => {
  it('should return false if there is not a verification address', async () => {
    certificate.setPublicKey(TEST_PUBLIC_KEY);
    certificate.setVerifictionAddress('');
    const verificationResult = await certificate.checkVerificationAddress();
    expect(verificationResult).toBe(false);
  });

  it('should return false if we are calling to an address that does not currently serve a public keys list', async () => {
    certificate.setPublicKey(TEST_PUBLIC_KEY);
    certificate.setVerifictionAddress('http://www.google.com');
    const verificationResult = await certificate.checkVerificationAddress();
    expect(verificationResult).toBe(false);
  });

  it('should properly check if the public key is included on the authorized keys', async () => {
    certificate.setPublicKey(TEST_PUBLIC_KEY);
    certificate.setVerifictionAddress(VALID_VERIFICATION_ADDRESS);
    const verificationResult = await certificate.checkVerificationAddress();
    expect(verificationResult).toBe(true);
  });

  it('should return false if invalid address (no http) is used, and exception is thrown', async () => {
    certificate.setVerifictionAddress('invalidAddress');
    const verificationResult = await certificate.checkVerificationAddress();
    expect(verificationResult).toBe(false);
  });

  it('should return flase if a non-legit public key is used', async () => {
    const NON_LEGIT_PUBLIC_KEY = 'NON_LEGIT_PUBLIC_KEY';
    certificate.setPublicKey(NON_LEGIT_PUBLIC_KEY);
    certificate.setVerifictionAddress(VALID_VERIFICATION_ADDRESS);
    const verificationResult = await certificate.checkVerificationAddress();
    expect(verificationResult).toBe(false);
  });
});

describe('test setSignature and getSignature functions', () => {
  it('should properly change the current signature, and retrieve it back', () => {
    const TEST_SIGNATURE = 'TEST_SIGNATURE';
    certificate.setSignature(TEST_SIGNATURE);
    expect(certificate.getSignature()).toBe(TEST_SIGNATURE);
  });
});

describe('test setTimestamp and getTimestamp functions', () => {
  it('should set specific timestamp if passed as an argument', () => {
    const SPECIFIC_TIMESTAMP = new Date().toString();
    certificate.setTimestamp(SPECIFIC_TIMESTAMP);
    expect(certificate.getTimestamp()).toBe(SPECIFIC_TIMESTAMP);
  });

  it('should assign current datetime if setTimestamp is called with no params', () => {
    expect(certificate.getTimestamp().length).toBe(0);
    certificate.setTimestamp();
    expect(certificate.getTimestamp().length).toBeGreaterThan(0);
  });
});
