import { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type { ActionType } from '@ant-design/pro-table';
import { Button, Image, Switch, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getGoods, setOn, setRecommend } from '@/services/goods';

import CreateOrEdit from './components/CreateOrEdit';
import CardList from './components/CardList';

export interface UserListProps {}

const UserList: React.FC<UserListProps> = () => {
  const actionRef = useRef<ActionType>();
  const [isModalVisible, setModalVisible] = useState(false);
  const [editUserId, setEditUserId] = useState(undefined);

  const getData = async (params: any) => {
    const result = await getGoods(params);
    return {
      data: result.data,
      success: true,
      total: result.meta.pagination.total,
    };
  };

  const changeOn = async (goodId: number) => {
    const result = await setOn(goodId);
    if (result.status === undefined) message.success('更新成功');
  };

  const changeRecommend = async (goodId: number) => {
    const result = await setRecommend(goodId);
    if (result.status === undefined) message.success('更新成功');
  };

  const isShowModal = (uid = undefined) => {
    setEditUserId(uid);
    setModalVisible(!isModalVisible);
  };

  const columns: any = [
    {
      title: '商品图',
      dataIndex: 'avatar_url',
      hideInSearch: true,
      render: (_, record) => <Image width={100} src={record.cover_url} placeholder={true} />,
    },
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '价格',
      hideInSearch: true,
      dataIndex: 'price',
    },
    {
      title: '库存',
      hideInSearch: true,
      dataIndex: 'stock',
    },
    {
      title: '销量',
      hideInSearch: true,
      dataIndex: 'sales',
    },
    {
      title: '是否上架',
      dataIndex: 'is_on',
      render: (_, record) => (
        <Switch
          checkedChildren="已上架"
          unCheckedChildren="未上架"
          onChange={() => changeOn(record.id)}
          defaultChecked={record.is_on === 1}
        />
      ),
      valueType: 'radioButton',
      valueEnum: {
        1: { text: '已上架' },
        0: { text: '未上架' },
      },
    },
    {
      title: '是否推荐',
      dataIndex: 'is_recommend',
      render: (_, record) => (
        <Switch
          checkedChildren="已推荐"
          unCheckedChildren="未推荐"
          onChange={() => changeRecommend(record.id)}
          defaultChecked={record.is_recommend === 1}
        />
      ),
      valueType: 'radioButton',
      valueEnum: {
        1: { text: '已推荐' },
        0: { text: '未推荐' },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      hideInSearch: true,
    },
    {
      title: '操作',
      hideInSearch: true,
      render: (_: any, record: any) => <a onClick={() => isShowModal(record.id)}>编辑</a>,
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
