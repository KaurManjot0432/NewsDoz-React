import React from 'react';

const Newsitem = (props)=> {

   
        let {title, description, imgURL, newsURL, author, date, source } = props;
        return (
            <div my-3>
                <div className="card">
                <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        position: 'absolute',
                        right: '0'
                    }
                    }>

                        <span className="badge rounded-pill bg-danger"> {source} </span>
                    </div>
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
export default Newsitem
