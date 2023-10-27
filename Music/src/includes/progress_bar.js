import NProgress from 'nprogress'


export default (router) => {

    router.beforeEach()

    router.afterEach((to, from , next) => {
        
        NProgress.start()
        next()
    })
    router.afterEach(NProgress.done)
}
