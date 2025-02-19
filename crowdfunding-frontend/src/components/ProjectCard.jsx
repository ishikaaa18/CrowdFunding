import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  return (
    <div className="card my-3">
      <img 
        src={project.image || "/assets/default-project.jpg"} 
        className="card-img-top" 
        alt={project.title || "Project Image"} 
        onError={(e) => e.target.src = "/assets/default-project.jpg"} // Fallback image if the src fails
      />
      <div className="card-body">
        <h5 className="card-title">{project.title || "Untitled Project"}</h5>
        <p className="card-text">
          {project.description ? 
            project.description.length > 100 
              ? `${project.description.substring(0, 100)}...` 
              : project.description 
            : "No description available."}
        </p>
        <Link to={`/project/${project.id}`} className="btn btn-primary">View Project</Link>
      </div>
    </div>
  );
};

export default ProjectCard;

