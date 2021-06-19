import crypto from 'crypto';
import axios from 'axios';

/**
 * Data about a certificate
 */
class Certificate {
    // URL where the public key's ownership can be verified
    private verificationAddress: string;

    // Public key with which the certificate has been signed and can be validated
    private publicKey: string;

    // Timestamp or date when the certificate has been issued
    private timeStamp: string;

    // Name and relevant information of the certified entity
    private certifiedEntity: string;

    // Data to be signed
    private data: string;

    // Signature of the certificate
    private signature: string;

    /**
     * CTOR
     * @param publicKey public key with which verify the certificate's signature
     * @param timeStamp time when the certificate was signed
     * @param certifiedEntity Name of the person or organization that receives the certificate
     * @param data Data that is signed
     */
    constructor(publicKey: string, timeStamp: string, certifiedEntity: string, data: string) {
      this.publicKey = publicKey;
      this.timeStamp = timeStamp;
      this.certifiedEntity = certifiedEntity;
      this.data = data;
    }

    /**
     * Defines the certificate's date to the actual moment
     */
    private setTimestamp() {
      this.timeStamp = new Date().toString();
    }

    /**
     * Sets the verification address to check the ownership of the public key
     * @param verificationAddress URL to use as verification address
     */
    public setVerifictionAddress(verificationAddress: string) {
      this.verificationAddress = verificationAddress;
    }

    /**
     * Manually defines the signature of the certificate
     * @param signature String of the signature
     */
    public setSignature(signature: string) {
      this.signature = signature;
    }

    /**
     * Signs the current certificate
     * @param privateKey Private key with which sign the current certificate
     */
    public sign(privateKey: string): void {
      this.setTimestamp();
      const data = this.toBuffer();
      const signData = crypto.sign('SHA256', data, privateKey);
      const readableSignature = signData.toString('base64');
      this.signature = readableSignature;
    }

    /**
     * Verifies if the current certificate has a valid signature
     * @returns True if the signature is valid
     */
    public verify(): boolean {
      const data = this.toBuffer();

      const isVerified = crypto.verify(
        'sha256',
        Buffer.from(data),
        {
          key: this.publicKey,
        },
        Buffer.from(this.signature, 'base64'),
      );
      return isVerified;
    }

    /**
     * Match the used public key with the authorized keys listed on the verification address
     * @returns True if the public key is on the list
     */
    public async checkVerificationAddress(): Promise<boolean> {
      if (this.verificationAddress.length < 1) { return false; }

      try {
        const result = await axios.get(`${this.verificationAddress}/keys.json`);
        const keys = result.data;

        // We're expecting an array of keys, otherwise the public key is not legit
        if (typeof keys !== 'object' || keys.length) { return false; }

        for (let i = 0; i < keys.length; i += 1) {
          const key = keys[i];
          if (key === this.publicKey) { return true; }
        }
      } catch (error) {
        return false;
      }

      return false;
    }

    /**
     * Gets a string of all the certificate's data
     * @returns Not-very-readable string of the certificate
     */
    public toString(): string {
      return JSON.stringify(this);
    }

    /**
     * Converts the certificate string into a buffer
     * @returns Buffer with all the certificate's data
     */
    public toBuffer(): Buffer {
      return Buffer.from(this.toString());
    }
}

export default Certificate;
