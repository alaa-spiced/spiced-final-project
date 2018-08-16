import React from "react";
import { connect } from 'react-redux';
import { receiveAdds } from './actions';

class Adds extends React.Component {
    constructor(props){
        super(props);
        this.changeDateStyle = this.changeDateStyle.bind(this);
    }
    componentDidMount() {
        this.props.dispatch(receiveAdds());
    }

    changeDateStyle(date){
        var d = new Date(date);
        var n = d.toLocaleString();
        return n;
    }
    render(){
        var { adds }  = this.props;

        if (!adds) {
            return null;
        }


        var addsDiv = (
            <div className="adds-div">
                {adds.map(add => (
                    <div className="add" key={add.id}>

                        <div id="image">
                            {add.images.map(image =>(
                                <img key={image.id} className="add-image" src={image.image_urls} />

                            ))}
                        </div>
                        <div className="add-info">

                            <div className="add-title"><h2>{add.title}</h2></div>
                            <div className="add-description">{add.description}</div>
                            <div className="add-created-at"><p>Created At: <br></br></p>{this.changeDateStyle(add.created_at)}</div>
                            {/*<div className="add-updated-at">{add.updated_at}</div>*/}
                        </div>
                    </div>
                ))}
            </div>
        );

        return (
            <div>
                {addsDiv}
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        adds : state.adds
    };
};

export default connect(mapStateToProps)(Adds);
