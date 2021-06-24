import CertificationEntity from './CertificationEntity';
import Certificate from './Certificate';

let certificate: Certificate;
let certificationEntity: CertificationEntity;
const CERTIFICATION_NAME = 'CERTIFIER';
const CERTIFIED_NAME = 'CERTIFIED';
const DATA_TO_CERTIFY = 'DATA';
const TEST_PUBLIC_KEY = 'TEST_PUBLIC_KEY';
const VALID_VERIFICATION_ADDRESS = 'http://www.fake-address.com';

beforeAll(() => {
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
  it('should properly check if the public key is included on the authorized keys', async () => {
    certificate.setPublicKey(TEST_PUBLIC_KEY);
    certificate.setVerifictionAddress(VALID_VERIFICATION_ADDRESS);
    const verificationResult = await certificate.checkVerificationAddress();
    expect(verificationResult).toBe(true);
  });

  it('should return false if invalid address is used, and exception is thrown', async () => {
    certificate.setVerifictionAddress('invalidAddress');
    const verificationResult = await certificate.checkVerificationAddress();
    expect(verificationResult).toBe(false);
  });
});
