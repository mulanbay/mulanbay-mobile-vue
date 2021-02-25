## 项目介绍
木兰湾管理系统是用于管理个人消费、锻炼、音乐、阅读、健康、饮食、人生经历等各个衣食住行信息的系统，通过提醒、计划模块利用调度系统来统计分析执行情况。
并通过积分和评分体系来综合评估个人的总体状态。

该系统是前后端分离的项目，当前项目mulanbay-mobile-vue为前端移动版本，需要结合后端项目才能完整访问。

木兰湾管理系统后端项目：
* 服务器端[mulanbay-server](https://gitee.com/mulanbay/mulanbay-server)

木兰湾管理系统前端项目：

VUE版本
* 基于Vue的前端(PC端)[mulanbay-ui-vue](https://gitee.com/mulanbay/mulanbay-ui-vue)
* 基于Vue的前端(移动端)[mulanbay-mobile-vue](https://gitee.com/mulanbay/mulanbay-mobile-vue)

Jquery版本(V3.0版本后不再维护，以VUE版本为主)
* 基于Jquery的前端(PC端)[mulanbay-ui-jquery](https://gitee.com/mulanbay/mulanbay-ui-jquery)
* 基于Jquery的前端(移动端)[mulanbay-mobile-jquery](https://gitee.com/mulanbay/mulanbay-mobile-jquery)

[木兰湾项目说明](https://gitee.com/mulanbay)

## 开发说明

### 所用技术

Vue、Vant、Echarts

### 文档地址

木兰湾文档[https://www.yuque.com/mulanbay/rgvt6k/uy08n4](https://www.yuque.com/mulanbay/rgvt6k/uy08n4)

### 开发环境

```bash
# 克隆项目

# 进入项目目录
cd mulanbay-mobile-vue

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run serve
```

浏览器访问 http://localhost:9020

### 正式环境

```bash
# 构建生产环境
npm run build
```
## 项目截图
<table>
    <tr>
        <td><img src="https://images.gitee.com/uploads/images/2021/0225/134154_6c5f78ad_352331.png"/></td>
        <td><img src="https://images.gitee.com/uploads/images/2021/0225/134216_58f63cf3_352331.png"/></td>
    </tr>
    <tr>
        <td><img src="https://images.gitee.com/uploads/images/2021/0225/134236_7c81bf14_352331.png"/></td>
        <td><img src="https://images.gitee.com/uploads/images/2021/0225/134302_3a19af7c_352331.png"/></td>
    </tr>
    <tr>
        <td><img src="https://images.gitee.com/uploads/images/2021/0225/134321_56b72e90_352331.png"/></td>
        <td><img src="https://images.gitee.com/uploads/images/2021/0225/134338_e1766f98_352331.png"/></td>
    </tr>
</table>