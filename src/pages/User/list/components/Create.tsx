import ProForm, { ProFormText } from '@ant-design/pro-form';
import { message, Modal } from 'antd';
import type { CreateUser } from '@/services/user';
import { createUser } from '@/services/user';

export interface CreateProps {
  isModalVisible: boolean;
  isShowModal: any;
  actionRef: any;
}

const Create: React.FC<CreateProps> = (props) => {
  const { isModalVisible, isShowModal, actionRef } = props;
  const createUserHandler = async (params: CreateUser) => {
    const res = await createUser(params);
    if (res.status === undefined) {
      message.success('添加成功');
      actionRef.current.reload();
      isShowModal();
    }
  };

  return (
    <Modal
      title="新建用户"
      footer={null}
      visible={isModalVisible}
      destroyOnClose={true}
      onCancel={() => isShowModal()}
    >
      <ProForm onFinish={(params: CreateUser) => createUserHandler(params)}>
        <ProFormText
          name="name"
          label="姓名"
          tooltip="最长为 10 位"
          placeholder="请输入名称"
          rules={[
            {
              required: true,
              message: '请输入名称',
            },
          ]}
        />
        <ProFormText
          name="email"
          label="邮箱"
          tooltip="最长为 10 位"
          placeholder="请输入邮箱"
          rules={[
            {
              required: true,
              message: '请输入邮箱',
            },
            {
              type: 'email',
              message: '邮箱格式错误',
            },
          ]}
        />
        <ProFormText.Password
          name="password"
          label="密码"
          tooltip="最长为 10 位"
          placeholder="请输入密码"
          rules={[
            {
              required: true,
              message: '请输入密码',
            },
            {
              min: 6,
              message: '密码最小长度为6位',
            },
          ]}
        />
      </ProForm>
    </Modal>
  );
};

export default Create;
