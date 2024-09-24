import React, {useEffect, useState} from 'react';
import ProductImage from "../components/ProductImage";
import ProductDetails from "./ProductDetails";
import './css/ProductPage.css';
import {useParams} from "react-router-dom";
import axios from "axios";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import {Card, Typography} from "antd";
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
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    const productGetOneUrl = process.env.REACT_APP_PRODUCT_GET_ONE_URL;


    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${apiUrl}${productGetOneUrl}/${productId}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product', error);
            }
        };

        fetchProduct();
    }, [productId, apiUrl, productGetOneUrl]);

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
                        <Paragraph style={{marginTop: '30px', fontFamily: 'PaperlogyBold'}}>
                            {product.description}
                        </Paragraph>
                        <img src={`${process.env.PUBLIC_URL}/${product.imageUrl}`}
                             alt=""
                             style={{width: '60%', marginTop: '39px'}}/>

                    </Tab>
                    <Tab eventKey="profile" title="상품 문의">
                        <ProductQuote productId={product.id}/>
                    </Tab>
                </Tabs>
            </Card>
        </div>
    );
};

export default ProductPage;
