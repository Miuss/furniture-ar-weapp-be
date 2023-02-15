import qiniu from 'qiniu'
import { qiniuConfig } from '../../config';

export default class FileController {

  static getQiniuUploadToken(req, res, next) {
    try {
      const mac = new qiniu.auth.digest.Mac(qiniuConfig.accessKey, qiniuConfig.secretKey);
      const options = {
        scope: qiniuConfig.bucket,
        expires: 1800 // Token过期时间30分钟
      };
      const putPolicy = new qiniu.rs.PutPolicy(options);
      const uploadToken = putPolicy.uploadToken(mac);

      res.status(200).json({ code: 0, msg: '成功获取上传文件token', data: { token: uploadToken }});
    } catch(e) {
      console.error(e)
      res.status(200).json({ code: -1, msg: e.message });
    }
  }

}