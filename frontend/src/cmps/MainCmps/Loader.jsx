import React from 'react';
import { connect } from 'react-redux'

class _Loader extends React.Component {
    render() {
        if(!this.props.loader)  return <React.Fragment/>

        return (
            <div className="positioning-container">
                <div className="spinning-container">
                <span>LOADING</span>
                    <div className="airplane-container">
                        {/* <span className="fa fa-plane"></span> */}
                        <img className="plane" src="https://res.cloudinary.com/roidinary/image/upload/v1600624566/Asset_dwekpj.png"></img>
                        
                    </div>
                </div>
            </div>

        )
    }

}
const mapStateToProps = state => {
    return {
        loader: state.modalReducer.loaderOn
    }
}
const mapDispatchToProps = {
    
}
export const Loader = connect(mapStateToProps, mapDispatchToProps)(_Loader)