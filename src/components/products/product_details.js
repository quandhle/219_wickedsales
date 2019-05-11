import React, {Component} from 'react';
import axios from 'axios';
import ProductCarousel from './product_carousel';
import MiscDetails from './misc_details';
import {formatMoney} from '../../helpers';
import ProductAdd from './product_add';

class ProductDetails extends Component {
    state = {
        details: null
    };

    componentDidMount () {
        this.getDetails();
    }

    async getDetails () {
        const {params} = this.props.match;

        const resp = await axios.get(`/api/getproductdetails.php?productId=${params.product_id}`)

        console.log(resp);

        if (resp.data.success) {
            this.setState({
                details: resp.data.productInfo
            })
        } else {
            this.setState({
                details: false
            })
        }
    }

    render () {
        const {details} = this.state;
        const {match: {params}, updateCart} = this.props;

        if (details === null) {
            return <h1>Loading...</h1>
        } else if (!details) {
            return <h1 className="center">No Product Found</h1>
        }

        const {description = 'No description available.', company, name, price, misc_details} = details;

        return (
            <div className="product-details">
                <h1 className="center">{name}</h1>
                <div className="row">
                    {/* <ProductCarousel images={images} /> */}
                    <div className="col s12 m8">
                        <p>{company}</p>
                        <div className="right-align product-price">${formatMoney(price)}</div>
                        <ProductAdd productId={params.product_id} updateCart={updateCart}/>
                        <p>{description}</p>
                        <MiscDetails details={misc_details}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductDetails;
