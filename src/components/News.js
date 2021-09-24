import React, { Component } from 'react'
import Newsitem from './Newsitem'
import { Spinner } from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8, 
        category: 'general',
      }

      static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number, 
        category: PropTypes.string,
      }
    constructor() {
        super();
        this.state = {
            articles:[],
            loading: false,
            page:1,
        }
    }

    async componentDidMount(){
        let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fcbcdcb74d044307a1afadad5cebdffb&page=${this.state.page}&pagesize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles : parsedData.articles,
            totalResults : parsedData.totalResults,
            loading : false
        })
    }

    handlePrev = async()=>{
        let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fcbcdcb74d044307a1afadad5cebdffb&page=${this.state.page-1}&pagesize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles : parsedData.articles,
            page : this.state.page-1,
            loading:false
        })
        
    }
    handleNext = async()=>{
        if (this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)){

        } else {

            var url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fcbcdcb74d044307a1afadad5cebdffb&page=${this.state.page+1}&pagesize=${this.props.pageSize}`;
            this.setState({loading:true});
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                page : this.state.page+1,
                articles : parsedData.articles,
                loading : false
            })
        }
    }

    render() {
        return (
           
            <div className="container my-3">
                <h1 className="text-center" style={{margin: '35px 0px'}}>NewsDoz - Top Headlines of the day</h1>
                {this.state.loading && <Spinner/>}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        console.log(element.description);
                        return <div className="col-md-4" key={element.url}>
                            <Newsitem title={element.title} description={element.description} imgURL={element.urlToImage} newsURL={element.url} />
                        </div>

                    })}
                </div>
                    
            <div className="container d-flex justify-content-between">
                <button disabled={this.state.page<=1} type="button" onClick={this.handlePrev} className="btn btn-dark">&larr; Prev</button>
                <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)}  type="button" className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
            </div>
            </div>
           
        )
    }
}

export default News