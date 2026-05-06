import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RecommendationBanner } from "../components/project/RecommendationBanner";
import { ProjectCard } from "../components/project/ProjectCard";
import { fetchProjects, fetchRecommendedProjects } from "../data/projects";
import FAQSection from "../components/landing/FAQSection";

export function HomePage() {
  const [top, setTop] = useState([]);
  const [projectCount, setProjectCount] = useState(0);

  useEffect(() => {
    let mounted = true;

    Promise.all([fetchRecommendedProjects(3), fetchProjects()])
      .then(([recommended, all]) => {
        if (!mounted) return;
        setTop(recommended);
        setProjectCount(all.length);
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.error(err));

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <h1 className="prs-page-title">Overview</h1>
      <p className="prs-page-lead">
        Curated project briefs ranked for your team. Start from top matches or
        browse the full catalog.
      </p>

      <div className="prs-stats" aria-label="Summary">
        <div className="prs-stat">
          <span className="prs-stat__value">{projectCount}</span>
          <span className="prs-stat__label">Active briefs</span>
        </div>
        <div className="prs-stat">
          <span className="prs-stat__value">94%</span>
          <span className="prs-stat__label">Avg. fit (top 5)</span>
        </div>
        <div className="prs-stat">
          <span className="prs-stat__value">12</span>
          <span className="prs-stat__label">Saved this week</span>
        </div>
      </div>

      <RecommendationBanner />

      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: "1rem",
          flexWrap: "wrap",
          marginBottom: "1rem",
        }}
      >
        <h2
          className="prs-page-title"
          style={{ margin: 0, fontSize: "1.15rem" }}
        >
          Top matches
        </h2>
        <Link to="/projects" className="prs-button prs-button--ghost">
          Browse all
        </Link>
      </div>

      <div className="prs-grid prs-grid--tight">
        {top.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>

      <div style={{ marginTop: "4rem" }}>
        <FAQSection />
      </div>
    </>
  );
}
