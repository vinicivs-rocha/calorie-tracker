"use client";

import styles from "@/app/(protected-segment)/home/(header)/header.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";
import { useCallback, useEffect, useRef } from "react";

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") ?? "current";

  const navigationContainer = useRef<HTMLUListElement>(null);
  const navigationTabs = useRef<HTMLLIElement[]>([]);
  const activeTabIndicator = useRef<HTMLDivElement>(null);

  const createQueryString = useCallback(
    (tab: string) => {
      const params = new URLSearchParams(searchParams);
      params.set("tab", tab);

      return params.toString();
    },
    [searchParams]
  );

  const slideIndicatorToTab = useCallback((tab: HTMLLIElement) => {
    const indicatorLeft = calculateIndicatorLeft(tab);
    const tabWidth = tab.clientWidth;

    activeTabIndicator.current!.style.left = `${indicatorLeft}px`;
    activeTabIndicator.current!.style.width = `${tabWidth}px`;
  }, []);

  function navigateTo(tab: string) {
    const queryString = createQueryString(tab);
    router.push(`${pathname}?${queryString}`);
  }

  function calculateIndicatorLeft(tab: HTMLLIElement) {
    const tabLeft = tab.getBoundingClientRect().left;
    const containerLeft =
      navigationContainer.current!.getBoundingClientRect().left;
    return tabLeft - containerLeft;
  }

  function activateTab(tabName: string) {
    navigateTo(tabName);
  }

  useEffect(() => {
    const currentTabElement =
      navigationTabs.current[activeTab === "current" ? 0 : 1];
    slideIndicatorToTab(currentTabElement);
  }, [activeTab, slideIndicatorToTab]);

  return (
    <nav>
      <ul className={styles.navigationContainer} ref={navigationContainer}>
        <li
          className={clsx({
            [styles.activeTab]: activeTab === "current",
            [styles.tab]: true,
          })}
          onClick={({ currentTarget }) => activateTab("current")}
          ref={(el) => navigationTabs.current.push(el!)}
        >
          Atual
        </li>
        <li
          className={clsx({
            [styles.activeTab]: activeTab === "history",
            [styles.tab]: true,
          })}
          onClick={() => activateTab("history")}
          ref={(el) => navigationTabs.current.push(el!)}
        >
          Histórico
        </li>
        <div
          className={styles.activeTabIndicator}
          ref={activeTabIndicator}
        ></div>
      </ul>
    </nav>
  );
}
