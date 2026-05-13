import { MvpShell } from "@/components/layout/mvp-shell";

export default function AdminUsersPage() {
  return (
    <MvpShell title="管理后台：用户" description="用户列表接口已预留，v0.1 重点完成生成任务和模型调用审计。">
      <div className="rounded-md border bg-white p-5 text-sm text-muted-foreground">后续接入用户搜索、禁用和资产删除流程。</div>
    </MvpShell>
  );
}
