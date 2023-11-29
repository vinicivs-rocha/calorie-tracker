"use client";

import styles from "@/app/ui/home/home.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";
import { useCallback } from "react";

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") ?? "current";

  const createQueryString = useCallback((tab: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", tab);

    return params.toString();
  }, [searchParams])
  function navigateTo(tab: string) {
    const queryString = createQueryString(tab);
    router.push(`${pathname}?${queryString}`);
  }

  return (
    <nav>
      <ul className={styles.navigationContainer}>
        <li
          className={clsx({
            [styles.activeTab]: activeTab === "current",
          })}
          onClick={() => navigateTo("current")}
        >
          Atual
        </li>
        <li
          className={clsx({
            [styles.activeTab]: activeTab === "history",
          })}
          onClick={() => navigateTo("history")}
        >
          Histórico
        </li>
      </ul>
    </nav>
  );
}
