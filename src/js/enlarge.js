$(function () {
    $('.pdpImages').on('mouseover' ,'.pdpImages-bigImages',function () {
        $('.mask').css('display','block')
        $('.pdpImages-maximg').css('display','block')
        
    })
    
    
    $('.pdpImages').on('mouseout' ,'.pdpImages-bigImages',function () {
        $('.mask').css('display','none')
        $('.pdpImages-maximg').css('display','none')
    })
    $('.pdpImages').on('mousemove','.pdpImages-bigImages' ,function (e) {
        e = e || window.event
        let x = e.pageX - $('.pdpImages-bigImages').offset().left - ($('.mask').width() / 2) 
        let y = e.pageY  - $('.pdpImages-bigImages').offset().top - ($('.mask').height() / 2) 
        if (x <= 0) x = 0
        if (y <= 0) y = 0
        if (x >= $('.pdpImages-bigImages').width() - $('.mask').width()) x = $('.pdpImages-bigImages').width() - $('.mask').width()
        if (y >= $('.pdpImages-bigImages').height() - $('.mask').height()) y = $('.pdpImages-bigImages').height() - $('.mask').height()
        $('.mask').css({
            'left':x,
            'top':y,
        })
        const bg_x = ($('.pdpImages-bigImages').width() - $('.mask').width() ) / ($('.pdpImages-maximg img').width() - $('.pdpImages-maximg ').width())
        const bg_y = ($('.pdpImages-bigImages').height() - $('.mask').height() ) / ($('.pdpImages-maximg img').height() - $('.pdpImages-maximg ').height())
        $('.pdpImages-maximg img').css({
            'left':-x / bg_x,
            'top':-y / bg_y,
        })
    })

})