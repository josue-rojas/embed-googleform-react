import React from 'react';
import '../styles/Slideshow.css';

export default class Slideshow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { index: 0 };
    this.timer = null;
    this.update = this.update.bind(this);
  }

  componentWillMount() {
    this.timer = setInterval(this.update, (this.props.slideshowDelay || 4000))
  }

  compentWillUnmount() {
    clearInterval(this.timer);
  }

  update() {
    let index = (this.state.index + 1) % this.props.images.length;
    this.setState({ index: index });
  }

  createSlide(images) {
    let slide = [];
    for(let i = 0; i < images.length; i++) {
      slide.push(
        <div
          key={`slide-${i}`}
          className='slide'
          style={{
            backgroundImage: `url(${images[i]})`,
            opacity: (this.state.index === i ? 1 : 0)
          }}></div>
      );
    }
    return slide;
  }

  render() {
    return (
      <div className='slideshow'>
        { this.createSlide(this.props.images) }
        <div className='children mobile-only'>
          { this.props.children }
        </div>
      </div>
    )
  }
}
