import React, { Component } from 'react'
import debounce from 'lodash/debounce'
import { connect } from 'react-redux'
import { actionTypes } from '../reducers/actionTypes'
class DemoRC1set extends Component {
    state = {
        element: "",
        arrEl: {
            idx: -1,
            value: ""
        },
        keySearch: "",
        savedValue: ""
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (JSON.stringify(nextProps.selectedItem) !== JSON.stringify(this.state.arrEl)
            && this.state.arrEl.value === nextState.arrEl.value) {
            this.setState({
                arrEl: nextProps.selectedItem,
                savedValue: nextProps.selectedItem.value
            })
        }
        return true
    }
    //  handleUpdate = () => { this.props.dispatch({ type: "update", payload: this.state.arrEl }) }
    render() {
        return (
            <div>
                {/* search */}
                <input placeholder='Search' onChange={(event) => this.setState({
                    keySearch: event.target.value
                })} onKeyPress={(e) => {
                    if (e.code === 'Enter')
                    { this.props.handlePage({ key: this.state.keySearch, activePage: 1 }) }
                    // { this.props.handleSearch( this.state.keySearch)  }
                }} />
                {/* Add */}
                <button onClick={() => { this.props.handleAdd(this.state.element) }}>ADD</button>
                <input onChange={debounce((event) => {
                    this.setState({
                        element: event.target.value
                    })
                }, 600)} />
                <p>-----------------------------</p>
                <button disabled={this.state.arrEl.idx === -1} onClick={() => {
                    this.props.handleUpdate(this.state)
                }}>
                    {this.state.arrEl.idx === -1 ? 'UPDATE' : 'UPDATE item with index: ' + this.state.arrEl.idx}</button>
                <input value={this.state.arrEl.value} onChange={(event) => this.setState({
                    arrEl: {
                        ...this.state.arrEl,
                        value: event.target.value
                    }
                })} onKeyPress={(e) => {
                    if (e.code === "Enter") this.props.handleUpdate(this.state)
                }} />

                <div><button onClick={() => {
                    this.props.undo()
                }}>Undo After Delete</button></div>
                <p>-----------------------------</p>

            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    selectedItem: state.demo.selectedItem
})

const mapDispatchToProps = (dispatch) => {
    return {
        handleUpdate: (data) => { dispatch({ type: actionTypes.Update, payload: data }) },
        handleAdd: (data) => { dispatch({ type:actionTypes.Add, payload: data }) },
        // handleSearch: (data) => { dispatch({ type: actionTypes.Search, payload: data }) },
        handlePage: (data) => dispatch({ type: actionTypes.pagiNation, payload: data }),
        undo: () => dispatch({ type: actionTypes.Undo })
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(DemoRC1set);