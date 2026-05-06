import { useEffect, useMemo, useState } from "react";
import { ProjectCard } from "../components/project/ProjectCard";
import { fetchProjects } from "../data/projects";
import { readSavedProjectIds, toggleSavedProjectId } from "../utils/savedProjects";

export function SavedProjectsPage() {
  const [savedIds, setSavedIds] = useState(() => readSavedProjectIds());
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    let mounted = true;
    fetchProjects()
      .then((list) => mounted && setProjects(list))
      // eslint-disable-next-line no-console
      .catch((err) => console.error(err));
    return () => {
      mounted = false;
    };
  }, []);

  const savedProjects = useMemo(() => {
    const set = new Set(savedIds);
    return projects.filter((p) => set.has(p.id));
  }, [savedIds, projects]);

  return (
    <>
      <h1 className="prs-page-title">Saved Projects</h1>
      <p className="prs-page-lead">Projects you bookmarked to revisit later.</p>

      <div className="prs-grid">
        {savedProjects.map((p) => (
          <ProjectCard
            key={p.id}
            project={p}
            saved={savedIds.includes(p.id)}
            onToggleSaved={() => setSavedIds(toggleSavedProjectId(p.id))}
            showScore
          />
        ))}
      </div>

      {savedProjects.length === 0 && (
        <p className="prs-page-lead">No saved projects yet. Bookmark a project to see it here.</p>
      )}
    </>
  );
}
