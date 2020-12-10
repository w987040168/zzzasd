function setCookie(key, value, expires) {
  if (!expires) return document.cookie = key + '=' + value

  const time = new Date()
  time.setTime(time.getTime() - 1000 * 60 * 60 * 8 + 1000 * expires)
  document.cookie = `${key}=${value};expires=` + time
}

function getCookie(key) {
  const obj = {}

  const tmp = document.cookie.split('; ')
  tmp.forEach(item => {
    const t = item.split('=')
    obj[t[0]] = t[1]
  })

  return key ? obj[key] : obj
}
const inp = document.querySelector('.search-inp')
inp.addEventListener('input', function () {

  const value = this.value.trim()
  if (!value) {
      $('.uul').css({
        'display':'none',
      },
      inp.value = '剃须刀'
      
      )
    return}
    $('.uul').css({
      'display':'block',
    })
  const script = document.createElement('script')
  const url = `https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=1446,32857,33124,33061,32973,33099,33101,32962,22159&wd=${value}&req=2&csor=1&cb=bindHtml&_=1605768936993`
  // const url = ` https//://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=1465,33058,33256,31660,33099,33101,32936,32845,33198&wd=eee&req=2&csor=3&pwd=ee&cb=bindHtml&_=1607513076721+`
  script.src = url
  document.body.appendChild(script)
  script.remove()
})
const ul = document.querySelector('.uul')
function bindHtml (res){
  console.log(res.g);
  if (!res.g) {
    ul.classList.remove('active')
    return
  }
  let str = ''
  for (let i = 0; i < res.g.length; i++) {
    str += `
      <li>${ res.g[i].q }</li>
    `
  }
  ul.innerHTML = str
  ul.classList.add('active')
}