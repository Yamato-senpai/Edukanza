import { escapeHtml } from "./auth.shared";

export const avaliacoesHtml = (): string => `
  <div class="edk-row" style="margin-bottom:10px">
    <div>
      <div class="edk-role">ALUNO</div>
      <h1 class="edk-page-title" style="margin:4px 0 0">Avaliações</h1>
    </div>
    <button class="edk-logout" type="button" data-action="logout">Terminar sessão</button>
  </div>
  <div class="edk-list">
    ${avaliacaoItem("Matemática · Teste", "2 Mai 2026", "Concluído", "green", "16.5/20")}
    ${avaliacaoItem("Física · Exame", "15 Mai 2026", "Agendado", "yellow", "")}
    ${avaliacaoItem("Português · Trabalho", "10 Mai 2026", "Concluído", "green", "18/20")}
    ${avaliacaoItem("Biologia · Teste", "20 Mai 2026", "Agendado", "yellow", "")}
  </div>
`;

const avaliacaoItem = (
    title: string,
    date: string,
    status: string,
    tone: "green" | "yellow",
    grade: string,
): string => `
  <section class="edk-card edk-item">
    <div class="edk-item-row">
      <div>
        <p class="edk-item-title">${escapeHtml(title)}</p>
        <p class="edk-item-sub">${escapeHtml(date)}</p>
      </div>
      <div class="edk-row">
        <span class="edk-pill2" data-tone="${tone}">${escapeHtml(status)}</span>
        ${grade ? `<span class="edk-grade">${escapeHtml(grade)}</span>` : ""}
      </div>
    </div>
  </section>
`;

