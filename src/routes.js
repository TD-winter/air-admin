import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Table from './views/nav1/Table.vue'
import Form from './views/nav1/Form.vue'
import user from './views/nav1/user.vue'
import Page4 from './views/nav2/Page4.vue'
import Page5 from './views/nav2/Page5.vue'
import Page6 from './views/nav3/Page6.vue'
import echarts from './views/charts/echarts.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/admin',
        component: Home,
        name: '用户中心',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/admin/main', component: Main, name: '主页', hidden: true },
            { path: '/admin/table', component: Table, name: '用户列表' },
            { path: '/admin/form', component: Form, name: '添加用户' },
            { path: '/admin/user', component: user, name: '用户配置' },
        ]
    },
    {
        path: '/admin',
        component: Home,
        name: '设备中心',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/admin/page4', component: Page4, name: '设备列表' },
            { path: '/admin/page5', component: Page5, name: '导入设备' }
        ]
    },
    {
        path: '/admin',
        component: Home,
        name: '设备消息',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/admin/page6', component: Page6, name: '设备消息' }
        ]
    },
    {
        path: '/admin',
        component: Home,
        name: '系统管理中心',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/admin/echarts', component: echarts, name: 'echarts' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;