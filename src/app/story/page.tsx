import type { Metadata } from "next";
import Image from "next/image";

import { PageTransition } from "../../components/motion/PageTransition";
import { reveal } from "../../components/motion/reveal";
import { Container, Section } from "../../components/ui";
import styles from "../../features/home/editorial.module.css";

export const metadata: Metadata = {
  title: "Our story",
  description: "Why ALDER makes exceptional seasonal coffee easier to choose, brew and enjoy.",
};

export default function StoryPage() {
  return (
    <PageTransition>
      <Section spacing="generous">
        <Container>
          <div className={styles.pageHero} {...reveal(0)}>
            <p className="eyebrow">Our story</p>
            <h1>
              Exacting work.
              <br />
              An easier experience.
            </h1>
            <p className="lead text-secondary">
              ALDER began with a simple belief: better coffee should become clearer, not more
              complicated.
            </p>
          </div>
        </Container>
      </Section>
      <Image
        src="/images/editorial/hero-roastery.webp"
        alt="The fictional ALDER roastery inside a converted Petaling Jaya workshop"
        width={1800}
        height={1000}
        style={{ width: "100%", maxHeight: "48rem", objectFit: "cover" }}
      />
      <Section>
        <Container>
          <div className={styles.storyBody}>
            <p className="eyebrow" {...reveal(0)}>
              Petaling Jaya · Since 2018
            </p>
            <article {...reveal(1)}>
              <h2>Three coffees and a weekly public tasting</h2>
              <p>
                ALDER started in the back half of a former joinery workshop. Its founders had worked
                on opposite sides of coffee—one in roasting and green buying, the other in
                hospitality and editorial design—but shared the same frustration. Excellent coffees
                were arriving in Malaysia while the language around them made a simple pleasure feel
                like a test.
              </p>
              <p>
                The early tastings had one rule: taste first, explain second. Nobody needed to
                identify obscure flavour notes. They only needed to notice what they enjoyed. That
                approach still shapes every bag, product page and recipe we make.
              </p>
              <h2>Care made visible</h2>
              <p>
                Today we roast a compact seasonal range, change it when harvests end and publish a
                practical recipe for every coffee. We describe producers and places specifically,
                without mythology. The work is exacting because clarity takes effort. The experience
                stays calm because expertise should help, not perform.
              </p>
            </article>
          </div>
        </Container>
      </Section>
    </PageTransition>
  );
}
