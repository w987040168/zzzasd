$(function () {

    const nickname = getCookie('nickname')
    if (!nickname) return window.location.href = '../pages/index.html'
    const cart = JSON.parse(window.localStorage.getItem('cart')) || []
    if (!cart.length) {
        $('.noShopping').addClass('active')
        $('.shopping').removeClass('active')
        return
    }
    console.log(cart);
    $('.shopping').addClass('active')
    $('.noShopping').removeClass('active')
    bindHtml()
    function bindHtml() {
        const selectAll = cart.every(item => item.is_select == 1)
        let total = 0
        let totalMoney = 0
        cart.forEach(item => {
        if (item.is_select === '1') {
            total += item.cart_number - 0
            totalMoney += item.cart_number * item.goods_price
            }
        })
        let str = `
            <div class="shopping-header">
                <div class="shopping-header-info">
                    <div class="el-checkbox">
                        <span>
                            <input type="checkbox" ${ selectAll ? 'checked' : '' }>
                        </span>
                        <span>全选</span>
                    </div>
                    <span class="text">商品信息</span>
                </div>
                <div class="shopping-header-unitPrice">
                    <span>单价</span>
                </div>
                <div class="shopping-header-num">
                    <span>数量</span>
                </div>
                <div class="shopping-header-xiaoji">
                    <span>小计</span>
                </div>
                <div class="shopping-header-caozuo">
                    <span>操作</span>
                </div>
             </div>
        `
        
        cart.forEach(item => {
            str += `
            <div class="shopping-list">
                <div class="shopping-list-item">
                    <div class="p-info">
                        <input data-id="${ item.goods_id }" type="checkbox" ${ item.is_select == 0 ? '' : 'checked' }>
                        <span>
                            <img src="${ item.goods_small_logo }" alt="">
                        </span>
                        <div class="item-text">
                            <span>
                                ${item.goods_name}
                            </span>
                            <span>
                                智能防夹须 / 增加50%接触面 / 智能充电显示
                            </span>
                        </div>
                    </div>
                    <div class="p-price">
                        ￥${item.goods_price}
                    </div>
                    <div class="p-asBox">
                        <span class="subNum" data-id="${ item.goods_id }">-</span>
                        <input type="text" value="${ item.cart_number }">
                        <span class="addNum" data-id="${ item.goods_id }">+</span>
                        
                    </div>
                    <div class="p-zj">
                        ￥${item.goods_price}
                    </div>
                    <div class="p-cz">
                        <span class="del" data-id="${ item.goods_id }">
                            删除
                        </span>
                    </div>
                </div>
            </div>
        `
        

        })
        
        
        str +=`
        <div class="shopping-bottom">
                <div class="shopping-bottom-left">
                    <div class="br-info">
                        
                        <span class="clearBox">批量删除</span>
                    </div>
                </div>
                <div class="shopping-bottom-right">
                    <span>应付金额</span>
                    <span>￥${ totalMoney.toFixed(2) }</span>
                    <button><span> 结算 ( ${total} )</span></button>
                </div>
            </div>
        `
        $('.shopping').html(str)
    }

    $('.shopping').on('click','.p-info input',function () {
        const type = this.checked
        const id = $(this).data('id')
        const info = cart.filter(item => item.goods_id == id)[0]
        info.is_select = type ? '1' : '0'
        bindHtml()
        window.localStorage.setItem('cart', JSON.stringify(cart))
    })

    $('.shopping').on('click', '.addNum', function () {
        const id = $(this).data('id')
        const info = cart.filter(item => item.goods_id == id)[0]
        info.cart_number = info.cart_number - 0 + 1
        bindHtml()
        window.localStorage.setItem('cart', JSON.stringify(cart))
    })
    $('.shopping').on('click', '.subNum', function () {
        const id = $(this).data('id')
        const info = cart.filter(item => item.goods_id == id)[0]
        if (info.cart_number === 1) return
        info.cart_number = info.cart_number - 0 - 1
        bindHtml()
        window.localStorage.setItem('cart', JSON.stringify(cart))
    })
    $('.shopping').on('click', '.del', function () {
        // 拿到商品 id
        const id = $(this).data('id')
        // 删除指定数据
        for (let i = 0; i < cart.length; i++) {
          if (cart[i].goods_id == id) {
            cart.splice(i, 1)
            break
          }
        }
    
        // 重新渲染页面
        bindHtml()
        // 从新保存起来
        window.localStorage.setItem('cart', JSON.stringify(cart))
    
        if (!cart.length) return window.location.reload()
      })
      $('.shopping').on('click','.el-checkbox  input',function () {
      
        if (!this.checked) {
          for (let i = 0; i < cart.length; i++) {
            cart[i].is_select = 0

          window.localStorage.setItem('cart',JSON.stringify(cart))
          }
          
        } else {
          for (let i = 0; i < cart.length; i++) {
            cart[i].is_select = 1

          window.localStorage.setItem('cart',JSON.stringify(cart))
          }
        }
        
      
      bindHtml()
    })
    $('.shopping').on('click','.clearBox',function () {
        cart.length = 0
        window.localStorage.setItem('cart',JSON.stringify(cart))
        window.location.reload()
      })
})