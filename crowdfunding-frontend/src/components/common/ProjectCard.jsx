import { Link } from "react-router-dom";
import { useState } from "react";

const ProjectCard = ({ project }) => {
  const [imgSrc, setImgSrc] = useState(project.image || "/assets/default-project.jpg");

  // Calculate Funding Progress
  const progress = project.raised && project.goal 
    ? Math.min((project.raised / project.goal) * 100, 100) 
    : 0; 

  return (
    <Link to={`/project/${project.id}`} className="text-decoration-none">
      <div className="card my-3 shadow-sm hover-effect">
        {/* Project Image */}
        <img 
          src={imgSrc} 
          className="card-img-top" 
          alt={project.title || "Project Image"} 
          onError={() => setImgSrc("/assets/default-project.jpg")} // More reliable fallback
        />

        {/* Card Body */}
        <div className="card-body">
          <h5 className="card-title text-dark">{project.title || "Untitled Project"}</h5>
          <p className="card-text text-muted">
            {project.description ? 
              project.description.length > 100 
                ? `${project.description.substring(0, 100)}...` 
                : project.description 
              : "No description available."
            }
          </p>

          {/* Funding Progress Bar */}
          {project.raised && project.goal && (
            <div className="progress my-2">
              <div 
                className="progress-bar" 
                role="progressbar" 
                style={{ width: `${progress}%` }} 
                aria-valuenow={progress} 
                aria-valuemin="0" 
                aria-valuemax="100"
              >
                {Math.round(progress)}%
              </div>
            </div>
          )}

          {/* Funding Amount */}
          <p className="text-dark">
            <strong>₹{project.raised?.toLocaleString() || "0"}</strong> raised of ₹{project.goal?.toLocaleString() || "N/A"}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;

