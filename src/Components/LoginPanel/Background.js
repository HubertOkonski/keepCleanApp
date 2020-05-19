import React from "react";
import "css-doodle";
function Background(props) {
  var animationStatus = "running";
  if (props.authenticated) animationStatus = "hidden";
  return (
    <>
      <div
        className="dashboard-background"
        style={
          animationStatus == "hidden"
            ? { background: "#E6E9EF" }
            : { background: "none" }
        }
      ></div>
      <div className="login-background ">
        <css-doodle id={animationStatus}>{`
          :doodle {
            @grid: 10 / 100vw;
          }
          @shape:circle;
          background: hsl(@rand(10, 360), 100%, 95%);
          transform:scale(@rand( 0.1,2));
          animation:slidein infinite alternate 20s linear;
           @size:@rand(20,150px);
           @keyframes slidein {
            from {
              transform: translate(@rand(-20vw,25vw),@rand(-75vh,75vh));

            }
          
            to {
                transform: translate(@rand(-20vw,25vw),@rand(-75vh,75vh));
            }
          }
        `}</css-doodle>
      </div>
    </>
  );
}

export default Background;
