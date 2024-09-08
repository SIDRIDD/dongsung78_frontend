import React, {useState, useEffect} from 'react';
import {useParams, useLocation} from 'react-router-dom';
import {Card, Typography, Space, theme, Avatar, Input, message} from 'antd';
import axios from 'axios';
import {

    UserOutlined
} from "@ant-design/icons";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";

const {Title, Text, Paragraph} = Typography;

interface DataItem {
    constructionId: number;

    title: string;
    categoryName: string;

    companyName: string;

    insertDate: string;

    userName: string;

    details: Detail[];

}
interface Detail{
    companyDetail: string;

    companyDescription: string;

    img_url: string;
}


const QuoteDetail: React.FC = () => {
    const {id} = useParams();
    const [data, setData] = useState<DataItem | null>(( null));
    const [loading, setLoading] = useState<boolean>(false);
    const {TextArea} = Input;
    const [comment, setComment] = useState<string>('');
    const [fileList, setFileList] = useState<any[]>([]);
    const [comments, setComments] = useState<Comment[]>([]);
    const {token} = theme.useToken();
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();


    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value);
    };

    const handleUploadChange = ({fileList}: any) => {
        setFileList(fileList);
    };

    // const handleSubmit = async () => {
    //     try {
    //         if(!isLoggedIn) {
    //             message.warning('로그인이 필요합니다.');
    //             return;
    //         }
    //
    //         console.log('JWT Token: ', isLoggedIn)
    //         const response = await axios.post(`http://localhost:8080/api/contact/get/${itemId}/comments`, {
    //                 content: comment,
    //             }, {
    //                 withCredentials: true
    //             }
    //         );
    //         const newComment = response.data;
    //         setComments([...comments, {
    //             id: newComment.id,
    //             username: newComment.username, // newComment.user.username에서 수정
    //             content: newComment.content
    //         }]);
    //         setComment('');
    //         setFileList([]);
    //         message.success("등록되었습니다.");
    //     } catch (error) {
    //         console.error('Failed to submit comment:', error);
    //         message.error("등록에 실패했습니다.");
    //     }
    // };


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get<DataItem>(`http://localhost:8080/api/construction/get-one?id=${id}`);
                setData(response.data);
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
                {data.details.map((detail, index) => (
                    <div key={index} style={{ marginTop: '20px', textAlign: 'left' }}>
                        <Paragraph>
                            {detail.companyDetail} - {detail.companyDescription}
                        </Paragraph>
                        <img src={`${process.env.PUBLIC_URL}/${detail.img_url}`} alt={detail.companyDescription} style={{ width: '100%', marginTop: '10px' }} />
                    </div>
                ))}
                <div className="post-reactions">
                    <Space size="middle">
                        {/*<Space>*/}
                        {/*    <LikeOutlined/>*/}
                        {/*    <Text>좋아요 3</Text>*/}
                        {/*</Space>*/}
                        {/*<Space>*/}
                        {/*    <SmileOutlined/>*/}
                        {/*    <Text>재밌어요 0</Text>*/}
                        {/*</Space>*/}
                        {/*<Space>*/}
                        {/*    <BulbOutlined/>*/}
                        {/*    <Text>도움돼요 2</Text>*/}
                        {/*</Space>*/}
                        {/*<Space>*/}
                        {/*    <FrownOutlined/>*/}
                        {/*    <Text>힘내요 0</Text>*/}
                        {/*</Space>*/}
                    </Space>
                </div>
            </Card>
            {/*<Card className="comment-container">*/}
            {/*    <TextArea*/}
            {/*        value={comment}*/}
            {/*        onChange={handleCommentChange}*/}
            {/*        placeholder="“댓글 작성"*/}
            {/*        autoSize={{minRows: 3, maxRows: 5}}*/}
            {/*    />*/}
            {/*</Card>*/}
        </div>

    );
};

export default QuoteDetail;
