import React, {useState, useEffect} from 'react';
import Cookies from 'js-cookie';
import {useParams} from 'react-router-dom';
import {Card, Typography, Space, Button, Layout, Breadcrumb, theme, Avatar, Input, Upload, List, message} from 'antd';
import axios from 'axios';
import {Modal} from 'react-bootstrap';
import {
    BulbOutlined,
    FrownOutlined,
    LikeOutlined,
    SmileOutlined,
    UploadOutlined,
    UserOutlined
} from "@ant-design/icons";
import './css/QuoteDetail.css'
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import {sensitiveHeaders} from "http2";
import {Cookie} from "@mui/icons-material";

const {Title, Text, Paragraph} = Typography;

interface DataItem {
    id: number;
    title: string;
    description: string;
    userName: string;
    status: string;
    comments: Comment[];
}

interface Comment {
    id: number;
    username: string;
    content: string;
}

interface RefreshComment {
    id: number;
    username: string;
    content: string;
}

const QuoteDetail: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const [data, setData] = useState<DataItem | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const {TextArea} = Input;
    const [comment, setComment] = useState<string>('');
    const [fileList, setFileList] = useState<any[]>([]);
    const [comments, setComments] = useState<Comment[]>([]);
    const {token} = theme.useToken();

    const userName = useSelector((state: RootState) => state.auth.user?.userName);


    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();


    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value);
    };

    const handleUploadChange = ({fileList}: any) => {
        setFileList(fileList);
    };

    const handleSubmit = async () => {
        try {
            const authToken = Cookies.get('token');
            console.log('submitting comment : ', {content: comment, userName: userName})
            console.log('JWT Token: ', authToken)
            const response = await axios.post(`http://localhost:8080/api/contact/get/${id}/comments`, {
                    content: comment,
                    userName: userName // 여기에 실제 사용자 이름을 입력합니다.
                }, {
                    withCredentials: true
                    // } headers: {
                    //         'Authorization': `Bearer ${authToken}`
                    //     }
                }
            );
            const newComment = response.data;
            console.log('response 확인: ', newComment)
            setComments([...comments, {
                id: newComment.id,
                username: newComment.username, // newComment.user.username에서 수정
                content: newComment.content
            }]);
            setComment('');
            setFileList([]);
            message.success("등록되었습니다.");
        } catch (error) {
            console.error('Failed to submit comment:', error);
            message.error("등록에 실패했습니다.");
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get<DataItem>(`http://localhost:8080/api/contact/get/${id}`);
                setData(response.data);
                setComments(response.data.comments.map((comment: any) => ({
                    id: comment.id,
                    username: comment.username,
                    content: comment.content
                })));
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
            setLoading(false);
        };
        fetchData();
    }, [id]);

    if (loading || !data) {
        return <div>Loading...</div>;
    }


    return (
        // <div
        //     className="modal show"
        //     style={{ display: 'block', position: 'initial', marginTop: '150px'}}
        // >
        //     <Modal.Dialog>
        //         <Modal.Header>
        //             <Modal.Title>{data.title}</Modal.Title>
        //         </Modal.Header>
        //
        //         <Modal.Body>
        //             <p>{data.description}</p>
        //         </Modal.Body>
        //
        //         {/*<Modal.Footer>*/}
        //         {/*    <Button variant="secondary">Close</Button>*/}
        //         {/*    <Button variant="primary">Save changes</Button>*/}
        //         {/*</Modal.Footer>*/}
        //     </Modal.Dialog>
        // </div>

        <div>
            <Card className="post-container">
                <Title level={3} className="post-title">{data.title}</Title>
                <Space direction="vertical" size="middle" className="post-header">
                    <Space align="center">
                        <Avatar size="large" icon={<UserOutlined/>}/>
                        <div>
                            <Text className="post-id">{data.userName}</Text>
                            <Text className="post-date">7일 전</Text>
                        </div>
                    </Space>
                </Space>
                <Paragraph style={{marginTop: '20px', textAlign: 'left'}}>
                    {data.description}
                </Paragraph>
                <div className="post-reactions">
                    <Space size="middle">
                        <Space>
                            <LikeOutlined/>
                            <Text>좋아요 3</Text>
                        </Space>
                        <Space>
                            <SmileOutlined/>
                            <Text>재밌어요 0</Text>
                        </Space>
                        <Space>
                            <BulbOutlined/>
                            <Text>도움돼요 2</Text>
                        </Space>
                        <Space>
                            <FrownOutlined/>
                            <Text>힘내요 0</Text>
                        </Space>
                    </Space>
                </div>
            </Card>
            <Card className="comment-container">
                <TextArea
                    value={comment}
                    onChange={handleCommentChange}
                    placeholder="“댓글 작성"
                    autoSize={{minRows: 3, maxRows: 5}}
                />
                <div className="comment-footer">
                    <Upload
                        fileList={fileList}
                        onChange={handleUploadChange}
                        beforeUpload={() => false}
                        maxCount={1}
                        accept=".jpg,.png,.gif"
                    >
                        <Button icon={<UploadOutlined/>}>이미지첨부</Button>
                    </Upload>
                    <span className="file-info">최대 1개 (jpg, png, gif만 가능)</span>
                    <span className="char-count">{comment.length}/1000자</span>
                    <Button type="primary" onClick={handleSubmit}>댓글 등록</Button>
                </div>
            </Card>

            <List
                className="comment-list"
                itemLayout="horizontal"
                dataSource={comments}
                renderItem={comment => (
                    <List.Item
                        // actions={[<span key="comment-list-reply-to-0">대댓글달기</span>]}
                    >
                        <List.Item.Meta
                            avatar={<Avatar icon={<UserOutlined/>}/>}
                            title={<Text className="comment-username">{comment.username}</Text>}
                            description={<Text className="comment-content">{comment.content}</Text>}
                        />
                    </List.Item>
                )}
            />
        </div>

    );
};

export default QuoteDetail;
