import { Modal, Card, Image, Divider, Skeleton } from 'antd';

import { getOrderDetail } from '@/services/order';
import { useEffect, useState } from 'react';

const { Meta } = Card;

export interface DetailProps {
  isModalVisible: boolean;
  isShowModal: any;
  orderId: number;
}

const Detail: React.FC<DetailProps> = (props) => {
  const { isModalVisible, isShowModal, orderId } = props;
  const [cardList, setCardList] = useState([]);

  const getDetail = async () => {
    const res = await getOrderDetail(orderId);
    const { orderDetails, goods } = res;
    const cardMap = orderDetails.data.map((item, index) => {
      const { cover_url, title, price } = goods.data[index];
      return (
        <Card bordered={false} key={item.id}>
          <Meta
            avatar={<Image src={cover_url} height={120} width={120} />}
            title={title}
            description={`单价:${price} 数量:${item.num} 总价:${item.price}`}
          />
          <Divider />
        </Card>
      );
    });

    setCardList(cardMap);
  };

  useEffect(() => {
    getDetail();
  }, []);

  return (
    <Modal footer={null} title="商品详情" visible={isModalVisible} onCancel={isShowModal}>
      {cardList.length === 0 ? <Skeleton paragraph={{ rows: 4 }} active={true} /> : cardList}
    </Modal>
  );
};

export default Detail;
