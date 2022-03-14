import React, { Component } from "react";
import firebase from "../Firebase";
import { Link } from "react-router-dom";

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "",
      title: "",
      description: "",
      author: "",
    };
  }

  componentDidMount() {
    const ref = firebase
      .firestore()
      .collection("books-list")
      .doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const book = doc.data();
        this.setState({
          key: doc.id,
          title: book.title,
          author: book.author,
          description: book.description,
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState({ book: state });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { title, author, description } = this.state;

    const updateRef = firebase
      .firestore()
      .collection("books-list")
      .doc(this.state.key);
    updateRef
      .set({
        title,
        author,
        description,
      })
      .then((docRef) => {
        this.setState({
          key: "",
          title: "",
          author: "",
          description: "",
        });
        this.props.history.push("/show/" + this.props.match.params.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3
              className="panel-title"
              style={{
                marginBottom: "1em",
                marginTop: "1em",
              }}
            >
              EDIT BOOK
            </h3>
          </div>
          <div className="panel-body">
            <h4>
              <Link to={`/show/${this.state.key}`} className="btn btn-primary">
                BOOKS LIST
              </Link>
            </h4>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  placeholder="Title"
                />
              </div>
              <div className="form-group">
                <label htmlFor="author">Author:</label>
                <input
                  type="text"
                  className="form-control"
                  name="author"
                  value={this.state.author}
                  onChange={this.onChange}
                  placeholder="Author"
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <input
                  type="text"
                  className="form-control"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  placeholder="Description"
                />
              </div>
              <button type="submit" className="btn btn-success">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;
