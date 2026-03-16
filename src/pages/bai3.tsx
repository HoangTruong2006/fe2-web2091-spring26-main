import { Form, Input, Button, Card, Row, Col } from "antd";

const Bai3 = () => {
  const onFinishForm1 = (values: any) => {
    console.log("Form 1 (Đăng ký):", values);
  };

  const onFinishForm2 = (values: any) => {
    console.log("Form 2 (Thêm sản phẩm):", values);
  };

  return (
    <Row gutter={[16, 16]} style={{ padding: 24 }}>
      <Col xs={24} md={12}>
        <Card title="Đăng ký tài khoản">
          <Form
            onFinish={onFinishForm1}
            layout="vertical"
          >
            <Form.Item
              label="Tên sản phẩm"
              name="name"
              rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
            >
              <Input placeholder="Nhập tên sản phẩm" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Vui lòng nhập email!' },
                { type: 'email', message: 'Email không hợp lệ!' }
              ]}
            >
              <Input placeholder="example@email.com" />
            </Form.Item>

            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[
                { required: true, message: 'Vui lòng nhập số điện thoại!' },
                { pattern: /^[0-9]+$/, message: 'Số điện thoại chỉ được chứa chữ số!' }
              ]}
            >
              <Input placeholder="0123456789" />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[
                { required: true, message: 'Vui lòng nhập mật khẩu!' },
                { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' }
              ]}
            >
              <Input.Password placeholder="••••••••" />
            </Form.Item>

            <Form.Item
              label="Xác nhận mật khẩu"
              name="confirmPassword"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="••••••••" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Đăng ký
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>

      <Col xs={24} md={12}>
        <Card title="Thêm sản phẩm mới">
          <Form
            onFinish={onFinishForm2}
            layout="vertical"
          >
            <Form.Item
              label="Tên sản phẩm"
              name="name"
              rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
            >
              <Input placeholder="Nhập tên sản phẩm" />
            </Form.Item>

            <Form.Item
              label="Giá"
              name="price"
              rules={[
                { required: true, message: 'Vui lòng nhập giá sản phẩm!' },
                { pattern: /^[0-9]+$/, message: 'Giá phải là số!' }
              ]}
            >
              <Input placeholder="100000" />
            </Form.Item>

            <Form.Item
              label="Số lượng"
              name="quantity"
              rules={[
                { required: true, message: 'Vui lòng nhập số lượng!' },
                { pattern: /^[0-9]+$/, message: 'Số lượng phải là số!' }
              ]}
            >
              <Input placeholder="10" />
            </Form.Item>

            <Form.Item
              label="Mô tả"
              name="description"
              rules={[{ required: true, message: 'Vui lòng nhập mô tả sản phẩm!' }]}
            >
              <Input.TextArea rows={4} placeholder="Nhập thông tin mô tả sản phẩm" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Thêm sản phẩm
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Bai3;