export default {
  formatTime(time: string): string {
    let date = new Date(time)
    let year = date.getFullYear()
    let month: number | string = date.getMonth() + 1
    let strDate: number | string = date.getDate()
    let hours: number | string = date.getHours()
    let seconds: number | string = date.getSeconds()
    let minutes: number | string = date.getMinutes()

    if (month >= 1 && month <= 9) {
      month = "0" + month
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate
    }
    if (hours >= 0 && hours <= 9) {
      hours = "0" + hours
    }
    if (seconds >= 0 && seconds <= 9) {
      seconds = "0" + seconds
    }
    if (minutes >= 0 && minutes <= 9) {
      minutes = "0" + minutes
    }
    return `${year}-${month}-${strDate} ${hours}:${seconds}:${minutes}`;
  },
  formatNum(num: string | number): string | number {
    if (parseInt(num.toString()) >= 10000) {
      return `${num.toString()[0]}.${num.toString()[1]}万`
    }
    return num
  }
}