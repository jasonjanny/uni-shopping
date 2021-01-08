import request from '@/utils/request'

export function homeSwiper(){
    return request({
        method:'get',
        url:'/home/swiperdata'
    })
}

export const homeNav = ()=>{
    return request({
        method:'get',
        url:'/home/catitems'
    })
}

export const floorData = ()=>{
    return request({
        method:'get',
        url:'/home/floordata'
    })
}