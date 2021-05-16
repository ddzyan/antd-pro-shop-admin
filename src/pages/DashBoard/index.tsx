import { useEffect, useState } from 'react';
import { Statistic, Card, Row, Col } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { getDashBoard } from '@/services/dashboard';

export interface DashBoardProps {}

const DashBoard: React.FC<DashBoardProps> = () => {
  const [countList, setCountList] = useState({
    goods_count: 0,
    order_count: 0,
    users_count: 0,
  });

  useEffect(() => {
    const getData = async () => {
      const res = await getDashBoard();
      setCountList(res);
    };
    getData();
  }, []);

  return (
    <PageContainer className="site-statistic-demo-card">
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title="用户数量"
              value={countList.users_count}
              precision={0}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="商品数量"
              value={countList.goods_count}
              precision={0}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="订单数量"
              value={countList.order_count}
              precision={0}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default DashBoard;
