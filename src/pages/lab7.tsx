import  { createContext, useContext, useState, } from 'react';
import { ConfigProvider, Layout, Button, Avatar, Space, Typography, theme, Switch } from 'antd';
import { UserOutlined, SunOutlined, MoonOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;
const { Text, Title } = Typography;

interface User {
  name: string;
  avatar: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

interface ThemeContextType {
  isDarkMode: boolean;
  setIsDarkMode: (isDark: boolean) => void;
}


const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  setIsDarkMode: () => {},
});

const AppHeader = () => {
  const { user, setUser } = useContext(UserContext);
  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);

  return (
    <Header style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      background: isDarkMode ? '#001529' : '#fff', 
      borderBottom: '1px solid #f0f0f0',
      padding: '0 20px' 
    }}>
      <div style={{ color: isDarkMode ? '#fff' : '#000', fontWeight: 'bold' }}>LAB 7 - CONTEXT</div>
      
      <Space size="middle">
        <Switch
          checkedChildren={<MoonOutlined />}
          unCheckedChildren={<SunOutlined />}
          checked={isDarkMode}
          onChange={(checked) => setIsDarkMode(checked)}
        />

        {user ? (
          <Space>
            <Avatar src={user.avatar} icon={<UserOutlined />} />
            <Text style={{ color: isDarkMode ? '#fff' : '#000' }}>{user.name}</Text>
            <Button type="link" danger onClick={() => setUser(null)}>Logout</Button>
          </Space>
        ) : (
          <Text style={{ color: isDarkMode ? '#fff' : '#000' }}>Chưa đăng nhập</Text>
        )}
      </Space>
    </Header>
  );
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const handleLogin = () => {
    setUser({
      name: "Truong",
      avatar: "https://i.pinimg.com/736x/a3/87/1d/a3871debe7be6eb996a9296f11a897a9.jpg"
    });
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      <UserContext.Provider value={{ user, setUser }}>
        <ConfigProvider
          theme={{
            algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
          }}
        >
          <Layout style={{ minHeight: '100vh' }}>
            <AppHeader />
            <Content style={{ padding: '50px', textAlign: 'center' }}>
              {!user ? (
                <div style={{ marginTop: 20 }}>
                  <div style={{ marginBottom: 10 }}>
                    <Text>Vui lòng đăng nhập để tiếp tục</Text>
                  </div>
                  <Button type="primary" size="large" onClick={handleLogin}>
                    Login giả lập
                  </Button>
                </div>
              ) : (
                <div style={{ marginTop: 20 }}>
                  <Title level={3}>Chào mừng quay trở lại, {user.name}!</Title>
                  <p>Bạn đang ở chế độ {isDarkMode ? 'Dark Mode' : 'Light Mode'}</p>
                </div>
              )}
            </Content>
          </Layout>
        </ConfigProvider>
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}