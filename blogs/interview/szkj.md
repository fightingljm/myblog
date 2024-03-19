

hooks、dva、移动端适配px、upload上传、webview加载慢卡顿、自己认为封装的比较好的组件、开发中遇到的问题以及怎么解决的



原理、算法、未来规划

- dva
- hooks

- webview加载慢卡顿

- 移动端适配px

  ```js
  import { Dimensions, PixelRatio, Platform } from 'react-native';
  
  /**
   * 屏幕工具类
   * ui设计基准,iphone 6
   * width:750
   * height:1334
   */
  export const screenW = Math.min(Dimensions.get('window').width, Dimensions.get('window').height)
  export const screenH = Math.max(Dimensions.get('window').width, Dimensions.get('window').height)
  const fontScale = PixelRatio.getFontScale();
  export const pixelRatio = PixelRatio.get();
  const r2 = 2;
  const w2 = 750 / r2;
  const h2 = 1334 / r2;
  /**
   * 设置text为sp
   * @param size  sp
   * @returns {Number} dp
   */
  export const DEFAULT_DENSITY = 2;
  export function setSpText(size: number) {
      const scaleWidth = screenW / w2;
      const scaleHeight = screenH / h2;
      const scale = Math.min(scaleWidth, scaleHeight);
      // eslint-disable-next-line no-mixed-operators
      return Math.round((size * scale + 0.5) * pixelRatio / fontScale);
  }
  /**
   * 屏幕适配,缩放size
   * @param size
   * @returns {Number}
   * @constructor
   */
  export default function px2dp(size: number) {
      // if (Platform.OS === 'android') return size * 0.5;
      // const scaleWidth = screenW / w2;
      // const scaleHeight = screenH / h2;
      const scale = (Math.min(screenW, screenH)) / w2;
      return Math.round((size * scale + 0.5)) / DEFAULT_DENSITY;
  }
  
  
  export function px2dpForHeight(size: number) {
      // var scaleWidth = screenW / w2;
      const scaleHeight = screenH / h2;
      // var scale = Math.min(scaleWidth, scaleHeight);
      return Math.round((size * scaleHeight + 0.5)) / DEFAULT_DENSITY;
  }
  
  export function isIphoneX() {
      const dimension = Dimensions.get('window');
      return (
          Platform.OS === 'ios'
          && !Platform.isPad
          && !Platform.isTVOS
          && (dimension.height === 812 || dimension.width === 812 || dimension.height === 896 || dimension.width === 896)
      );
  }
  
  export function isIphoneXMax() {
      const dimension = Dimensions.get('window');
      return (
          Platform.OS === 'ios'
          && !Platform.isPad
          && !Platform.isTVOS
          && (dimension.height === 896)
      );
  }
  
  ```

  



