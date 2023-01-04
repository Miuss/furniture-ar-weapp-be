
import ServerDataDayReportService from '../services/ServerDataDayReportService'


export default async function serverDayReportJob() {
  try {
    console.log('【定时任务】开始生成每日大数据报表')
    await ServerDataDayReportService.queryDayReportData()
    console.log('【定时任务】每日大数据报表生成完毕')
  } catch (e) {
    console.error(e)
  }
}