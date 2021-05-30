import ProForm, { ProFormText, ProFormDigit } from '@ant-design/pro-form';
import { message, Modal, Button, Image } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { addSlides, editSlides } from '@/services/slides';
import AliyunOSSUpload from '@/components/AliyunOSSUpload';

export interface EditProps {
  isModalVisible: boolean;
  isShowModal: any;
  editSlideObj: any;
  actionRef: any;
}

const Edit: React.FC<EditProps> = (props) => {
  const { isModalVisible, isShowModal, actionRef, editSlideObj } = props;
  // 定义form实例来操作表单
  const [formObj] = ProForm.useForm();
  const type = editSlideObj.id ? '编辑' : '添加';

  const handlerSubmit = async (params: any) => {
    let res;

    if (editSlideObj.id) {
      res = await editSlides(editSlideObj.id, params);
    } else {
      res = await addSlides(params);
    }

    if (res.status === undefined) {
      message.success(`${type}成功`);
      actionRef.current.reload();
      isShowModal();
    } else {
      message.success(`${type}失败`);
    }
  };

  // 阿里云上传完毕后，给表单上传图片地址赋值
  const setCover = (fileKey: string) =>
    formObj.setFieldsValue({
      img: fileKey,
    });

  return (
    <Modal
      title={`${type}商品`}
      footer={null} // 去除底部按钮
      visible={isModalVisible}
      destroyOnClose={true} // 关闭则销毁组件
      onCancel={isShowModal}
    >
      <ProForm
        form={formObj}
        onFinish={(params) => handlerSubmit(params)}
        initialValues={editSlideObj}
      >
        <ProFormText
          name="title"
          label="标题"
          placeholder="请输入标题"
          rules={[
            {
              required: true,
              message: '请输入标题',
            },
          ]}
        />
        <ProFormText name="url" label="跳转url" placeholder="请输入跳转url" />

        <ProFormDigit name="seq" label="排序" placeholder="请输入排序" />
        <ProFormText hidden={true} name="cover" />
        <ProForm.Item
          name="img"
          label="轮播图"
          rules={[
            {
              required: true,
              message: '请上传轮播图',
            },
          ]}
        >
          <div>
            <AliyunOSSUpload setCover={setCover} accept="image/*">
              <Button icon={<UploadOutlined />}>上传轮播图</Button>
            </AliyunOSSUpload>
            {!editSlideObj.img_url ? (
              ''
            ) : (
              <div style={{ marginTop: 20 }}>
                当前图片:
                <br />
                <Image src={editSlideObj.img_url} width={200} />
              </div>
            )}
          </div>
        </ProForm.Item>
      </ProForm>
    </Modal>
  );
};

export default Edit;
