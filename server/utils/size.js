exports.size = (bytes) => {
  const arr = ["Bytes", "KB", "MB", "GB", "TB", "ZB"];
  let dp = 0;
  let counter = 0;
  let val = bytes.toString().split("");
  if (val.length === 4 || val.length === 5 || val.length === 6) {
    dp = 1;
  } else if (val.length === 7 || val.length === 8 || val.length === 9) {
    dp = 2;
  } else if (val.length === 10 || val.length === 11 || val.length === 12) {
    dp = 3;
  } else if (val.length === 13 || val.length === 14 || val.length === 15) {
    dp = 4;
  }
  let num = val.join("");
  let data = parseInt(num);
  for (let i = 0; i < dp; i++) {
    data = data / 1024;
    counter++;
  }
  return data.toFixed(2) + " " + arr[counter];
};
