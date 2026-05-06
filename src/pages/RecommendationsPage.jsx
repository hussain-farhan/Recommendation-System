import { useEffect, useMemo, useState } from "react";
import { ProjectCard } from "../components/project/ProjectCard";
import { fetchRecommendedProjects } from "../data/projects";
import { readSavedProjectIds, toggleSavedProjectId } from "../utils/savedProjects";

export function RecommendationsPage() {
  const [active, setActive] = useState("All Projects");
  const [savedIds, setSavedIds] = useState(() => readSavedProjectIds());
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    let mounted = true;
    fetchRecommendedProjects(100)
      .then((list) => mounted && setRecommended(list))
      // eslint-disable-next-line no-console
      .catch((err) => console.error(err));
    return () => {
      mounted = false;
    };
  }, []);

  const filtered = useMemo(() => {
    if (active === "All Projects") return recommended;
    return recommended.filter((p) => {
      const score = p.matchScore ?? 0;
      if (active === "Beginner") return score < 85;
      if (active === "Intermediate") return score >= 85 && score < 92;
      if (active === "Advanced") return score >= 92;
      return true;
    });
  }, [active, recommended]);

  return (
    <>
      <h1 className="prs-page-title">Welcome back, Alex</h1>
      <p className="prs-page-lead">
        We&apos;ve curated {recommended.length} projects tailored to your skills and interests
      </p>

      <div className="prs-filters" role="group" aria-label="Filter by difficulty">
        {["All Projects", "Beginner", "Intermediate", "Advanced"].map((label) => (
          <button
            key={label}
            type="button"
            className={`prs-chip${label === active ? " prs-chip--active" : ""}`}
            onClick={() => setActive(label)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="prs-grid">
        {filtered.map((p) => (
          <ProjectCard
            key={p.id}
            project={p}
            saved={savedIds.includes(p.id)}
            onToggleSaved={(id) => setSavedIds(toggleSavedProjectId(id))}
            showScore
          />
        ))}
      </div>
    </>
  );
}
