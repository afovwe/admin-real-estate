import crypto from 'crypto';

// Function to generate a verification code along with its expiry timestamp
export const generateVerificationCode = () => {
  const randomBytes = crypto.randomBytes(2);
  const code = (randomBytes[0] << 8) | randomBytes[1];
  const expiryTimestamp = Date.now() + (5 * 60 * 1000); // Code expires in 5 minutes
  return { code: (code % 9000) + 1000, expiryTimestamp };
};
