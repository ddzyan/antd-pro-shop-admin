import React from 'react';
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { ossConfig } from '@/services/common';

// https://laravel-book-shop.oss-cn-beijing.aliyuncs.com/

class AliyunOSSUpload extends React.Component {
  state = {
    OSSData: {},
  };

  async componentDidMount() {
    await this.init();
  }

  init = async () => {
    try {
      const OSSData = await ossConfig();
      this.setState({
        OSSData,
      });
    } catch (error) {
      message.error(error);
    }
  };

  onChange = ({ file, fileList }) => {
    /* const { onChange } = this.props;
    console.log('Aliyun OSS:', fileList);
    if (onChange) {
      onChange([...fileList]);
    } */
    const { fromObj } = this.props;
    if (file.status === 'done') {
      this.props.setCover(file.key);
      message.success('上传完成');
    }
  };

  /*  onRemove = (file) => {
    const { value, onChange } = this.props;

    const files = value.filter((v) => v.url !== file.url);

    if (onChange) {
      onChange(files);
    }
  }; */

  getExtraData = (file) => {
    const { OSSData } = this.state;

    return {
      key: file.key,
      OSSAccessKeyId: OSSData.accessid,
      policy: OSSData.policy,
      Signature: OSSData.signature,
    };
  };

  beforeUpload = async (file: any) => {
    const { OSSData } = this.state;
    const expire = OSSData.expire * 1000;

    if (expire < Date.now()) {
      await this.init();
    }
    const dir = 'react/';
    const suffix = file.name.slice(file.name.lastIndexOf('.'));
    const filename = Date.now() + suffix;
    file.key = OSSData.dir + dir + filename; // 用于上传文件存储的文件key
    file.url = OSSData.host + OSSData.dir + dir + filename; // 用于上传完成后的回显

    return file;
  };

  render() {
    const { value, accept = '' } = this.props;
    const props = {
      accept,
      maxCount: 1,
      listType: 'picture',
      name: 'file',
      fileList: value,
      action: this.state.OSSData.host,
      onChange: this.onChange,
      // onRemove: this.onRemove,
      data: this.getExtraData,
      beforeUpload: this.beforeUpload,
    };
    return (
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>{this.props.children}</Button>
      </Upload>
    );
  }
}

export default AliyunOSSUpload;
