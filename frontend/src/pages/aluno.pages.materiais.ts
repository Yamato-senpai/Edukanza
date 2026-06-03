import { escapeHtml } from "../utils/auth.shared";
import { icon } from "../utils/aluno.icons";

export const materiaisHtml = (): string => `
  <h1 class="edk-page-title">Materiais de Estudo</h1>
  <div class="edk-accordion">
    ${subjectAcc("Matemática", "MAT12A", 8, [
  cat("Apontamentos", 3, [
    file("Equações do 2º grau - Resumo.pdf", "22 Abr 2026"),
    file("Funções trigonométricas.pdf", "15 Abr 2026"),
    file("Limites e derivadas.pdf", "8 Abr 2026"),
  ]),
  cat("Testes", 2, []),
  cat("Trabalhos", 1, []),
  cat("Slides das Aulas", 2, []),
])}
    ${subjectAcc("Física", "FIS12A", 4, [
  cat("Apontamentos", 2, []),
  cat("Trabalhos", 1, []),
  cat("Slides das Aulas", 1, []),
])}
  </div>
`;

const subjectAcc = (title: string, code: string, filesCount: number, catsHtml: string[]): string => `
  <section class="edk-card edk-acc">
    <div class="edk-acc-head">
      <div class="edk-acc-left">
        <div style="width:38px;height:38px;border-radius:14px;background:rgba(37,99,235,.08)"></div>
        <div>
          <div style="font-weight:900">${escapeHtml(title)}</div>
          <div class="edk-muted" style="font-size:11px;font-weight:800">${escapeHtml(code)}</div>
        </div>
      </div>
      <div class="edk-acc-badge">${filesCount} arquivos</div>
    </div>
    <div class="edk-acc-body">${catsHtml.join("")}</div>
  </section>
`;

const cat = (name: string, count: number, filesHtml: string[]): string => `
  <div class="edk-cat">
    <div>${escapeHtml(name)}</div>
    <div class="edk-muted" style="font-size:12px;font-weight:900">${count}</div>
  </div>
  ${filesHtml.join("")}
`;

const file = (name: string, date: string): string => `
  <div class="edk-file">
    <div>
      <div class="edk-file-name">${escapeHtml(name)}</div>
      <div class="edk-file-meta">${escapeHtml(date)}</div>
    </div>
    <div class="edk-file-actions">
      <button class="edk-smallbtn" type="button" aria-label="Ver">${icon("eye")}</button>
      <button class="edk-smallbtn" type="button" aria-label="Baixar">${icon("download")}</button>
    </div>
  </div>
`;

