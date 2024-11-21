import Taro from '@tarojs/taro';

interface QiniuConfig {
  qiniuRegion: string;
  qiniuImageURLPrefix: string;
  qiniuUploadToken: string;
  qiniuUploadTokenURL: string;
  qiniuUploadTokenFunction: null | Function;
  qiniuShouldUseQiniuFileName: boolean;
}

let config: QiniuConfig = {
  qiniuRegion: '',
  qiniuImageURLPrefix: '',
  qiniuUploadToken: '',
  qiniuUploadTokenURL: '',
  qiniuUploadTokenFunction: null,
  qiniuShouldUseQiniuFileName: false,
};

/**
 * 根据传入的选项更新配置
 * @param options 选项对象
 */
const updateConfigWithOptions = (options: any) => {
  // 更新七牛云区域
  if (options.region) {
    config.qiniuRegion = options.region;
  } else {
    console.error('qiniu uploader need your bucket region');
  }

  // 更新上传令牌
  if (options.token) {
    config.qiniuUploadToken = options.token;
  } else if (options.uptokenURL) {
    config.qiniuUploadTokenURL = options.uptokenURL;
  } else if (options.uptokenFunc) {
    config.qiniuUploadTokenFunction = options.uptokenFunc;
  }

  // 更新图片URL前缀
  if (options.domain) {
    config.qiniuImageURLPrefix = options.domain;
  }

  // 更新是否使用七牛云文件名的配置
  config.qiniuShouldUseQiniuFileName = options.key;
};

export const qiniu = async (filePath: string): Promise<{ imageURL: string }> => {
  if (!filePath) {
    console.error('qiniu uploader need filePath to upload');
  }
  // const options = await API.getUploadToken()
  // fake options
  const options = {
    domain: 'https://cdn.nodejs.cloud/',
    key: 'blind/a4e97530d7994a91863a1618b4c799a4.png',
    region: 'ECN',
    token:
      'boHffaiXRGVAbRBK0UZfBTO8HJu91UTKdxjqfSLK:vdN9ar4orA-7J1_5IcQZm2_mPgo=:eyJyZXR1cm5Cb2R5Ijoie1wia2V5XCI6XCIkKGtleSlcIixcImhhc2hcIjpcIiQoZXRhZylcIixcInNpemVcIjpcIiR7ZnNpemV9XCJ9Iiwic2NvcGUiOiJub2RlY2xvdWQ6YmxpbmQvYTRlOTc1MzBkNzk5NGE5MTg2M2ExNjE4YjRjNzk5YTQucG5nIiwiZGVhZGxpbmUiOjE3MzIwNzkwMTN9',
  };
  updateConfigWithOptions(options);
  return doUpload(filePath, options);
};

const doUpload = async (filePath: string, options: any): Promise<{ imageURL: string }> => {
  if (!config.qiniuUploadToken) {
    throw new Error('qiniu UploadToken is null, please check the init config or networking');
  }

  const url = uploadURLFromRegionCode(config.qiniuRegion);
  if (!url) {
    throw new Error('Invalid region code');
  }

  let fileName = filePath.split('//')[1];
  if (options?.key) {
    fileName = options.key;
  }

  const formData = {
    token: config.qiniuUploadToken,
    key: fileName,
  };

  try {
    const res = await Taro.uploadFile({
      url,
      filePath,
      name: 'file',
      formData,
    });

    let dataString = res.data;
    if (typeof res.data === 'object' && res.data.type === 'Buffer') {
      dataString = String.fromCharCode.apply(null, res.data.data);
    }

    const dataObject = JSON.parse(dataString);
    const imageURL = `${config.qiniuImageURLPrefix}/${dataObject.key}`;

    return { imageURL };
  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
};

const uploadURLFromRegionCode = (code: string): string | null => {
  const uploadURLMap = {
    ECN: 'https://up.qbox.me',
    NCN: 'https://up-z1.qbox.me',
    SCN: 'https://up-z2.qbox.me',
    NA: 'https://up-na0.qbox.me',
    ASG: 'https://up-as0.qbox.me',
  };
  if (!uploadURLMap[code]) {
    console.error('please make the region is with one of [ECN, SCN, NCN, NA, ASG]');
    return null;
  }
  return uploadURLMap[code];
};
