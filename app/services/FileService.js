import { File } from '../models'

export default class FileService {
  
  /**
   * 新增文件数据
   * @param {*} data 
   */
  static async createFile(data) {
    try {
      await File.create({
        userId: data.userId,
        bucket: data.bucket,
        fileType: data.fileType,
        fileUrl: data.fileUrl
      })
    } catch(e) {
      throw e
    }
  }
}