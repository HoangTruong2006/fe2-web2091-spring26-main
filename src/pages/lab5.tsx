import {Table ,Image, Spin, message, Button} from "antd";
import { useMutation, useQuery,useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const storyList =()=> {
    const {data, isLoading, isError} = useQuery({
        queryKey: ["stories"],
        queryFn: async()=>{
            const res = await axios.get("http://localhost:3000/stories");
            return res.data;
        }
        
    });
 const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`http://localhost:3000/stories/${id}`);
    },
    onSuccess: () => {
      message.success("Xóa truyện thành công!");
      queryClient.invalidateQueries({ queryKey: ["stories"] }); 
    },
    onError: () => {
      message.error("Xóa truyện thất bại!");
    },
  });
    const queryClient = useQueryClient();
    const columns = [
       {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      render: (url: string) => <Image src={url} width={60} />,
    },
    {
      title: "Tên truyện",
      dataIndex: "title",
    },
    {
      title: "Tác giả",
      dataIndex: "author",
    },
    {
        title:"Ngày tạo",
        dataIndex:"createdAt",
        render:(date:string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
    },
    {
        title: "Hành động",
        dataIndex: "Action",
        render: (_: any, record: any) =>
             <Button danger onClick={() => deleteMutation.mutate(record.id)}>
               Xóa
             </Button>,
    }
  ];
 
  if (isLoading) return <Spin />;
  if (isError) return <div>Đã có lỗi xảy ra</div>;
    return <Table columns={columns} dataSource={data} />;

}
export default storyList;
