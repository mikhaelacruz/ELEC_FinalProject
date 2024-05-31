import "../CSS/Home.css";
import { DataContext } from "../DataContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TaskContext } from "../contexts/TaskProvider";
import featureImage1 from "../assets/vega.png";
import featureImage2 from "../assets/vegas.jpg";
import featureImage3 from "../assets/vegasa.png";

function Home() {
  const { loggedIn } = useContext(DataContext);
  const { list } = useContext(TaskContext);
  const navigate = useNavigate();
  const [quote, setQuote] = useState("");
  const [onGoingTasks, setOnGoingTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);

  // Fetch a random quote from the Quotable API
  const fetchQuote = async () => {
    try {
      const response = await fetch("https://api.quotable.io/random");
      const data = await response.json();
      setQuote(data.content);
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  };

  // Update task counts
  const updateTaskCounts = () => {
    const ongoing = list.filter((task) => !task.done).length;
    const completed = list.filter((task) => task.done).length;
    setOnGoingTasks(ongoing);
    setCompletedTasks(completed);
  };

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    } else {
      fetchQuote();
      updateTaskCounts();
    }
  }, [loggedIn, navigate, list]);

  return (
    <div className="homeBody">
      {quote && (
        <div className="quoteContainer">
          <div className="label">Quote of the Day</div>
          <blockquote className="quote">
            <p>"{quote}"</p>
          </blockquote>
        </div>
      )}

      <div className="progressBarContainer">
        <div className="progressBar">
          <label htmlFor="on-going-tasks" className="progressLabel">
            On-going Tasks
          </label>
          <progress id="on-going-tasks" value={onGoingTasks} max={list.length}>
            {onGoingTasks}
          </progress>
          <div className="taskPreview">
            {/* Display previews for added tasks here */}
            {list
              .filter((task) => !task.done)
              .map((task) => (
                <div key={task.id}>{task.name}</div>
              ))}
          </div>
        </div>
        <div className="progressBar">
          <label htmlFor="completed-tasks" className="progressLabel">
            Completed Tasks
          </label>
          <progress
            id="completed-tasks"
            value={completedTasks}
            max={list.length}
          >
            {completedTasks}
          </progress>
          <div className="taskPreview">
            {/* Display previews for completed tasks here */}
            {list
              .filter((task) => task.done)
              .map((task) => (
                <div key={task.id}>{task.name}</div>
              ))}
          </div>
        </div>
      </div>

      <div className="featureContent">
        <h2>Welcome to PomoNotes</h2>
        <p>
          We are glad to have you here. Explore our content and enjoy the
          experience!
        </p>
        <div className="imageGallery">
          <img src={featureImage1} alt="Feature 1" className="galleryImage" />
          <img src={featureImage2} alt="Feature 2" className="galleryImage" />
          <img src={featureImage3} alt="Feature 3" className="galleryImage" />
        </div>
        <div className="dateAndTimeContainer">
          <p className="dateAndTime">
            Current Date and Time: {new Date().toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
