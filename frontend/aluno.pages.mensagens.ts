import { escapeHtml } from "./auth.shared";
import { icon } from "./aluno.icons";

export const mensagensHtml = (): string => `
  <div class="edk-msg-top">
    <div>
      <div class="edk-role">ALUNO</div>
      <h1 class="edk-page-title" style="margin:4px 0 0">Mensagens</h1>
    </div>
    <button class="edk-primarybtn" type="button" data-action="newMessage">${icon("plus")} Nova Mensagem</button>
  </div>
  <div class="edk-list">
    ${msgItem(
      "Prof. Ana Silva",
      "Reunião de Pais · 12.º A",
      "Gostaria de informar que a próxima reunião de pais está agendada para...",
      "Há 2 horas",
    )}
    ${msgItem(
      "Direcção Académica",
      "Calendário de Exames · 3.º Trimestre",
      "Segue em anexo o calendário completo de exames do terceiro trimestre...",
      "Ontem",
    )}
    ${msgItem(
      "Prof. Carlos Mendes",
      "Trabalho de Física · Entrega",
      "O trabalho sobre cinemática deve ser entregue até sexta-feira...",
      "2 dias atrás",
    )}
  </div>
`;

const msgItem = (sender: string, title: string, snippet: string, when: string): string => `
  <section class="edk-card edk-item">
    <div class="edk-item-row">
      <div class="edk-sender">
        <span class="edk-bullet" aria-hidden="true"></span>
        <div>
          <div style="font-weight:900">${escapeHtml(sender)}</div>
          <p class="edk-item-title" style="margin-top:6px">${escapeHtml(title)}</p>
          <p class="edk-item-sub">${escapeHtml(snippet)}</p>
        </div>
      </div>
      <div class="edk-when">${escapeHtml(when)}</div>
    </div>
  </section>
`;

