const formatTime = (timestamp) => {
  let date = new Date(timestamp);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let strDate = date.getDate();
  let hours = date.getHours();
  let seconds = date.getSeconds();
  let minutes = date.getMinutes();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  if (hours >= 0 && hours <= 9) {
    hours = "0" + hours;
  }
  if (seconds >= 0 && seconds <= 9) {
    seconds = "0" + seconds;
  }
  if (minutes >= 0 && minutes <= 9) {
    minutes = "0" + minutes;
  }
  return `${year}-${month}-${strDate} ${hours}:${seconds}:${minutes}`;
}

export default {
  formatTime,
  formatNum(num) {
    if (num >= 10000) {
      return `${num.toString()[0]}.${num.toString()[1]}万`
    }
    return num
  }
}