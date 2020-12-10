$(function () {
    
    $('.xialacanp').on('mouseover', function () {
        
        $('.xialacanp .conter').addClass('active')
    })
    $('.xialacanp').on('mouseout',function() {
        $('.xialacanp .conter').removeClass('active')
    })
    
    $('.conter div').on('click',function () {
     
      window.location.href = './list.html'
    })

    // $('.shaver-items-item').on('mouseover',function () {
    //   // $(this).css('transform''trans')
     
      
    // })
    // $('shaver-items-item').on('hover', function () {
    //   console.log(2);
    // })
    

    









    let list = null
  const _data = {
    'cat_id':'电饭煲',
  }
  getData()
  async function getData() {
    
    const data = await $.get('../server/getIndex.php',_data,null,'json')
    // console.log(data);
    abllindHtml(data)
  }

  function abllindHtml(data) {

    list = data.list
    let str = ''
    list.forEach(item => {
      str += `
      <div class="saletop-info-right-item">
                        <div class="saletop-info-right-item-top">

                        </div>
                        <div class="saletop-info-right-item-bottom">
                            <div class="saletop-info-right-item-bottom-num">
                                <span>Top
                                    <strong></strong>
                                </span>

                            </div>
                            <div class="saletop-info-right-item-bottom-img">
                                <a href="../pages/list.html"><img src="${item.goods_big_logo}" alt=""></a>
                            </div>
                            <div class="saletop-info-right-item-bottom-text">
                                <h3>${item.goods_name}</h3>
                                <strong>${item.goods_price}</strong>
                            </div>
                        </div>
                    </div>
      `
      $('.saletop-info-right').html(str)
    })
  }

  $('.saletop-info-left').on('click','span',function() {
    const type = $(this).data('type')
    _data.cat_id = type
    $(this).addClass('activeLabel').siblings().removeClass('activeLabel')
    getData()
  })
    








    

    const inp = document.querySelector('.search-inp')
    
    inp.addEventListener('input', function () {

      const value = this.value.trim()
      if (!value) {
          $('.uul').css({
            'display':'none',
          })
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

$('.shaver-items-item').on('click',function () {
  window.location.href = "../pages/list.html"
})
$('.hairdrier-content-items-item').on('click',function () {
  window.location.href = "../pages/list.html"
})
$('.haircut-items-item').on('click',function () {
  window.location.href = "../pages/list.html"
})
$('.haircurler-content-items-item').on('click',function () {
  window.location.href = "../pages/list.html"
})
$('.trimmer-items-item').on('click',function () {
  window.location.href = "../pages/list.html"
})
$('.socket-content-items-item').on('click',function () {
  window.location.href = "../pages/list.html"
})