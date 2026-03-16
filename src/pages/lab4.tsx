import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Checkbox, Form, Input, Card, Row, Col, Typography, message, Select, Spin } from "antd";
import axios from "axios";

const { Title } = Typography;

interface Category {
  id: string | number;
  title: string;
}

interface CategoryFormValues {
  title: string;
  description: string;
  active: boolean;
}

interface StoryFormValues {
  title: string;
  author: string;
  image: string;
  description: string;
  categoryId: string | number;
}
export function CategoriesForm() {
  const [form] = Form.useForm();
  const { mutate, isPending } = useMutation({
    mutationFn: async (values: CategoryFormValues) => {
      await axios.post("http://localhost:3000/categories", values);
    },
    onSuccess: () => {
      message.success("Thêm danh mục thành công!");
      form.resetFields();
    },
  });

  return (
    <Card title="📁 Quản lý Danh mục" variant="outlined">
      <Form form={form} layout="vertical" onFinish={mutate} disabled={isPending}>
        <Form.Item label="Tiêu đề" name="title" rules={[{ required: true }]}>
          <Input placeholder="Tên danh mục..." />
        </Form.Item>
        <Form.Item label="Mô tả" name="description">
          <Input.TextArea rows={2} />
        </Form.Item>
        <Form.Item name="active" valuePropName="checked">
          <Checkbox>Kích hoạt</Checkbox>
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={isPending} block>
          Lưu danh mục
        </Button>
      </Form>
    </Card>
  );
}

export function StoryForm() {
  const [form] = Form.useForm();

  const { data: categories, isLoading: isLoadingCats } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axios.get<Category[]>("http://localhost:3000/categories");
      return res.data;
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: async (values: StoryFormValues) => {
      await axios.post("http://localhost:3000/stories", values);
    },
    onSuccess: () => {
      message.success("Thêm câu chuyện thành công!");
      form.resetFields();
    },
  });

  const categoryOptions = categories?.map((cat) => ({
    label: cat.title,
    value: cat.id,
  }));

  return (
    <Card title="📖 Thêm Câu Chuyện Mới" variant="outlined">
      <Form form={form} layout="vertical" onFinish={mutate} disabled={isPending}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Tiêu đề" name="title" rules={[{ required: true }]}>
              <Input placeholder="Tên truyện" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Tác giả" name="author" rules={[{ required: true }]}>
              <Input placeholder="Tên tác giả" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item 
          label="Chọn danh mục" 
          name="categoryId" 
          rules={[{ required: true, message: "Vui lòng chọn danh mục!" }]}
        >
          <Select
            placeholder="-- Chọn một danh mục --"
            loading={isLoadingCats}
            options={categoryOptions}
            allowClear
            notFoundContent={isLoadingCats ? <Spin size="small" /> : "Không có dữ liệu"}
          />
        </Form.Item>

        <Form.Item label="Link hình ảnh (URL)" name="image">
          <Input placeholder="https://example.com/image.jpg" />
        </Form.Item>

        <Form.Item label="Nội dung" name="description">
          <Input.TextArea rows={3} />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={isPending} block>
          Đăng bài viết
        </Button>
      </Form>
    </Card>
  );
}

export const Lab4 = () => (
  <div style={{ padding: "40px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
    <div style={{ maxWidth: "900px", margin: "0 auto" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "30px" }}>
        Hệ Thống Quản Lý
      </Title>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={10}>
          <CategoriesForm />
        </Col>
        <Col xs={24} md={14}>
          <StoryForm />
        </Col>
      </Row>
    </div>
  </div>
);