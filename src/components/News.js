import React, { Component } from 'react'
import Newsitem from './Newsitem'

export class News extends Component {

    constructor() {
        super();
        this.state = {
            articles:[],
            loading: false,
            page:1,
            pagesize:20
        }
    }

    async componentDidMount(){
        let url =`https://newsapi.org/v2/top-headlines?country=in&apiKey=fcbcdcb74d044307a1afadad5cebdffb&page=${this.state.page}&pagesize=${this.state.pagesize}`;

        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles : parsedData.articles,
            totalResults : parsedData.totalResults
        })
    }

    handlePrev = async()=>{
        let url =`https://newsapi.org/v2/top-headlines?country=in&apiKey=fcbcdcb74d044307a1afadad5cebdffb&page=${this.state.page-1}&pagesize=${this.state.pagesize}`;

        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles : parsedData.articles,
            page : this.state.page-1
        })
        
    }
    handleNext = async()=>{
        if(Math.ceil(this.state.totalResults/20)>=(this.state.page+1))
        var url =`https://newsapi.org/v2/top-headlines?country=in&apiKey=fcbcdcb74d044307a1afadad5cebdffb&page=${this.state.page+1}&pagesize=${this.state.pagesize}`;

        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page : this.state.page+1,
            articles : parsedData.articles
        })
    }

    render() {
        return (
           
            <div className="container my-3">
                <h1 className="text-center">NewsDoz - Top Headlines of the day</h1>
                <div className="row">
                    {this.state.articles.map((element) => {
                        console.log(element.description);
                        return <div className="col-md-4" key={element.url}>
                            <Newsitem title={element.title} description={element.description} imgURL={element.urlToImage} newsURL={element.url} />
                        </div>

                    })}
                </div>
                    
            <div className="container d-flex justify-content-between">
                <button disabled={this.state.page<=1} type="button" onClick={this.handlePrev} className="btn btn-dark">&larr; Prev</button>
                <button type="button" className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
            </div>
            </div>
           
        )
    }
}

export default News