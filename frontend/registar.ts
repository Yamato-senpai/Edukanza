import {
  bindProfilePicker,
  buildProfileCardsHtml,
  buildShellHtml,
  ensureAuthStyles,
  getSelectedProfile,
  ProfileId,
  setError,
  setSelectedProfile,
} from "./auth.shared";

type RegisterPayload = {
  profile: ProfileId;
  fullName: string;
  email: string;
  password: string;
};

type RegisterPageOptions = {
  brandName?: string;
  onSubmit?: (payload: RegisterPayload) => void;
  onNavigate?: (to: "login") => void;
};

const buildRegisterHtml = (selected: ProfileId | null): string => `
  <h1 class="edk-title">Criar Conta</h1>
  <p class="edk-subtitle">Escolha o seu perfil e preencha os dados para registar.</p>

  <section class="edk-profiles" aria-label="Perfis">
    ${buildProfileCardsHtml(selected)}
  </section>

  <p class="edk-error" data-edk-error="1"></p>

  <form class="edk-form" data-edk-form="1" novalidate>
    <div class="edk-field">
      <label for="edk-fullName">Nome completo</label>
      <input id="edk-fullName" name="fullName" autocomplete="name" inputmode="text" required />
    </div>

    <div class="edk-field">
      <label for="edk-email">Email</label>
      <input id="edk-email" name="email" type="email" autocomplete="email" inputmode="email" required />
    </div>

    <div class="edk-row">
      <div class="edk-field">
        <label for="edk-password">Palavra-passe</label>
        <input id="edk-password" name="password" type="password" autocomplete="new-password" required />
      </div>
      <div class="edk-field">
        <label for="edk-password2">Confirmar palavra-passe</label>
        <input id="edk-password2" name="password2" type="password" autocomplete="new-password" required />
      </div>
    </div>

    <div class="edk-actions">
      <button class="edk-btn" type="submit">Registar</button>
      <button class="edk-link" type="button" data-edk-nav="login">Já tenho conta</button>
    </div>
  </form>
`;

export const mountRegisterPage = (
  container: HTMLElement,
  options: RegisterPageOptions = {},
): { unmount: () => void } => {
  ensureAuthStyles();

  const opts: Required<RegisterPageOptions> = {
    brandName: options.brandName ?? "Edukanza",
    onSubmit: options.onSubmit ?? (() => { }),
    onNavigate: options.onNavigate ?? (() => { }),
  };

  const previous = container.innerHTML;
  let selected: ProfileId | null = null;

  const render = (): void => {
    container.innerHTML = buildShellHtml(opts.brandName, buildRegisterHtml(selected));
    bindProfilePicker(container, (p) => {
      selected = p;
      setSelectedProfile(container, selected);
      setError(container, null);
    });
  };

  render();

  const form = container.querySelector<HTMLFormElement>('[data-edk-form="1"]');
  const onSubmit = (ev: SubmitEvent) => {
    ev.preventDefault();
    setError(container, null);

    const profile = getSelectedProfile(container);
    if (!profile) {
      setError(container, "Selecione um perfil para continuar.");
      return;
    }

    if (!form) return;
    const fd = new FormData(form);
    const fullName = String(fd.get("fullName") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const password = String(fd.get("password") ?? "");
    const password2 = String(fd.get("password2") ?? "");

    if (!fullName || !email || !password || !password2) {
      setError(container, "Preencha todos os campos.");
      return;
    }

    if (password !== password2) {
      setError(container, "As palavras-passe não coincidem.");
      return;
    }

    opts.onSubmit({ profile, fullName, email, password });
  };

  form?.addEventListener("submit", onSubmit);

  const nav = container.querySelector<HTMLButtonElement>('[data-edk-nav="login"]');
  const onNav = () => opts.onNavigate("login");
  nav?.addEventListener("click", onNav);

  return {
    unmount: () => {
      form?.removeEventListener("submit", onSubmit);
      nav?.removeEventListener("click", onNav);
      container.innerHTML = previous;
    },
  };
};

if (typeof window !== "undefined" && typeof document !== "undefined") {
  const boot = () => mountRegisterPage(document.body);
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
}
