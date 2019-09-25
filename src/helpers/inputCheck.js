// stolen from https://raw.githubusercontent.com/josuerojasrojas/TTP-FS/master/src/Helpers/InputsCheck.js

// check has an input
export function hasInput(val){
  return val.length > 0;
}

// check email is valid
export function emailCheck(val){
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val);
}

export function passwordCheck(val){
  return true;
}

export function isWholeNumber(val){
  if(isNaN(val)) return false;
  let num = parseFloat(val);
  return num % 1  === 0 && num > 0;
}

export function isNumber(val){
  return !isNaN(val)
}
