import Image from "next/image";
import styles from "./page.module.css";

const client = {
  footer: {
    fields: [
      {
        href: { value: "", id: "333" },
        title: { value: "Docs", id: "111" },
        description: {
          value: "Find in-depth information about Next.js features and API.",
          id: "222",
        },
      },
    ],
    // title: "Docs",
    // description: "Find in-depth information about Next.js features and API.",
    // crestId: "111",
    // href: "https://nextjs.org/docs",
  },
  // {
  //   title: "Learn",
  //   description: "Learn about Next.js in an interactive course with&nbsp;quizzes!",
  //   crestId: "222",
  //   href: "https://nextjs.org/docs",
  // },
  // {
  //   title: "Templates",
  //   description: "Explore starter templates for Next.js.",
  //   crestId: "333",
  //   href: "https://nextjs.org/docs",
  // },
  // {
  //   title: "Deploy",
  //   description: "Instantly deploy your Next.js site to a shareable URL with Vercel.",
  //   crestId: "444",
  //   href: "https://nextjs.org/docs",
  // },
};

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.tsx</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      {/* <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div> */}
      <p className={styles.card}>
        lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua ut enim ad minim
        veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat lorem ipsum dolor sit amet consectetur adipiscing elit
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut
        enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat lorem ipsum dolor sit amet consectetur
        adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat lorem ipsum dolor sit
        amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua ut enim ad minim veniam quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
        lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua ut enim ad minim
        veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat lorem ipsum dolor sit amet consectetur adipiscing elit
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut
        enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat
      </p>
      <p className={styles.card}>
        lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua ut enim ad minim
        veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat lorem ipsum dolor sit amet consectetur adipiscing elit
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut
        enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat lorem ipsum dolor sit amet consectetur
        adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat lorem ipsum dolor sit
        amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua ut enim ad minim veniam quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
        lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua ut enim ad minim
        veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat lorem ipsum dolor sit amet consectetur adipiscing elit
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut
        enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat
      </p>
      <p className={styles.card}>
        lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua ut enim ad minim
        veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat lorem ipsum dolor sit amet consectetur adipiscing elit
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut
        enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat lorem ipsum dolor sit amet consectetur
        adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat lorem ipsum dolor sit
        amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua ut enim ad minim veniam quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
        lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua ut enim ad minim
        veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat lorem ipsum dolor sit amet consectetur adipiscing elit
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut
        enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat
      </p>
      <p className={styles.card}>
        lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua ut enim ad minim
        veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat lorem ipsum dolor sit amet consectetur adipiscing elit
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut
        enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat lorem ipsum dolor sit amet consectetur
        adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat lorem ipsum dolor sit
        amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua ut enim ad minim veniam quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
        lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua ut enim ad minim
        veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat lorem ipsum dolor sit amet consectetur adipiscing elit
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut
        enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat
      </p>
      <p className={styles.card}>
        lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua ut enim ad minim
        veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat lorem ipsum dolor sit amet consectetur adipiscing elit
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut
        enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat lorem ipsum dolor sit amet consectetur
        adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat lorem ipsum dolor sit
        amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua ut enim ad minim veniam quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
        lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua ut enim ad minim
        veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat lorem ipsum dolor sit amet consectetur adipiscing elit
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut
        enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat
      </p>
      <p className={styles.card}>
        lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua ut enim ad minim
        veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat lorem ipsum dolor sit amet consectetur adipiscing elit
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut
        enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat lorem ipsum dolor sit amet consectetur
        adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat lorem ipsum dolor sit
        amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua ut enim ad minim veniam quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
        lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua ut enim ad minim
        veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat lorem ipsum dolor sit amet consectetur adipiscing elit
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut
        enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat
      </p>
      <p className={styles.card}>
        lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua ut enim ad minim
        veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat lorem ipsum dolor sit amet consectetur adipiscing elit
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut
        enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat lorem ipsum dolor sit amet consectetur
        adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat lorem ipsum dolor sit
        amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua ut enim ad minim veniam quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
        lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua ut enim ad minim
        veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat lorem ipsum dolor sit amet consectetur adipiscing elit
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut
        enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat
      </p>
      <p className={styles.card}>
        lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua ut enim ad minim
        veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat lorem ipsum dolor sit amet consectetur adipiscing elit
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut
        enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat lorem ipsum dolor sit amet consectetur
        adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat lorem ipsum dolor sit
        amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua ut enim ad minim veniam quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
        lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua ut enim ad minim
        veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat lorem ipsum dolor sit amet consectetur adipiscing elit
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut
        enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat
      </p>
      <div className={styles.grid}>
        {client.footer.fields.map((item, index) => (
          <a
            key={index}
            href={item.href.value}
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 data-crest-id={item.title.id}>
              {item.title.value} <span>-&gt;</span>
            </h2>
            <p data-crest-id={item.description.id}>{item.description.value}</p>
          </a>
        ))}
        {/* <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p data-cms-id="123">Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore starter templates for Next.js.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>Instantly deploy your Next.js site to a shareable URL with Vercel.</p>
        </a> */}
      </div>
    </main>
  );
}
