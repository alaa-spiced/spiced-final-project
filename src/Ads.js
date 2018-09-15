import React from "react";
import axios from './axios';
// import { connect } from 'react-redux';
// import { receiveAds } from './actions';

class Ads extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            ads : null,
            needsAds : null,
            givingsAds : null,
            all : true
        };
        this.changeDateStyle = this.changeDateStyle.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    UNSAFE_componentWillMount() {
        axios.get('/ads').then((results)=>{
            console.log("receiving All Ads ",results.data.adsImages);
            var needs = results.data.adsImages.filter((ad)=>{
                if (ad.classification == 'needs') {
                    return ad;
                }
            });
            console.log("needs ",needs);

            var givings = results.data.adsImages.filter((ad)=>{
                if (ad.classification == 'givings') {
                    return ad;
                }
            });
            console.log("givings ",givings);

            this.setState({
                ads  :   results.data.adsImages,
                needsAds : needs,
                givingsAds : givings,
                all : true
            });
        });
    }

    changeDateStyle(date){
        var d = new Date(date);
        var n = d.toLocaleString();
        return n;
    }

    handleChange() {
        var searchSelector = document.getElementById('search');
        var searchValue = searchSelector.options[searchSelector.selectedIndex].value;
        if (searchValue == 'all') {
            this.setState({
                all : true,
                givings : false,
                needs : false
            });
        }else if (searchValue == 'needs') {
            this.setState({
                needs : true,
                all : false,
                givings : false

            });
        }else if (searchValue == 'givings') {
            this.setState({
                givings : true,
                all : false,
                needs : false
            });
        }
    }

    render(){
        var { ads, needsAds, givingsAds }  = this.state;

        if (ads == null) {
            return null;
        }



        var needsDiv = (
            <div className="ads-div">
                {needsAds.map(ad => (
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
                        </div>
                    </div>
                ))}
                {/*<div className="button">
                    <button onClick={()=>this.moreAdsButton}>SHOW MORE</button>
                </div>*/}
            </div>
        );

        var givingsDiv = (
            <div className="ads-div">
                {givingsAds.map(ad => (
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
                        </div>
                    </div>
                ))}
                {/*<div className="button">
                    <button onClick={()=>this.moreAdsButton}>SHOW MORE</button>
                </div>*/}
            </div>
        );

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
                <div className="search">
                    <select id="search" name="search" onChange={this.handleChange}>
                        <option value="all">All</option>
                        <option value="givings">Givings</option>
                        <option value="needs">Needs</option>
                    </select>
                </div>
                {this.state.needs && <div>
                    {needsDiv}
                </div>}

                {this.state.givings && <div>
                    {givingsDiv}
                </div>}
                {this.state.all && <div>
                    {adsDiv}
                </div>}
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
