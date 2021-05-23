import { message, Modal } from 'antd';
import ProForm, { ProFormText, ProFormSelect } from '@ant-design/pro-form';
import { postOrder } from '@/services/order';

export interface PostProps {
  isModalVisible: boolean;
  isShowModal: any;
  actionRef: any;
  orderId: number;
}

const Post: React.FC<PostProps> = (props) => {
  const { isModalVisible, isShowModal, orderId, actionRef } = props;
  const [formObj] = ProForm.useForm(); // 定义form实例来操作表单

  const handlerSubmit = async (params: any) => {
    const res = await postOrder(orderId, params);
    if (res.status === undefined) {
      message.success('发货成功');
      isShowModal();
      actionRef.current.reload();
    } else {
      message.error('发货失败');
    }
  };
  return (
    <Modal footer={null} title="发货" visible={isModalVisible} onCancel={isShowModal}>
      <ProForm form={formObj} onFinish={(params) => handlerSubmit(params)}>
        <ProFormSelect
          name="express_type"
          label="快递类型"
          placeholder="请选择快递类型"
          valueEnum={{
            SF: '顺丰',
            YTO: '圆通',
            YD: '韵达',
          }}
          rules={[
            {
              required: true,
              message: '请选择快递类型',
            },
          ]}
        />

        <ProFormText
          name="express_no"
          label="快递单号"
          placeholder="请输入快递单号"
          rules={[
            {
              required: true,
              message: '请输入快递单号',
            },
          ]}
        />
      </ProForm>
    </Modal>
  );
};

export default Post;
