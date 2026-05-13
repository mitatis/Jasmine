import type { QualityReportRead } from "@/lib/types";

export function QualityScoreCard({ report }: { report: QualityReportRead }) {
  const rows = [
    ["服装保真", report.garment_fidelity_score],
    ["身份一致", report.identity_consistency_score],
    ["身体自然", report.body_naturalness_score],
    ["社媒质感", report.social_media_quality_score],
    ["品牌安全", report.brand_safety_score],
  ];

  return (
    <div className="rounded-md border bg-white p-4">
      <div className="flex items-end justify-between">
        <div>
          <div className="text-xs text-muted-foreground">Quality Report</div>
          <div className="mt-1 text-3xl font-semibold">{report.overall_score}</div>
        </div>
        <span className="rounded-md bg-foreground px-2 py-1 text-xs text-background">{report.recommendation}</span>
      </div>
      <div className="mt-4 grid gap-2">
        {rows.map(([label, score]) => (
          <div key={label} className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{label}</span>
            <span>{score}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
