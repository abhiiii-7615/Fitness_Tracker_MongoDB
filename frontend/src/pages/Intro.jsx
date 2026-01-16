import React from "react";
import { useNavigate } from "react-router-dom";
import "./intro.css";
import  "../assets/exercise.jpeg";
const Intro = () => {
  const navigate = useNavigate();

  return (
    <div className="intro-container">
      <nav className="navbar">
        <h1 className="nav-title">Health & Fitness Tracker</h1>
        <div className="nav-buttons">
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/register")}>Register</button>
        </div>
      </nav>

      <header className="intro-header">
        <h2>Transform Your Lifestyle</h2>
        <p>Track, optimize, and conquer your health goals.</p>
      </header>

      <section className="features">
        <h3>Features</h3>
        <div className="feature-card">
          <div className="feature-image"> <img src="https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/04/how-much-water-should-you-drink-per-day-1296x728-feature.jpg?h=1528" alt="water"/></div>
          <div className="feature-text">
            <h4>💧 Water Intake Tracker</h4>
            <p>Stay hydrated daily with reminders and tracking features. See weekly stats and hydration tips.</p>
          </div>
        </div>

        <div className="feature-card">
          <div className="feature-image"> <img src="https://www.sleepfoundation.org/wp-content/uploads/2009/04/healthy-sleep-tips-1.jpg" alt="sleep"/></div>
          <div className="feature-text">
            <h4>😴 Sleep Tracker</h4>
            <p>Track your sleep hours and patterns. Discover insights to improve your sleep quality over time.</p>
          </div>
        </div>

        <div className="feature-card">
          <div className="feature-image"> <img src="https://www.tgfitness.com/wp-content/uploads/2023/01/BMI-and-BMR-calculator.png" alt="bmi"/></div>
          <div className="feature-text">
            <h4>📏 BMI & BMR Calculator</h4>
            <p>Calculate your body mass and metabolism rate. Get tips based on your body profile and goals.</p>
          </div>
        </div>

        <div className="feature-card">
          <div className="feature-image"><img src="https://m.media-amazon.com/images/I/71bB3iwFs1L._AC_UF1000,1000_QL80_.jpg" alt="calorie"/> </div>
          <div className="feature-text">
            <h4>🔥 Calorie Counter</h4>
            <p>Monitor your calorie intake and expenditure. Get breakdowns by food, meal, and activity.</p>
          </div>
        </div>

        <div className="feature-card">
          <div className="feature-image"><img src="https://static01.nyt.com/images/2024/10/31/well/31WELL-NL-PROCESS-GOALS/31WELL-NL-PROCESS-GOALS-videoSixteenByNine3000.jpg" alt="goal"/> </div>
          <div className="feature-text">
            <h4>🎯 Goal Reminders</h4>
            <p>Set personalized health goals and receive daily motivational nudges to stay on track.</p>
          </div>
        </div>
      </section>

      <section className="motivation">
        <h3>Why You Should Start Today</h3>
        <blockquote>
          "Take care of your body. It’s the only place you have to live." <br /> — Jim Rohn
        </blockquote>
        <blockquote>
          "Fitness is not about being better than someone else. It’s about being better than you used to be."
        </blockquote>
      </section>
    </div>
  );
};

export default Intro;
