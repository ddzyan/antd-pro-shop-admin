import { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Button, Image, message, Space, Switch, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { getSlides, updateSlidesStatus, delSlides } from '@/services/slides';
import CreateOrEdit from './components/CreateOrEdit';

export interface SlideProps {}

interface ActionType {
  reload: (resetPageIndex?: boolean) => void;
  reloadAndRest: () => void;
  reset: () => void;
  clearSelected?: () => void;
  startEditable: (rowKey: any) => boolean;
  cancelEditable: (rowKey: any) => boolean;
}

const Slide: React.FC<SlideProps> = () => {
  const actionRef = useRef<ActionType>();
  const [isModalVisible, setModalVisible] = useState(false);
  const [editSlide, setEditSlide] = useState({});
  const statusHandler = async (slideId: number): Promise<void> => {
    const res = await updateSlidesStatus(slideId);
    if (res.status === undefined) {
      message.success('更新成功');
      actionRef.current?.reload();
    }
  };

  const getData = async (params: any): Promise<any> => {
    const result = await getSlides(params);
    if (result.status === undefined) {
      return {
        data: result.data,
        success: true,
        total: result.meta.pagination.total,
      };
    }

    return {};
  };

  const isShowModal = (slide = {}): void => {
    setEditSlide(slide);
    setModalVisible(!isModalVisible);
  };

  const delHandler = async (slideId: number): Promise<void> => {
    const res = await delSlides(slideId);
    if (res.status === undefined) {
      message.success('删除成功');
      actionRef.current?.reload();
    }
  };

  const columns: any = [
    {
      title: '轮播图片',
      width: 150,
      render: (_, record) => <Image src={record.img_url} />,
    },
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '跳转链接',
      dataIndex: 'url',
    },
    {
      title: '是否禁用',
      dataIndex: 'status',
      render: (_, record: any) => (
        <Switch
          checkedChildren="开启"
          unCheckedChildren="关闭"
          defaultChecked={record.status === 1}
          onChange={() => statusHandler(record.id)}
        />
      ),
    },
    {
      title: '排序',
      dataIndex: 'seq',
      editable: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updated_at',
    },
    {
      title: '操作',
      render: (_: any, record: any) => (
        <Space size="middle">
          <a key="edit" onClick={() => isShowModal(record)}>
            编辑
          </a>
          <Popconfirm key="del" title="确定要删除?" onConfirm={() => delHandler(record.id)}>
            <a>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // TODO 需要增加单元格可编辑
  return (
    <PageContainer>
      <ProTable
        search={false}
        columns={columns}
        actionRef={actionRef}
        request={async (params = {}) => getData(params)}
        rowKey="id"
        pagination={{
          pageSize: 10,
        }}
        dateFormatter="string"
        headerTitle="轮播图列表"
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
          actionRef={actionRef}
          editSlideObj={editSlide}
          isShowModal={isShowModal}
          isModalVisible={isModalVisible}
        />
      )}
    </PageContainer>
  );
};

export default Slide;
