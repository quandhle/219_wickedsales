import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import Sidenav from './sidenav';

class Nav extends Component {
    renderLinks() {
        return (
            <Fragment>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/products">Dogs</Link>
                </li>
                <li>
                    <Link to="/">Puppies</Link>
                </li>
            </Fragment>
        )
    }
    
    render() {
        const links = this.renderLinks();

        return (
            <Fragment>
                <nav className="light-blue darken-4">
                    <div className="nav-wrapper">
                        <Link className="brand-logo" to="/">Wicked Sales</Link>
                        <a href="#" data-target="sidenav" className="sidenav-trigger">
                            <i className="material-icons">menu</i>
                        </a>
                        <ul className="right hide-on-med-and-down">
                            {links}
                        </ul>
                    </div>
                </nav>

                <Sidenav links={links}/>
            </Fragment>
        )
    }
}

export default Nav