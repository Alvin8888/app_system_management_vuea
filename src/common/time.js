
const date = new Date()
const year = date.getFullYear()
let month = date.getMonth() + 1
let day = date.getDate()
if (month < 10) {
  month = '0' + month
}
if (day < 10) {
  day = '0' + day
}

const time = {
  getNow: (type) => {
    if (type === 'china') return year + '年' + month + '月' + day + '日'
    return year + month + day
  },
  getDay: () => {
    return day
  },
  getMonth: () => {
    return month
  },
  getYear: () => {
    return year
  }
}
export default time
