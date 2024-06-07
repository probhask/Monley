const isValidEmail = (email: string): boolean => {
  const emalRegex: RegExp = /^\S+@\S+\.\S+$/;
  console.log("vaildated email", emalRegex.test(email));

  return emalRegex.test(email);
};
const isValidPassWord = (passWord: string): boolean => {
  const symbolRegex = /[!@$#%^&*+()?~:{}|<>]/;
  const numberRegex = /[0-9]/;
  const upperCaseRegex = /[A-Z]/;
  const lowerCaseRegex = /[a-z]/;
    return (
      passWord.length>6&&
    symbolRegex.test(passWord) &&
    numberRegex.test(passWord) &&
    upperCaseRegex.test(passWord) &&
    lowerCaseRegex.test(passWord)
  );
};

export const validatLogin = ({
  email,
  password,
}: {
  email: string;
  password: string;
}): { success: boolean; error?: { email: string; password: string } } => {
  const newError: { email: string; password: string } = {
    email: "",
    password: "",
  };
  if (!email) {
    newError.email = "email is required ";
  } else if (email.trim().length <= 8) {
    newError.email = " email must be atleast 8 character long";
  } else if (!isValidEmail(email)) {
    newError.email = "invalid email format , must conatin @ . symbol";
  }
  if (!password) {
    newError.password = "password is required";
  } else if (!(password.trim().length >= 6)) {
    newError.password = "password must be atleast 6 character long";
  } else if (!isValidPassWord(password)) {
    newError.password =
      "must contain a symbol,a digit,an uppercase letter, and a lowercase letter";
  }
  const result = newError.email || newError.password ? false : true;
  return { success: result, error: newError && newError };
};
export const validatCreateAccount = ({
  name,
  email,
  address,
  password,
}: {
  name: string;
  email: string;
  address: string;
  password: string;
    }): { success: boolean; error?: { email: string; password: string; name: string;address:string } }  => {
  const newError: {
    email: string;
    password: string;
    address: string;
    name: string;
  } = { email: "", password: "", name: "", address: "" };

  if (!email) {
    newError.email = "email is required ";
  } else if (email.trim().length < 8) {
    newError.email = " email must be atleast 8 character long";
  } else if (!isValidEmail(email)) {
    newError.email = "invalid email format , must conatin @ . symbol";
  }
  if (!password) {
    newError.password = "password is required";
  } else if (!isValidPassWord(password)) {
    newError.password =
      "must contain a symbol,a digit,an uppercase letter, and a lowercase letter";
  }

  if (!address) {
    newError.address = "address is required";
  } else if (address.trim().length <= 6) {
    newError.address = "address must be atleast 6 character long";
  }

  if (!name) {
    newError.name = "name is required";
  } else if (name.trim().length < 4) {
    newError.name = "name must be atleast 6 character long";
  }

  const result =
    newError.email || newError.password || newError.address || newError.name
      ? false
      : true;
  return { success: result, error: newError && newError };
};
