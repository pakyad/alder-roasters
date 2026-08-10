import type { ReactNode } from "react";

import { Container, Section } from "../../components/ui";
import styles from "./editorial.module.css";

type PolicyPageProps = {
  eyebrow: string;
  title: string;
  introduction: string;
  sections: readonly { readonly heading: string; readonly body: string }[];
  children?: ReactNode;
};

export function PolicyPage({ eyebrow, title, introduction, sections, children }: PolicyPageProps) {
  return (
    <Section spacing="generous">
      <Container size="narrow">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="lead text-secondary">{introduction}</p>
        <div className={styles.policySections}>
          {sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              <p>{section.body}</p>
            </section>
          ))}
        </div>
        {children}
      </Container>
    </Section>
  );
}
