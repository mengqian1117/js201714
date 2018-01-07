//注意看HTML解构中我没有给a标签加自定义属性sort-attr,自己加上

let xhr = new XMLHttpRequest();
let data = null,
    list = document.getElementById("list"),
    header = document.getElementById("header"),
    aList = header.getElementsByTagName("a");

xhr.open("GET", "json/data.json");
xhr.onreadystatechange = function () {
    if (xhr.status === 200 && xhr.readyState === 4) {
        data = JSON.parse(xhr.responseText);
        if (data.length) {
            list.innerHTML = bindHtml();
            bindEvent();
        }
    }
};
xhr.send(null);

function bindHtml() {
    let str = ``;
    data.forEach((item) => {
        str += `
                <li>
                    <a href="javascript:;">
                        <img src="${item.img}" alt="">
                        <p>${item.title}</p>
                        <p class="hot">热度:${item.hot}</p>
                        <del>$9999</del>
                        <span>￥${item.hot}</span>
                        <p class="time">上架时间：${item.time}</p>
                    </a>
                </li>
                `
    });
    return str;
}

function bindEvent() {
    for (let i = 0; i < aList.length; i++) {
        let ele = aList[i];
        ele.flag = -1;
        ele.onclick = function () {
            this.flag *= -1;
            let attr = this.getAttribute("data-attr");
            sortGoods.call(this, attr);
            addCladd.call(this);
            clearBg.call(this);
        }
    }
}

function sortGoods(attr) {
    if (attr === "time") {
        data.sort((a, b) => {
            return (new Date(a.time) - new Date(b.time)) * this.flag;
        });
    } else {
        data.sort((a, b) => {
            return (a[attr] - b[attr]) * this.flag;
        });
    }
    list.innerHTML = bindHtml();
}

function addCladd() {
    if (this.flag > 0) {
        this.children[0].classList.add("bg");
        this.children[1].classList.remove("bg");
    } else {
        this.children[1].classList.add("bg");
        this.children[0].classList.remove("bg");
    }
}

function clearBg() {
    for (let i = 0; i < aList.length; i++) {
        let cur = aList[i];
        if (this !== cur) {
            cur.children[0].classList.remove("bg");
            cur.children[1].classList.remove("bg");
            cur.flag = -1;
        }
    }
}