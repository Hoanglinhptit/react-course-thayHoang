import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actionTypes } from '../reducers/actionTypes'
export class DemoRC2get extends Component {
    render() {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>tên element trong mảng</th>
                            <th>chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.mangStore.map((element, index) => {
                            return (<tr key={index} >
                                <td>
                                    {element}
                                </td>
                                <td>
                                    <button onClick={() => this.props.setSelectedItem({
                                        idx: index,
                                        value: element
                                    })}>Chọn</button>
                                    <button onClick={() => { window.confirm("Xoa that day!") && this.props.handleDel(index) }}>Xóa </button>
                                </td>
                            </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        idStore: store.demo.id,
        mangStore: store.demo.mangKQ
    }
}
const mapDispatchToProps = (dispatch) => ({
    handleDel: (data) => { dispatch({ type: actionTypes.Delete, payload: data }) },
    setSelectedItem: (payload) => dispatch({ type: actionTypes.setItem, payload: payload })
})
export default connect(mapStateToProps, mapDispatchToProps)(DemoRC2get)
