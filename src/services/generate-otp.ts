
import otpGenerator from 'otp-generator';

export default function generateOtp() {
  const generateOtp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    digits: false,
    lowerCaseAlphabets: false,
  });

  return generateOtp;
}
