import React, { Component } from 'react'

export class Newsitem extends Component {

    render() {
        let {title, description, imgURL, newsURL} = this.props;
        return (
            <div my-3>
                <div className="card">
                    <img src={!imgURL?"https://cdn.insidesport.co/wp-content/uploads/2021/09/15113727/WhatsApp-Image-2021-09-15-at-11.08.38-AM.jpeg" : imgURL} className="card-img-top" alt="..."/>
                    <div class ="card-body">
                    <h5 class ="card-title">{title}</h5>
                    <p class ="card-text">{description}</p>
                    <a href={newsURL}   target="_blank" class ="btn btn-sm btn-dark">Read more</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Newsitem
