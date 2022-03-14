import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import firebase from "./Firebase";

//Building Firestore Database CRUD Web Application using React.js and Google Firebase

class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection("books-list"); //firestore server collection path reference
    this.unsubscribe = null;
    this.state = {
      books: [],
    };
  }

  //  querySnapshot fetching datas from the server and returns an ARRAY
  onCollectionUpdate = (querySnapshot) => {
    const books = [];
    querySnapshot.forEach((doc) => {
      const { title, author, description } = doc.data();

      //fetching data from the server and pushing into the local empty books ARRAY
      books.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        author,
        description,
      });
    });
    this.setState({
      books,
    });
    //console.log(this.state);
  };

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3
              className="panel-title"
              style={{
                textAlign: "center",
                marginBottom: "1em",
                marginTop: "1em",
              }}
            >
              Books List - CRUD Web Application
            </h3>
          </div>
          <div className="panel-body">
            <h4>
              <Link to="/create" className="btn btn-primary">
                Add Book
              </Link>
            </h4>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {this.state.books.map((book, index) => (
                  <tr key={index}>
                    <td>
                      <Link to={`/show/${book.key}`}>{book.title}</Link>
                    </td>
                    <td>{book.author}</td>
                    <td>{book.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
