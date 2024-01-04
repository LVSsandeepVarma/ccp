import { useEffect } from "react"
import { tsParticles } from "https://cdn.jsdelivr.net/npm/@tsparticles/engine@3.0.0/+esm";
import { loadAll } from "https://cdn.jsdelivr.net/npm/@tsparticles/all@3.0.0/+esm";

/* eslint-disable react/no-unknown-property */
export default function Signin(){
   useEffect(()=>{
      (async () => {
         await loadAll(tsParticles);
       
         await tsParticles.addPreset("lightdark", {
           fullScreen: {
             enable: false
           },
           particles: {
             links: {
               enable: true
             },
             move: {
               enable: true
             },
             number: {
               value: 50
             },
             opacity: {
               value: { min: 0.3, max: 1 }
             },
             shape: {
               type: ["circle", "square", "triangle", "polygon"],
               options: {
                 polygon: [
                   {
                     sides: 5
                   },
                   {
                     sides: 6
                   },
                   {
                     sides: 8
                   }
                 ]
               }
             },
             size: {
               value: { min: 1, max: 3 }
             }
           }
         });
       
         await tsParticles.load({
           id: "light",
           options: {
             "particles": {
               "number": {
                 "value": 650,
                 "density": {
                   "enable": true,
                   "value_area": 800
                 }
               },
               "color": {
                 "value": "#ffffff"
               },
               "shape": {
                 "type": "circle",
                 "stroke": {
                   "width": 0,
                   "color": "#000000"
                 },
                 "polygon": {
                   "nb_sides": 8
                 },
                 "image": {
                   "src": "img/github.svg",
                   "width": 100,
                   "height": 100
                 }
               },
               "opacity": {
                 "value": 0.5,
                 "random": false,
                 "anim": {
                   "enable": true,
                   "speed": 0.1,
                   "opacity_min": 0.1,
                   "sync": false
                 }
               },
               "size": {
                 "value": 3,
                 "random": false,
                 "anim": {
                   "enable": true,
                   "speed": 0.3,
                   "size_min": 0.1,
                   "sync": false
                 }
               },
               "line_linked": {
                 "enable": true,
                 "distance": 400,
                 "color": "#ffffff",
                 "opacity": 0.1,
                 "width": 1,
               },
               "move": {
                 "enable": true,
                 "speed": 0.5,
                 "direction": "none",
                 "random": true,
                 "straight": false,
                 "out_mode": "out",
                 "attract": {
                   "enable": true,
                   "rotateX": 600,
                   "rotateY": 1200
                 }
               }
             },
             "interactivity": {
               "detect_on": "canvas",
               "events": {
                 "onHover": {
                   "enable": true,
                   "mode": "connect"
                 },
                 "onClick": {
                   "enable": true,
                   "mode": "push"
                 },
                 "resize": true
               },
               "modes": {
                 "grab": {
                   "distance": 400,
                   "line_linked": {
                     "opacity": 0.5
                   }
                 },
                 "bubble": {
                   "distance": 400,
                   "size": 40,
                   "duration": 2,
                   "opacity": 0.5,
                   "speed": 3
                 },
                 "repulse": {
                   "distance": 600
                 },
                 "push": {
                   "particles_nb": 4
                 },
                 "remove": {
                   "particles_nb": 2
                 }
               }
             },
             "retina_detect": true,
             "config_demo": {
               "hide_card": false,
               "background_color": "#b61924",
               "background_image": "",
               "background_position": "50% 50%",
               "background_repeat": "no-repeat",
               "background_size": "cover"
             }
           }
         });
       
       })();
   },[])
    return(
        <>
        <div className="auth-page-wrapper pt-5">
         {/* <!--  auth page bg --> */}
         <div className="auth-one-bg-position auth-one-bg" id="auth-particles">
            <div className="bg-overlay">
            </div>
            <div className="shape">
            
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1440 120">
  <path
 
d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z" />
</svg>
<div id="light"></div>
            </div>
            
            

         </div>
         {/* <!--  auth page content --> */}
         <div className="auth-page-content">
            <div className="container">
               <div className="row justify-content-center">
                  <div className="col-md-8 col-lg-6 col-xl-5">
                     <div className="text-center mt-sm-5 mb-4 text-white-50">
                        <div>
                           <a href="index.html" className="d-inline-block auth-logo">
                           <img src="assets/images/logo-m.webp" alt="" height=""/>
                           </a>
                        </div>
                     </div>
                  </div>
               </div>
               {/* <!--  end row --> */}
               <div className="row justify-content-center">
                  <div className="col-md-8 col-lg-6 col-xl-5">
                     <div className="card mt-4 fadeInDown">
                        <div className="card-body p-4">
                           <div className="text-center mt-2">
                              <h5 className="text-primary">Welcome Back !</h5>
                              <p className="text-muted">Sign in to continue to CCP.</p>
                           </div>
                           <div className="p-2 mt-4">
                              <form action="dashboard.html">
                                 <div className="mb-3 fadeIn second">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input type="text" className="form-control" id="username" placeholder="Enter username"/>
                                 </div>
                                 <div className="mb-3 fadeIn third">
                                    <div className="float-end">
                                       <a href="reset-password.html" className="text-muted">Forgot password?</a>
                                    </div>
                                    <label className="form-label" htmlFor="password-input">Password</label>
                                    <div className="position-relative auth-pass-inputgroup mb-3">
                                       <input type="password" className="form-control pe-5 password-input" placeholder="Enter password" id="password-input"/>
                                       <button className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon" type="button" id="password-addon"><i className="ri-eye-fill align-middle"></i></button>
                                    </div>
                                 </div>
                                 <div className="form-check fadeIn third">
                                    <input className="form-check-input" type="checkbox" value="" id="auth-remember-check"/>
                                    <label className="form-check-label" htmlFor="auth-remember-check">Remember me</label>
                                 </div>
                                 <div className="mt-4 fadeIn fourth">
                                    <a href="/dashboard" className="btn btn-primary w-100 bg-[#687cfe]" type="submit">Sign In</a>
                                 </div>
                              </form>
                           </div>
                        </div>
                        {/* <!--  end card body --> */}
                     </div>
                     {/* <!--  end card --> */}
                  </div>
               </div>
               {/* <!--  end row --> */}
            </div>
            {/* <!--  end container --> */}
         </div>
         {/* <!--  end auth page content --> */}
         
         {/* <!--  footer --> */}
         <footer className="footer w-100">
            <div className="container-fluid">
               <div className="row">
                  <div className="col-sm-6">
                     <script>document.write(new Date().getFullYear())</script> © All Rights Reserved.
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
    )
}