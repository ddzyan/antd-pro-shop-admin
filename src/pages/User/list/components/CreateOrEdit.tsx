import { useEffect, useState } from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { message, Modal, Skeleton } from 'antd';
import type { EditUser, CreateUser } from '@/services/user';
import { editUser, getUser, createUser } from '@/services/user';

export interface EditProps {
  isModalVisible: boolean;
  isShowModal: any;
  uid: number | undefined;
  actionRef: any;
}

const Edit: React.FC<EditProps> = (props) => {
  const { isModalVisible, isShowModal, actionRef, uid } = props;
  const [initUser, setInitUser] = useState(undefined);

  useEffect(async () => {
    if (uid) {
      const result = await getUser(uid);
      console.log(result);
      if (result.status === undefined) {
        const { name, email } = result;
        setInitUser({
          name,
          email,
        });
      }
    }
  }, []);
  const type = uid ? '编辑' : '添加';

  const handlerSubmit = async (params: EditUser & CreateUser) => {
    let res;
    if (uid) {
      res = await editUser(uid, params);
    } else {
      res = await createUser(params);
    }
    if (res.status === undefined) {
      message.success(`${type}成功`);
      actionRef.current.reload();
      isShowModal();
    }
  };

  return (
    <Modal
      title={`${type}用户`}
      footer={null}
      visible={isModalVisible}
      destroyOnClose={true}
      onCancel={() => isShowModal()}
    >
      {initUser === undefined && uid !== undefined ? (
        <Skeleton paragraph={{ rows: 4 }} active={true} />
      ) : (
        <ProForm onFinish={(params: EditUser) => handlerSubmit(params)} initialValues={initUser}>
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
          {uid !== undefined ? (
            ''
          ) : (
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
          )}
        </ProForm>
      )}
    </Modal>
  );
};

export default Edit;
