import { useState, type CSSProperties } from "react";
import { roadmapGroupLabels, roadmapMonths, roadmapRows, type RoadmapMilestone, type RoadmapRow } from "../data/roadmap";
import { avatarAsset, Footer } from "./shared";

const roadmapMonthIndex = new Map<string, number>(roadmapMonths.map((month, index) => [month.key, index]));
const roadmapYearRanges = roadmapMonths.reduce<Array<{ year: string; start: number; end: number }>>((ranges, month, index) => {
  const current = ranges[ranges.length - 1];
  if (current?.year === month.year) {
    current.end = index;
  } else {
    ranges.push({ year: month.year, start: index, end: index });
  }
  return ranges;
}, []);

const roadmapStatusLabels: Record<RoadmapMilestone["status"], string> = {
  planned: "Planned",
  "in-progress": "In progress",
  live: "Live",
  delayed: "Delayed",
  completed: "Completed",
  "source-needed": "Source needed",
};

const roadmapPageHiddenRowIds = new Set<RoadmapRow["id"]>([
  "public-l1-governance",
  "community-terraport",
  "community-sdk",
  "community-selenium",
  "community-garuda",
]);

function readTimelineMetric(element: HTMLElement, property: string) {
  return Number.parseFloat(getComputedStyle(element).getPropertyValue(property)) || 0;
}

function getMilestoneColumns(milestone: RoadmapMilestone) {
  const start = roadmapMonthIndex.get(milestone.start) ?? 0;
  const end = roadmapMonthIndex.get(milestone.end) ?? start;
  return `${start + 1} / ${end + 2}`;
}

function getMilestoneStack(milestones: RoadmapMilestone[]) {
  const levelEnds: number[] = [];
  const levels = new Map<string, number>();

  milestones.forEach((milestone) => {
    const start = roadmapMonthIndex.get(milestone.start) ?? 0;
    const end = roadmapMonthIndex.get(milestone.end) ?? start;
    const level = levelEnds.findIndex((levelEnd) => start > levelEnd);
    const stackLevel = level >= 0 ? level : levelEnds.length;

    levelEnds[stackLevel] = end;
    levels.set(milestone.title, stackLevel);
  });

  return { levels, span: Math.max(1, levelEnds.length) };
}

function RoadmapAxis({ scrollLeft }: { scrollLeft: number }) {
  return (
    <div className="roadmap-axis-shell" style={{ "--roadmap-scroll-left": `${scrollLeft}px` } as CSSProperties} aria-hidden="true">
      <div className="roadmap-axis__corner" />
      <div className="roadmap-axis__track">
        {roadmapYearRanges.map((range) => (
          <div
            className={`roadmap-axis__year tc-type-h2${range.start === 0 ? " roadmap-axis__year--first" : ""}`}
            style={{ gridColumn: `${range.start + 1} / ${range.end + 2}` }}
            key={range.year}
          >
            {range.year}
          </div>
        ))}
        {roadmapMonths.map((month, index) => (
          <div className={`roadmap-axis__month tc-type-body-small${index === 0 ? " roadmap-axis__month--first" : ""}`} style={{ gridColumn: index + 1 }} key={month.key}>
            {month.label}
          </div>
        ))}
      </div>
    </div>
  );
}

function RoadmapGroupHeader({ group }: { group: RoadmapRow["group"] }) {
  const label = roadmapGroupLabels[group];
  return (
    <div className={`roadmap-group roadmap-group--${group}`}>
      <div className="roadmap-group__label">
        <span className="native-phase__badge">{group === "public" ? "PUBLIC" : "PROJECT-SUBMITTED"}</span>
      </div>
      <div className="roadmap-group__copy">
        <h2 className="tc-type-h4">{label.title}</h2>
        <p className="tc-type-body-small">{label.description}</p>
      </div>
    </div>
  );
}

