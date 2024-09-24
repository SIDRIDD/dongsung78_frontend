import React, {useState} from 'react';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {LoginForm, ProConfigProvider, ProFormText} from '@ant-design/pro-components';
import {Space, Tabs, message, theme, Button} from 'antd';
import {useDispatch} from 'react-redux';
import {login} from '../store/authSlice';
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';

type LoginType = 'oauth' | 'account';

interface LoginFormValues {
    userName: string;
    password: string;
}

const LoginPage: React.FC = () => {
    const {token} = theme.useToken();
    const [loginType, setLoginType] = useState<LoginType>('account');
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const kakaoResttKey = process.env.REACT_APP_KAKAO_REST_KEY || '';
    const naverClientId = process.env.REACT_APP_NAVER_CLIENT_ID || '';
    const naverRedirectUri = process.env.REACT_APP_NAVER_CALLBACK_URL || '';
    const stateString = process.env.REACT_APP_NAVER_STATE || '';
    const kakaoRedirectUri = process.env.REACT_APP_KAKAO_REDIRECT_URL || '';
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    const userLoginUrl = process.env.REACT_APP_USER_LOGIN_URL;

    const onFinish = async (values: LoginFormValues) => {
        try {
            const response = await axios.post(`${apiUrl}${userLoginUrl}`, values, {withCredentials: true});
            console.log('Login successful:', response.data);

            dispatch(login());
            const previousPath = location.state?.from?.pathname || '/product-grid/1';
            const userName = response.data.userName;
            console.log('userName : ' + response.data.userName);
            sessionStorage.setItem('userName', userName);
            navigate(previousPath);
        } catch (error) {
            message.warning('ID 혹은 비밀번호를 확인해주세요.');
            console.error('Login failed:', error);
        }
    };

    const handleNaverLogin = () => {
        window.location.href = `https://nid.naver.com/oauth2.0/authorize?client_id=${naverClientId}&response_type=code&redirect_uri=${naverRedirectUri}&state=${stateString}&scope=email`;
    };

    const handleKakaoLogin = () => {
        window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoResttKey}&redirect_uri=${kakaoRedirectUri}&response_type=code`
    }

    return (
        <ProConfigProvider hashed={false}>
            <div style={{backgroundColor: token.colorBgContainer}}>
                <LoginForm
                    onFinish={onFinish}
                    submitter={loginType === 'oauth' ? false : {
                        searchConfig: {
                            submitText: '로그인',
                        },
                    }}
                    actions={
                        loginType === 'account' ? (
                            <Space style={{justifyContent: 'center', width: '100%'}}>
                                <Button type="link" onClick={() => navigate('/signup')}>
                                    회원가입
                                </Button>
                            </Space>
                        ) : null
                    }
                >
                    <Tabs
                        centered
                        activeKey={loginType}
                        onChange={(activeKey) => setLoginType(activeKey as LoginType)}
                    >
                        <Tabs.TabPane key={'account'} tab={'로그인'}/>
                        <Tabs.TabPane key={'oauth'} tab={'소셜 로그인'}/>
                    </Tabs>
                    {loginType === 'account' && (
                        <>
                            <ProFormText
                                name="userName"
                                fieldProps={{
                                    size: 'large',
                                    prefix: <UserOutlined className={'prefixIcon'}/>,
                                }}
                                placeholder={'Username'}
                                rules={[{required: true, message: 'Please enter your username!'}]}
                            />
                            <ProFormText.Password
                                name="password"
                                fieldProps={{
                                    size: 'large',
                                    prefix: <LockOutlined className={'prefixIcon'}/>,
                                }}
                                placeholder={'Password'}
                                rules={[{required: true, message: 'Please enter your password!'}]}
                            />
                        </>
                    )}
                    {loginType === 'oauth' && (
                        <>
                            <Space direction="horizontal" style={{
                                width: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBlock: 24
                            }}>
                                <button
                                    onClick={handleKakaoLogin}
                                    style={{
                                        borderStyle: 'none',
                                        backgroundColor: 'white',
                                        width: '190px',
                                        height: '40px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <img
                                        src={`${process.env.PUBLIC_URL}/img/kakao_login.png`}
                                        alt="Naver Login"
                                        style={{
                                            height: '100%',
                                            objectFit: 'contain'
                                        }}
                                    />
                                </button>
                                <button
                                    onClick={handleNaverLogin}
                                    style={{
                                        borderStyle: 'none',
                                        backgroundColor: 'white',
                                        width: '190px',
                                        height: '40px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <img
                                        src={`${process.env.PUBLIC_URL}/img/naver_login.png`}
                                        alt="Naver Login"
                                        style={{
                                            height: '100%',
                                            objectFit: 'contain'
                                        }}
                                    />
                                </button>
                            </Space>
                        </>
                    )}
                    {/*{loginType !== 'oauth' && (*/}
                    {/*    <div style={{marginBlockEnd: 24}}>*/}
                    {/*        <ProFormCheckbox noStyle name="autoLogin">*/}
                    {/*            자동 로그인*/}
                    {/*        </ProFormCheckbox>*/}
                    {/*        <a style={{float: 'right'}}>비밀번호 찾기</a>*/}
                    {/*    </div>*/}
                    {/*)}*/}
                </LoginForm>
            </div>
        </ProConfigProvider>
    );
};

export default LoginPage;
