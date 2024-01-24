export default function CommingSoon() {
  return (
    <>
      <a
        className="github-fork-ribbon"
        href=""
        data-ribbon="We are Coming Soon"
        title="We are Coming Soon"
      >
        We are Coming Soon
      </a>

      <section className="hero is-transparent is-fullheight ">
        <div className="hero-head">
          <header className="navbar">
            <div className="container">
              <div className="navbar-brand mt-[1rem]">
                <a className="">
                  <img
                    src="https://controller.connetz.shop/assets/images/logo-m.webp"
                    width=""
                    alt="Logo"
                  />
                </a>
              </div>
              <div className="navbar-menu">
                <div className="navbar-end">
                  <span className="navbar-item">
                    <a className="button is-primary is-outlined" href="#">
                      <span className="icon">
                        <i className="fa fa-twitter"></i>
                      </span>{" "}
                      &nbsp;&nbsp;Follow Us
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </header>
        </div>
        <div className="hero-body">
          <div className="container has-text-centered content">
            <h1 className="title">
              <span className="fade fadeOne">COMING</span>
              <span className="fade fadeTwo">SOON</span>
            </h1>
            <h2 className="subtitle">
              <p id="countdown" className="countdown fade fadeThree"></p>
            </h2>
          </div>
        </div>
        <div className="hero-foot">
          <div className="columns has-text-centered">
            <div className="column">
              <div className="container">
                <ul>
                  <li>
                    <a href="#">Twitter</a>
                  </li>
                  <li>
                    <a href="#">Facebook</a>
                  </li>
                  <li>
                    <a href="#">YouTube</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
