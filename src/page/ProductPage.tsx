import React, {useEffect, useState} from 'react';
import ProductImage from "../components/ProductImage";
import ProductDetails from "../components/ProductDetails";
import './css/ProductPage.css';
import {useParams} from "react-router-dom";
import axios from "axios";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import {Button, Card, Typography, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import ProductQuote from "../components/ProductQuote";

const {Paragraph} = Typography;

interface Product {

    id: number;

    name: string;

    description: string;

    price: number;

    stock: number;
    imageUrl: string;

    categoryName: string;

    priority: number;
}

const ProductPage: React.FC = () => {
    const {productId} = useParams<{ productId: string }>();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/product/getone/${productId}`)
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product', error);
            }
        };

        fetchProduct();
    }, [productId]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="product-page-container">
            <div className="product-page">
                <ProductImage imageUrl={product.imageUrl}/>
                <ProductDetails
                    productId={product.id}
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    stock={product.stock}
                    imgUrl={product.imageUrl}
                />
            </div>
            <Card style={{width: '850px'}}>
                <Tabs
                    defaultActiveKey="description"
                    id="fill-tab-example"
                    className="mb-3"
                    fill
                >
                    <Tab eventKey="description" title="상세 설명">
                            <Paragraph style={{ marginTop: '30px', fontFamily: 'PaperlogyBold' }}>
                                {product.description}
                            </Paragraph>
                            <img src={`${process.env.PUBLIC_URL}/${product.imageUrl}`}
                                 style={{width: '60%', marginTop: '39px'}}/>
                    </Tab>
                    <Tab eventKey="profile" title="상품 문의">
                        <ProductQuote productId={product.id}/>
                    </Tab>
                    {/*<Tab eventKey="longer-tab" title="Loooonger Tab">*/}
                    {/*    Tab content for Loooonger Tab*/}
                    {/*</Tab>*/}
                </Tabs>
            </Card>
        </div>
    );
};

export default ProductPage;
