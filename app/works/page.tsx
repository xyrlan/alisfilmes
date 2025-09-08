import { Section } from "../components/ui/Section";
import WorksHeader from "./components/WorksHeader";

export default function Works() {
  return (
    <Section spacing="xl" className="bg-foreground text-background">
      <WorksHeader />
    </Section>
  );
}
