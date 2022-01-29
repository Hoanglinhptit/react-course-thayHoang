import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actionTypes } from '../reducers/actionTypes'
class ReactPagination extends Component {

    render() {
        const { activePage, totalPage, handlePage } = this.props
        let pages = []
        console.log("total", totalPage)
        for (let index = 1; index <= totalPage; index++) {
            pages.push(index)

        }

        return (
            <div>
                {pages.map((item, idx) => {
                    console.log(item)
                    return <button style={{backgroundColor: activePage === item && 'green'}} key={idx} onClick={() => { handlePage({activePage: item }) }}>{item}</button>
                })}
            </div>
        );
    }
    componentDidMount() {
        this.props.handlePage({activePage: 1})
    }
}

const mapStateToProps = (state) => {
    return {
        activePage: state.demo.activePage,
        limit: state.demo.limit,
        totalPage: state.demo.totalPage
        // Math.ceil(state.demo.mang.length/state.demo.limit)
    }
}
const mapDispatchToProps = (dispatch) => ({
    handlePage: (data) => dispatch({ type: actionTypes.pagiNation, payload: data })
})
export default connect(mapStateToProps, mapDispatchToProps)(ReactPagination)