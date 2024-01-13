import { useEffect } from "react";
import { tsParticles } from "https://cdn.jsdelivr.net/npm/@tsparticles/engine@3.0.0/+esm";
import { loadAll } from "https://cdn.jsdelivr.net/npm/@tsparticles/all@3.0.0/+esm";

export default function LockScreen() {
  useEffect(() => {
    (async () => {
      await loadAll(tsParticles);

      await tsParticles.addPreset("lightdark", {
        fullScreen: {
          enable: true,
        },
        particles: {
          move: {
            enable: true,
          },
          number: {
            value: 400,
          },
          opacity: {
            value: { min: 1, max: 1 },
          },

          size: {
            value: { min: 1, max: 5 },
          },
          speed: {
            value: { min: 1, max: 5 },
          },
        },
      });

      await tsParticles.load({
        id: "light",
        options: {
          preset: "lightdark",
          particles: {
            color: {
              value: "#ffffff",
            },

            move: {
              enable: true,
              speed: 1,
              direction: "random",
              random: true,
              straight: false,
              out_mode: "out",
              attract: {
                enable: false,
                rotateX: 1600,
                rotateY: 1200,
              },
            },
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onHover: {
                enable: true,
                mode: "grab",
              },
              onClick: {
                enable: true,
                mode: "grab",
              },
              resize: false,
            },
            modes: {
              grab: {
                distance: 200,
                opacity: 0.1,
                color: "random",
              },
            },
          },
        },
      });
    })();
  }, []);
  return (
    <>
      <div className="auth-page-wrapper pt-5">
        {/* <!--  auth page bg --> */}
        <div className="auth-one-bg-position auth-one-bg">
          <div
            id="light"
            className="relative particles_div !overflow-hidden border-none z-[-1] !h-[50%]"
          ></div>
          <div className="bg-overlay"></div>
          <div className="shape">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              viewBox="0 0 1440 120"
            >
              <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z" />
            </svg>
          </div>
        </div>
        {/* <!--  auth page content --> */}
       <div className="auth-page-content">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="text-center mt-sm-5 mb-4 text-white-50">
                            <div>
                                <a href="index.html" className="d-inline-block auth-logo">
                                    <img src="/assets/images/logo-m.webp" alt="" height=""/>
                                </a>
                            </div>
                            {/* <!-- <p class="mt-3 fs-15 fw-medium">Premium Admin & Dashboard Template</p> --> */}
                        </div>
                    </div>
                </div>
                {/* <!-- end row --> */}

                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-5 col-xl-4">
                        <div className="card mt-4">

                            <div className="card-body p-4">
                                <div className="text-center mt-2">
                                    <h5 className="text-primary h5">Lock Screen</h5>
                                    <p className="text-muted">Enter your password to unlock the screen!</p>
                                </div>
                                <div className="user-thumb text-center">
                                    <img src="/assets/images/users/avatar-1.jpg" className="mx-auto rounded-circle img-thumbnail avatar-lg" alt="thumbnail"/>
                                    <h5 className="font-size-15 h5 mt-3">Anna Adame</h5>
                                </div>
                                <div className="p-2 mt-4">
                                    <form>
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="userpassword">Password</label>
                                            <input type="password" className="form-control" id="userpassword" placeholder="Enter password" required />
                                        </div>
                                        <div className="mb-2 mt-4">
                                            <button className="btn btn-secondary bg-secondary w-100" type="submit">Unlock</button>
                                        </div>
                      </form>
                      {/* <!-- end form --> */}

                                </div>
                            </div>
                            {/* <!-- end card body --> */}
                        </div>
                        {/* <!-- end card --> */}

                        {/* <div className="mt-4 text-center">
                            <p className="mb-0">Not you ? return <a href="index.html" className="fw-semibold text-primary text-decoration-underline"> Signin </a> </p>
                        </div> */}

                    </div>
                </div>
                {/* <!-- end row --> */}
            </div>
            {/* <!-- end container --> */}
        </div>
        {/* <!--  end auth page content --> */}

        {/* <!--  footer --> */}
        <footer className="footer w-100">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-6">
                {new Date().getFullYear()} © All
                Rights Reserved.
              </div>
              <div className="col-sm-6">
                <div className="text-sm-end d-none d-sm-block">
                  Designed and Developed by Call Center Projects
                </div>
              </div>
            </div>
          </div>
        </footer>
        {/* <!--  end Footer --> */}
      </div>
    </>
  );
}
