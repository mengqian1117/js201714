let less=require("less");
less.render('@h:100px;.box{height:@h}',{compress: true},(e,val)=> {
    //compress: true  是否压缩
    //e: 错误信息
    //val:是一个对象 {css:编译后的css}
    //css属性:编译后的css
    console.log(val);
    //{ css: '.box {\n  height: 100px;\n}\n', imports: [] }
    //压缩 { css: '.box{height:100px}', imports: [] }
});