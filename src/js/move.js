function move(ele,target,fn) {
    let count = 0
    for (var key in target) {
        count++
       
        let timer = setInterval(() => {
            let current
            if (key === 'opactity'){
                current = window.getComputedStyle(ele)[key].opacity * 100
            } else {
                current = parseInt(window.getComputedStyle(ele)[key])
            }
            let distance = (target[key] - current) / 10
            distance = distance > 0 ? Math.ceil(distance) : Math.floor(distance)
            if (target[key] === current) {
                count--
                clearInterval(timer)
                if (count === 0) fn()
            }else {
                if (key === 'opactity'){
                    ele.style[key] = (current + distance) / 100 
                }else {
                    ele.style[key] = current + distance + 'px'
                }
            }
        },20)
    }
}