function RoadmapProjectRow({
  row,
  visibleLaneStartPx,
  monthWidth,
  activeTooltip,
  onToggleTooltip,
}: {
  row: RoadmapRow;
  visibleLaneStartPx: number;
  monthWidth: number;
  activeTooltip: string | null;
  onToggleTooltip: (id: string) => void;
}) {
  const milestoneStack = getMilestoneStack(row.milestones);
  const tooltipOpen = activeTooltip === row.id;

  return (
    <article className={`roadmap-row roadmap-row--${row.group}`} style={{ "--roadmap-accent": row.accent } as CSSProperties}>
      <div className="roadmap-row__project">
        <button
          className="roadmap-row__avatar tc-type-link-big"
          type="button"
          aria-label={`Show ${row.project} details`}
          aria-expanded={tooltipOpen}
          aria-describedby={tooltipOpen ? `${row.id}-tooltip` : undefined}
          onClick={() => onToggleTooltip(row.id)}
        >
          {row.avatar ? <img src={avatarAsset(row.avatar)} alt="" loading="lazy" /> : row.shortName}
        </button>
        <span className="roadmap-row__identity">
          <strong className="tc-type-h5">{row.project}</strong>
          <small className="tc-type-body-very-small">{row.category}</small>
        </span>
        <span className={`roadmap-row__tooltip${tooltipOpen ? " roadmap-row__tooltip--open" : ""}`} id={`${row.id}-tooltip`} role="tooltip">
          <strong>{row.project}</strong>
          <small>{row.category}</small>
        </span>
      </div>
      <div className="roadmap-lane">
        {roadmapMonths.map((month) => <span className="roadmap-lane__month" key={`${row.id}-${month.key}`} aria-hidden="true" />)}
        {row.milestones.map((milestone) => {
          const startIndex = roadmapMonthIndex.get(milestone.start) ?? 0;
          const startsBeforeVisibleLane = visibleLaneStartPx > 0 && startIndex * monthWidth < visibleLaneStartPx + 32;
          const stackLevel = milestoneStack.levels.get(milestone.title) ?? 0;

          return (
            <div
              className={`roadmap-milestone${startsBeforeVisibleLane ? " roadmap-milestone--meta-hidden" : ""}`}
              style={{
                "--roadmap-stack": stackLevel,
                "--roadmap-stack-span": milestoneStack.span,
                gridColumn: getMilestoneColumns(milestone),
              } as CSSProperties}
              key={`${row.id}-${milestone.title}`}
            >
              <div className="roadmap-milestone__meta">
                <strong>{milestone.title}</strong>
                <span>{roadmapStatusLabels[milestone.status]}</span>
                {milestone.paid && <em>Paid entry</em>}
              </div>
              <span className={`roadmap-milestone__bar roadmap-milestone__bar--${milestone.status}`} />
            </div>
          );
        })}
      </div>
    </article>
  );
}

function RoadmapTimeline() {
  const pageRows = roadmapRows.filter((row) => !roadmapPageHiddenRowIds.has(row.id));
  const publicRows = pageRows.filter((row) => row.group === "public");
  const communityRows = pageRows.filter((row) => row.group === "community");
  const [timelineMetrics, setTimelineMetrics] = useState({ monthWidth: 248, scrollLeft: 0 });
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const visibleLaneStartPx = timelineMetrics.scrollLeft;

  const handleTimelineScroll = (event: { currentTarget: HTMLDivElement }) => {
    const element = event.currentTarget;
    setTimelineMetrics({
      monthWidth: readTimelineMetric(element, "--roadmap-month-width"),
      scrollLeft: element.scrollLeft,
    });
  };

  const handleProjectTooltipToggle = (id: string) => {
    setActiveTooltip((active) => (active === id ? null : id));
  };

  return (
    <section className="roadmap-board" aria-labelledby="roadmap-board-title">
      <h2 className="visually-hidden" id="roadmap-board-title">Decentralized roadmap</h2>
      <RoadmapAxis scrollLeft={timelineMetrics.scrollLeft} />
      <div className="roadmap-scroll" role="region" aria-label="Horizontally scrollable Terra Classic roadmap" tabIndex={0} onScroll={handleTimelineScroll}>
        <div className="roadmap-grid">
          <RoadmapGroupHeader group="public" />
          {publicRows.map((row) => (
            <RoadmapProjectRow
              row={row}
              visibleLaneStartPx={visibleLaneStartPx}
              monthWidth={timelineMetrics.monthWidth}
              activeTooltip={activeTooltip}
              onToggleTooltip={handleProjectTooltipToggle}
              key={row.id}
            />
          ))}
          <RoadmapGroupHeader group="community" />
          {communityRows.map((row) => (
            <RoadmapProjectRow
              row={row}
              visibleLaneStartPx={visibleLaneStartPx}
              monthWidth={timelineMetrics.monthWidth}
              activeTooltip={activeTooltip}
              onToggleTooltip={handleProjectTooltipToggle}
              key={row.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function RoadmapPage() {
  return (
    <>
      <section className="roadmap-page" id="top" aria-labelledby="roadmap-page-title">
        <div className="roadmap-page__intro">
          <div className="roadmap-page__copy">
            <h1 className="tc-type-h1" id="roadmap-page-title">Terra Classic roadmap</h1>
            <p className="tc-type-h4">A source-aware timeline for core protocol work and project-submitted L2 / community milestones, so users can see what is being built, what is live, and what still needs verification.</p>
          </div>
          <div className="roadmap-page__trust">
            <span className="native-phase__badge">UPDATED MAY 21, 2026</span>
          </div>
        </div>
        <RoadmapTimeline />
      </section>
      <Footer />
    </>
  );
}
