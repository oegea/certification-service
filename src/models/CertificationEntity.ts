import crypto from 'crypto';

/**
 * A person or organization that can issue and sign certificates
 */
class CertificationEntity {
    // Name of the organization
    private name: string = '';

    // Public key with which verify the certificate signature
    private publicKey: string = '';

    // Private key with which sign certificates
    private privateKey: string = '';

    // Optional http adress in where verify that the public key comes from a known organization
    private verificationAddress: string = '';

    /**
     * CTOR
     * @param name Name of the organization
     */
    constructor(name: string) {
      this.name = name;
    }

    /**
     * Loads a keys pair
     * @param publicKey Public key that's going to be used
     * @param privateKey Private key that's going to be used
     */
    loadKeys(publicKey: string, privateKey: string): void {
      this.publicKey = publicKey;
      this.privateKey = privateKey;
    }

    /**
     * Defines the verification address
     * @param verificationAddress HTTP url
     */
    setVerificationAddress(verificationAddress: string): void {
      this.verificationAddress = verificationAddress;
    }

    /**
     * Generates a new keys pair
     */
    generateKeys(): void {
      const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
      });

      const publicKeyString = publicKey.export({ type: 'pkcs1', format: 'pem' }).toString();
      const privateKeyString = privateKey.export({ type: 'pkcs1', format: 'pem' }).toString();

      this.privateKey = privateKeyString;
      this.publicKey = publicKeyString;
    }

    /**
     * Gets an string that contains most important information
     * @returns Descriptive string
     */
    toString(): string {
      return `${this.name} - ${this.verificationAddress}`;
    }
}

export default CertificationEntity;
