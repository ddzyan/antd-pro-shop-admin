import { useEffect, useState } from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { message, Modal, Skeleton } from 'antd';
import type { EditUser } from '@/services/user';
import { editUser, getUser } from '@/services/user';

export interface EditProps {
  isModalVisibleEdit: boolean;
  isShowModalEdit: any;
  uid: number;
  actionRef: any;
}

const Edit: React.FC<EditProps> = (props) => {
  const { isModalVisibleEdit, isShowModalEdit, actionRef, uid } = props;

  const [initUser, setInitUser] = useState(undefined);

  useEffect(() => {
    const getUserRes = async () => {
      const result = await getUser(uid);
      const { name, email } = result;
      setInitUser({
        name,
        email,
      });
    };
    getUserRes();
  }, []);

  const editUserHandler = async (params: EditUser) => {
    const res = await editUser(uid, params);
    if (res.status === undefined) {
      message.success('更新成功');
      actionRef.current.reload();
      isShowModalEdit();
    }
  };

  return (
    <Modal
      title="编辑用户"
      footer={null}
      visible={isModalVisibleEdit}
      destroyOnClose={true}
      onCancel={() => isShowModalEdit()}
    >
      {initUser !== undefined ? (
        <ProForm onFinish={(params: EditUser) => editUserHandler(params)} initialValues={initUser}>
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
        </ProForm>
      ) : (
        <Skeleton paragraph={{ rows: 4 }} active={true} />
      )}
    </Modal>
  );
};

export default Edit;
