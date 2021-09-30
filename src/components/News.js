import React, { useEffect, useState } from 'react'
import Newsitem from './Newsitem'
import Spinner  from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News  = (props) =>{
    
    const [articles, setarticles] = useState([]);
    const [loading, setloading] = useState(true);
    const [page, setpage] = useState(1);
    const [totalResults, settotalResults] = useState(0);

    document.title = `${props.category} - NewsDoz`;


    const updateNews = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pageSize}`;
        setloading(true);
        let data = await fetch(url);
        let parsedData = await data.json();
        setarticles(parsedData.articles);
        setloading(false);
        settotalResults(parsedData.totalResults);
    }

    useEffect(() => {
        updateNews();
    }, [])



    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pagesize=${props.pageSize}`;
        setpage(page+1);
        let data = await fetch(url);
        let parsedData = await data.json();
        setarticles(articles.concat(parsedData.articles));
        settotalResults( parsedData.totalResults);
    }
        return (

                <>
                <h1 className="text-center" style={{ margin: '35px 0px', marginTop : '90px'}}>NewsDoz - Top Headlines of the day</h1>
                {loading && <Spinner/>}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length!=totalResults}
                    loader={<Spinner/>}
                >
                    <div className="container">

                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <Newsitem title={element.title} description={element.description} imgURL={element.urlToImage} newsURL={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>

                        })}
                    </div>
                    </div>
                </InfiniteScroll>

            </>
          

        )
    
}
News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}
export default News