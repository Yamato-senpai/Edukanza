import { escapeHtml } from "../utils/auth.shared";

export const inicioHtml = (userName: string, turma: string): string => {
    const dateLabel = "Segunda-feira, 27 de abril de 2026";
    return `
    <div class="edk-row">
      <div>
        <div class="edk-role">ALUNO</div>
        <div class="edk-sub">Bem-vindo de volta</div>
        <h1 class="edk-h1">${escapeHtml(userName)} · <span class="edk-muted">${escapeHtml(turma)}</span></h1>
      </div>
      <div class="edk-row">
        <button class="edk-logout" type="button" data-action="logout">Terminar sessão</button>
        <span class="edk-pill">${escapeHtml(dateLabel)}</span>
      </div>
    </div>

    <section class="edk-stats" aria-label="Indicadores">
      ${stat("Média Geral", "14.8", { tone: "green", text: "+0.6 vs trimestre anterior" }, "escala 0–20")}
      ${stat("Taxa de Presença", "87%", { tone: "red", text: "-3% vs mês passado" }, "este trimestre")}
      ${stat("Trabalhos Pendentes", "3", { tone: "gray", text: "1 urgente" }, "de 7 entregues")}
      ${stat("Disciplinas Activas", "8", { tone: "gray", text: "3.º trimestre 2025" }, "")}
    </section>

    <div class="edk-grid" style="margin-top:14px">
      <section class="edk-card" aria-label="Horário de Hoje">
        <div class="edk-card-in edk-row">
          <div style="font-weight:900">Horário de Hoje</div>
          <div class="edk-muted" style="font-size:12px">Segunda-feira</div>
        </div>
        <div>
          ${scheduleItem("07:30", "09:00", "Matemática", "Prof. Carlos Mendes", "Sala 12", "blue")}
          ${scheduleItem(
        "09:00",
        "10:30",
        "Física",
        "Prof. Ana Rodrigues · A decorrer",
        "Lab. Ciências",
        "green",
        true,
    )}
          ${scheduleItem("10:30", "12:00", "Língua Portuguesa", "Prof. Maria João", "Sala 07", "yellow")}
          ${scheduleItem("12:00", "13:30", "Biologia", "Prof. António Silva", "Lab. Biologia", "red")}
        </div>
      </section>

      <section class="edk-card edk-cal" aria-label="Calendário">
        <div class="edk-cal-head">
          <div class="edk-cal-title">Calendário</div>
          <div class="edk-muted" style="font-size:12px">Abril 2026</div>
        </div>
        ${calendarMini()}
      </section>
    </div>
  `;
};

const stat = (
    title: string,
    value: string,
    chip: { tone: "green" | "red" | "gray"; text: string },
    foot: string,
): string => `
  <div class="edk-stat">
    <div class="edk-stat-top">
      <p class="edk-stat-title">${escapeHtml(title)}</p>
      <div style="width:30px;height:30px;border-radius:12px;background:rgba(37,99,235,.08)"></div>
    </div>
    <div class="edk-stat-value">${escapeHtml(value)}</div>
    <div class="edk-stat-foot">
      <span class="edk-chip" data-tone="${chip.tone}">${escapeHtml(chip.text)}</span>
      ${foot ? `<span class="edk-muted">${escapeHtml(foot)}</span>` : ""}
    </div>
  </div>
`;

const scheduleItem = (
    start: string,
    end: string,
    title: string,
    teacher: string,
    room: string,
    tone: "blue" | "green" | "yellow" | "red",
    highlight = false,
): string => `
  <div class="edk-schedule-item" style="${highlight ? "background:rgba(37,99,235,.06)" : ""}">
    <div class="edk-time">${escapeHtml(start)}<div class="edk-muted" style="font-size:11px;font-weight:800">${escapeHtml(end)}</div></div>
    <span class="edk-dot" data-tone="${tone}" aria-hidden="true" style="margin-top:6px"></span>
    <div class="edk-schedule-meta">
      <p class="edk-schedule-title">${escapeHtml(title)}</p>
      <p class="edk-schedule-sub">${escapeHtml(teacher)}</p>
    </div>
    <div class="edk-right">${escapeHtml(room)}</div>
  </div>
`;

const calendarMini = (): string => {
    const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]
        .map((d) => `<div class="edk-cal-day">${d}</div>`)
        .join("");
    const cells = [
        "",
        "",
        "",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
        "",
        "",
    ]
        .map((v, idx) => {
            const mark = idx === 7 ? "red" : idx === 14 ? "green" : idx === 17 ? "blue" : "";
            return `<div class="edk-cal-cell" data-mark="${mark}">${v}</div>`;
        })
        .join("");
    return `<div class="edk-cal-grid" aria-label="Calendário">${days}${cells}</div>`;
};

