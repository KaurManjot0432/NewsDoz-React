import React, { Component } from 'react'

export class Newsitem extends Component {

    render() {
        let {title, description, imgURL, newsURL, author, date, source } = this.props;
        return (
            <div my-3>
                <div className="card">
                <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: '90%', zIndex: '1'}}> {source}
                        </span>
                    <img src={!imgURL?"https://cdn.insidesport.co/wp-content/uploads/2021/09/15113727/WhatsApp-Image-2021-09-15-at-11.08.38-AM.jpeg" : imgURL} className="card-img-top" alt="..."/>
                    <div className = "card-body">
                    <h5 className = "card-title">{title}</h5>
                    <p className = "card-text">{description}</p>
                    <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on  {new Date(date).toGMTString()}</small></p>
                    <a href={newsURL}   target="_blank" className = "btn btn-sm btn-dark">Read more</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Newsitem
