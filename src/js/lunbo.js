class Banner {
    constructor (ele) {
        this.ele = document.querySelector(ele)
        this.imgbox = this.ele.querySelector('.imgbox')
        this.pointbox = this.ele.querySelector('.pointbox')
        this.leftright = this.ele.querySelector('.leftright')
        this.li = this.ele.querySelector('.pointbox li')
        // this.li_width = parseInt(window.getComputedStyle(this.li).width)
        this.box_width = parseInt(window.getComputedStyle(this.ele).width)
        this.index = 1
        this.timer = 0
        this.init()
        this.flag = true
    }
     init () {
        this.setPoint()
        this.copyEle()
        this.autoPlay ()
        this.overOut()
        this.pointEvent ()
        // this.leftrightbox ()
        this.changePage ()
    }
    setPoint () {
        
        const pointNum = this.imgbox.children.length
        const frg = document.createDocumentFragment()
        for (let i = 0; i < pointNum; i++) {
            const li = document.createElement('li')
            if (i === 0) li.className = 'active'
            li.setAttribute('point_index' , i)
            frg.appendChild(li)
        }
        this.pointbox.appendChild(frg)
        this.pointbox.style.width = pointNum * 12 * 2 + 'px'
    }
    copyEle () {
        const first = this.imgbox.firstElementChild.cloneNode(true)
        const last = this.imgbox.lastElementChild.cloneNode(true)
        this.imgbox.appendChild(first)
        this.imgbox.insertBefore(last,this.imgbox.firstElementChild)
        this.imgbox.style.width = this.box_width * this.imgbox.children.length + 'px'
        this.imgbox.style.left = -this.index * this.box_width + 'px'
    }
    autoPlay () {
        this.timer = setInterval(() => {
            this.index++
            move(this.imgbox,{left:-this.index * this.box_width},this.moveEnd.bind(this))
        },2000)
        
    }
    moveEnd () {
        if (this.index === this.imgbox.children.length - 1) {
            this.index = 1
            this.imgbox.style.left = -this.index * this.box_width + 'px'
        }
        if (this.index === 0) {
            this.index = this.imgbox.children.length - 2
            this.imgbox.style.left = -this.index * this.box_width + 'px'

        }
        for (let i = 0; i < this.pointbox.children.length; i++) {
            this.pointbox.children[i].classList.remove('active')
        }
        this.pointbox.children[this.index - 1].classList.add('active')
        this.flag = true
    }
    overOut () {
        this.ele.addEventListener('mouseover' ,() => {

            clearInterval(this.timer)
        } )
        this.ele.addEventListener('mouseout',() => {
            this.autoPlay()
        })
    }
    pointEvent () {
        this.pointbox.addEventListener('click',(e) => {
            
            e = e || window.event
            const target = e.target || e.srcElement
            if (target.nodeName === 'LI') {
               if (!this.flag) return
        this.flag = false
                const point_index = target.getAttribute('point_index') - 0 
                this.index = point_index + 1
                move(this.imgbox,{left:-this.index * this.box_width},this.moveEnd.bind(this))
            }
        })
    }
    leftrightbox () {
        this.leftright.addEventListener('click',(e) => {
            e = e || window.event
            const target = e.target || e.srcElement
            if (target.className === 'left') {
                if (!this.flag) return
                this.flag = false
                this.index--
                move(this.imgbox,{left:-this.index * this.box_width},this.moveEnd.bind(this))

            }
            if (target.className === 'right') {
                if (!this.flag) return
        this.flag = false
                this.index++
                move(this.imgbox,{left:-this.index * this.box_width},this.moveEnd.bind(this))

            }
        })
    }
    changePage () {
        document.addEventListener('visibilitychange', () => {
            const starte = document.visibilityState
            if (starte === 'hidden') {
                clearInterval(this.timer)
            }
            if (starte === 'visible') {
                this.autoPlay()
            }
        })
    }
}