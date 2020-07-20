/*
    校验两次输入内容是否一致,长用于确认密码
*/

export const ValidateRepeat = (key, firstValue) => {
  return (rules, val, callback) => {
    console.log(val, firstValue, val !== firstValue)
    if (val === '' || val === '') {
      callback(new Error('确认' + key + '不可为空'))
    } else if (val !== firstValue) {
      callback(new Error('两次输入' + key + '不一致,请重试'))
    } else {
      callback()
    }
  }
}

export const ValidateNuber = (key, firstValue) => {
  return (rules, val, callback) => {
    // var reg = /(?=^.*?[a-z])(?=^.*?\d)^(.{6,17})$/
    var reg = /(?=^.*?[a-z])(?=^.*?\d)/
    if (val === '' || val === '') {
      callback(new Error('修改' + key + '不可为空'))
    } else if (val.length < 6 || val.length > 20) {
      callback(new Error('设置6至20位登录' + key))
    } else if (val && !reg.test(val)) {
      callback(new Error('至少有数字和字母' + key))
    } else {
      callback()
    }
  }
}
