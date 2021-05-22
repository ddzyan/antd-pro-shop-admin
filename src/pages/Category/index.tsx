import React, { useEffect, useState } from 'react';
import { Table, Button, Switch, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { getCategory, updateCategoryStatus } from '@/services/category';
import CreateOrEdit from './components/CreateOrEdit';

export interface CategoryProps {}

const Category: React.FC<CategoryProps> = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [editCategoryObj, setEditCategoryObj]: [any, Function] = useState({});

  const getData = async (): Promise<void> => {
    const res = await getCategory({ type: 'all' });
    setCategoryList(res);
  };

  useEffect(() => {
    getData();
  }, []);

  const isShowModal = (record: any | undefined = {}) => {
    const { id, pid, name } = record;
    setEditCategoryObj({ id, pid, name });
    setModalVisible(!isModalVisible);
  };

  const createHandler = () => {
    isShowModal();
  };

  const statusHandler = async (categoryId: number) => {
    const res = await updateCategoryStatus(categoryId);

    if (res.status === undefined) {
      message.success('更新成功');
      getData();
    } else {
      message.error('更新失败');
    }
  };

  const columns = [
    { title: '分类名称', dataIndex: 'name', key: 'name' },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => {
        return (
          <Switch
            checkedChildren="开启"
            unCheckedChildren="关闭"
            defaultChecked={record.status === 1}
            onChange={() => statusHandler(record.id)}
          />
        );
      },
    },
    {
      title: '操作',
      dataIndex: '',
      key: 'x',
      render: (_, record) => <a onClick={() => isShowModal(record)}>编辑</a>,
    },
  ];

  // TODO 开关失败的时候，状态显示错误，需要优化 Switch 组件 Change事件
  return (
    <PageContainer>
      <Button type="primary" style={{ marginBottom: 10 }} onClick={createHandler}>
        添加分类
      </Button>
      <Table rowKey="id" columns={columns} dataSource={categoryList} />
      {!isModalVisible ? (
        ''
      ) : (
        <CreateOrEdit
          editCategoryObj={editCategoryObj}
          isModalVisible={isModalVisible}
          isShowModal={isShowModal}
          getData={getData}
        />
      )}
    </PageContainer>
  );
};

export default Category;
