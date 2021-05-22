import ProForm, { ProFormText, ProFormSelect } from '@ant-design/pro-form';
import { message, Modal } from 'antd';

import { getCategory, editCategory, addCategory } from '@/services/category';

export interface EditProps {
  isModalVisible: boolean;
  isShowModal: any;
  editCategoryObj: any | undefined;
  getData: any;
}

const Edit: React.FC<EditProps> = (props) => {
  const { isModalVisible, isShowModal, getData, editCategoryObj } = props;
  const [formObj] = ProForm.useForm(); // 定义form实例来操作表单

  const type = editCategoryObj ? '编辑' : '添加';

  const handlerSubmit = async (params: any) => {
    let res;

    if (editCategoryObj.id) {
      res = await editCategory(editCategoryObj.id, params);
    } else {
      res = await addCategory(params);
    }

    if (res.status === undefined) {
      message.success(`${type}成功`);
      isShowModal();
      getData();
    } else {
      message.error(`${type}失败`);
    }
  };

  const getCategoryHandler = async () => {
    const res = await getCategory();
    const categoryDate: [] = res.map((item: any) => {
      return {
        label: item.name,
        value: item.id,
      };
    });
    return [
      {
        label: '顶级分类',
        value: 0,
      },
    ].concat(categoryDate);
  };

  return (
    <Modal
      title={`${type}分类`}
      footer={null}
      visible={isModalVisible}
      destroyOnClose={true}
      onCancel={() => isShowModal()}
    >
      <ProForm
        form={formObj}
        onFinish={(params) => handlerSubmit(params)}
        initialValues={editCategoryObj}
      >
        {editCategoryObj.pid === 0 ? (
          ''
        ) : (
          <ProFormSelect
            name="pid"
            label="父级分类"
            placeholder="请选择父级分类"
            request={async () => getCategoryHandler()}
            rules={[
              {
                required: true,
                message: '请选择分类',
              },
            ]}
          />
        )}

        <ProFormText
          name="name"
          label="分类名称"
          placeholder="请输入分类名称"
          rules={[
            {
              required: true,
              message: '请选择分类',
            },
          ]}
        />
      </ProForm>
    </Modal>
  );
};

export default Edit;
