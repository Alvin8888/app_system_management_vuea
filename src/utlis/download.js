const download = (data, fileName) => {
  const fileReader = new FileReader()
  fileReader.onload = function() {
    /* 异常进入的try */
    try {
      JSON.parse(this.result) // 说明是普通对象数据，后台转换失败
    } catch (err) { // 解析成对象失败，说明是正常的文件流
      const blob = new Blob([data], { type: 'application/zip' })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a') // 创建a标签
      // link.style.display = 'none'
      link.href = url
      // document.body.appendChild(link)
      link.download = fileName // 重命名文件
      link.click()
      URL.revokeObjectURL(url) // 释放内存 */
    }
  }
  fileReader.readAsText(data)
}
export default download
