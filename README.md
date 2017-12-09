# js201714
####1.创建一个GitHub账号

配置账号和邮箱

git config –global user.name "账号"
git config –global user.email "18253556301@163.com" 
git config –list 查看配置信息

####2.输入老师仓库的网址

https://github.com/mengqian1117/js201714.git 
####3.fork一份老师的仓库到自己的账号点击fork 

####4.将自己的仓库克隆到本地仓库
git clone https://github.com/mq0/js201714.git 
转到文件夹 cd js201714

####5.本地仓库关联老师仓库

git remote add mengqian1117 https://github.com/mengqian1117/js201714.git

####6.更新仓库

git remote update mengqian1117 
git pull mengqian1117 master

####7.提交本地仓库
git add ­A

git commit ­m “这是我第一次提交内容,就是练习一下”

####8.push到自己的远程仓库
git push ­u origin master