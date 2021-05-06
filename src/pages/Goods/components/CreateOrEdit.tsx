import { useEffect, useState } from 'react';
import ProForm, {
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
  ProFormDigit,
} from '@ant-design/pro-form';
import { message, Modal, Skeleton, Cascader } from 'antd';
import type { EditUser, CreateUser } from '@/services/user';
import { editUser, createUser } from '@/services/user';
import { getCategory } from '@/services/category';

export interface EditProps {
  isModalVisible: boolean;
  isShowModal: any;
  uid: number | undefined;
  actionRef: any;
}

const Edit: React.FC<EditProps> = (props) => {
  const { isModalVisible, isShowModal, actionRef, uid } = props;
  const [options, setOptions] = useState([]);
  const initUser;
  useEffect(async () => {
    const result = await getCategory();
    if (result.status === undefined) {
      setOptions(result);
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
      title={`${type}商品`}
      footer={null}
      visible={isModalVisible}
      destroyOnClose={true}
      onCancel={() => isShowModal()}
    >
      {initUser === undefined && uid !== undefined ? (
        <Skeleton paragraph={{ rows: 4 }} active={true} />
      ) : (
        <ProForm onFinish={(params: EditUser) => handlerSubmit(params)} initialValues={initUser}>
          <ProForm.Item
            name="category_id"
            label="分类"
            rules={[
              {
                required: true,
                message: '请选择分类',
              },
            ]}
          >
            <Cascader
              options={options}
              placeholder="请选择分类"
              fieldNames={{ label: 'name', value: 'id' }}
            />
          </ProForm.Item>

          <ProFormText
            name="title"
            label="商品名"
            placeholder="请输入商品名"
            rules={[
              {
                required: true,
                message: '请输入商品名',
              },
            ]}
          />
          <ProFormTextArea
            name="description"
            label="描述"
            placeholder="请输入描述"
            rules={[
              {
                required: true,
                message: '请输入描述',
              },
            ]}
          />
          <ProFormDigit
            name="price"
            label="价格"
            placeholder="请输入价格"
            min={0}
            max={100000}
            rules={[
              {
                required: true,
                message: '请输入价格',
              },
            ]}
          />
          <ProFormDigit
            name="stock"
            label="库存"
            placeholder="请输入库存"
            rules={[
              {
                required: true,
                message: '请输入库存',
              },
            ]}
          />
          <ProFormUploadButton
            label="上传图片"
            name="upload"
            action="upload.do"
            rules={[
              {
                required: true,
                message: '请选择商品底图',
              },
            ]}
          />
          <ProFormTextArea
            name="details"
            label="详情"
            placeholder="请输入详情"
            rules={[
              {
                required: true,
                message: '请输入详情',
              },
            ]}
          />
        </ProForm>
      )}
    </Modal>
  );
};

export default Edit;
