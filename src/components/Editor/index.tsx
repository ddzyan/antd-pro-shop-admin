import React from 'react';
// 引入编辑器组件
import BraftEditor from 'braft-editor';
import { ContentUtils } from 'braft-utils';
import { UploadOutlined } from '@ant-design/icons';
// 引入编辑器样式
import 'braft-editor/dist/index.css';

import './index.less';

import AliyunOSSUpload from '@/components/AliyunOSSUpload';

export default class EditorDemo extends React.Component {
  state = {
    // 创建一个空的editorState作为初始值
    editorState: BraftEditor.createEditorState(this.props.content || null),
  };

  setUploadUrl = (url: string) => {
    this.setState({
      editorState: ContentUtils.insertMedias(this.state.editorState, [
        {
          type: 'IMAGE',
          url,
        },
      ]),
    });
  };

  uploadHandler = (param) => {
    if (!param.file) {
      return false;
    }
  };

  handleEditorChange = (editorState) => {
    this.setState({ editorState });
    // 需要判断输入的内容，如果有内容则设置输入的内容，如果没有内容则设置为空字符串
    if (!editorState.isEmpty()) {
      const content = editorState.toHTML();
      this.props.setDetails(content);
    } else {
      this.props.setDetails('');
    }
  };

  render() {
    const { editorState } = this.state;
    const extendControls = [
      {
        key: 'oss-uploader',
        type: 'component',
        component: (
          <AliyunOSSUpload accept="image/*" showUploadList={false} setUploadUrl={this.setUploadUrl}>
            <button
              type="button"
              className="control-item button upload-button"
              data-title="插入图片"
            >
              <UploadOutlined /> 插入图片
            </button>
          </AliyunOSSUpload>
        ),
      },
    ];
    return (
      <div className="my-editor">
        <BraftEditor
          extendControls={extendControls}
          value={editorState}
          onChange={this.handleEditorChange}
        />
      </div>
    );
  }
}
