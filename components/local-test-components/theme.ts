export const LOCAL_TEST_THEME = (colorTheme: string, screenSize: string) =>
  colorTheme === "light"
    ? `--background: 0 0% 100%;
--foreground: 224 71.4% 4.1%;

--card: 0 0% 100%;
--card-foreground: 224 71.4% 4.1%;

--popover: 0 0% 100%;
--popover-foreground: 224 71.4% 4.1%;

--primary: 262.1 83.3% 57.8%;
--primary-foreground: 210 20% 98%;

--secondary: 220 14.3% 95.9%;
--secondary-foreground: 220.9 39.3% 11%;

--muted: 220 14.3% 95.9%;
--muted-foreground: 220 8.9% 46.1%;

--accent: 257.31 55.91% 36.47%;
--accent-foreground: 0 0% 100%;

--destructive: 0 84.2% 60.2%;
--destructive-foreground: 210 20% 98%;

--border: 220 13% 91%;
--input: 220 13% 91%;
--ring: 262.1 83.3% 57.8%;
--radius: 0.5rem;`
    : `--background: 224 71.4% 4.1%;
--foreground: 210 20% 98%;

--card: 224 71.4% 4.1%;
--card-foreground: 210 20% 98%;

--popover: 224 71.4% 4.1%;
--popover-foreground: 210 20% 98%;

--primary: 263.4 70% 50.4%;
--primary-foreground: 210 20% 98%;

--secondary: 215 27.9% 16.9%;
--secondary-foreground: 210 20% 98%;

--muted: 215 27.9% 16.9%;
--muted-foreground: 217.9 10.6% 64.9%;

--accent: 215 27.9% 16.9%;
--accent-foreground: 210 20% 98%;

--destructive: 0 62.8% 30.6%;
--destructive-foreground: 210 20% 98%;

--border: 215 27.9% 16.9%;
--input: 215 27.9% 16.9%;
--ring: 263.4 70% 50.4%;`;

