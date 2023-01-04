import { sequelize, ServerDataDayReport } from "../models";
import moment from "moment";

export default class ServerDataDayReportService {

  static async queryDayReportDataList (pageIndex, pageSize) {
    return await ServerDataDayReport.findAll({
      order: [
        ['createdAt', 'DESC'],
      ], 
      offset: pageIndex * pageSize, 
      limit: pageSize
    });
  }

  /**
   * 查询每日报表数据并入库
   */
  static async queryDayReportData () {
    const [result] = await sequelize.query(`
      select 
        avg(total_online_player) as avgPlayerOnline,
        max(total_online_player) as maxPlayerOnline,
        min(total_online_player) as minPlayerOnline,
        avg(total_online_server) as avgServerOnline,
        max(total_online_server) as maxServerOnline,
        min(total_online_server) as minServerOnline,
        minPlayer.createdAt as minPlayerTime,
        maxPlayer.createdAt as maxPlayerTime,
        minServer.createdAt as minServerTime,
        maxServer.createdAt as maxServerTime
      from (
        select sum(online) as total_online_player, count(*) as total_online_server, createdAt from server_data where TO_DAYS(NOW()) - TO_DAYS(createdAt) = 1 and status = 'online' group by createdAt
      ) a,
        (
          select createdAt from (
            select sum(online) as total_online_player, count(*) as total_online_server, createdAt from server_data where TO_DAYS(NOW()) - TO_DAYS(createdAt) = 1 and status = 'online' group by createdAt
          ) a ORDER BY total_online_player ASC LIMIT 0,1
        ) minPlayer,
        (
          select createdAt from (
            select sum(online) as total_online_player, count(*) as total_online_server, createdAt from server_data where TO_DAYS(NOW()) - TO_DAYS(createdAt) = 1 and status = 'online' group by createdAt
          ) a ORDER BY total_online_player DESC LIMIT 0,1
        ) maxPlayer,
        (
          select createdAt from (
            select sum(online) as total_online_player, count(*) as total_online_server, createdAt from server_data where TO_DAYS(NOW()) - TO_DAYS(createdAt) = 1 and status = 'online' group by createdAt
          ) a ORDER BY total_online_server ASC LIMIT 0,1
        ) minServer,
        (
          select createdAt from (
            select sum(online) as total_online_player, count(*) as total_online_server, createdAt from server_data where TO_DAYS(NOW()) - TO_DAYS(createdAt) = 1 and status = 'online' group by createdAt
          ) a ORDER BY total_online_server DESC LIMIT 0,1
        ) maxServer
    `);

    const {
      avgPlayerOnline,
      maxPlayerOnline,
      minPlayerOnline,
      avgServerOnline,
      maxServerOnline,
      minServerOnline,
      minPlayerTime,
      maxPlayerTime,
      minServerTime,
      maxServerTime
    } = result[0]

    await ServerDataDayReport.create({
      avgPlayerOnline,
      maxPlayerOnline,
      minPlayerOnline,
      avgServerOnline,
      maxServerOnline,
      minServerOnline,
      minPlayerTime,
      maxPlayerTime,
      minServerTime,
      maxServerTime,
      dayDate: moment(maxServerTime).format('YYYY-MM-DD')
    })
  }
}