import { getByTitle } from "@testing-library/react";
import React, { Component } from "react";

export class NewsItem extends Component {

    
  render() {
    let { title, description,imageUrl,newsUrl} = this.props;
    return (
      <div className="my-3">
        <div className="card" style={{width:"18rem"}}>
          <img src={!imageUrl?"https://play-lh.googleusercontent.com/eFQHU_yfnhE3FXcCqf3de7VUWxuIs68h2W2QM-ZsCzAeSVZME_gVdLdyGhoammNkEps":imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <div className="text-center">

            <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-primary">
              Read news
            </a>
            </div>
          </div>
        </div>
        
      </div>
    );
  }
}

export default NewsItem;
