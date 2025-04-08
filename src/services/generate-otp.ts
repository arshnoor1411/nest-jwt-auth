const otpGenerator = require('otp-generator');

const OTP_LENGTH = 6;

export default function generateOtp() {
  const generateOtp = otpGenerator.generate(OTP_LENGTH, {
    upperCaseAlphabets: false,
    specialChars: false,
    digits: true,
    lowerCaseAlphabets: false,
  });
  
  return generateOtp;
}
