import React from 'react';
import '../styles/App.css';
import Slideshow from './Slideshow';
import SlideupPanel from './SlideupPanel';

import image0 from '../images/image_0.jpg';
import image1 from '../images/image_1.jpg';
import image2 from '../images/image_2.jpg';
import image3 from '../images/image_3.jpg';
import image4 from '../images/image_4.jpg';
const imagesURL = [image0, image1, image2, image3, image4];

const title = 'Something Co.';
const message = 'If you want something then do something about it. Sign up now!';

function SlideshowMessage(props) {
  return (
    <div className='slideshow-message'>
      <h1 className='title alt-font'>{props.title}</h1>
      <p className='smessage'>{props.message}</p>
    </div>
  );
}

export default function App() {
  return (
    <div className="App">
      <Slideshow
        images={imagesURL}>
        <SlideshowMessage
          title={title}
          message={message}/>
      </Slideshow>
      <div className='main-app'>
        <SlideupPanel
          title={title}
          message={message}/>
      </div>
    </div>
  );
}
