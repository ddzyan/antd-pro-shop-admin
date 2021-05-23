import { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Tag, Space } from 'antd';

import Detail from './components/Detail';
import Post from './components/Post';
import { getOrders } from '@/services/order';

interface ActionType {
  reload: (resetPageIndex?: boolean) => void;
  reloadAndRest: () => void;
  reset: () => void;
  clearSelected?: () => void;
  startEditable: (rowKey: any) => boolean;
  cancelEditable: (rowKey: any) => boolean;
}

export interface OrderProps {}

const OrderStatusText = ['', '下单', '支付', '发货', '收货', '过期'];

const OrderStatusColor = ['', 'magenta', 'red', 'volcano', 'orange', 'gold'];

const Order: React.FC<OrderProps> = () => {
  const actionRef = useRef<ActionType>();
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [isPostModalVisible, setIsPostModalVisible] = useState(false);
  const [orderId, setOrderId] = useState(0);
  const [postOrderId, setPostOrderId] = useState(0);

  const isDetailShowModal = (orderDetailId = 0) => {
    setOrderId(orderDetailId);
    setIsDetailModalVisible(!isDetailModalVisible);
  };

  const isPostShowModal = (orderDetailId = 0) => {
    setPostOrderId(orderDetailId);
    setIsPostModalVisible(!isPostModalVisible);
  };

  const columns: any = [
    {
      title: '单号',
      dataIndex: 'order_no',
    },
    {
      title: '用户',
      hideInSearch: true,
      render: (_, record: any) => record.user.name,
    },
    {
      title: '金额',
      dataIndex: 'amount',
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        1: { text: '下单' },
        2: { text: '支付' },
        3: { text: '发货' },
        4: { text: '收货' },
        5: { text: '过期' },
      },
      render: (_, record: any) => (
        <Tag color={OrderStatusColor[record.status]}>{OrderStatusText[record.status]}</Tag>
      ),
    },
    {
      title: '支付时间',
      hideInSearch: true,
      dataIndex: 'pay_time',
    },
    {
      title: '支付类型',
      hideInSearch: true,
      dataIndex: 'pay_type',
    },
    {
      title: '支付单号',
      dataIndex: 'trade_no',
    },
    {
      title: '操作',
      hideInSearch: true,
      render: (_: any, record: any) => (
        <Space size="middle">
          <a key="detail" onClick={() => isDetailShowModal(record.id)}>
            详情
          </a>
          {record.status !== 2 ? (
            ''
          ) : (
            <a key="delivery" onClick={() => isPostShowModal(record.id)}>
              发货
            </a>
          )}
        </Space>
      ),
    },
  ];

  const getData = async (params: any): Promise<any> => {
    const result = await getOrders(params);
    if (result.status === undefined) {
      return {
        data: result.data,
        success: true,
        total: result.meta.pagination.total,
      };
    }

    return {};
  };

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
      />
      {!isDetailModalVisible ? (
        ''
      ) : (
        <Detail
          orderId={orderId}
          isShowModal={isDetailShowModal}
          isModalVisible={isDetailModalVisible}
        />
      )}
      {!isPostModalVisible ? (
        ''
      ) : (
        <Post
          actionRef={actionRef}
          orderId={postOrderId}
          isModalVisible={isPostModalVisible}
          isShowModal={isPostShowModal}
        />
      )}
    </PageContainer>
  );
};

export default Order;
