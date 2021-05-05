import { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Button, Avatar, Switch, message } from 'antd';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import { getUserList, setLock } from '@/services/user';

import CreateOrEdit from './components/CreateOrEdit';

export interface UserListProps {}

interface ActionType {
  reload: (resetPageIndex?: boolean) => void;
}

const UserList: React.FC<UserListProps> = () => {
  const actionRef = useRef<ActionType>();
  const [isModalVisible, setModalVisible] = useState(false);
  const [editUserId, setEditUserId] = useState(undefined);

  const getData = async (params: any) => {
    const result = await getUserList(params);
    return {
      data: result.data,
      success: true,
      total: result.meta.pagination.total,
    };
  };

  const changeLock = async (uid: number) => {
    const result = await setLock(uid);
    if (result.status === undefined) message.success('更新成功');
  };

  const isShowModal = (uid = undefined) => {
    setEditUserId(uid);
    setModalVisible(!isModalVisible);
  };

  const columns: any = [
    {
      title: '头像',
      dataIndex: 'avatar_url',
      hideInSearch: true,
      render: (_, record) => <Avatar src={record.avatar_url} icon={<UserOutlined />} />,
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '是否禁用',
      dataIndex: 'is_locked',
      hideInSearch: true,
      render: (_, record) => (
        <Switch
          checkedChildren="启用"
          unCheckedChildren="禁用"
          onChange={() => changeLock(record.id)}
          defaultChecked={record.is_locked === 0}
        />
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      hideInSearch: true,
    },
    {
      title: '操作',
      render: (_, record) => <a onClick={() => isShowModal(record.id)}>编辑</a>,
    },
  ];

  return (
    <PageContainer>
      <ProTable
        columns={columns}
        actionRef={actionRef}
        request={async (params = {}) => getData(params)}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        /*  form={{
          // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
          syncToUrl: (values, type) => {
            if (type === 'get') {
              return {
                ...values,
                created_at: [values.startTime, values.endTime],
              };
            }
            return values;
          },
        }} */
        pagination={{
          pageSize: 10,
        }}
        dateFormatter="string"
        headerTitle="用户列表"
        toolBarRender={() => [
          <Button key="button" icon={<PlusOutlined />} type="primary" onClick={() => isShowModal()}>
            新建
          </Button>,
        ]}
      />
      {!isModalVisible ? (
        ''
      ) : (
        <CreateOrEdit
          isModalVisible={isModalVisible}
          isShowModal={isShowModal}
          uid={editUserId}
          actionRef={actionRef}
        />
      )}
    </PageContainer>
  );
};

export default UserList;
