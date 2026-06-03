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

type LoginPayload = {
  profile: ProfileId;
  email: string;
  password: string;
};

type LoginPageOptions = {
  brandName?: string;
  onSubmit?: (payload: LoginPayload) => void;
  onNavigate?: (to: "register") => void;
  onForgotPassword?: (email: string) => void;
};

const buildLoginHtml = (selected: ProfileId | null): string => `
  <h1 class="edk-title">Entrar</h1>
  <p class="edk-subtitle">Escolha o seu perfil e inicie sessão.</p>

  <section class="edk-profiles" aria-label="Perfis">
    ${buildProfileCardsHtml(selected)}
  </section>

  <p class="edk-error" data-edk-error="1"></p>

  <form class="edk-form" data-edk-form="1" novalidate>
    <div class="edk-field">
      <label for="edk-email">Email</label>
      <input id="edk-email" name="email" type="email" autocomplete="email" inputmode="email" required />
    </div>
    <div class="edk-field">
      <label for="edk-password">Palavra-passe</label>
      <input id="edk-password" name="password" type="password" autocomplete="current-password" required />
    </div>

    <div class="edk-actions">
      <button class="edk-btn" type="submit">Entrar</button>
      <button class="edk-link" type="button" data-edk-nav="register">Criar conta</button>
      <button class="edk-link-muted" type="button" data-edk-forgot="1">Esqueci a palavra-passe</button>
    </div>
  </form>
`;

export const mountLoginPage = (
  container: HTMLElement,
  options: LoginPageOptions = {},
): { unmount: () => void } => {
  ensureAuthStyles();

  const opts: Required<LoginPageOptions> = {
    brandName: options.brandName ?? "Edukanza",
    onSubmit: options.onSubmit ?? (() => { }),
    onNavigate: options.onNavigate ?? (() => { }),
    onForgotPassword: options.onForgotPassword ?? (() => { }),
  };

  const previous = container.innerHTML;
  let selected: ProfileId | null = null;

  const render = (): void => {
    container.innerHTML = buildShellHtml(opts.brandName, buildLoginHtml(selected));
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
    const email = String(fd.get("email") ?? "").trim();
    const password = String(fd.get("password") ?? "");

    if (!email || !password) {
      setError(container, "Preencha o email e a palavra-passe.");
      return;
    }

    opts.onSubmit({ profile, email, password });
  };

  form?.addEventListener("submit", onSubmit);

  const nav = container.querySelector<HTMLButtonElement>('[data-edk-nav="register"]');
  const onNav = () => opts.onNavigate("register");
  nav?.addEventListener("click", onNav);

  const forgot = container.querySelector<HTMLButtonElement>('[data-edk-forgot="1"]');
  const onForgot = () => {
    const input = container.querySelector<HTMLInputElement>("#edk-email");
    opts.onForgotPassword(String(input?.value ?? "").trim());
  };
  forgot?.addEventListener("click", onForgot);

  return {
    unmount: () => {
      form?.removeEventListener("submit", onSubmit);
      nav?.removeEventListener("click", onNav);
      forgot?.removeEventListener("click", onForgot);
      container.innerHTML = previous;
    },
  };
};

if (typeof window !== "undefined" && typeof document !== "undefined") {
  const boot = () => mountLoginPage(document.body);
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
}
