import './App.css';
import * as React from "https://esm.sh/react";
import * as Redux from "https://esm.sh/redux";
import * as ReactRedux from "https://esm.sh/react-redux";


const { connect, Provider } = ReactRedux;

class Quote {
  constructor(quote, author){
    this.quote = quote;
    this.author = author;
  }
}

const Quotes = [
 "Do or do not, there is no try.", "Yoda",
 "To be or not to be, that is the question.", "William Shakespeare", "And in the end, the love you take is equal to the love you make.", "the Beatles", "But you know that when the trust is told, that you can get what you want, or you can just get old.", "Billy Joel", "Only two things are infinite, the universe and human stupidity, and I'm not sure about the former.", "Albert Einstein"
]

let quotesObject = []
for(let i = 0; i < Quotes.length; i+=2){
  quotesObject.push(new Quote(Quotes[i], Quotes[i+1]));
}

const GET = 'GET'

const getRandomInt = (max) =>{
  return(Math.floor((Math.random()*max)))
}

const getQuote = () => {
  console.log("getting")
  return {
    type: GET,
    currentQuote: quotesObject[getRandomInt(quotesObject.length)]
      }
  };

//reducer
const quoteReducer = (state = {quotes: quotesObject, currentQuote: " "}, action) => {
  switch(action.type){
    case GET:
      return ({
        quotes: quotesObject,
        currentQuote: action.currentQuote})
    default:
      return state;
  }
}

//app
const store = Redux.createStore(quoteReducer)

//container
class Quoter extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      currentQuote: " "
    };
    
    this.grabQuote = this.grabQuote.bind(this);
  }
    grabQuote(){
      this.props.grabQuote()
    }
  
  render() {
    this.grabQuote();
    return (
      <div id="quote">
        <h2 id="text">{this.props.currentQuote.quote}</h2>
        <div id="author">~{this.props.currentQuote.author}</div>
        <div id="buttons">
        <button id="new-quote" type="button" onClick={this.grabQuote}>Quote</button>
        <a id="tweet-quote" href="twitter.com/intent/tweet"><i class="fa-brands fa-twitter"></i></a>
        </div>
    </div>
        );
  }
}

const mapStateToProps = (state) =>{ //magic
  //from here goes into this.props
  return{
    currentQuote: state.currentQuote
  }
};


const mapDispatchToProps = 
  (dispatch) => {
  return {
    grabQuote: () => dispatch(getQuote())
  }
};

const Container = connect(mapStateToProps, mapDispatchToProps)(Quoter);

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div>
        <Provider store={store}>
          <Container></Container>
        </Provider>
      </div>
    </div>
  );
}

export default App;
