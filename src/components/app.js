import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as Util from '../util';
import Timeline from './timeline';
class App extends Component {
    constructor(props) {
        super(props)
        this.selectItem = this.selectItem.bind(this);
        this.state = {
            menuOpen: false,
            data: []
        }
    }
    addToTimeLine() {
        var width = Math.random() * 300;
        var time = width * 10;
        this.setState({ data: [...this.state.data, { index: this.state.data.length, 
            content: <p>{ Date.now() }
            tiem:{time}
        </p>, id: Math.random(), width: width, time: time }] })
    }
    selectItem(item) {
        this.setState({ selectedItem: item })
    }
    setWidth(width) {
        if (this.state.selectedItem) {
            var selectedItem = this.state.selectedItem;
            var newselected = Object.assign({}, selectedItem, { width: width })
            var newstate = [...this.state.data.filter(x => x.id !== selectedItem.id), newselected].sort((a, b) => { return a.index - b.index });
            this.setState({ data: newstate, selectedItem: newselected })
        }
    }
    render() {

        var {state, dispatch} = this.props;
        var data = this.state.data;
        return (
            <div>
                <button onClick={() => { this.addToTimeLine() } } >Add</button>
                <input style={{ width: 285 }} type="range" max="1000" min="0" step=".1" defaultValue={0} value={this.state.selectedItem ? this.state.selectedItem.width : 0} onChange={event => { this.setWidth(event.target.value) } }></input>
                <div style={{overflow:'auto'}}><Timeline data={data} onSelected={this.selectItem}></Timeline>
                </div>
            </div>
        )
    }
}
App = connect(Util.mapStateToProps, Util.mapDispatchToProps)(App)

export default App