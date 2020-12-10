$(function () {
    
    const list_info = {
        cat_one: 'all',
        cat_two: 'all',
        sort_method: '综合',
        sort_type:'ASC',
        current:1,
        pagesize:12
    }
    getCateOne()
    async function getCateOne() {
        const cat_one_list = await $.get('../server/getCateOne.php',null,null,'json')
        let str = `<span data-type="all" class="active">全部</span>`
        cat_one_list.list.forEach(item => {
            str +=`
            <span data-type="${item.cat_one_id}">${item.cat_one_id}</span>
            `
        })
        $('.body-header-fenlei-list').html(str)



    }
    let list = null
    getGoodList()
    async function getGoodList() {
        const getGoodList = await $.get('../server/getGoodsList.php',list_info,null,'json')
        list = getGoodList.list
        console.log(list);
        let str = ``
        list.forEach(item => {
            str += `
            <div class="body-list-item">
                <div class="body-list-item-img" data-id="${item.goods_id}">
                    <img src="${item.goods_big_logo}" alt="">
                </div>
                <div class="body-list-item-miaosu">
                    <span>${item.cat_one_id}</span>
                </div>
                <div class="body-list-item-name" data-id="${ item.goods_id}">
                ${item.goods_name}
                </div>
                <div class="body-list-item-price">
                    <span>￥${ item.goods_price }</span>
                    <span class="addCart" data-id="${ item.goods_id }">加入购物车</span>
                </div>
            </div>
            `
        })
        $('.body-list').html(str)
        
    }
    getTotalPage()
    async function getTotalPage() {
        const totalPage = await $.get('../server/getTotalPage.php',list_info,null,'json')
        $('.m-style').pagination({
            pageCount: totalPage.total,
            callback (index) {
                list_info.current = index.getCurrent()
                getGoodList()
              }
        })
    }
    $('.body-header-fenlei-list').on('click','span',function () {
        $(this).addClass('active').siblings().removeClass('active')
        const type = $(this).data('type')
        list_info.cat_one = type
        list_info.current = 1
        getGoodList()
        getTotalPage()
    })
    
    $('.body-header-paixu-list ').on('click','span',function () {
        const type = $(this).attr('data-type')
        const method = $(this).attr('data-method')
        $(this).addClass('active').siblings().removeClass('active')
        list_info.sort_type = type
        list_info.sort_method = method
        getGoodList()
        getTotalPage()
        $(this).attr('data-type', type === 'ASC' ? 'DESC' : 'ASC').siblings().attr('data-type','ASC')
    })
    
    $('.body-list').on('click', '.body-list-item-img', function () {
        const id = $(this).data('id')
        
        setCookie('good_id',id)

        window.location.href = '../pages/detail.html'
    })
    $('.body-list').on('click','.addCart',function () {

        const cart  = JSON.parse(window.localStorage.getItem('cart')) || []
        const id = $(this).data('id')
        const flag = cart.some(item => item.goods_id == id)
        if (flag) {
            const cart_goods = cart.filter(item => item.goods_id == id)[0]
            cart_goods.cart_number = cart_goods.cart_number - 0 + 1
        } else {
            const info = list.filter(item => item.goods_id == id)[0]
            info.cart_number = 1
            cart.push(info)
        }
        window.localStorage.setItem('cart',JSON.stringify(cart))
    })

})