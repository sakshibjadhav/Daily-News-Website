import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from 'prop-types'
export class News extends Component {

  static defaultProps={
      country:'in',
      pageSize:8,
      category:'general'
  }

  static propTypes={
      country: PropTypes.string,
      pageSize: PropTypes.number

  }
  constructor() {
    super();
    console.log("const from news component");
    this.state = {
      articles: [],
      loading: false,
      page:1,
    };
  }

  async componentDidMount() {
    let url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=975bbd4ffa6c45d3ab2572072c484204&page=1&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ articles: parsedData.articles, totalResults:parsedData.totalResults});
  }

  handlePrevClick = async () => {
    console.log("prev");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=975bbd4ffa6c45d3ab2572072c484204&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page-1,
      articles: parsedData.articles,
    });
  };

  handleNextClick = async () => {
    console.log("next");
    
    if(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)){
      
    }
    else{

      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=975bbd4ffa6c45d3ab2572072c484204&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        page: this.state.page+1,
        articles: parsedData.articles,
      });
    }
  };

  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center" style={{margin:'30px 0px'}}>Top headlines</h2>

        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title : " "}
                  description={element.description ? element.description : " "}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            type="button"
            disabled={this.state.page <= 1}
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
