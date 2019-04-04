import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Sidenav extends Component {
    componentDidMount(){
        M.Sidenav.init(this.sidenav);
    }

    render() {
        return (
            <ul ref={(element) => {this.sidenav = element}} id="sidenav" className="sidenav">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/products">Products</Link>
                </li>
                <li>
                    <Link to="/">Sign In</Link>
                </li>
            </ul>
        )
    }
}

export default Sidenav