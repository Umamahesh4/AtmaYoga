import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [activeTab, setActiveTab] = useState("login");
  const navigate = useNavigate();
  const { login } = useAuth();

  // Login states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Signup states
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Validation errors
  const [errors, setErrors] = useState({});

  // Form-level messages
  const [loginMessage, setLoginMessage] = useState(null);
  const [signupMessage, setSignupMessage] = useState(null);

  // Email regex
  const validateEmail = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  // Password validation
  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
      length: password.length >= minLength,
      uppercase: hasUpperCase,
      lowercase: hasLowerCase,
      number: hasNumber,
      special: hasSpecial,
      isValid:
        password.length >= minLength &&
        hasUpperCase &&
        hasLowerCase &&
        hasNumber &&
        hasSpecial,
    };
  };

  // Handle Login Submit
  const handleLogin = async (e) => {
    e.preventDefault();
    let newErrors = {};
    setLoginMessage(null);

    if (!loginEmail) newErrors.loginEmail = "Email cannot be empty";
    else if (!validateEmail(loginEmail)) newErrors.loginEmail = "Invalid email";

    if (!loginPassword) newErrors.loginPassword = "Password cannot be empty";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: loginEmail,
            password: loginPassword,
            remember: rememberMe,
          }),
          credentials: "include",
        });
        const data = await response.json();

        if (response.ok) {
          setLoginMessage({ type: "success", text: data.message });
          login(data.user);
          navigate("/");
        } else {
          setLoginMessage({ type: "error", text: data.message });
        }
      } catch (err) {
        setLoginMessage({ type: "error", text: "Error connecting to server" });
        console.error(err);
      }
    }
  };

  // Handle Signup Submit
  const handleSignup = async (e) => {
    e.preventDefault();
    let newErrors = {};
    setSignupMessage(null);
    const passwordCheck = validatePassword(signupPassword);

    if (!signupName) newErrors.signupName = "Name cannot be empty";
    if (!signupEmail) newErrors.signupEmail = "Email cannot be empty";
    else if (!validateEmail(signupEmail))
      newErrors.signupEmail = "Invalid email";

    if (!signupPassword) newErrors.signupPassword = "Password cannot be empty";
    else if (!passwordCheck.isValid) newErrors.signupPassword = "Weak password";

    if (signupPassword !== signupConfirmPassword)
      newErrors.signupConfirmPassword = "Passwords do not match";

    if (!termsAccepted)
      newErrors.terms = "You must accept Terms and Privacy Policy";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch(
          "http://localhost:5000/api/auth/register",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: signupName,
              email: signupEmail,
              password: signupPassword,
            }),
            credentials: "include", // Important to send cookies
          }
        );
        const data = await response.json();

        if (response.ok) {
          setSignupMessage({ type: "success", text: data.message });
          login(data.user);
          setActiveTab("login");
        } else {
          setSignupMessage({ type: "error", text: data.message });
        }
      } catch (err) {
        setSignupMessage({ type: "error", text: "Error connecting to server" });
        console.error(err);
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Visual Section */}
        <div className="auth-visual">
          <h1>Discover Your Inner Peace</h1>
          <p>
            Join AtmaYoga to begin a transformative journey that harmonizes your
            mind, body, and spirit.
          </p>
          <div className="auth-quote">
            "Yoga is the journey of the self, through the self, to the self." -
            The Bhagavad Gita
          </div>
        </div>

        {/* Tabs */}
        <div className="auth-forms">
          <div className="auth-header">
            <div className="auth-tabs">
              <button
                className={`auth-tab ${activeTab === "login" ? "active" : ""}`}
                onClick={() => setActiveTab("login")}
              >
                Login
              </button>
              <button
                className={`auth-tab ${activeTab === "signup" ? "active" : ""}`}
                onClick={() => setActiveTab("signup")}
              >
                Sign Up
              </button>
            </div>
          </div>

          {/* Login Form */}
          {activeTab === "login" && (
            <form className="auth-form" onSubmit={handleLogin} noValidate>
              <h2>Welcome Back</h2>
              <p>Enter your credentials to continue your yoga journey</p>

              {/* Form-level message */}
              {loginMessage && (
                <div
                  className={`form-message ${
                    loginMessage.type === "success" ? "success" : "error"
                  }`}
                >
                  {loginMessage.text}
                </div>
              )}

              <div className="form-group">
                <label>Email</label>
                <div className="input-icon">
                  <i className="fas fa-envelope"></i>
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="Your email address"
                  />
                </div>
                {errors.loginEmail && (
                  <div className="form-validation">{errors.loginEmail}</div>
                )}
              </div>

              <div className="form-group">
                <label>Password</label>
                <div className="input-icon">
                  <i className="fas fa-lock"></i>
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Your password"
                  />
                </div>
                {errors.loginPassword && (
                  <div className="form-validation">{errors.loginPassword}</div>
                )}
              </div>

              <div className="form-options">
                <label>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />{" "}
                  Remember me
                </label>
                <a href="#" className="forgot-password">
                  Forgot password?
                </a>
              </div>

              <button type="submit" className="btn btn-primary btn-block">
                Login
              </button>
            </form>
          )}

          {/* Signup Form */}
          {activeTab === "signup" && (
            <form className="auth-form" onSubmit={handleSignup} noValidate>
              <h2>Create Account</h2>
              <p>Join our community and begin your yoga journey</p>

              {/* Form-level message */}
              {signupMessage && (
                <div
                  className={`form-message ${
                    signupMessage.type === "success" ? "success" : "error"
                  }`}
                >
                  {signupMessage.text}
                </div>
              )}

              <div className="form-group">
                <label>Full Name</label>
                <div className="input-icon">
                  <i className="fas fa-user"></i>
                  <input
                    type="text"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    placeholder="Your full name"
                  />
                </div>
                {errors.signupName && (
                  <div className="form-validation">{errors.signupName}</div>
                )}
              </div>

              <div className="form-group">
                <label>Email</label>
                <div className="input-icon">
                  <i className="fas fa-envelope"></i>
                  <input
                    type="email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    placeholder="Your email address"
                  />
                </div>
                {errors.signupEmail && (
                  <div className="form-validation">{errors.signupEmail}</div>
                )}
              </div>

              <div className="form-group">
                <label>Password</label>
                <div className="input-icon">
                  <i className="fas fa-lock"></i>
                  <input
                    type="password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    placeholder="Create a password"
                  />
                </div>
                {errors.signupPassword && (
                  <div className="form-validation">{errors.signupPassword}</div>
                )}
              </div>

              <div className="form-group">
                <label>Confirm Password</label>
                <div className="input-icon">
                  <i className="fas fa-lock"></i>
                  <input
                    type="password"
                    value={signupConfirmPassword}
                    onChange={(e) => setSignupConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                  />
                </div>
                {errors.signupConfirmPassword && (
                  <div className="form-validation">
                    {errors.signupConfirmPassword}
                  </div>
                )}
              </div>

              <div className="form-agreement">
                <div className="checkbox-container">
                  <label>
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={() => setTermsAccepted(!termsAccepted)}
                    />{" "}
                    I agree to the Terms of Service & Privacy Policy
                  </label>
                  {errors.terms && (
                    <div className="form-validation show">{errors.terms}</div>
                  )}
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-block">
                Create Account
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
