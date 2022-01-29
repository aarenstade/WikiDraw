/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/dist/client/router";
import SearchBar from "./SearchBar";
import styles from "./Navbar.module.css";
import Link from "next/link";
import WalletBar from "./WalletBar";
import useBaseDrawing from "../../hooks/useBaseDrawing";

const Navbar = () => {
  const router = useRouter();
  const drawing = useBaseDrawing();

  const handleSearch = (topic: string) => {
    drawing.setLoading(true);
    router.push(`/t/${topic}`);
  };

  // TODO logo
  return (
    <div className={styles.navbar}>
      <div className={styles.menu}>
        <img
          src="/images/logo.png"
          alt="WikiDraw"
          width={120}
          className={styles.logo}
          onClick={() => router.push("/")}
        />
        <Link href="/about">About</Link>
      </div>
      <div style={{ display: "flex", gap: 0, justifyContent: "flex-end", alignItems: "center" }}>
        <WalletBar />
        <SearchBar
          topic={drawing.topic?.topic}
          loading={drawing.loading}
          onSearch={(topic: string) => handleSearch(topic)}
        />
      </div>
    </div>
  );
};

export default Navbar;
