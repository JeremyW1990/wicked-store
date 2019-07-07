import React from 'react';

/*
  Carousel display
  Used in product detail page
*/
export default class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0
    };
    this.timer = null;
  }

  /*
    Reset the timer of carousel display
  */
  resetTimer() {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.setState(prevState => {
        return {
          currentIndex: prevState.currentIndex >= this.props.images.length - 1 ? 0 : prevState.currentIndex + 1
        };
      });
    }, 1500);
  }

  /*
    jump to a certain image when user click that thumbnail
  */
  clickHander(index) {
    this.setState({ currentIndex: index });
  }

  componentDidUpdate() {
    this.resetTimer();
  }

  componentDidMount() {
    this.resetTimer();
  }

  /*
    clear timer when component unmount, to prevent memory leak
  */
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {

    const gallery = this.props.images.map((image, index) => {

      let dynamicClass = 'border rounded thumbmail m-1 p-1 d-flex justify-content-center align-items-center';
      /*
        dynamically change css of images
        highlight the thumbnail image when it is dispalyed as main image
      */
      index !== this.state.currentIndex ? dynamicClass += ' border' : dynamicClass += ' border-danger';
      return (
        <div
          className={dynamicClass}
          key={index}
          onClick={() => this.clickHander(index)}>
          <img src={image} ></img>
        </div>);
    });

    return (
      <div className="carousel d-flex flex-column justify-content-around align-items-center">
        <div className="main-image">
          <img src={this.props.images[this.state.currentIndex]} alt=""/>
        </div>

        <div className="gallery d-flex">
          {gallery}
        </div>
      </div>
    );
  }
}
