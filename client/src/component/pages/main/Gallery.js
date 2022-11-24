function Gallery() {
  return (
    <div>
      <div className="main-gallery-title">
        <h1>
          <img src="Puzzle.jpg" />
          NFT Gallery
        </h1>
      </div>
      <div className="main-gallery">
        <div className="slider">
          <input type="radio" name="testimonial" id="t-1" />
          <input type="radio" name="testimonial" id="t-2" />
          <input type="radio" name="testimonial" id="t-3" checked />
          <input type="radio" name="testimonial" id="t-4" />
          <input type="radio" name="testimonial" id="t-5" />
          <div className="testimonials">
            <label className="item item1" for="t-1">
              <h1>1</h1>
            </label>
            <label className="item item2" for="t-2">
              <h1>2</h1>
            </label>
            <label className="item item3" for="t-3">
              <h1>3</h1>
            </label>
            <label className="item item4" for="t-4">
              <h1>4</h1>
            </label>
            <label className="item item5" for="t-5">
              <h1>5</h1>
            </label>
          </div>
          <br />
          <div className="dots">
            <label for="t-1"></label>
            <label for="t-2"></label>
            <label for="t-3"></label>
            <label for="t-4"></label>
            <label for="t-5"></label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gallery;
