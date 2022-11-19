function Gallery() {
  //지금은 하드코딩.
  return (
    <div className="gallery">
      <h1 style={{ marginLeft: "46%", fontFamily: "Roboto, sans-serif" }}>
        <img src="Puzzle.jpg"></img>NFTs
      </h1>
      <div style={{ margin: "48px 66px 10px 200px" }}>
        <img
          src="gallery2.jpg"
          style={{ width: "300px", marginRight: "23px" }}
        ></img>
        <img src="gallery1.jpg" style={{ width: "400px" }}></img>
        <img
          src="gallery3.jpg"
          style={{ width: "300px", marginLeft: "23px" }}
        ></img>
      </div>
    </div>
  );
}

export default Gallery;
