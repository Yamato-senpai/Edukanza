import { escapeHtml } from "../utils/auth.shared";
import { ensureAppStyles } from "../utils/app.styles";
import { icon } from "../utils/aluno.icons";
import { avaliacoesHtml } from "./aluno.pages.avaliacoes";
import { inicioHtml } from "./aluno.pages.inicio";
import { materiaisHtml } from "./aluno.pages.materiais";
import { mensagensHtml } from "./aluno.pages.mensagens";

type TabId = "inicio" | "materiais" | "avaliacoes" | "mensagens";

type AlunoAppOptions = {
  userName?: string;
  turma?: string;
  notifications?: number;
  onLogout?: () => void;
  onNewMessage?: () => void;
};

const parseTab = (): TabId => {
  const raw = (typeof window !== "undefined" ? window.location.hash : "").replace("#", "");
  if (raw === "materiais" || raw === "avaliacoes" || raw === "mensagens") return raw;
  return "inicio";
};

const setTab = (tab: TabId): void => {
  if (typeof window === "undefined") return;
  window.location.hash = `#${tab}`;
};

const topbarHtml = (active: TabId, notifications: number, userName: string): string => {
  const tab = (id: TabId, label: string) =>
    `<button class="edk-tab" type="button" data-tab="${id}" data-active="${String(active === id)}">${label}</button>`;

  const initials = userName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");

  const badge = notifications > 0 ? `<span class="edk-badge">${notifications}</span>` : "";

  return `
    <header class="edk-topbar">
      <div class="edk-topbar-in">
        <div class="edk-brand">
          <div class="edk-mark" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 19V6a2 2 0 012-2h10a2 2 0 012 2v13H8a2 2 0 00-2 2Z" stroke="#ffffff" stroke-width="2" stroke-linejoin="round"/>
              <path d="M6 4h12" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          Edukanza
        </div>

        <nav class="edk-tabs" aria-label="Navegação">
          ${tab("inicio", "Início")}
          ${tab("materiais", "Materiais")}
          ${tab("avaliacoes", "Avaliações")}
          ${tab("mensagens", "Mensagens")}
        </nav>

        <div class="edk-top-actions">
          <button class="edk-iconbtn" type="button" aria-label="Notificações" data-action="notifications">
            ${icon("bell")}${badge}
          </button>
          <div class="edk-user">
            <div class="edk-avatar" aria-hidden="true">${escapeHtml(initials || "U")}</div>
            <div class="edk-user-name edk-hide-sm">${escapeHtml(userName)}</div>
            <span class="edk-hide-sm" aria-hidden="true">${icon("chevDown")}</span>
          </div>
        </div>
      </div>
    </header>
  `;
};

const pageShell = (active: TabId, options: Required<AlunoAppOptions>, contentHtml: string): string =>
  `<div class="edk-app">${topbarHtml(active, options.notifications, options.userName)}<main class="edk-page">${contentHtml}</main></div>`;

const contentByTab = (tab: TabId, options: Required<AlunoAppOptions>): string => {
  if (tab === "materiais") return materiaisHtml();
  if (tab === "avaliacoes") return avaliacoesHtml();
  if (tab === "mensagens") return mensagensHtml();
  return inicioHtml(options.userName, options.turma);
};

export const mountAlunoApp = (
  container: HTMLElement,
  options: AlunoAppOptions = {},
): { unmount: () => void } => {
  ensureAppStyles();

  const opts: Required<AlunoAppOptions> = {
    userName: options.userName ?? "João Ferreira",
    turma: options.turma ?? "12.ª A",
    notifications: options.notifications ?? 2,
    onLogout: options.onLogout ?? (() => { }),
    onNewMessage: options.onNewMessage ?? (() => { }),
  };

  const previous = container.innerHTML;
  const onHash = () => render();

  const render = (): void => {
    const tab = parseTab();
    container.innerHTML = pageShell(tab, opts, contentByTab(tab, opts));

    const tabs = Array.from(container.querySelectorAll<HTMLButtonElement>("[data-tab]"));
    for (const btn of tabs) {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-tab");
        if (id === "inicio" || id === "materiais" || id === "avaliacoes" || id === "mensagens") {
          setTab(id);
        }
      });
    }

    const logout = container.querySelector<HTMLButtonElement>('[data-action="logout"]');
    logout?.addEventListener("click", () => opts.onLogout());

    const newMessage = container.querySelector<HTMLButtonElement>('[data-action="newMessage"]');
    newMessage?.addEventListener("click", () => opts.onNewMessage());
  };

  if (typeof window !== "undefined") window.addEventListener("hashchange", onHash);
  if (typeof window !== "undefined" && !window.location.hash) setTab("inicio");
  render();

  return {
    unmount: () => {
      if (typeof window !== "undefined") window.removeEventListener("hashchange", onHash);
      container.innerHTML = previous;
    },
  };
};

if (typeof window !== "undefined" && typeof document !== "undefined") {
  const boot = () => mountAlunoApp(document.body);
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
}

