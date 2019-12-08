import {
  get,
  post
} from '@/assets/api/http'

//商城 发票管理  /Invoice/del.do
export const getInvoiceDel = p => get('/Invoice/del.do', p)
//学校库  学校列表
export const getSchoolLibrary = p => get('/new/school/list.do', p)
// //学校库  添加列表
// export const getSchoolAdd = p => post('/new/school/insert.do', p)


//学校库 添加学校
export const getSchoolAdd = p => post('/manager/new/school/insert.do', p)
//学校库  详情
export const getDetails = p => get('/new/school/detail.do', p)
//学校库  编辑
export const getSchoolUpdate = p => post('/manager/new/school/update.do', p)
//添加学校列表  学校名去重
export const getSchoolCheck = p => get('/school/check_valid.do', p)
//学校库 删除
export const getSchoolDelete = p => get('/manager/new/school/delete.do', p)
//学校库 申请访校接口
export const getApplySchool = p => get('/visit/manager/school/list.do', p)
//学校库  图片logo上传
export const getupolad = p => post('/new/school/upload_logo.do', p)


//活动管理 活动列表 活动类型
export const getvislist = p => post('/activity/vis_list.do', p)
   //活动二维码
   export const getvisImageUrl = p => post('activity/get_vis_image_url.do', p)

//活动管理 vis 已交费
export const getvisorder = p => post('/activity/vis_orderList.do', p)
//活动管理 展商列表
export const getExhibitorList = p => post('/manager/exhibitor/list.do', p)
//活动管理 展商详情
export const getExhibitorDetail = p => post('/manager/exhibitor/detail.do', p)
//活动管理 添加展商信息
export const getExhibitorInsert = p => post('/manager/exhibitor/insert.do', p)
//活动管理 修改展商信息
export const getExhibitorUpdate = p => post('/manager/exhibitor/update.do', p)
//活动管理 赠票审核列表
export const getEntryAuditList = p => get('/manager/entryAudit/list.do', p)
//活动管理 赠票审核通过
export const getEntryAuditSuccess_audit = p => get('/manager/entryAudit/success_audit.do', p)
//活动管理 赠票删除
export const getEntryAuditDelete = p => get('/manager/entryAudit/delete.do', p)
//活动管理  线下支付  插入接口
export const getVisInsert = p => get('/activity/vis_insert.do', p)
//活动管理  线下支付  获取图片
export const getVisImage = p => get('/activity/get_vis_image_url.do', p)
//活动管理  错误上报
export const getSysExceptionLogList = p => get('/SysExceptionLog/list.do', p)
//活动管理  vis抽奖列表
export const getTugOfWar_PeopleList = p => get('/activity/TugOfWar_PeopleList.do', p)
//活动管理  vis直播抽奖插入
export const getTugOfWar_Insert = p => get('/activity/TugOfWar_Insert.do', p)
//活动管理  vis直播抽奖 删除接口
export const getTugOfWar_Delete = p => get('/activity/TugOfWar_Delete.do', p)



//其他  错误上报 删除接口
export const getSysExceptionLogDelete = p => get('/SysExceptionLog/delete.do', p)

