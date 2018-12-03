import React, { Component } from 'react'
import "./news.css"
import DataManager from '../../module/DataManager'
import { Button, Image } from 'semantic-ui-react'

export default class NewsList extends Component {
  credentials = JSON.parse(localStorage.getItem('credentials'))

  state = {
    news: []
  }

  deleteNews = (news, id) => {
    return DataManager.delete(news, id)
      .then(() => DataManager.getAllByUser("news", this.credentials.id))
      .then(news => this.setState({
        news: news
      })
      )
  }

  componentDidMount() {
    const newState = {}
    DataManager.getAllByUser("news", this.credentials.id)
      .then(allNews => {
        newState.news = allNews
      })
      .then(() =>
        this.setState(newState))
  }

  render() {
    return (
      <React.Fragment>
        <div className="newsButton list">
          <button type="button"
            className="btn btn-primary"
            onClick={() => {
              this.props.history.push("/news/new")
            }}>
            Add New Article
          </button>
        </div>
        <div className="article-list">
          <section className="news">
            {
              this.state.news.map(news =>
                <div className="eachArticle" key={news.id}>
                  <div>
                    <Image className="newsImage" src={news.picLink} rounded />
                  </div>
                  <div className="article-Details">
                    <h2>{news.name}</h2>
                    <h3>{news.synopsis}</h3><br />
                    <a href={news.url}>{news.url}</a><br />
                    {news.date}<br />
                    <Button.Group size="mini" >
                      <Button
                        color="teal"
                        onClick={() => this.props.history.push(`/news/edit/${news.id}`)}
                      >Edit</Button>
                      <Button.Or />
                      <Button
                        color="red"
                        onClick={() => this.deleteNews("news", news.id)} className="card-link">
                        Delete</Button>
                    </Button.Group>
                  </div>
                </div>
              )
            }
          </section>
        </div>
      </React.Fragment>
    )
  }
}