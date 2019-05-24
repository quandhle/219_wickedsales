import React, {Component, Fragment} from 'react';
import axios from 'axios';
import ProductItem from './product_item';
import Sort from './sorting';

class ProductList extends Component {
    constructor (props) {
        super(props);

        this.state = {
            products: [],
            session: {}
        }

        this.goToDetails = this.goToDetails.bind(this);
    }

    componentDidMount () {
        this.getProducts();

        this.getSessionData();
    }

    async getSessionData () {
        const resp = await axios.get('/api/sessiontest.php');
    }

    async getProducts () {
        const resp = await axios.get('/api/getproducts.php');

        if (resp.data.success) {
            this.setState({
                products: resp.data.products
            })
        }
    }

    goToDetails (id) {
        this.props.history.push(`/products/${id}`);
    }

    render () {
        const productList = this.state.products.map((products) => {
            return <ProductItem key={products.id} {...products} goToDetails={this.goToDetails}/>
        })
        
        return (
            <Fragment>
                <Sort/>
                <div className="product-list">
                    {productList}
                </div>
            </Fragment>
        );
    }
}

export default ProductList;
