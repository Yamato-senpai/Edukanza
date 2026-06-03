export type ProfileId = "aluno" | "encarregado" | "professor";

export { ensureAuthStyles } from "./auth.styles";

export type ProfileMeta = {
    id: ProfileId;
    title: string;
    description: string;
    accent: "blue" | "green" | "purple";
    icon: "user" | "shield" | "cap";
};

export const profiles: ProfileMeta[] = [
    {
        id: "aluno",
        title: "Aluno",
        description: "Acesso às aulas, materiais e trabalhos",
        accent: "blue",
        icon: "user",
    },
    {
        id: "encarregado",
        title: "Encarregado",
        description: "Acompanhe notas e desempenho",
        accent: "green",
        icon: "shield",
    },
    {
        id: "professor",
        title: "Professor",
        description: "Gerir turmas, materiais e avaliações",
        accent: "purple",
        icon: "cap",
    },
];

export const escapeHtml = (value: string): string =>
    value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");

export const buildShellHtml = (brandName: string, contentHtml: string): string => `
  <div class="edk-shell">
    <header class="edk-topbar">
      <div class="edk-logo" aria-hidden="true"></div>
      <div class="edk-brand">${escapeHtml(brandName)}</div>
    </header>
    <main class="edk-main">
      <div class="edk-card">
        ${contentHtml}
      </div>
    </main>
  </div>
`;

export const iconSvg = (name: ProfileMeta["icon"], accent: ProfileMeta["accent"]): string => {
    const color =
        accent === "green" ? "#16A34A" : accent === "purple" ? "#7C3AED" : "#2563EB";
    const common =
        'width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"';

    if (name === "user") {
        return `<svg ${common}><path d="M20 21c0-3.314-3.582-6-8-6s-8 2.686-8 6" stroke="${color}" stroke-width="2" stroke-linecap="round"/><path d="M12 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" stroke="${color}" stroke-width="2"/></svg>`;
    }

    if (name === "shield") {
        return `<svg ${common}><path d="M12 2l8 4v6c0 5-3.4 9.4-8 10-4.6-.6-8-5-8-10V6l8-4Z" stroke="${color}" stroke-width="2" stroke-linejoin="round"/></svg>`;
    }

    return `<svg ${common}><path d="M3 7l9-4 9 4-9 4-9-4Z" stroke="${color}" stroke-width="2" stroke-linejoin="round"/><path d="M7 10v6c0 1.8 2.2 4 5 4s5-2.2 5-4v-6" stroke="${color}" stroke-width="2" stroke-linecap="round"/><path d="M21 10v5" stroke="${color}" stroke-width="2" stroke-linecap="round"/></svg>`;
};

export const buildProfileCardsHtml = (selected: ProfileId | null): string =>
    profiles
        .map((p) => {
            const isSelected = selected === p.id;
            return `
        <button class="edk-profile" type="button" data-profile="${p.id}" data-selected="${String(isSelected)}" aria-pressed="${String(isSelected)}">
          <div class="edk-profile-top">
            <div class="edk-ico" data-accent="${p.accent}" aria-hidden="true">${iconSvg(p.icon, p.accent)}</div>
            <div>
              <p class="edk-profile-title">${escapeHtml(p.title)}</p>
              <p class="edk-profile-desc">${escapeHtml(p.description)}</p>
            </div>
          </div>
        </button>
      `;
        })
        .join("");

export const setError = (container: HTMLElement, message: string | null): void => {
    const el = container.querySelector<HTMLParagraphElement>('[data-edk-error="1"]');
    if (!el) return;
    el.textContent = message ?? "";
    el.setAttribute("data-show", String(Boolean(message)));
};

export const getSelectedProfile = (container: HTMLElement): ProfileId | null => {
    const pressed = container.querySelector<HTMLButtonElement>(
        '.edk-profile[data-selected="true"]',
    );
    const value = pressed?.getAttribute("data-profile");
    if (value === "aluno" || value === "encarregado" || value === "professor") return value;
    return null;
};

export const setSelectedProfile = (container: HTMLElement, profile: ProfileId | null): void => {
    const buttons = Array.from(
        container.querySelectorAll<HTMLButtonElement>(".edk-profile[data-profile]"),
    );
    for (const btn of buttons) {
        const id = btn.getAttribute("data-profile");
        const isSelected = profile !== null && id === profile;
        btn.setAttribute("data-selected", String(isSelected));
        btn.setAttribute("aria-pressed", String(isSelected));
    }
};

export const bindProfilePicker = (
    container: HTMLElement,
    onChange: (p: ProfileId) => void,
): void => {
    const buttons = Array.from(
        container.querySelectorAll<HTMLButtonElement>(".edk-profile[data-profile]"),
    );
    for (const btn of buttons) {
        btn.addEventListener("click", () => {
            const id = btn.getAttribute("data-profile");
            if (id === "aluno" || id === "encarregado" || id === "professor") onChange(id);
        });
    }
};

