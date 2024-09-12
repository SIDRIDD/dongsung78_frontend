import React, {CSSProperties, useEffect, useState} from 'react';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {LoginForm, ProConfigProvider, ProFormCheckbox, ProFormText, setAlpha} from '@ant-design/pro-components';
import {Space, Tabs, message, theme, Button} from 'antd';
import {GoogleLogin, CredentialResponse} from '@react-oauth/google';
import KakaoLogin from 'react-kakao-login';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../store/authSlice';
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {RootState} from "../store/store";

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

    const handleOAuthLogin = async (provider: string, code: string) => {
        let redirectUri = '';
        if (provider === 'naver') {
            redirectUri = naverRedirectUri;
        } else if (provider === 'kakao') {
            redirectUri = kakaoRedirectUri;  // Kakao용 redirect URI를 설정
        }
        try {
            console.log('Login.tsx 의 provider');
            const response = await axios.post(`http://localhost:8080/api/oauth/${provider}`, {
                    code: code,
                    provider: provider,
                    redirectUri: redirectUri
                }
            )
            const userName = response.data.userName;
            console.log('Login successful:', response.data);
            sessionStorage.setItem('userName', userName);
            dispatch(login());

            // const {token} = response.data;
            // dispatch(login(token));
            //
            // message.success('Login Successful');
            // navigate('/');
        } catch (error) {
            console.error('OAuth Login Failed:', error);
            message.error('OAuth Login Failed');
        }
    };

    const onFinish = async (values: LoginFormValues) => {
        try {
            const response = await axios.post('http://localhost:8080/api/user/login', values, {withCredentials: true});
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

    const handleKakaoSuccess = (response: any) => {
        const accessToken = response.response.access_token;
        // if (accessToken) {
        //     handleOAuthLogin('kakao', accessToken);
        // }
    };

    const handleKakaoFailure = (error: any) => {
        console.log('Kakao Login Failed:', error);
        message.error('Kakao Login Failed');
    };

    // useEffect(() => {
    //     const urlParams = new URLSearchParams(window.location.search);
    //     const code = urlParams.get('code');
    //     const state = urlParams.get('state');
    //
    //     // 로그 추가
    //     console.log(`code: ${code}, state: ${state}`);
    //
    //     if (code && state === stateString) {
    //         handleOAuthLogin('naver', code);
    //     }
    // }, [navigate]);

    const iconStyles: CSSProperties = {
        marginInlineStart: '16px',
        color: setAlpha(token.colorTextBase, 0.2),
        fontSize: '24px',
        verticalAlign: 'middle',
        cursor: 'pointer',
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
                {/*<LoginForm*/}
                {/*    onFinish={onFinish}*/}
                {/*    submitter={loginType === 'oauth' ? false : {*/}
                {/*        searchConfig: {*/}
                {/*            submitText: '로그인',*/}
                {/*        },*/}
                {/*    }}*/}
                {/*    actions={<Space></Space>}*/}
                {/*>*/}
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
                        ) : null  // OAuth 로그인 타입일 때 회원가입 버튼을 숨깁니다.
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
                                {/*<KakaoLogin*/}
                                {/*    token={kakaoResttKey}*/}
                                {/*    onSuccess={handleKakaoSuccess}*/}
                                {/*    onFail={handleKakaoFailure}*/}
                                {/*    onLogout={() => console.log('Kakao Logout')}*/}
                                {/*    render={({onClick}) => (*/}
                                {/*        <button*/}
                                {/*            type="button"*/}
                                {/*            onClick={onClick}*/}
                                {/*            style={{*/}
                                {/*                borderStyle: 'none',*/}
                                {/*                backgroundColor: 'white',*/}
                                {/*                width: '190px',  // 구글, 카카오와 비슷한 너비*/}
                                {/*                height: '40px',  // 구글, 카카오와 비슷한 높이*/}
                                {/*                display: 'flex',*/}
                                {/*                alignItems: 'center',*/}
                                {/*                justifyContent: 'center',*/}
                                {/*                marginBottom: '10px',  // 버튼 간격 추가*/}
                                {/*                marginTop: '10px',*/}
                                {/*                marginLeft: '20px'*/}
                                {/*            }}*/}
                                {/*        >*/}
                                {/*            <img*/}
                                {/*                src={`${process.env.PUBLIC_URL}/img/kakao_login.png`}*/}
                                {/*                alt="Kakao Login"*/}
                                {/*                style={{height: '100%',*/}
                                {/*                    objectFit: 'contain'}}  // 이미지 높이를 버튼 높이에 맞춤*/}
                                {/*            />*/}
                                {/*        </button>*/}
                                {/*    )}*/}
                                {/*/>*/}
                                <button
                                    onClick={handleKakaoLogin}
                                    style={{
                                        borderStyle: 'none',
                                        backgroundColor: 'white',
                                        width: '190px',  // 구글, 카카오와 비슷한 너비
                                        height: '40px',  // 구글, 카카오와 비슷한 높이
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
                                        }}  // 이미지 높이를 버튼 높이에 맞춤
                                    />
                                </button>
                                <button
                                    onClick={handleNaverLogin}
                                    style={{
                                        borderStyle: 'none',
                                        backgroundColor: 'white',
                                        width: '190px',  // 구글, 카카오와 비슷한 너비
                                        height: '40px',  // 구글, 카카오와 비슷한 높이
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
                                        }}  // 이미지 높이를 버튼 높이에 맞춤
                                    />
                                </button>
                            </Space>
                        </>
                    )}
                    {loginType !== 'oauth' && (
                        <div style={{marginBlockEnd: 24}}>
                            <ProFormCheckbox noStyle name="autoLogin">
                                자동 로그인
                            </ProFormCheckbox>
                            <a style={{float: 'right'}}>비밀번호 찾기</a>
                        </div>
                    )}
                </LoginForm>
            </div>
        </ProConfigProvider>
    );
};

export default LoginPage;
