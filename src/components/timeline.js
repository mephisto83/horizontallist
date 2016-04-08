import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as Util from '../util';
import {detectIE} from '../poly'
import timeline from './timeline';
class Timeline extends Component {
    constructor(props) {
        super(props);
        this.select = this.select.bind(this);
        this.state = {
            menuOpen: false,
            data: []
        }
    }
    select(item) {
        console.log(item);
        this.setState({ selectedItem: item });
        var {onSelected} = this.props;
        if (onSelected) {
            onSelected(item);
        }
    }
    render() {

        var {state, dispatch, data} = this.props;
        var list = null;
        var listItemStyle = {
            display: 'block',
            backgroundColor: 'blue',
            color: 'white',
            padding: '3px',
            borderRadius: '3px',
            cursor: 'pointer',
            overflow: 'hidden'
        }
        var listStyle = {
            display: detectIE() ? '-ms-flexbox' : 'inline-flex'
        }
        if (data) {
            list = data.map(x => {
                return <li onClick={() => { this.select(x) } } style={Object.assign({}, listItemStyle, { width: x.width }) } 
                            key={x.id}>
                            {x.content}
                        </li>
            })
        }
        return (
            <ul style={listStyle}>
                {list}
            </ul>
        )
    }
}
Timeline = connect(Util.mapStateToProps, Util.mapDispatchToProps)(Timeline)

export default Timeline