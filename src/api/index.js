import request from '@/utils/request'

// 获取首页滑动组件数据
export function homeSwiper(){
    return request({
        method:'get',
        url:'/home/swiperdata'
    })
}

// 获取首页导航栏数据
export const homeNav = ()=>{
    return request({
        method:'get',
        url:'/home/catitems'
    })
}

// 获取首页楼层数据
export const floorData = ()=>{
    return request({
        method:'get',
        url:'/home/floordata'
    })
}

// 获取商品列表
export const getGoodsList = (data)=>{
    return request({
        method:'get',
        url:'/goods/search',
        data
    })
}

