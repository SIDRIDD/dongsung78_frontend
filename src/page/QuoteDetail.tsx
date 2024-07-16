import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Typography, Space, Button } from 'antd';
import axios from 'axios';
import { Modal } from 'react-bootstrap';

const { Title, Paragraph } = Typography;

interface DataItem {
    id: number;
    title: string;
    description: string;
    userId: string;
    status: string;
}

const QuoteDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [data, setData] = useState<DataItem | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get<DataItem>(`http://localhost:8080/api/contact/get/${id}`);
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
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial', marginTop: '150px'}}
        >
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>{data.title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>{data.description}</p>
                </Modal.Body>

                {/*<Modal.Footer>*/}
                {/*    <Button variant="secondary">Close</Button>*/}
                {/*    <Button variant="primary">Save changes</Button>*/}
                {/*</Modal.Footer>*/}
            </Modal.Dialog>
        </div>
    );
};

export default QuoteDetail;
