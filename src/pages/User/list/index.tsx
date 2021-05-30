import { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type { ActionType } from '@ant-design/pro-table';
import { Button, Avatar, Switch, message } from 'antd';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import { getUserList, setLock } from '@/services/user';

import CreateOrEdit from './components/CreateOrEdit';

export interface UserListProps {}

const UserList: React.FC<UserListProps> = () => {
  // 可以用来管理 DOM的Ref
  // 每次渲染都返回相同变量的引用
  const actionRef = useRef<ActionType>();
  // 使用 useState 方法 声明一个 state 属性，并且将属性赋值给 isModalVisible , setModalVisible 是修改属性的方法，掺入方法的 false 是这个属性的初始值
  const [isModalVisible, setModalVisible] = useState(false);
  const [editUserId, setEditUserId] = useState(undefined);

  const getData = async (params: {
    current: number;
    pageSize: number;
  }): Promise<{ data: any[]; success: boolean; total: number }> => {
    const result = await getUserList(params);
    return {
      data: result.data,
      success: true,
      total: result.meta.pagination.total,
    };
  };

  // Switch 组件 转换时间监听
  const changeHandler = async (uid: number) => {
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
      render: (_: any, record: any) => <Avatar src={record.avatar_url} icon={<UserOutlined />} />,
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
      dataIndex: 'is_locked', // 匹配的字段
      hideInSearch: true, // 关闭搜索，默认开启
      render: (_: any, record: any) => (
        <Switch
          checkedChildren="启用"
          unCheckedChildren="禁用"
          onChange={() => changeHandler(record.id)}
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
      hideInSearch: true,
      render: (_: any, record: any) => <a onClick={() => isShowModal(record.id)}>编辑</a>, // 如果返回的是数组，这里要写个key
    },
  ];

  return (
    <PageContainer>
      <ProTable
        columns={columns}
        actionRef={actionRef}
        request={getData}
        rowKey="id" // 要用唯一返回值
        search={{
          labelWidth: 'auto',
        }}
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
