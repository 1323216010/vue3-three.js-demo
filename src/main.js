import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import 'element-plus/dist/index.css'
import elementIcons from '@/components/SvgIcon/svgicon'
import { parseTime, resetForm, addDateRange, handleTree, selectDictLabel, selectDictLabels } from '@/utils/ruoyi.js'

// 注册指令
import plugins from './plugins' // plugins
import { download } from '@/utils/request'

import '@/assets/styles/index.scss' // global css

// 分页组件
import Pagination from '@/components/Pagination'
//vue自定义指令
import directive from './directive' // directive

const app = createApp(App);

app.config.globalProperties.addDateRange = addDateRange
app.config.globalProperties.handleTree = handleTree
app.config.globalProperties.download = download

// 全局组件挂载
app.component('Pagination', Pagination)

app.use(store)
app.use(router);
app.use(plugins);
app.use(elementIcons)

directive(app)

app.mount('#app');