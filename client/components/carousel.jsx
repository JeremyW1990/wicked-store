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

  clickHander(index, type) {
    if (type === 'shift') {
      let nextIndex = this.state.currentIndex + index;
      if (nextIndex < 0) {
        nextIndex = this.props.images.length - 1;
      } else if (nextIndex >= this.props.images.length) {
        nextIndex = 0;
      }
      this.setState({ currentIndex: nextIndex });
    } else {
      this.setState({ currentIndex: index });
    }

  }

  componentDidUpdate() {
    this.resetTimer();
  }

  componentDidMount() {
    this.resetTimer();
  }
  render() {

    const roundButtons = this.props.images.map((iamge, index) => {
      if (index === this.state.currentIndex) {
        return <i key={index} className="fas fa-circle"></i>;
      }
      return <i key={index} className="far fa-circle" onClick={() => this.clickHander(index, 'jump')} ></i>;
    });

    return (
      <div className="carousel">
        <img src={this.props.images[this.state.currentIndex]} alt=""/>
        <button className="button-left" onClick={() => this.clickHander(-1, 'shift')}>&lt;</button>
        <button className="button-right" onClick={() => this.clickHander(+1, 'shift')}>&gt;</button>
        <div className="round-buttons">
          {roundButtons}
        </div>
      </div>
    );
  }
}
