import crypto from 'crypto';

/**
 * A person or organization that can issue and sign certificates
 */
class CertificationEntity {
    // Public key with which verify the certificate signature
    private publicKey: string = '';

    // Private key with which sign certificates
    private privateKey: string = '';

    /**
     * CTOR
     */
    constructor() {
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
     * Retrieves and returns the current private key
     * @returns Current private key
     */
    getPrivateKey(): string {
      return this.privateKey;
    }

    /**
     * Retrieves and returns the current public key
     * @returns Current public key
     */
    getPublicKey(): string {
      return this.publicKey;
    }

    /**
     * Gets an string that contains most important information
     * @returns Descriptive string
     */
    toString(): string {
      return `${this.publicKey}`;
    }
}

export default CertificationEntity;
