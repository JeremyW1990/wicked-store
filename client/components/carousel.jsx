import React from 'react';

export default class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0
    };
    this.timer = null;
  }

  resetTimer() {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.setState(prevState => {
        return {
          currentIndex: prevState.currentIndex >= this.props.images.length - 1 ? 0 : prevState.currentIndex + 1
        };
      });
    }, 3000);
  }

  clickHander(index) {
    this.setState({ currentIndex: index });
  }

  componentDidUpdate() {
    this.resetTimer();
  }

  componentDidMount() {
    this.resetTimer();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {

    const gallery = this.props.images.map((image, index) => {

      let dynamicClass = 'border rounded m-1 p-1';
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
