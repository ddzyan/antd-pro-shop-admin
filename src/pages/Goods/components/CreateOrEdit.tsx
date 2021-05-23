import { useEffect, useState } from 'react';
import ProForm, { ProFormText, ProFormTextArea, ProFormDigit } from '@ant-design/pro-form';
import { message, Modal, Skeleton, Cascader, Button, Image } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import type { CreateGoods } from '@/services/goods';
import { createGood, getGood, updateGood } from '@/services/goods';
import { getCategory } from '@/services/category';
import AliyunOSSUpload from '@/components/AliyunOSSUpload';
import Editor from '@/components/Editor';

export interface EditProps {
  isModalVisible: boolean;
  isShowModal: any;
  editGoodId: number | undefined;
  actionRef: any;
}

const Edit: React.FC<EditProps> = (props) => {
  const { isModalVisible, isShowModal, actionRef, editGoodId } = props;
  const [initGood, setInitGood]: [any, Function] = useState(undefined);
  const [options, setOptions] = useState([]);
  const [formObj] = ProForm.useForm(); // 定义form实例来操作表单

  useEffect(() => {
    const getCategoryRes = async () => {
      const result = await getCategory();
      if (result.status === undefined) {
        setOptions(result);
      }
    };

    const getGoodRes = async () => {
      const result = await getGood(editGoodId as number);
      if (result.status === undefined) {
        const { pid, id } = result.category;
        const defaultCategory = pid ? [pid, id] : [id];
        setInitGood({ ...result, category_id: defaultCategory });
      }
    };
    if (editGoodId) {
      getGoodRes();
    }

    getCategoryRes();
  }, []);

  const type = editGoodId ? '编辑' : '添加';

  const handlerSubmit = async (params: CreateGoods) => {
    let res;
    if (editGoodId) {
      res = await updateGood(editGoodId, { ...params, category_id: params.category_id[1] });
    } else {
      res = await createGood({ ...params, category_id: params.category_id[1] });
    }

    if (res.status === undefined) {
      message.success(`${type}成功`);
      actionRef.current.reload();
      isShowModal();
    }
  };

  const setCover = (fileKey) =>
    formObj.setFieldsValue({
      cover: fileKey,
    });

  // 通过 props 传递给子属性，用于表单项的赋值
  const setDetails = (content) => {
    return formObj.setFieldsValue({
      details: content,
    });
  };

  return (
    <Modal
      title={`${type}商品`}
      footer={null}
      visible={isModalVisible}
      destroyOnClose={true}
      onCancel={() => isShowModal()}
    >
      {initGood === undefined && editGoodId !== undefined ? (
        <Skeleton paragraph={{ rows: 4 }} active={true} />
      ) : (
        <ProForm
          form={formObj}
          onFinish={(params) => handlerSubmit(params)}
          initialValues={initGood}
        >
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
          <ProFormText hidden={true} name="cover" />
          <ProForm.Item
            name="cover"
            label="商品主图"
            rules={[
              {
                required: true,
                message: '请上传商品主图',
              },
            ]}
          >
            <div>
              <AliyunOSSUpload setCover={setCover} accept="image/*">
                <Button icon={<UploadOutlined />}>上传商品主图</Button>
              </AliyunOSSUpload>
              {initGood === undefined || !initGood.cover_url ? (
                ''
              ) : (
                <div style={{ marginTop: 20 }}>
                  当前图片:
                  <br />
                  <Image src={initGood.cover_url} width={200} />
                </div>
              )}
            </div>
          </ProForm.Item>
          <ProForm.Item
            name="details"
            label="商品详情"
            rules={[
              {
                required: true,
                message: '请输入商品详情',
              },
            ]}
          >
            <Editor
              content={initGood === undefined ? '' : initGood.details}
              setDetails={setDetails}
            />
          </ProForm.Item>
        </ProForm>
      )}
    </Modal>
  );
};

export default Edit;
