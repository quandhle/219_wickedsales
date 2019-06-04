import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class Sidenav extends Component {
    constructor (props) {
        super(props);

        this.sidenavToggle = this.sidenavToggle.bind(this);
    }

    sidenavToggle () {
        this.state.element.close();
    }

    componentDidMount () {
        const element = M.Sidenav.init(this.sidenav);

        this.setState({
            element: element
        });
    }

    render () {
        return (
            <Fragment>
                <ul ref={(e) => { this.sidenav = e }} id="sidenav" className="sidenav" onClick={this.sidenavToggle}>
                    {this.props.links}
                </ul>
            </Fragment>
        );
    }
}

export default Sidenav;
