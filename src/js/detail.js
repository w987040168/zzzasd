$(function () {
    let info = null
    const id = getCookie('good_id')
    getGoodsInfo()
    async function getGoodsInfo() {
        const goodsInfo = await $.get('../server/getGoodsInfo.php',{ goods_id: id},null,'json')
        bindHtml(goodsInfo.info)
        info = goodsInfo.info
    }
    function bindHtml(info) {
        console.log(info);
        $('.pdBreadcrumb').html(`<span>
        <span>
            首页
        </span>
        <span>/</span>
    </span>
    <span>
        <span>
            ${info.cat_id}
        </span>
        <span>/</span>
    </span>
    <span>
        <span>${info.goods_name}</span>
    </span>`)
        $('.pdpImages').html(`
        <div class="pdpImages-bigImages">
                        <img src="${info.goods_big_logo}" alt="">
                        <div class="mask">

                        </div>
                    </div>
                    <div class="pdpImages-smallImages-box">
                        <div class="pdpImages-smalls">
                            <div class="pdpImages-small">
                                <img src="${info.goods_small_logo}" alt="">
                            </div>
                            
                        </div>

                    </div>
                    <div class="pdpImages-maximg">
                        <img src="${info.goods_big_logo}" alt="">
                    </div>`)
        $('.pdpInfo').html(`
        
        <p>${info.goods_name}</p>
        <p>${info.cat_one_id} / ${info.cat_two_id} / ${info.cat_three_id}</p>
        <div class="pdpInfo-activity">
            <span>挚爱星品  ${info.cat_two_id}</span>
        </div>
        <div class="pdpInfo-item">
            <div class="pdpInfo-item-left">
                <div class="name">
                    活动价
                </div>
                <div class="symbol">
                    ￥
                </div>
                <div class="price">
                    ${info.goods_price}
                </div>
            </div>
            <div class="pdpInfo-item-right">
                <span>累计评价 ${info.goods_weight}</span>
            </div>
        </div>
        <div class="pdpInfo-service">
            <div class="pdpInfo-service-left">
                <div class=".nname">
                    服务
                </div>
            </div>
            <div class="pdpInfo-service-right">
                <div class="pdpInfo-service-right-item">
                    <span>
                        免邮费
                    </span>
                </div>
                <div class="pdpInfo-service-right-item">
                    <span>
                        官方正品保障
                    </span>
                </div>
                <div class="pdpInfo-service-right-item">
                    <span>
                        两年全国联保
                    </span>
                </div>
                <div class="pdpInfo-service-right-item">
                    <span>
                        7天无忧退换货
                    </span>
                </div>
                <div class="pdpInfo-service-right-item">
                    <span>
                        24小时发货
                    </span>
                </div>
            </div>
        </div>
        <div class="pdpInfo-limit">
            <div class="pdpInfo-limit-name">
                限制
            </div>
            <span>
                特价商品不可与优惠券叠加使用
            </span>
        </div>
        <div class="pdpInfo-guige">
            <div class="pdpInfo-guige-left">
                <div>规格</div>
            </div>
            <div class="pdpInfo-guige-right">
                <div class="pdpInfo-guige-right-img">
                    <img src="${info.goods_small_logo}" alt="">
                </div>
            </div>
        </div>
        <div class="pdpInfo-shuliang">
            <div class="pdpInfo-shuliang-left">
                数量
            </div>
            <div class="pdpInfo-shuliang-right">
                <span  class="subNum">-</span>
                
                <div class="el-input">
                    <input type="text" value="1" class="cartNum">
                </div>
                <span  class="addNum">+</span>
            </div>
        </div>
        <div class="pdpInfo-item-button">
            <button>
                <span class="addCart">加入购物车 </span>
            </button>
            <button>
                <a href="../pages/cart.html"><span>立即购买 </span></a>
            </button>
        </div>
    </div>
        `)
        $('.pdp-bottom').html(info.goods_introduce)
    }

    $('.pdpInfo').on('click','.subNum',function () {
        let num = $('.cartNum').val() - 0
        
        if (num === 1) return
        $('.cartNum').val(num - 1)
    }).on('click','.addNum',function () {
        let num = $('.cartNum').val() - 0
        
        $('.cartNum').val(num + 1)
    })
    $('.pdpInfo').on('click','.addCart',function (){
        const cart = JSON.parse(window.localStorage.getItem('cart')) || []
        const flag = cart.some(item => item.goods_id === id)
        if (flag) {
            const cart_goods = cart.filter(item => item.goods_id === id)[0]
            cart_goods.cart_number = cart_goods.cart_number - 0 + ($('.cartNum').val() - 0)
        } else {
            info.cart_number = 1
            cart.push(info)
        }
        window.localStorage.setItem('cart', JSON.stringify(cart))
    })



    
})