//模块化导入和导出
import { Dialog } from 'vant';
import router from '../router';
export default {
    // 检测用户是否登录了
    //next函数需要的参数item
    checkLogin({ key, next, item }) {
        //检测本地是否有登录有没有登录
        let user = localStorage.getItem(key)//本地储存
        if (user) {//已经登录，继续下一步操作
            next(item)
        } else {
            //没登录提示用户
            Dialog.confirm({
                title: '检测到您未登录',
                message: '是否立即登录？',
            })
                .then(() => { //点击确定跳登录
                    router.push('/register')
                })
                .catch(() => {//取消操作
                    // on cancel
                });
        }
    },
    // 储存记录(浏览记录browse，搜索记录search)
    // key:储存的历史
    // attr:判断元素是否存在的属性名
    saveHistory({ user, key, data, attr }) {
        let name = user + key + 'History'
        let history = localStorage.getItem(name)
        if (history) {//之前储存过
            let arr = JSON.parse(localStorage.getItem(name))
            let item = null
            if (typeof data === 'string') {
                item = arr.find(i => {
                    return i[attr] === data
                })
            } else {
                item = arr.find(i => {
                    return i[attr] === data[attr]
                })
            }//数组当中没有当前数据
            if (!item) {
                if (typeof data === 'string') {//都储存为一个对象
                    let obj = {
                        [attr]: data
                    }
                    arr.push(obj)
                } else {
                    arr.push(data)
                }
                localStorage.setItem(name, JSON.stringify(arr))
            }
        } else {//第一次储存 
            let arr = []
            if (typeof data === 'string') {//都储存为一个对象
                let obj = {
                    name: data
                }
                arr.push(obj)
            } else {
                arr.push(data)
            }
            localStorage.setItem(name, JSON.stringify(arr))
        }
    },
    // 获取储存记录
    getHistory({ user, key }) {
        let name = user + key + 'History'
        let arr = localStorage.getItem(name)
        if (arr) return JSON.parse(arr)
        else return null
    }

}