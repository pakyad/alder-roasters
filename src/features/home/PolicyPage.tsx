import type { ReactNode } from "react";

import { PageTransition } from "@/components/motion/PageTransition";
import { reveal } from "@/components/motion/reveal";
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
    <PageTransition>
      <Section spacing="generous">
        <Container size="narrow">
          <p className="eyebrow" {...reveal(0)}>
            {eyebrow}
          </p>
          <h1 {...reveal(1)}>{title}</h1>
          <p className="lead text-secondary" {...reveal(2)}>
            {introduction}
          </p>
          <div className={styles.policySections}>
            {sections.map((section, index) => (
              <section key={section.heading} {...reveal(Math.min(index, 4))}>
                <h2>{section.heading}</h2>
                <p>{section.body}</p>
              </section>
            ))}
          </div>
          {children}
        </Container>
      </Section>
    </PageTransition>
  );
}
