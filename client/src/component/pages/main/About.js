function About() {
  return (
    <div className="about">
      <h1 className="about-title">What is Fractional NFT?</h1>
      <img src="about.jpg" className="about-img"></img>
      <div className="about-des">
        <div className="des">
          <p>
            <a style={{ color: "tomato", fontSize: "40px" }}>A</a>nyone who has
            been following NFT trends will know that NFTs often make headlines
            for their insane valuations. The prices of popular NFTs can run into
            millions, making them prohibitively expensive for the average buyer.
            The need to solve this problem has led to the emergence of F-NFTs.
          </p>
          <br />
          <p>
            From the perspective of profitability, having a small piece of a
            popular yet expensive NFT is much better than acquiring full
            ownership of several insignificant ones at the same price.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
