/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
          950: "#1e1b4b",
        },
        accent: {
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
        },
        warn: {
          50: "#fffbeb",
          100: "#fef3c7",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
        },
      },
      fontFamily: {
        sans: [
          "Pretendard",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Apple SD Gothic Neo",
          "Noto Sans KR",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 1px 2px rgba(15, 23, 42, 0.04), 0 4px 12px rgba(15, 23, 42, 0.06)",
      },
      /*
       * 가독성 개선을 위해 Tailwind 기본 fontSize 스케일을 1~2px 정도 살짝 올린다.
       * 항목별 상대 비율은 유지(약 +6~10% 균등 인상).
       *  xs   12 → 13 / sm 14 → 15 / base 16 → 17 / lg 18 → 19
       *  xl   20 → 22 / 2xl 24 → 26 / 3xl 30 → 32
       * line-height 도 비례해 조정해 줄 간격이 답답해지지 않도록 한다.
       */
      fontSize: {
        xs: ["0.8125rem", { lineHeight: "1.125rem" }], // 13 / 18
        sm: ["0.9375rem", { lineHeight: "1.375rem" }], // 15 / 22
        base: ["1.0625rem", { lineHeight: "1.625rem" }], // 17 / 26
        lg: ["1.1875rem", { lineHeight: "1.75rem" }], // 19 / 28
        xl: ["1.375rem", { lineHeight: "1.875rem" }], // 22 / 30
        "2xl": ["1.625rem", { lineHeight: "2.125rem" }], // 26 / 34
        "3xl": ["2rem", { lineHeight: "2.375rem" }], // 32 / 38
      },
    },
  },
  plugins: [],
};
