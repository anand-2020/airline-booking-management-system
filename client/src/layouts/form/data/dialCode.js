import CountryCode from "layouts/form/data/countryCode.js";

const prepareCode = () => {
  let code = new Map();
  CountryCode.forEach((c) => {
    code.set(c.code, c.dial_code);
  });

  return code;
};

const DialCode = prepareCode();

export default DialCode;
