let PageRender=(function () {
    let $box=$("#box"),
        $list=$("#list"),
        $pageBtn=$("#page"),
        $pageNum=$("#pageNum"),
        $pageInput=$("#pageInput");
    let totalPage=0;//总页数
    let page=1;//当前页
    //发送请求并绑定数据的函数
    function bindHTML() {
        $.ajax({
            url:"/userList?page="+page,
            type:"GET",
            dataType:'json',
            success:bindData
        });
        function bindData(res) {
            totalPage=Math.ceil(res.total/10);
            let data=res.data;
            if(data){
                let str=``;
                $.each(data,(index,item)=>{
                    str+= `<li id="li${item.id}">
            <span>${item.id}</span>
            <span>${item.name}</span>
            <span>${item.age}</span>
            <span>${item.sex==0?"男":"女"}</span>
            <span>
                <button class="del" data-id="${item.id}">
                   删除
                </button>
                <button class="check" data-id="${item.id}">
                   查看/修改
                </button>
            </span>
        </li>`
                });
                $list.html(str);
                //绑定页码
                str=``;
                for(let i=1;i<=totalPage;i++){
                    if(i==page){
                        str+=`<li class="bg">${i}</li>`;
                        continue;
                    }
                    str+=`<li>${i}</li>`;
                };
                $pageNum.html(str);
                //让输入框的内容对应
                $pageInput.val(page);
            }
        }
    }
    //给页码绑定事件的函数
    function changePage() {
        //this-->li,span
        if(this.innerHTML=="首页"){
            if(page==1)return;
            page=1;
        }
        if(this.innerHTML=="上一页"){
            if(page==1)return;
            page--;
        }
        if(this.innerHTML=="下一页"){
            if(page==totalPage)return;
            page++;
        }
        if(this.innerHTML=="尾页"){
            if(page==totalPage)return;
            page=totalPage;
        }
        //如果标签名是LI说明点击的是li
        if(this.tagName=="LI"){
            //如果你点击的还是当前页码后面不需要执行了,直接return
            if(page==parseInt(this.innerHTML))return;
            page=parseInt(this.innerHTML);
        }
        bindHTML();
    }
    //输入框绑定事件的函数
    function inputChangePage(e) {
        //当敲回车键把page变成输入框的内容
        if(e.keyCode==13){
            let val=Math.round(this.value);
            if(isNaN(val)){
                this.value=page;
                return;
            }
            //处理内容超过范围时候的值
            val<1?val=1:null;
            val>totalPage?val=totalPage:null;
            page=val;
            bindHTML();
        }
    }
    //删除按钮绑定事件的函数
    function removeUser() {
        //获取当前用户的id值
        let userID=$(this).attr("data-id");
        //询问的弹窗
        let isRem=confirm("您确定要删除此用户吗");
        if(isRem){
            //只有点击确实才发请求
            $.ajax({
                url:"/removeUser?id="+userID,
                type:"get",
                dataType:"json",
                success:(res)=> {
                    if(res.data){
                        //在页面上将这个li移除即可
                        $list[0].removeChild(this.parentNode.parentNode);
                    }else {
                        alert("亲,删不了哦");
                    }
                }
            })
        }
    }
    //绑定查看事件的函数
    function checkUser() {
        //带参数跳转页面
        //获取当前用户的id
        let userID=$(this).attr("data-id");
        //跳转页面带着参数id
        window.open("page/userInfo.html?id="+userID);
    }
    //绑定增加用户事件的函数
    function addUser() {
        $.ajax({
            url:"/addUser",
            type:"post",
            dataType:"json",
            data:decodeURIComponent($("#form1").serialize()),
            async:false,
            cache:false,//是否走缓存
            success:function (res) {
                alert(res.message)
            }
        })
    }
    return{
        init(){
            //1.刚打开页面的时候先发一次请求绑定数据
            bindHTML();
            //2.给pageBtn下面的页码绑定事件
            $pageBtn.on("click","li,span",changePage);
            //3.给输入框绑定事件
            $pageInput.on("keyup",inputChangePage);
            //4.删除事件
            $list.on("click",".del",removeUser);
            //5.查看事件
            $list.on("click",".check",checkUser);
            //6.绑定增加用户的事件
            $("#submit").click(addUser)
        }
    }
})();
PageRender.init();
