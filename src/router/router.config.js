/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/',
    component: () => import('@/views/layouts/index'),
    redirect: '/user',
    meta: {
      title: '首页',
      keepAlive: true
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index'),
        meta: { title: '首页', keepAlive: false }
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/home/login'),
        meta: { title: '登录', keepAlive: false }
      },
      {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/home/register'),
        meta: { title: '注册', keepAlive: false }
      },
      {
        path: '/user',
        name: 'User',
        component: () => import('@/views/user/index'),
        meta: { title: '个人中心', keepAlive: true }
      },
      {
        path: '/user/setting',
        name: 'UserSetting',
        component: () => import('@/views/user/profile/setting'),
        meta: { title: '用户设置', keepAlive: false }
      },
      {
        path: '/user/wechat',
        name: 'Wechat',
        component: () => import('@/views/user/wechat'),
        meta: { title: '用户微信', keepAlive: false }
      },
      {
        path: '/user/message',
        name: 'UserMessage',
        component: () => import('@/views/user/message/index'),
        meta: { title: '用户消息', keepAlive: true }
      },
      {
        path: '/user/message/detail/:id',
        name: 'UserMessageDetail',
        component: () => import('@/views/user/message/detail'),
        meta: { title: '消息详情', keepAlive: true }
      },
      {
        path: '/data/userCalendar',
        name: 'UserCalendar',
        component: () => import('@/views/data/userCalendar/index'),
        meta: { title: '用户日历', keepAlive: true }
      },
      {
        path: '/data/userScore',
        name: 'UserScore',
        component: () => import('@/views/data/userScore/index'),
        meta: { title: '用户评分', keepAlive: true }
      },
      {
        path: '/data/userScore/stat',
        name: 'UserScoreStat',
        component: () => import('@/views/data/userScore/stat'),
        meta: { title: '用户评分统计', keepAlive: false }
      },
      {
        path: '/data/userRewardPoints',
        name: 'UserRewardPoints',
        component: () => import('@/views/data/userRewardPoints/index'),
        meta: { title: '用户积分', keepAlive: true }
      },
      {
        path: '/data/userRewardPoints/stat',
        name: 'UserRewardPointsStat',
        component: () => import('@/views/data/userRewardPoints/stat'),
        meta: { title: '用户积分统计', keepAlive: false }
      },
      {
        path: '/data/timeline',
        name: 'Timeline',
        component: () => import('@/views/data/timeline/index'),
        meta: { title: '时间线', keepAlive: false }
      },
      {
        path: '/fund/budget/stat',
        name: 'BudgetStat',
        component: () => import('@/views/fund/budget/stat'),
        meta: { title: '预算统计', keepAlive: true }
      },
      {
        path: '/fund/budget/logStat',
        name: 'BudgetLogStat',
        component: () => import('@/views/fund/budget/logStat'),
        meta: { title: '历史预算统计', keepAlive: true }
      },
      {
        path: '/fund/budget/:budgetLogId/snapshot',
        name: 'BudgetSnapshot',
        component: () => import('@/views/fund/budgetSnapshot/snapshot'),
        meta: { title: '预算快照', keepAlive: false }
      },
      {
        path: '/fund/budgetSnapshot/:snapshotId/children',
        name: 'BudgetSnapshotChildren',
        component: () => import('@/views/fund/budgetSnapshot/children'),
        meta: { title: '预算快照子列表', keepAlive: false }
      },
      {
        path: '/fund/budget/:budgetLogId/snapshotConsumeStat',
        name: 'BudgetSnapshotConsumeStat',
        component: () => import('@/views/fund/budgetSnapshot/consumeStat'),
        meta: { title: '预算快照消费统计', keepAlive: false }
      },
      {
        path: '/fund/budget/infoList',
        name: 'BudgetInfoList',
        component: () => import('@/views/fund/budget/infoList'),
        meta: { title: '当前预算信息', keepAlive: true }
      },
      {
        path: '/fund/budget/timelineStat',
        name: 'BudgetTimelineStat',
        component: () => import('@/views/fund/budget/timelineStat'),
        meta: { title: '预算进度统计', keepAlive: false }
      },
      {
        path: '/report/notify/stat',
        name: 'NotifyStat',
        component: () => import('@/views/report/notify/stat'),
        meta: { title: '提醒统计', keepAlive: true }
      },
      {
        path: '/report/chart/userChart/stat',
        name: 'UserChartStat',
        component: () => import('@/views/report/chart/userChart/stat'),
        meta: { title: '图表统计', keepAlive: true }
      },
      {
        path: '/health/body/sleep',
        name: 'Sleep',
        component: () => import('@/views/health/body/sleep/index'),
        meta: { title: '睡眠管理', keepAlive: true }
      },
      {
        path: '/health/body/sleep/add',
        name: 'SleepAdd',
        component: () => import('@/views/health/body/sleep/form'),
        meta: { title: '新增睡眠', keepAlive: false }
      },
      {
        path: '/health/body/sleep/edit/:id',
        name: 'SleepEdit',
        component: () => import('@/views/health/body/sleep/form'),
        meta: { title: '编辑睡眠', keepAlive: false }
      },
      {
        path: '/food/diet',
        name: 'Diet',
        component: () => import('@/views/food/diet/index'),
        meta: { title: '饮食管理', keepAlive: true }
      },
      {
        path: '/food/diet/add',
        name: 'DietAdd',
        component: () => import('@/views/food/diet/form'),
        meta: { title: '新增饮食', keepAlive: false }
      },
      {
        path: '/food/diet/addFromTmp/:tmpId',
        name: 'DietAddFromTmp',
        component: () => import('@/views/food/diet/form'),
        meta: { title: '以模板新增饮食', keepAlive: false }
      },
      {
        path: '/food/diet/edit/:id',
        name: 'DietEdit',
        component: () => import('@/views/food/diet/form'),
        meta: { title: '编辑饮食', keepAlive: false }
      },
      {
        path: '/consume/buyRecord',
        name: 'BuyRecord',
        component: () => import('@/views/consume/buyRecord/index'),
        meta: { title: '消费管理', keepAlive: true }
      },
      {
        path: '/consume/buyRecord/add',
        name: 'BuyRecordAdd',
        component: () => import('@/views/consume/buyRecord/form'),
        meta: { title: '新增消费', keepAlive: false }
      },
      {
        path: '/consume/buyRecord/addFromTmp/:tmpId',
        name: 'BuyRecordAddFromTmp',
        component: () => import('@/views/consume/buyRecord/form'),
        meta: { title: '以模板新增消费', keepAlive: false }
      },
      {
        path: '/consume/buyRecord/edit/:id',
        name: 'BuyRecordEdit',
        component: () => import('@/views/consume/buyRecord/form'),
        meta: { title: '编辑消费', keepAlive: false }
      },
      {
        path: '/common/commonRecord',
        name: 'CommonRecord',
        component: () => import('@/views/common/commonRecord/index'),
        meta: { title: '通用记录', keepAlive: true }
      },
      {
        path: '/common/commonRecord/add',
        name: 'CommonRecordAdd',
        component: () => import('@/views/common/commonRecord/form'),
        meta: { title: '新增通用记录', keepAlive: false }
      },
      {
        path: '/common/commonRecord/edit/:id',
        name: 'CommonRecordEdit',
        component: () => import('@/views/common/commonRecord/form'),
        meta: { title: '编辑通用记录', keepAlive: false }
      },
      {
        path: '/health/body/bodyAbnormalRecord',
        name: 'BodyAbnormalRecord',
        component: () => import('@/views/health/body/bodyAbnormalRecord/index'),
        meta: { title: '身体不适记录', keepAlive: true }
      },
      {
        path: '/health/body/bodyAbnormalRecord/add',
        name: 'BodyAbnormalRecordAdd',
        component: () => import('@/views/health/body/bodyAbnormalRecord/form'),
        meta: { title: '新增身体不适', keepAlive: false }
      },
      {
        path: '/health/body/bodyAbnormalRecord/edit/:id',
        name: 'BodyAbnormalRecordEdit',
        component: () => import('@/views/health/body/bodyAbnormalRecord/form'),
        meta: { title: '编辑身体不适', keepAlive: false }
      },
      {
        path: '/read/readingRecord',
        name: 'ReadingRecord',
        component: () => import('@/views/read/readingRecord/index'),
        meta: { title: '阅读记录', keepAlive: true }
      },
      {
        path: '/read/readingRecord/add',
        name: 'ReadingRecordAdd',
        component: () => import('@/views/read/readingRecord/form'),
        meta: { title: '新增阅读', keepAlive: false }
      },
      {
        path: '/read/readingRecord/edit/:id',
        name: 'ReadingRecordEdit',
        component: () => import('@/views/read/readingRecord/form'),
        meta: { title: '编辑阅读', keepAlive: false }
      },
      {
        path: '/read/readingRecord/:readingRecordId/detail',
        name: 'ReadingRecordDetail',
        component: () => import('@/views/read/readingRecordDetail/index'),
        meta: { title: '阅读明细记录', keepAlive: false }
      },
      {
        path: '/read/readingRecord/:readingRecordId/detail/add',
        name: 'ReadingRecordDetailAdd',
        component: () => import('@/views/read/readingRecordDetail/form'),
        meta: { title: '新增阅读明细', keepAlive: false }
      },
      {
        path: '/read/readingRecordDetail/edit/:id',
        name: 'ReadingRecordDetailEdit',
        component: () => import('@/views/read/readingRecordDetail/form'),
        meta: { title: '编辑阅读明细', keepAlive: false }
      },
      {
        path: '/health/treat/treatDrug',
        name: 'TreatDrug',
        component: () => import('@/views/health/treat/treatDrug/index'),
        meta: { title: '用药管理', keepAlive: true }
      },
			{
			  path: '/health/treat/treatDrugCalendar',
			  name: 'TreatDrugCalendar',
			  component: () => import('@/views/health/treat/treatDrug/calendar'),
			  meta: { title: '用药日历', keepAlive: true }
			},
      {
        path: '/health/treat/treatDrug/:treatDrugId/detail',
        name: 'TreatDrugDetail',
        component: () => import('@/views/health/treat/treatDrugDetail/index'),
        meta: { title: '用药明细记录', keepAlive: false }
      },
      {
        path: '/health/treat/treatDrug/:treatDrugId/detail/add',
        name: 'TreatDrugDetailAdd',
        component: () => import('@/views/health/treat/treatDrugDetail/form'),
        meta: { title: '新增用药明细', keepAlive: false }
      },
      {
        path: '/health/treat/treatDrugDetail/edit/:id',
        name: 'TreatDrugDetailEdit',
        component: () => import('@/views/health/treat/treatDrugDetail/form'),
        meta: { title: '编辑用药明细', keepAlive: false }
      },
      {
        path: '/sport/sportExercise',
        name: 'SportExercise',
        component: () => import('@/views/sport/sportExercise/index'),
        meta: { title: '运动锻炼', keepAlive: true }
      },
      {
        path: '/sport/sportExercise/add',
        name: 'SportExerciseAdd',
        component: () => import('@/views/sport/sportExercise/form'),
        meta: { title: '新增运动锻炼', keepAlive: false }
      },
      {
        path: '/sport/sportExercise/addFromTmp/:templateDate',
        name: 'SportExerciseAddFromTmp',
        component: () => import('@/views/sport/sportExercise/tmpForm'),
        meta: { title: '以模板新增运动锻炼', keepAlive: false }
      },
      {
        path: '/sport/sportExercise/edit/:id',
        name: 'SportExerciseEdit',
        component: () => import('@/views/sport/sportExercise/form'),
        meta: { title: '编辑运动锻炼', keepAlive: false }
      },
      {
        path: '/customService',
        name: 'CustomService',
        component: () => import('@/views/system/cs/customService'),
        meta: { title: '智能客服', keepAlive: false }
      }
    ]
  }
]
