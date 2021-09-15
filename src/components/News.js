import React, { Component } from 'react'
import Newsitem from './Newsitem'

export class News extends Component {

    constructor() {
        super();
        this.state = {
            articles:[],
            loading: false
        }
    }

    async componentDidMount(){
        let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=fcbcdcb74d044307a1afadad5cebdffb";

        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles : parsedData.articles,
        })
    }

    render() {
        return (
            <div className="container my-3">
                <h1>NewsDoz - Top Headlines of the day</h1>
                <div className="row">
                    {this.state.articles.map((element) => {
                        console.log(element.description);
                        return <div className="col-md-4" key={element.url}>
                            <Newsitem title={element.title} description={element.description} imgURL={element.urlToImage} newsURL={element.url} />
                        </div>

                    })}
                </div>

            </div>
        )
    }
}

export default News
