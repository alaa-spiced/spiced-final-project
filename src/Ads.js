import React from "react";
import axios from './axios';
// import { connect } from 'react-redux';
// import { receiveAds } from './actions';

class Ads extends React.Component {
    constructor(props){
        super(props);
        this.state = {ads : null};
        this.changeDateStyle = this.changeDateStyle.bind(this);
    }
    UNSAFE_componentWillMount() {
     axios.get('/ads').then((results)=>{
       console.log("receiving All Ads ",results.data.adsImages);
       this.setState({
           ads  :   results.data.adsImages
       });
     });
    }

    changeDateStyle(date){
        var d = new Date(date);
        var n = d.toLocaleString();
        return n;
    }

    render(){
        var { ads }  = this.state;

        if (!ads) {
            return null;
        }


        var adsDiv = (
            <div className="ads-div">
                {ads.map(ad => (
                    <div className="ad" key={ad.id}>

                        <div id="image">
                            {ad.images.map(image =>(
                                <img key={image.id} className="ad-image" src={image.image_urls} />

                            ))}
                        </div>
                        <div className="ad-info">

                            <div className="ad-title"><h2>{ad.title}</h2></div>
                            <div className="ad-description">{ad.description}</div>
                            <div className="ad-created-at"><p>Created At: <br></br></p>{this.changeDateStyle(ad.created_at)}</div>
                            {/*<div className="ad-updated-at">{ad.updated_at}</div>*/}
                        </div>
                    </div>
                ))}
                {/*<div className="button">
                    <button onClick={()=>this.moreAdsButton}>SHOW MORE</button>
                </div>*/}
            </div>
        );

        return (
            <div>
                {adsDiv}
            </div>
        );
    }
}

// const mapStateToProps = function(state) {
//     return {
//         ads : state.ads
//     };
// };
//
// export default connect(mapStateToProps)(Ads);

export default Ads;
