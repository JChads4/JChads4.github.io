const SUPERSCRIPTS: Record<string, string> = {
  '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
  '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
  '+': '⁺', '-': '⁻',
};

/**
 * Flatten inline maths to plain text, for places that cannot render KaTeX: the
 * `<title>`, meta descriptions, and the RSS feed. Isotope superscripts become
 * Unicode (`$^{250}$Fm` → `²⁵⁰Fm`), the remaining LaTeX syntax is dropped, and
 * a string with no maths comes back unchanged.
 */
export function plainText(text: string): string {
  return text.replace(/\$([^$]+)\$/g, (_, expr: string) =>
    expr
      .replace(/\^\{([0-9+-]+)\}|\^([0-9+-])/g, (_m, group?: string, single?: string) =>
        [...(group ?? single ?? '')].map((c) => SUPERSCRIPTS[c] ?? c).join('')
      )
      .replace(/\\[a-zA-Z]+/g, '')
      .replace(/[{}_^]/g, '')
      .trim()
  );
}