- upload上传

  ```js
  /* eslint-disable import/no-cycle */
  import ImagePicker, { Image, Options } from 'react-native-image-crop-picker';
  import request from '../request/index';
  import AliyunOss from 'aliyun-oss-react-native';
  import { Platform } from 'react-native'
  import _ from "lodash"
  import { FileInfo } from "common/employee";
  
  const defaultOptions: Options = {
      compressImageMaxWidth: 640,
      compressImageMaxHeight: 640,
      compressImageQuality: 0.8,
      mediaType: 'photo',
      maxFiles: 9,
      cropping: false,
      cropperChooseText: '完成',
      cropperCancelText: '取消',
  };
  
  const configuration = {
      maxRetryCount: 3,
      timeoutIntervalForRequest: 30,
      timeoutIntervalForResource: 24 * 60 * 60,
  };
  
  type FileDic = {
      file_name: string;
      width: number;
      height: number;
      file_size: number;
  }
  
  export type ImageData = FileInfo & {
      file_id: string;
      photo_id: string;
  }
  
  type ImageType = Omit<Image, 'data'> & {
      data: ImageData;
  }
  /*
   params:
      index: 0 相机 1 相册
      options.multiple true 多选
   */
  const uploadImage = async ({
      options, index, maxNum, currentNum
  }: {
      options: Options;
      index: number;
      maxNum: number;
      currentNum: number;
  }): Promise<ImageType[]> => new Promise(async (resolve, reject) => {
      const cameraFunction = index === 0 ? ImagePicker.openCamera : ImagePicker.openPicker;
      const mergeOptions = { ...defaultOptions, ...(options || {}) };
      const isMultiple = mergeOptions.multiple && index === 1;
      try {
          const images = await cameraFunction(mergeOptions);
          const cameraResult: Omit<Image, 'data'>[] = (_.isArray(images)) ? images : [images]
          if (isMultiple) {
              if (cameraResult.length + currentNum > maxNum) {
                  reject(new Error(`最多上传${maxNum}张`))
              }
          }
          const file_list: FileDic[] = [];
          const path_list: string[] = [];
          cameraResult.forEach((item) => {
              const nameDate = new Date();
              const dic: FileDic = {
                  file_name: `${nameDate.getTime()}.PNG`,
                  width: item.width,
                  height: item.height,
                  file_size: item.size,
              };
              const path = Platform.OS === 'ios' ? `file://${item.path}` : item.path;
              path_list.push(path);
              file_list.push(dic);
          });
          const file_list_json = JSON.stringify(file_list); // "[{"file_name":"1605076696625.PNG","width":640,"height":640,"file_size":46926}]"
          const preLoadResult = await request.default({
              apiName: 'preload_image',
              params: { file_list: file_list_json }
          });
          /*
          data: {
             access_key_id: "STS.NTPSAtBkZUEL3EyCAxKWGiRdd"
             access_key_secret: "CAJ87nRDYm8Ye4dtCys8t9gHBgGj7jk6QtNdQmzTBWuQ"
             bucket_name: "dakatest"
             endpoint: https://oss-cn-beijing.aliyuncs.com
            file_upload_list: [
              {
               file_id: "b42c058ca9ef4c85aa963d37160e1e6e"
               key: "b42c058ca9ef4c85aa963d37160e1e6e/1605076696625.PNG"
              }
            ]
             security_token: "CAIS+QF1q6Ft5B2yfSjIr5flGPvAr7R74oenMWPIp0EtR9hrhpfPhjz2IHhKenFvA+gZt/sxlG9S6/gclqVoRoReREvCKM1565kPYpcYuzmH6aKP9rUhpMCPOwr6UmzWvqL7Z+H+U6muGJOEYEzFkSle2KbzcS7YMXWuLZyOj+wMDL1VJH7aCwBLH9BLPABvhdYHPH/KT5aXPwXtn3DbATgD2GM+qxsmuP3kk5HNu0GP0QGjl75OnemrfMj4NfsLFYxkTtK40NZxcqf8yyNK43BIjvwu0vIcpm2f4YjCXQkOuUjYbfCy9cZ0aRR5b641EK5Zpf7sJFmeQCcsTO8agAFMSx4cBIhw/plRiyq3pPSBMXB6i2aNomTmwb7QC9sohrarrR19PswvEpNboZQKYX+3SnvfwLy2ztrNoy+VyNUopn42Xe16Vep/vmHlmuBujRDzDfYnLjSxD0vIvC/W4hiWLrxZybWkty8KsjMwX27WD6s+afX54sjId7h9PFmIQw=="
            }
          */
          await AliyunOss.initWithSecurityToken(preLoadResult.data.security_token, preLoadResult.data.access_key_id,
              preLoadResult.data.access_key_secret, preLoadResult.data.endpoint, configuration);
          const file_upload_list = preLoadResult.data.file_upload_list;
          const file_id_list: string[] = [];
          const aliyun_upload_result: Promise<string>[] = [];
          file_upload_list.forEach((item, fileIndex) => {
              if (item.file_id === '') {
                  reject(new Error('上传图片失败，请稍后重试'));
              }
              file_id_list.push(item.file_id);
              aliyun_upload_result.push(AliyunOss.asyncUpload(preLoadResult.data.bucket_name, item.key, path_list[fileIndex]))
          });
          await Promise.all(aliyun_upload_result);
          const file_id_list_json = JSON.stringify(file_id_list); // "["b42c058ca9ef4c85aa963d37160e1e6e"]"
          const uploadResult = await request.default({
              apiName: 'load_finish_image',
              params: { file_id_list: file_id_list_json }
          });
        /*
        [
        	{
        		 bigimg_height: 640
             bigimg_width: 640
             filename: "1605076696625.PNG"
             large_url: https://phototest.troila.com/b42c058ca9ef4c85aa963d37160e1e6e/1605076696625.PNG
             object_id: "b42c058ca9ef4c85aa963d37160e1e6e"
             object_name: "File"
             size: 46926
             smallimg_height: null
             smallimg_width: null
             thumbnail: ""
             thumbnail_url: https://phototest.troila.com/b42c058ca9ef4c85aa963d37160e1e6e/1605076696625.PNG?width=200
             type: "photo"
        	}
        ]
        */
          const newCameraResult = [...cameraResult] as ImageType[];
          uploadResult.data.forEach((item, resultIndex) => {
              newCameraResult[resultIndex].data = {
                  ...item,
                  file_id: item.object_id,
                  photo_id: item.object_id,
              }
          });
          resolve(newCameraResult);
      } catch (error) {
          if (error.message === 'User cancelled image selection') {
              reject(new Error('图片选择已取消'))
          } else {
              reject(error)
              // reject(new Error('上传图片失败，请稍后重试'))
          }
      }
  });
  
  export default uploadImage
  
  ```

