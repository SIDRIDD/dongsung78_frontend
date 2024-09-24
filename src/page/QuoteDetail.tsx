import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Card, Typography, Space, Button, Avatar, Input, List, message} from 'antd';
import axios from 'axios';
import {UserOutlined} from "@ant-design/icons";
import './css/QuoteDetail.css'
import {useSelector} from "react-redux";
import {RootState} from "../store/store";


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

const QuoteDetail: React.FC = () => {
    const {itemId} = useParams();
    const [data, setData] = useState<DataItem | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const {TextArea} = Input;
    const [comment, setComment] = useState<string>('');
    const [comments, setComments] = useState<Comment[]>([]);
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    const commentPostUrl = process.env.REACT_APP_COMMENT_POST_URL;
    const commentGetUrl = process.env.REACT_APP_COMMENT_GET_URL;
    const commentDeleteUrl = process.env.REACT_APP_COMMENT_DELETE_URL;
    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value);
    };

    const handleSubmit = async () => {
            try {
                if(!isLoggedIn) {
                    message.warning('로그인이 필요합니다.');
                    return;
                }
                const response = await axios.post(`${apiUrl}${commentPostUrl}${itemId}/comments`, {
                        content: comment,
                    }, {
                        withCredentials: true
                    }
                );
                const newComment = response.data;
                setComments([...comments, {
                    id: newComment.id,
                    username: newComment.username,
                    content: newComment.content
                }]);
                setComment('');
                message.success("등록되었습니다.");
                window.location.reload();
            } catch (error) {
                console.error('Failed to submit comment:', error);
                message.error("등록에 실패했습니다.");
            }
    };


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get<DataItem>(`${apiUrl}${commentGetUrl}?contact_id=${itemId}`);
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
    }, [itemId, apiUrl, commentGetUrl]);

    const handleDeleteComment = async (commentId: number) => {
        try {
            await axios.delete(`${apiUrl}${commentDeleteUrl}?commentid=${commentId}`);
            setComments(comments.filter(comment => comment.id !== commentId));
            message.success("댓글이 삭제되었습니다.");
        } catch (error) {
            message.error("댓글 삭제에 실패했습니다.");
        }
    };

    if (loading || !data) {
        return <div>Loading...</div>;
    }

    const userName = sessionStorage.getItem('userName');

    return (
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
                    <Button type="primary" onClick={handleSubmit}>댓글 등록</Button>
                </div>
            </Card>

            <List
                className="comment-list"
                itemLayout="horizontal"
                dataSource={comments}
                renderItem={comment => (
                    <List.Item
                        actions={
                            comment.username === userName ? [
                                <Button
                                    type="link"
                                    danger
                                    style={{ color: 'black' }}
                                    onClick={() => handleDeleteComment(comment.id)}
                                >
                                    x
                                </Button>
                            ] : undefined
                        }
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
