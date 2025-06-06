import React from "react";

export default function Login() {
  const basePath = import.meta.env.BASE_URL;

  // Helper to avoid spawning kitty heads in middle 40%-60% of screen width
  const getRandomLeft = () => {
    const leftSide = Math.random() * 40;        // 0% to 40%
    const rightSide = 60 + Math.random() * 40;  // 60% to 100%
    return Math.random() < 0.5 ? leftSide : rightSide;
  };

  return (
    <div style={styles.page}>
      <div style={styles.loginBox}>
        <img
          src={`${basePath}HKloginLogo.png`}
          alt="Hello Kitty Logo"
          style={styles.logo}
        />

        <input
          type="text"
          placeholder="Username"
          style={styles.input}
          autoComplete="off"
        />
        <input
          type="password"
          placeholder="Password"
          style={styles.input}
          autoComplete="off"
        />

        <button style={styles.button}>Login</button>
      </div>

     {[...Array(16)].map((_, i) => (
  <img
    key={i}
    src={`${basePath}HKloginfloat.png`}
    alt="Floating Kitty Head"
    style={{
      ...styles.floatingHead,
      animationDelay: `${i * 0.8}s`,        // stagger start times
      left: `${getRandomLeft()}%`,
      bottom: `${20 + Math.random() * 100}px`, // random bottom between 20px and 120px so not super bottom
      transform: `rotate(${Math.random() * 60 - 30}deg)`,
      width: "50px",
      animationDuration: `${8 + Math.random() * 4}s`,
    }}
  />
))}


    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    width: "100vw",
    background: "#fce4ec",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    fontFamily: "'Comic Sans MS', cursive, sans-serif",
    margin: 0,
    padding: 0,
  },
  loginBox: {
    background: "#ffb6c1",
    borderRadius: "30px",
    padding: "30px 40px",
    boxShadow: "0 0 15px 5px #f48fb1",
    position: "relative",
    width: "280px",
    textAlign: "center",
    zIndex: 10,
  },
  logo: {
    width: "150px",
    marginBottom: "20px",
    userSelect: "none",
  },
  input: {
    display: "block",
    width: "100%",
    padding: "10px 15px",
    marginBottom: "15px",
    borderRadius: "20px",
    border: "none",
    fontSize: "14px",
    fontFamily: "'Comic Sans MS', cursive, sans-serif",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "25px",
    border: "none",
    backgroundColor: "#f06292",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  floatingHead: {
  position: "fixed",
  animationName: "floatUp",
  animationTimingFunction: "linear",
  animationIterationCount: "infinite",
  pointerEvents: "none",
  userSelect: "none",
  zIndex: 9999,
  // no bottom here, we set it inline per head for random start
},

};
