export type AppIcon = "bell" | "chevDown" | "eye" | "download" | "plus";

export const icon = (name: AppIcon): string => {
    const common =
        'width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"';
    if (name === "bell") {
        return `<svg ${common}><path d="M18 8a6 6 0 10-12 0c0 7-3 7-3 7h18s-3 0-3-7" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.73 21a2 2 0 01-3.46 0" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/></svg>`;
    }
    if (name === "chevDown") {
        return `<svg ${common}><path d="M6 9l6 6 6-6" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    }
    if (name === "eye") {
        return `<svg ${common}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" stroke="#0f172a" stroke-width="2" stroke-linejoin="round"/><path d="M12 15a3 3 0 100-6 3 3 0 000 6Z" stroke="#0f172a" stroke-width="2"/></svg>`;
    }
    if (name === "download") {
        return `<svg ${common}><path d="M12 3v10" stroke="#0f172a" stroke-width="2" stroke-linecap="round"/><path d="M7 10l5 5 5-5" stroke="#0f172a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 21h14" stroke="#0f172a" stroke-width="2" stroke-linecap="round"/></svg>`;
    }
    return `<svg ${common}><path d="M12 5v14" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/><path d="M5 12h14" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/></svg>`;
};

